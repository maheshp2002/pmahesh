import { Project, ExperienceItem, SkillCategory, EngineeringPrinciple } from '@/types';

export const PERSONAL_INFO = {
  name: "Mahesh P",
  monogram: "MP",
  title: "Software Engineer",
  tagline: "Software Engineer focused on ADO.NET, .NET Core, SQL query performance, API integrations, and enterprise product systems.",
  headline: "Building high-performance backend systems and making complex applications work better.",
  yearsExperience: "3.5+",
  experienceLabel: "Years of Professional Engineering",
  currentRole: ".NET Backend Developer",
  currentCompany: "Wrench Solutions",
  currentCompanyType: "Enterprise Product Engineering",
  location: "Kerala / Bengaluru, India",
  email: "pmahesh072002@gmail.com",
  github: "https://github.com/maheshp2002",
  linkedin: "https://www.linkedin.com/in/mahesh-p-593570228",
  resumeUrl: "/Mahesh_P_Resume.pdf",
  availabilityStatus: "Available for high-impact backend engineering",
  shortBio: "Backend-focused software engineer with 3.5+ years of experience designing robust .NET applications, optimizing relational databases, and architecting mission-critical enterprise integrations. Currently at Wrench Solutions engineering ADO.NET backend services for an enterprise Engineering & Construction management platform, eliminating database execution bottlenecks, and integrating Circularo & vSign digital signatures."
};

export const MARQUEE_ITEMS = [
  "ADO.NET & C#",
  ".NET CORE & .NET FRAMEWORK",
  "SQL QUERY OPTIMIZATION",
  "ENGINEERING & CONSTRUCTION DOMAIN",
  "CIRCULARO & VSIGN INTEGRATIONS",
  "MICROSOFT GRAPH API",
  "STORED PROCEDURES & EXECUTION PLANS",
  "POSTGRESQL & SQL SERVER",
  "CLEAN ARCHITECTURE & CQRS",
  "DOCUSIGN CLM",
  "HIGH-THROUGHPUT BACKENDS"
];

export const PROJECTS: Project[] = [
  {
    id: "engineering-construction-platform",
    title: "Engineering & Construction Management Platform",
    category: "Backend & Database Engineering",
    tagline: "Enterprise ADO.NET services, query optimization, and digital signature integration",
    period: "SEP 2025 — PRESENT",
    companyOrContext: "Wrench Solutions",
    companyUrl: "https://www.wrenchsp.com/",
    description: "Enterprise backend services and query optimization for a large-scale project management platform. Focuses on high-throughput ADO.NET data access, tuning stored procedures to eliminate database deadlocks, and building seamless integrations with Circularo, vSign, and Microsoft Graph.",
    contributions: [
      "Engineered robust ADO.NET data access layers and C# backend services for high-concurrency enterprise workflows.",
      "Profiled relational queries and stored procedures, analyzing execution plans to eradicate blocking deadlocks.",
      "Architected backend integration pipelines connecting platform workflows with Circularo and vSign digital signature APIs.",
      "Integrated Microsoft Graph API for automated directory, mail, and cloud document synchronization."
    ],
    techStack: ["C#", ".NET Core", "ADO.NET", "SQL Server", "Stored Procedures", "Microsoft Graph", "REST APIs"],
    isEmployerWork: true,
    featured: true
  },
  {
    id: "hospitality-clm",
    title: "US Hospitality Platform & DocuSign CLM Engine",
    category: "Clean Architecture & Distributed Systems",
    tagline: "Contract lifecycle automation, JSONB data processing, and reliable backend services",
    period: "APR 2024 — SEP 2025",
    companyOrContext: "Experion Technologies",
    description: "Backend development for a high-volume US hospitality platform across cross-functional teams. Architected clean architecture service layers, automated contract syncing with DocuSign CLM webhooks, and optimized PostgreSQL data layers.",
    contributions: [
      "Built resilient .NET APIs, domain event handlers, and application services following Clean Architecture and CQRS patterns.",
      "Authored PostgreSQL functions, views, and JSONB queries for high-volume contract data parsing and duplicate detection.",
      "Integrated DocuSign CLM webhooks to synchronize live contract lifecycle updates across services.",
      "Participated in live client night support operations delivering fast-turnaround production patches."
    ],
    techStack: [".NET Core", "C#", "PostgreSQL", "JSONB", "DocuSign CLM", "Clean Architecture", "CQRS"],
    isEmployerWork: true,
    featured: true
  },
  {
    id: "ev-charging-portal",
    title: "EV Smart Charging Network & Fleet Admin Portal",
    category: "Full-Stack & Telemetry Systems",
    tagline: "Real-time station availability, hardware telemetry, payments, and fleet management",
    period: "2023 — 2024",
    companyOrContext: "Experion Technologies (Automotive Domain)",
    description: "Backend endpoints and administrative portal for an EV charging network platform built for an automotive client. Handled station telemetry data, slot booking workflows, user authentication, and payment handling.",
    contributions: [
      "Engineered backend endpoints and database procedures for station slot reservation and charging status telemetry.",
      "Built responsive Angular administrative components integrated via OpenAPI-generated client SDKs.",
      "Collaborated in an agile scrum team maintaining continuous integration and test coverage."
    ],
    techStack: [".NET Core", "C#", "Angular", "SQL Server", "TypeScript", "REST APIs"],
    isEmployerWork: true,
    featured: true
  },
  {
    id: "mitfloww",
    title: "MitFloww — Freelancer Workflow & File Sharing Platform",
    category: "Product Engineering",
    tagline: "Independent workflow application for client deliverables and project milestone tracking",
    period: "2024 — 2026",
    companyOrContext: "Independent Product",
    description: "An independently developed workflow workspace tailored for digital freelancers and technical consultants. Features frictionless asset sharing, milestone tracking, client review links, and secure downloads.",
    contributions: [
      "Architected a responsive modern frontend and decoupled REST API with strict type safety.",
      "Designed secure chunked file upload pipelines with expiration controls and access tokens.",
      "Built intuitive project workspace dashboards with active client tracking."
    ],
    techStack: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS", "REST APIs"],
    repoUrl: "https://github.com/maheshp2002",
    isEmployerWork: false,
    featured: false
  },
  {
    id: "direct-ar",
    title: "DirectAR — Precise Indoor Navigation Engine",
    category: "Spatial Computing & AR",
    tagline: "Camera-based multi-floor AR navigation using real-world photogrammetric mapping",
    period: "2022",
    companyOrContext: "Personal Project",
    description: "Cross-platform augmented reality indoor navigation application designed for multi-floor buildings where GPS signals fail. Uses 3D spatial maps, QR-based initial floor positioning, and real-time directional pathfinding.",
    contributions: [
      "Constructed 3D spatial indoor maps from localized photos for environment recognition.",
      "Utilized Google ARCore and Unity to overlay 3D directional arrows and dynamic waypoints.",
      "Integrated QR-marker detection for initial camera positioning and multi-level floor transitions."
    ],
    techStack: ["Unity 3D", "C#", "Google ARCore", "Computer Vision", "Android SDK"],
    repoUrl: "https://github.com/maheshp2002",
    isEmployerWork: false,
    featured: false
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "wrench-solutions",
    role: ".NET Backend Developer",
    company: "Wrench Solutions",
    companyUrl: "https://www.wrenchsp.com/",
    location: "Bengaluru / Kochi, India",
    period: "SEP 2025 — PRESENT",
    current: true,
    type: "Full-time (Product Company)",
    description: "Backend engineering and query optimization for an enterprise engineering & construction management platform. Specializing in high-throughput ADO.NET data access, database deadlocks resolution, and cloud integrations.",
    keyContributions: [
      "Develop and maintain backend services in C# and ADO.NET for core enterprise platform workflows.",
      "Profile and optimize relational database queries and stored procedures, analyzing execution plans to eradicate blocking deadlocks.",
      "Architect and maintain integration pipelines connecting platform workflows with Circularo, vSign digital signatures, and Microsoft Graph API."
    ],
    technologies: ["C#", ".NET Core", "ADO.NET", "SQL Server", "Stored Procedures", "Circularo", "vSign", "Microsoft Graph"]
  },
  {
    id: "experion-se",
    role: "Software Engineer",
    company: "Experion Technologies",
    location: "Kochi, Kerala, India",
    period: "APR 2024 — SEP 2025",
    current: false,
    type: "Full-time",
    description: "Backend development for a high-scale US hospitality platform. Spearheaded clean architecture service layers, DocuSign CLM integration, and PostgreSQL database operations.",
    keyContributions: [
      "Built clean architecture .NET APIs, domain event handlers, and application services following CQRS patterns across a 90+ member team.",
      "Authored PostgreSQL functions, views, and JSONB queries for high-volume contract data parsing and duplicate detection.",
      "Integrated DocuSign CLM webhooks for automated lifecycle synchronization, and supported production operations."
    ],
    technologies: [".NET Core", "C#", "PostgreSQL", "JSONB", "DocuSign CLM", "Clean Architecture", "CQRS"]
  },
  {
    id: "experion-ase",
    role: "Associate Software Engineer",
    company: "Experion Technologies",
    location: "Kochi, Kerala, India",
    period: "MAR 2023 — APR 2024",
    current: false,
    type: "Full-time",
    description: "Delivered backend endpoints and administrative portals for an automotive EV charging infrastructure platform.",
    keyContributions: [
      "Engineered backend services and APIs for vehicle telemetry, charging station registration, slot booking, and payments.",
      "Optimized SQL Server procedures for real-time charging slot availability under concurrent user requests.",
      "Built responsive Angular administrative components integrated via OpenAPI-generated client SDKs."
    ],
    technologies: [".NET Core", "C#", "Angular", "SQL Server", "TypeScript", "REST APIs", "Git"]
  },
  {
    id: "experion-trainee",
    role: "Associate Software Engineer Trainee",
    company: "Experion Technologies",
    location: "Kochi, Kerala, India",
    period: "NOV 2022 — MAR 2023",
    current: false,
    type: "Training & Internship",
    description: "Structured engineering training in enterprise software engineering, modern C#/.NET practices, and relational database architecture.",
    keyContributions: [
      "Engineered the full-stack Individual Development Planner (IDP) project within an intensive 4-member sprint team.",
      "Mastered asynchronous C# programming, LINQ, SQL query structure, and Clean Architecture fundamentals."
    ],
    technologies: [".NET Core", "C#", "SQL Server", "LINQ", "Angular", "Git"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend Development",
    skills: ["C#", ".NET", ".NET Core", "ADO.NET", "ASP.NET Core Web API", "Asynchronous Programming"]
  },
  {
    title: "Databases & Query Performance",
    skills: ["SQL Server", "T-SQL", "Query Optimization", "Stored Procedures & Views", "PostgreSQL", "JSONB Indexing"]
  },
  {
    title: "Architecture & Engineering",
    skills: ["Clean Architecture", "CQRS", "MediatR", "Entity Framework Core", "LINQ", "Dependency Injection"]
  },
  {
    title: "Integrations & Cloud",
    skills: ["Microsoft Graph API", "Circularo", "vSign", "REST APIs", "OAuth 2.0", "Webhooks"]
  },
  {
    title: "Frontend & Tools",
    skills: ["TypeScript", "Angular", "React", "Next.js", "Git", "Postman", "Docker"]
  }
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: "01",
    title: "Investigate Root Causes Before Patching",
    tagline: "Never mask a symptom under load",
    description: "A quick fix without identifying the underlying mechanism invariably leads to secondary failures. I trace call stacks, examine concurrency behavior, and ensure the fundamental cause is eradicated.",
    practicalApplication: "Utilizing comprehensive logging, structured exception handling, and reproducible test cases to eliminate production regressions."
  },
  {
    number: "02",
    title: "Measure Database Behavior with Evidence",
    tagline: "Query tuning driven by execution plans, not guesswork",
    description: "Database performance is strictly deterministic. Rather than guessing which clause is slow, I inspect estimated and actual execution plans, analyze logical reads, verify index utilization, and test with production-scale data.",
    practicalApplication: "Refactoring expensive table scans into index seeks and optimizing stored procedures for predictable sub-second latency."
  },
  {
    number: "03",
    title: "Design for External Failure Cases",
    tagline: "Assume networks will drop and services will time out",
    description: "Enterprise integrations like Microsoft Graph, Circularo, or DocuSign live outside our control boundary. I engineer idempotent handlers, exponential backoff retries, and transactional state machines so failures recover gracefully.",
    practicalApplication: "Building robust webhook listeners with signature verification and retry queues that never drop customer events."
  },
  {
    number: "04",
    title: "Practical Maintainability Over Needless Complexity",
    tagline: "Clean code is code your teammates can safely modify",
    description: "Software engineering is a long-term discipline. Over-engineering with unnecessary abstraction layers hurts readability. I favor clear domain boundaries, straightforward dependency injection, and well-tested components.",
    practicalApplication: "Applying Clean Architecture where domain logic benefits from isolation, while keeping utility paths direct and readable."
  }
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Indira Gandhi National Open University (IGNOU)",
    period: "Jan 2024 — Present",
    highlights: ["Algorithms & Data Structures", "Database Management Systems (DBMS)", "Computer Networks", "Software Engineering Principles"]
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "IPT & GPTC, Shoranur, Kerala",
    period: "Sep 2020 — Jul 2022",
    highlights: ["CGPA: 8.95 / 10", "Core C & C++, Java, OS, DSA, Microprocessors", "Solid foundational computer architecture"]
  }
];
