export interface CauseImpactMetric {
  metric: string;
  label: string;
  context: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  period: string;
  companyOrContext: string;
  companyUrl?: string;
  description: string;
  architectureDetails?: string;
  rootCauseProblem?: string;
  engineeringSolution?: string;
  causeImpactMetrics?: CauseImpactMetric[];
  contributions: string[];
  techStack: string[];
  metricsOrHighlight?: string;
  repoUrl?: string;
  liveUrl?: string;
  isEmployerWork: boolean;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current: boolean;
  type: string;
  description: string;
  keyContributions: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  practicalApplication: string;
}
