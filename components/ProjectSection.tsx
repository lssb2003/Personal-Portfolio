import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <section className="relative py-12 md:py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 -skew-y-3" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Projects</h2>
          <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 p-4 md:p-6"
            >
              <h3 className="text-xl md:text-2xl font-bold text-secondary group-hover:text-primary 
                           transition-colors duration-300 mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                {project.tech.map((tech, i) => (
                  <div 
                    key={i} 
                    className="px-3 md:px-4 py-1 md:py-2 bg-primary/10 dark:bg-primary/20 rounded-lg"
                  >
                    <span className="text-xs md:text-sm font-medium text-primary whitespace-nowrap">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary 
                         font-medium transition-colors duration-200 text-sm md:text-base"
              >
                <span>View Project</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
