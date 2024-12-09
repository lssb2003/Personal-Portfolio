import React from 'react';
import confetti from 'canvas-confetti';

interface AchievementsSectionProps {
  sportsAchievements: string[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ 
  sportsAchievements 
}) => {
  const triggerConfetti = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get click position for confetti origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#5c7e9e', '#ff6b35', '#f7c59f'], // Using your theme colors
    });
  };

  return (
    <section className="relative py-12 md:py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 -skew-y-3" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Awards & Achievements</h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-secondary mb-4">Sports Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {sportsAchievements.map((achievement, i) => (
                <div
                  key={i}
                  onClick={triggerConfetti}
                  className="px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-lg 
                           transform hover:scale-105 transition-all duration-300
                           flex items-center justify-center text-center cursor-pointer"
                >
                  <span className="text-sm md:text-base font-medium text-primary 
                                hover:text-secondary transition-colors duration-300">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;