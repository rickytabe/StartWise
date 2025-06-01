// Pages/Internship/types.ts
export interface Internship {
    id: string;
    company: string;
    logo: string;
    industry: string;
    location: string;
    roles: string[];
    level: 'beginner' | 'intermediate' | 'pro';
    duration: string;
    applicationDeadline: string;
    description: string;
    requirements: string[];
    isFeatured: boolean;
  }
  
  export interface Filters {
    level: 'all' | 'beginner' | 'intermediate' | 'pro';
    location: 'all' | 'cameroon' | 'international';
  }