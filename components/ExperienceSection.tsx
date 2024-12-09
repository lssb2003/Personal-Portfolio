// ExperienceSection.tsx
import React from 'react';
import { Experience } from '../types/portfolio';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section className="relative py-12 md:py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 -skew-y-3" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Experience</h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 p-4 md:p-6"
            >
              <h3 className="text-xl md:text-2xl font-bold text-secondary group-hover:text-primary 
                           transition-colors duration-300 mb-2">
                {exp.title}
              </h3>
              <p className="text-base md:text-lg font-medium text-primary mb-3">
                {exp.company} | {exp.period}
              </p>
              <ul className="space-y-2">
                {exp.points.map((point, i) => (
                  <li 
                    key={i} 
                    className="text-sm md:text-base text-gray-600 dark:text-gray-300 pl-4 relative 
                             before:content-['•'] before:absolute before:left-0 before:text-primary"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;