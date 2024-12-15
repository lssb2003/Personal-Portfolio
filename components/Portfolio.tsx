// Portfolio.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import HeroSection from './HeroSection';
import ProjectSection from './ProjectSection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import AchievementsSection from './AchievementsSection';
import Jump from './JumpGame';
import RippleButton from './RippleButton';

const Portfolio = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const CLICKS_NEEDED = 3;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
  
    // Define ignored elements and classes
    const ignoredTags = ['A', 'BUTTON']; // Tags to ignore
    const ignoredClasses = ['bg-white', 'dark:bg-gray-800', 'hover:scale-105']; // Class names to ignore
  
    // Check if the click was on an ignored element or class
    const isIgnoredTag = ignoredTags.includes(target.tagName);
    const isIgnoredClass = ignoredClasses.some((cls) =>
      target.classList.contains(cls)
    );
  
    if (!isIgnoredTag && !isIgnoredClass) {
      setClickCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= CLICKS_NEEDED) {
          setShowJump(true);
          return 0; // Reset count after revealing the game
        }
        return newCount;
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log('Theme:', theme);
    }
  }, [mounted, theme]);

  const projects = [
    {
      title: 'AI Journal App',
      description: 'Full-stack application using Ruby on Rails, PostgreSQL, and React, deployed on AWS. Enhances journal entries using ChatGPT turbo 3.5.',
      link: 'http://18.142.252.250',
      tech: ['Ruby on Rails', 'PostgreSQL', 'React', 'AWS', 'Linux/Unix', 'OpenAI']
    },
    {
      title: 'Brain Tumor Classification',
      description: 'Deep learning application for automatic brain-tumour diagnosis using PyTorch and CNNs. Built and optimized CNNs for medical image classification, including data augmentation and custom data pipelines.',
      link: 'https://brain-tumor-classification-fcp97dnqcz8aqestfjbkww.streamlit.app/',
      tech: ['Python', 'PyTorch', 'CNNs', 'Streamlit', 'Jupyter Notebook']
    }
  ];

  const experiences = [
    {
      title: 'AI Engineer Intern',
      company: 'Prudential (Singapore)',
      period: 'Jun 2024 - Aug 2024',
      points: [
        'Optimized predictive models for customer segmentation using neural networks',
        'Improved segmentation efficiency by 15%',
        'Collaborated on integrating chatbot AI solution with NLP libraries'
      ]
    },
    {
      title: 'Data Entry and Customer Service Support',
      company: 'ICA (Singapore)',
      period: 'Apr 2024 - May 2024',
      points: [
        'Led team of 3 to manage customer issues and complaints',
        'Reduced turnaround time of closing customer complaints by 50% in 3 months',
        'Increased customer satisfaction ratings by 2 points'
      ]
    },
    {
      title: 'Sergeant, Section Commander',
      company: 'Singapore Army 1st Guards Battalion',
      period: 'Jun 2022 - Mar 2024',
      points: [
        'Collaborated with other platoons and command units',
        'Reinforced unit cohesion and strategic operations'
      ]
    }
  ];

  const education = [
    {
      school: 'National University of Singapore',
      degree: 'Bachelor of Computing in Computer Science',
      specialization: 'Specialization in Artificial Intelligence and Software Engineering',
      minor: 'Minor in Bioinformatics',
      period: 'Aug 2024 - Jul 2028'
    },
    {
      school: 'Singapore Sports School',
      degree: 'International Baccalaureate Programme',
      details: 'HL Mathematics AA, HL Biology, HL Chemistry, SL English, SL Chinese, SL Geography',
      period: 'Jan 2016 - Dec 2021'
    }
  ];

  const achievements = {
    sportsAchievements: [
      '2022 World Taekwondo Poomsae Championships - U30 Male Team, Semi-finals',
      '2021 SEA Games - Poomsae Male Team, Joint Bronze',
      'Best Sportsboy Award (Taekwondo) 2017, 2018, 2019'
    ]
  };

  const skills = {
    programmingLanguages: ['Python', 'Java', 'Javascript'],
    technologies: [
      'React',
      'Flask',
      'Ruby on Rails',
      'PostgreSQL',
      'AWS EC2',
      'Docker',
      'Git',
      'XGBoost', 
      'TensorFlow', 
      'Transformers',
      'Tailwind CSS'

    ],
    certifications: ['AWS Certified Cloud Practitioner']
  };

  return (
    <div 
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      onClick={handleBackgroundClick}
    >
      <nav className="fixed top-0 w-full bg-primary/90 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 py-2 md:py-3 flex justify-end">
          {mounted && (
            <RippleButton
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 
                       bg-blue-500 text-white"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-secondary 
                              transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-secondary 
                              transition-colors duration-300" />
              )}
            </RippleButton>
          )}
        </div>
      </nav>

      
      <main className="max-w-5xl mx-auto px-4 pt-16 md:pt-20 pb-8 md:pb-12">
        <HeroSection />
        <EducationSection education={education} />
        <ProjectSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <SkillsSection 
          programmingLanguages={skills.programmingLanguages}
          technologies={skills.technologies}
          certifications={skills.certifications}
        />
        <AchievementsSection 
          sportsAchievements={achievements.sportsAchievements}
        />
      </main>

      {/* Hidden Jump game */}
      {showJump && <Jump onClose={() => setShowJump(false)} />}
    </div>
  );
};

export default Portfolio;
