export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  category: 'flagship' | 'additional';
  featured: boolean;
  startDate: string;
  endDate: string;
  corrections?: string[];
}

export interface ExperienceStage {
  title: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  location: string;
  type: string;
  product: string;
  stages: ExperienceStage[];
  startDate: string;
  endDate: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  proficiency?: number;
}

export interface SiteConfig {
  name: string;
  title: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  location: string;
  cvUrl: string;
}