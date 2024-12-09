export interface Project {
    title: string;
    description: string;
    link: string;
    tech: string[];
  }
  
  
  export interface Experience {
    title: string;
    company: string;
    period: string;
    points: string[];  // Changed from 'description' to match your component
  }
  
  export interface Education {
    school: string;
    degree: string;
    specialization?: string;
    minor?: string;
    period: string;
    details?: string;
  }
  
