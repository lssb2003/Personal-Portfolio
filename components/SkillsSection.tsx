import React from 'react';

interface SkillsSectionProps {
  programmingLanguages: string[];
  technologies: string[];
  certifications: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  programmingLanguages, 
  technologies, 
  certifications 
}) => {
  return (
    <section className="relative py-12 md:py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 -skew-y-3" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Skills & Certifications</h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-secondary">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {programmingLanguages.map((skill, i) => (
                  <div
                    key={i}
                    className="px-3 md:px-4 py-1 md:py-2 bg-primary/10 dark:bg-primary/20 rounded-lg 
                             transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-xs md:text-sm font-medium text-primary hover:text-secondary 
                                  transition-colors duration-300 whitespace-nowrap">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-secondary">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {technologies.map((tech, i) => (
                  <div
                    key={i}
                    className="px-3 md:px-4 py-1 md:py-2 bg-primary/10 dark:bg-primary/20 rounded-lg 
                             transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-xs md:text-sm font-medium text-primary hover:text-secondary 
                                  transition-colors duration-300 whitespace-nowrap">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-bold text-secondary mb-4">
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="px-3 md:px-4 py-1 md:py-2 bg-primary/10 dark:bg-primary/20 rounded-lg 
                           transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-xs md:text-sm font-medium text-primary hover:text-secondary 
                                transition-colors duration-300 whitespace-nowrap">
                    {cert}
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

export default SkillsSection;
