export const projectsData = [
  {
    id: 1,
    title: "Evidentia",
    subtitle: "Evidence-First Security Investigation & SOC Intelligence Platform",
    description:
      "Evidence-first SOC investigation platform that correlates security telemetry into deterministic incident graphs, reconstructs forensic timelines, verifies evidence integrity with SHA-256, and provides optional local AI-assisted investigation with citation validation.",
    features: [
      "Deterministic security event correlation and incident formation",
      "Authoritative evidence graph with causal relationships",
      "Forensic timeline separating occurred_at and detected_at",
      "On-demand SHA-256 evidence integrity verification",
      "MITRE ATT&CK-aware deterministic risk scoring",
      "Advisory behavioral anomaly and entity similarity analysis",
      "Optional local Qwen3.5-9B investigation with evidence citations",
      "SOC replay laboratory for realistic attack scenarios",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "NetworkX",
      "Docker",
      "Qwen3.5-9B",
      "llama.cpp",
    ],
    github: "https://github.com/tigpy/evidentia",
    live: "",
    image: "/assets/project-images/evidentia.png",
    architecture:
      "Evidence-first SOC architecture that ingests and normalizes telemetry, preserves immutable raw evidence, builds deterministic causal graphs and forensic timelines, calculates explainable risk, and optionally provides analyst-invoked local AI synthesis constrained by deterministic citation validation.",
    category: "Cybersecurity",
    featured: true,
  },

  {
    id: 2,
    title: "ZTAI-Block",
    subtitle: "AI + Blockchain + Zero Trust",
    description:
      "AI-powered Zero Trust access control system with blockchain-based tamper-resistant security logging and behavioral anomaly detection.",
    features: [
      "Zero Trust access control architecture",
      "AI-powered anomaly detection engine",
      "Tamper-resistant blockchain security logs",
      "Behavioral signal analysis for threat detection",
      "Enterprise attack surface evaluation",
      "Risk scoring and automated response",
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Blockchain",
      "AI/ML",
      "Python",
    ],
    github: "https://github.com/tigpy/ZTAI-LOGIN-DASHBOARD",
    live: "https://ztai-block-demo.vercel.app",
    image: "/assets/project-images/ztai-block.webp",
    architecture:
      "Zero Trust Architecture integrated with a decentralized blockchain logging network. Features a Python-based machine learning engine for anomaly detection, real-time risk score calculation, and a React frontend for security monitoring.",
    category: "Cybersecurity",
    featured: true,
  },

  {
    id: 3,
    title: "NutriMed",
    subtitle: "AI Diet & Exercise Recommendation System",
    description:
      "AI-based personalized diet and exercise recommendation system built during internship at Excler. Uses ML models to analyze health data and deliver tailored guidance.",
    features: [
      "Personalized diet and exercise plans via ML",
      "BMI calculation and calorie estimation",
      "Macro nutrient distribution analysis",
      "Flask REST API with ML inference backend",
      "React frontend with real-time recommendations",
      "User health profile management",
    ],
    techStack: [
      "React",
      "Flask",
      "Python",
      "Machine Learning",
      "REST API",
    ],
    github: "https://github.com/tigpy/nutrimed-react-frontend",
    live: "https://nutrimed-react-frontend.vercel.app/",
    image: "/assets/project-images/nutrimed.webp",
    architecture:
      "Client-Server architecture. The React frontend communicates with a Python Flask REST API backend. Machine learning models (Scikit-learn) are served on the Flask API to process health inputs and generate recommendations in real-time.",
    category: "AI",
    featured: true,
  },

  {
    id: 4,
    title: "PennyWise",
    subtitle: "Smart Expense Tracker",
    description:
      "A smart personal finance tracker that helps users manage budgets, visualize spending patterns, and track expenses across categories.",
    features: [
      "Expense logging with category tagging",
      "Visual spending analytics and charts",
      "Budget setting and threshold alerts",
      "Monthly summary reports",
      "Responsive dashboard interface",
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Chart.js",
      "Express",
    ],
    github: "https://github.com/tigpy/Pennywise",
    live: "https://pennywise-tracker-1.preview.emergentagent.com/analytics",
    image: "/assets/project-images/pennywise.webp",
    architecture:
      "MERN Stack (MongoDB, Express, React, Node.js) architecture. Follows MVC design patterns. Employs Chart.js for client-side visual analytics and client-state budget alerting services.",
    category: "Web",
    featured: true,
  },
];

export const projectCategories = [
  "All",
  "Cybersecurity",
  "AI",
  "Web",
  "Cloud",
];
