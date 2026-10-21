
export const projectsData = [
  {
    id: 'manio',
    title: 'Manio — Personal Finance Tracker',
    description: 'Full-stack personal finance tracker with multi-wallet transactions, budgets, loan tracking, and AI-powered WhatsApp automation for conversational finance management.',
    longDescription: `Manio is a full-stack personal finance tracker built with React, TypeScript and Spring Boot, enhanced with Spring AI + WhatsApp automation for conversational finance management. Users can text "spent 500 on groceries" on WhatsApp and it parses, confirms, and records the transaction automatically.

**Architecture**: Modular monolith using Spring Modulith with three modules (auth, finance, notification). PostgreSQL with Flyway migrations for schema management.

**AI Integration**: Spring AI + NVIDIA NIM (meta/llama-3.1-70b-instruct) with JSON-mode parsing workaround (NVIDIA rejects strict JSON schema, uses response_format: json_object + manual Jackson mapping).

**WhatsApp Flow**: Meta webhook → TransactionParsingService (LLM) → Fuzzy matching against user wallets/purposes → AWAITING_CONFIRMATION state → Yes/No confirmation → Transaction creation → Graph API reply with outbox-scheduler fallback (15s polling, max 5 retries).

**Key Technical Decisions**:
- Spring Modulith for modularity without microservices complexity
- JSON-mode workaround for NVIDIA NIM schema limitations
- Outbox pattern for reliable WhatsApp message delivery
- React + TypeScript frontend with light/dark theming and reduced-motion support

**Features**: Multi-wallet (system CASH wallet), transactions (income/expense/transfer/loan with splits), budgets (per-category monthly limits with NORMAL/WARNING/EXCEEDED alerts), loans (receivable/payable per person), dashboard (6-month trends), reports (CSV export, category breakdowns), in-app + email notifications, bilingual (English/Urdu, RTL).`,
    image: 'assets/manio-overview.png',
    githubUrl: undefined, // Private repo - no GitHub link
    liveUrl: 'https://personal-finance-tracker-mani-df8a.vercel.app/preview',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Spring Boot 4.0.7',
      'Java 21',
      'PostgreSQL',
      'Flyway',
      'Spring Modulith',
      'Spring Security + JWT',
      'Spring AI',
      'NVIDIA NIM',
      'CSS design system',
    ],
    category: 'flagship',
    featured: true,
    startDate: '2025-08',
    endDate: 'Present',
  },
  {
    id: 'manilogix',
    title: 'ManiLogix — Microservices Supply Chain System',
    description: 'Enterprise-style backend for inventory, suppliers, and orders across independent services with JWT-secured auth, role-based access, and unified routing via API Gateway with Eureka service discovery.',
    image: 'assets/manilogix-overview.jpg',
    githubUrl: 'https://github.com/rehman4113/Mani-Logix-B2B',
    liveUrl: 'https://manilogix-ui.vercel.app/',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Spring Boot',
      'Spring Cloud',
      'Eureka',
      'API Gateway',
      'OpenFeign',
      'JWT',
      'MongoDB',
    ],
    category: 'additional',
    featured: true,
    startDate: '2025-08',
    endDate: '2025-10',
  },
  {
    id: 'ai-task-manager',
    title: 'AI-Powered Task Manager',
    description: 'Full-stack task manager where a Node.js NLP layer interprets natural-language commands and forwards structured intents to a Spring Boot backend exposing RESTful task APIs, with a responsive frontend UI.',
    image: 'assets/task.jpg',
    githubUrl: 'https://github.com/rehman4113/AI-Powered-Task-Manager',
    liveUrl: undefined,
    techStack: [
      'Spring Boot',
      'Java',
      'MySQL',
      'Node.js (node-nlp)',
      'HTML',
      'Tailwind CSS',
      'TypeScript',
    ],
    category: 'additional',
    featured: true,
    startDate: '2025-06',
    endDate: '2025-07',
  },
  {
    id: '2fa-system',
    title: 'Two-Factor Authentication System',
    description: 'First independent backend project. Secure 2FA login flow with OTP verification, role-based access, and token management to protect sensitive endpoints.',
    image: 'assets/2FAUTH.jpg',
    githubUrl: 'https://github.com/rehman4113/Two-Factor-Authentication-System',
    liveUrl: undefined,
    techStack: [
      'Spring Security',
      'JWT',
      'OTP (Email/SMS)',
    ],
    category: 'additional',
    featured: true,
    startDate: '2025-05',
    endDate: '2025-05',
  },
  {
    id: 'flavorfit',
    title: 'FlavorFit — Meal Ordering App',
    description: 'Backend for a meal ordering platform with JWT-secured, role-based APIs managing users, orders, and nutritionist recommendations. University Final Year Project.',
    image: 'assets/flavor.png',
    githubUrl: undefined, // Private repo
    liveUrl: undefined,
    techStack: [
      'Spring Boot',
      'MongoDB',
      'JWT',
    ],
    category: 'additional',
    featured: false,
    startDate: '2025-01',
    endDate: '2025-05',
  },
];