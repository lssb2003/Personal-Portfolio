// HeroSection.tsx
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-24 px-4 mb-8 md:mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 -skew-y-3" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-12">
          {/* Added pb-1 to ensure descenders aren't cut off */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 
                         bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent 
                         leading-relaxed min-h-[2.5em] flex items-center justify-center">
            Low Sze Sheng Brandon
          </h1>
          
          <h2 className="text-xl md:text-2xl text-primary mb-6 md:mb-8 font-medium tracking-wide">
            Computer Science Student at NUS
          </h2>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-6 md:mb-8">
            <a 
              href="https://github.com/lssb2003" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
            >
              <Github className="w-6 h-6 md:w-7 md:h-7 text-primary hover:text-secondary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/brandon-low-26bb351a1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
            >
              <Linkedin className="w-6 h-6 md:w-7 md:h-7 text-primary hover:text-secondary" />
            </a>
            <a 
              href="mailto:e1356997@u.nus.edu"
              className="transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
            >
              <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary hover:text-secondary" />
            </a>
          </div>
          
          <p className="text-text font-medium">
            <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-content 
                           px-4 py-2 rounded-full transform hover:scale-105 transition-all duration-300 
                           text-sm md:text-base">
              +65 91289739
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;