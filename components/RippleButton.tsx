import React, { useState, useLayoutEffect } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const RippleButton: React.FC<RippleButtonProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [ripples]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { x, y, id: Date.now() }]);
    if (onClick) onClick();
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
          }}
        />
      ))}
      {children}
    </button>
  );
};

export default RippleButton;
