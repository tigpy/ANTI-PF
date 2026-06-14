export const projectsData = [
  {
    id: 1,
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
    techStack: ["React", "Node.js", "MongoDB", "Blockchain", "AI/ML", "Python"],
    github: "https://github.com/tigpy/ZTAI-LOGIN-DASHBOARD",
    live: "https://ztai-block-demo.vercel.app",
    image: "/assets/project-images/ztai-block.png",
    architecture: "Zero Trust Architecture integrated with a decentralized blockchain logging network. Features a Python-based machine learning engine for anomaly detection, real-time risk score calculation, and a React frontend for security monitoring.",
    category: "Cybersecurity",
    featured: true,
  },
  {
    id: 2,
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
    techStack: ["React", "Flask", "Python", "Machine Learning", "REST API"],
    github: "https://github.com/tigpy/nutrimed-react-frontend",
    live: "https://nutrimed-react-frontend.vercel.app/",
    image: "/assets/project-images/nutrimed.png",
    architecture: "Client-Server architecture. The React frontend communicates with a Python Flask REST API backend. Machine learning models (Scikit-learn) are served on the Flask API to process health inputs and generate recommendations in real-time.",
    category: "AI",
    featured: true,
  },
  {
    id: 3,
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
    techStack: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
    github: "https://github.com/tigpy/Pennywise",
    live: "https://pennywise-tracker-1.preview.emergentagent.com/analytics",
    image: "/assets/project-images/pennywise.png",
    architecture: "MERN Stack (MongoDB, Express, React, Node.js) architecture. Follows MVC design patterns. Employs Chart.js for client-side visual analytics and client-state budget alerting services.",
    category: "Web",
    featured: true,
  }
];

export const projectCategories = ["All", "Cybersecurity", "AI", "Web", "Cloud"];
