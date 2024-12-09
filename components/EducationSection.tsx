import React from 'react';
import { Education } from '../types/portfolio';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section className="relative py-12 md:py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 -skew-y-3" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Education</h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-4 md:space-y-6">
          {education.map((edu, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 p-4 md:p-6"
            >
              <h3 className="text-xl md:text-2xl font-bold text-secondary group-hover:text-primary 
                           transition-colors duration-300 mb-3">
                {edu.school}
              </h3>
              <div className="space-y-2">
                <p className="text-base md:text-lg font-medium text-primary">{edu.degree}</p>
                {edu.specialization && (
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {edu.specialization}
                  </p>
                )}
                {edu.minor && (
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {edu.minor}
                  </p>
                )}
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
