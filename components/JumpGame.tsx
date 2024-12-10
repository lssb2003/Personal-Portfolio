// // components/TicTacToe.tsx
// import React, { useState, useEffect } from 'react';
// import RippleButton from './RippleButton';

// interface TicTacToeProps {
//   onClose: () => void;
// }

// const TicTacToe: React.FC<TicTacToeProps> = ({ onClose }) => {
//   const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const [winner, setWinner] = useState<string | null>(null);
//   const [isDraw, setIsDraw] = useState(false);

//   const calculateWinner = (squares: (string | null)[]) => {
//     const lines = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
//       [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
//       [0, 4, 8], [2, 4, 6] // diagonals
//     ];

//     for (const [a, b, c] of lines) {
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       }
//     }
//     return null;
//   };

//   const handleClick = (i: number) => {
//     if (board[i] || winner || isDraw) return;

//     const newBoard = board.slice();
//     newBoard[i] = isXNext ? 'X' : 'O';
//     setBoard(newBoard);
//     setIsXNext(!isXNext);
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setIsXNext(true);
//     setWinner(null);
//     setIsDraw(false);
//   };

//   useEffect(() => {
//     const winnerResult = calculateWinner(board);
//     if (winnerResult) {
//       setWinner(winnerResult);
//     } else if (!board.includes(null)) {
//       setIsDraw(true);
//     }
//   }, [board]);

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//             Tic Tac Toe
//           </h3>
//           <button 
//             onClick={onClose}
//             className="text-secondary hover:text-primary transition-colors"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-2 mb-6">
//           {board.map((square, i) => (
//             <RippleButton
//               key={i}
//               onClick={() => handleClick(i)}
//               className={`w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg 
//                         flex items-center justify-center text-2xl font-bold
//                         border-2 border-primary/20 hover:border-primary
//                         transition-all duration-300
//                         ${square ? 'cursor-not-allowed' : 'cursor-pointer'}
//                         ${square === 'X' ? 'text-primary' : 'text-secondary'}`}
//             >
//               {square}
//             </RippleButton>
//           ))}
//         </div>

//         <div className="text-center space-y-4">
//           {(winner || isDraw) && (
//             <p className={`text-lg font-bold ${
//               winner === 'X' ? 'text-primary' : 
//               winner === 'O' ? 'text-secondary' : 
//               'text-gray-600 dark:text-gray-300'
//             }`}>
//               {winner ? `Winner: ${winner}` : 'Game Draw!'}
//             </p>
//           )}
//           {!winner && !isDraw && (
//             <p className={`text-lg font-medium ${
//               isXNext ? 'text-primary' : 'text-secondary'
//             }`}>
//               Next player: {isXNext ? 'X' : 'O'}
//             </p>
//           )}
//           <RippleButton
//             onClick={resetGame}
//             className="px-6 py-2 bg-gradient-to-r from-primary to-secondary 
//                      text-white rounded-lg hover:opacity-90 
//                      transition-all duration-300 font-medium"
//           >
//             Reset Game
//           </RippleButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicTacToe;

import React, { useState, useEffect, useRef } from 'react';
import RippleButton from './RippleButton';

interface JumpProps {
  onClose: () => void;
}

const Jump: React.FC<JumpProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const [obstacleX, setObstacleX] = useState(400);
  const [speed, setSpeed] = useState(4);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleType, setObstacleType] = useState<'single' | 'double' | 'triple'>('single');
  const [isInAir, setIsInAir] = useState(false);

  const gameRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const getObstacleDetails = (type: 'single' | 'double' | 'triple'): { width: number; height: number } => {
    switch (type) {
      case 'single':
        return { width: 20, height: 40 };
      case 'double':
        return { width: 40, height: 40 };
      case 'triple':
        return { width: 60, height: 40 };
      default:
        return { width: 20, height: 40 };
    }
  };

  const generateNewObstacle = () => {
    const types: Array<'single' | 'double' | 'triple'> = ['single', 'double', 'triple'];
    const newType = types[Math.floor(Math.random() * types.length)];
    setObstacleType(newType);
  };

  const jump = () => {
    // Only allow jump if:
    // 1. Game is playing
    // 2. Not currently jumping animation
    // 3. Not in the air from a previous jump
    if (!isJumping && !isInAir && isPlaying) {
      setIsJumping(true);
      setIsInAir(true);
      setJumpHeight(6);
      
      // Jump animation sequence
      setTimeout(() => {
        setJumpHeight(0);
        // Only reset horizontal offset after character has landed
        setTimeout(() => {
          setHorizontalOffset(0);
          setIsInAir(false); // Allow next jump only after landing
          setIsJumping(false);
        }, 300);
      }, 500);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && isPlaying) {
      event.preventDefault();
      jump();
    }
  };

  const gameLoop = (timestamp: number) => {
    if (!isPlaying){ return};

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    setObstacleX(prevX => {
      if (prevX < -getObstacleDetails(obstacleType).width) {
        generateNewObstacle();
        setScore(prev => prev + 1);
        setSpeed(prevSpeed => Math.min(prevSpeed + 0.2, 8));
        return 400;
      }
      return prevX - (speed * (deltaTime / 16));
    });

    const jumper = jumpRef.current?.getBoundingClientRect();
    const obstacle = obstacleRef.current?.getBoundingClientRect();

    if (jumper && obstacle) {
      if (
        jumper.right > obstacle.left &&
        jumper.left < obstacle.right &&
        jumper.bottom > obstacle.top
      ) {
        endGame();
        return;
      }
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setIsGameOver(false);
    setSpeed(4);
    setObstacleX(400);
    setIsJumping(false);
    setHorizontalOffset(0);
    generateNewObstacle();
    lastTimeRef.current = 0;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    window.addEventListener('keydown', handleKeyPress);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    window.removeEventListener('keydown', handleKeyPress);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const renderObstacle = () => {
    switch (obstacleType) {
      case 'single':
        return (
          <div className="w-full h-full bg-secondary rounded-sm -rotate-12" />
        );
      case 'double':
        return (
          <div className="w-full h-full flex gap-1">
            <div className="w-1/2 h-full bg-secondary rounded-sm" />
            <div className="w-1/2 h-full bg-secondary rounded-sm" />
          </div>
        );
      case 'triple':
        return (
          <div className="w-full h-full flex gap-1">
            <div className="w-1/3 h-full bg-secondary rounded-sm" />
            <div className="w-1/3 h-full bg-secondary rounded-sm" />
            <div className="w-1/3 h-full bg-secondary rounded-sm" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Jump (accessed with 3 clicks on main page)
          </h3>
          <button 
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        <div 
          ref={gameRef}
          className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden cursor-pointer"
          onClick={jump}
        >
          {/* Ground line */}
          <div className="absolute bottom-0 w-full h-1 bg-primary/20" />
          
          {/* jumper */}
          <div
            ref={jumpRef}
            className="absolute bottom-1 left-8 w-10 h-10 bg-gradient-to-br from-primary to-secondary"
            style={{
              transform: `translateY(-${jumpHeight}rem) translateX(${horizontalOffset}px)`,
              borderRadius: '60% 60% 50% 50%',
              transition: isInAir ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="relative">
              <div className="absolute right-2 top-2 w-2 h-2 bg-white rounded-full" />
              <div className="absolute right-3 top-4 w-1 h-1 bg-white rounded-full" />
            </div>
          </div>

          {/* Obstacle */}
          <div
            ref={obstacleRef}
            className="absolute bottom-1"
            style={{ 
              left: `${obstacleX}px`,
              width: `${getObstacleDetails(obstacleType).width}px`,
              height: `${getObstacleDetails(obstacleType).height}px`,
              transition: 'none'
            }}
          >
            {renderObstacle()}
          </div>
        </div>

        <div className="text-center space-y-4">
          {!isPlaying && !isGameOver && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Press Space/Up or Click to jump
            </p>
          )}
          
          <p className="text-lg font-bold text-primary">
            Score: {score}
          </p>
          
          {isGameOver && (
            <p className="text-lg font-bold text-secondary">
              Game Over! Final Score: {score}
            </p>
          )}

          <RippleButton
            onClick={startGame}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary 
                     text-white rounded-lg hover:opacity-90 
                     transition-all duration-300 font-medium"
          >
            {isGameOver ? 'Play Again' : 'Start Game'}
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default Jump;