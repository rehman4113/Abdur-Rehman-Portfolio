import { SkillGroup } from '../models';

export const skillsData: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Java', icon: 'code' },
      { name: 'Python', icon: 'code' },
      { name: 'JavaScript', icon: 'code' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'Spring Boot', icon: 'layers' },
      { name: 'Spring Cloud', icon: 'layers' },
      { name: 'FastAPI', icon: 'zap' },
    ],
  },
  {
    category: 'Microservices & Distributed Systems',
    skills: [
      { name: 'Eureka (Service Discovery)', icon: 'network' },
      { name: 'API Gateway', icon: 'git-branch' },
      { name: 'OpenFeign', icon: 'link' },
      { name: 'RestTemplate', icon: 'link' },
      { name: 'Spring Cloud Config', icon: 'settings' },
      { name: 'Resilience4j (Circuit Breaker, Retry, Rate Limiter)', icon: 'shield' },
    ],
  },
  {
    category: 'AI Integration',
    skills: [
      { name: 'Spring AI', icon: 'brain' },
      { name: 'NVIDIA NIM (OpenAI-compatible LLM)', icon: 'cpu' },
      { name: 'Prompt/JSON-mode Parsing', icon: 'file-code' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'MongoDB', icon: 'database' },
      { name: 'MySQL', icon: 'database' },
    ],
  },
  {
    category: 'Security',
    skills: [
      { name: 'Spring Security', icon: 'shield' },
      { name: 'JWT', icon: 'key' },
      { name: 'OTP-based 2FA', icon: 'lock' },
    ],
  },
  {
    category: 'Other',
    skills: [
      { name: 'REST API Design', icon: 'layout' },
      { name: 'Node.js (NLP Integration)', icon: 'server' },
      { name: 'Git', icon: 'git-branch' },
      { name: 'Postman', icon: 'send' },
      { name: 'Flyway Migrations', icon: 'git-compare' },
      { name: 'Team Leadership', icon: 'users' },
      { name: 'SaaS Billing/Finance Domain', icon: 'credit-card' },
    ],
  },
];