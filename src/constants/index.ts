// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  // meta,
  // starbucks,
  // tesla,
  // shopify,
  sagres,
  freelance,
  social,
  school,
  threejs,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  user1,
  user2,
  user3,
  youtube,
  linkedin,
  twitter,
  github,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Work",
    link: null,
  },
  {
    id: "blog",
    title: "Blog",
    link: null,
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },

] as const;

// Services
export const SERVICES = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "DevSecOps Engineer",
    icon: mobile,
  },
  {
    title: "Mobile Developer",
    icon: creator,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Full Stack Developer",
    company_name: "Sagres S.p.A.",
    icon: sagres,
    iconBg: "#383E56",
    date: "Jul 2024 - Present",
    points: [
      "Developing enterprise web applications using PHP Laravel, React, and Vue.js frameworks.",
      "Implementing containerized solutions with Docker and Kubernetes for scalable deployments.",
      "Building secure RESTful APIs and integrating third-party services with OAuth2 and JWT authentication.",
      "Optimizing database performance and designing efficient MariaDB/MySQL schemas for high-traffic applications.",
    ],
  },
  {
    title: "Freelance Full Stack Developer",
    company_name: "Self-employed",
    icon: freelance,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Feb 2024",
    points: [
      "Delivered custom web solutions for diverse clients using modern tech stack including React.js and Laravel.",
      "Implemented responsive designs with Tailwind CSS and Bootstrap ensuring cross-browser compatibility.",
      "Managed complete project lifecycle from requirements gathering to deployment using Agile methodologies.",
      "Integrated payment gateways, email services, and developed custom admin panels with Filament v3.",
    ],
  },
  {
    title: "Social Media Manager",
    company_name: "Freelance",
    icon: social,
    iconBg: "#383E56",
    date: "Jan 2023 - Feb 2023",
    points: [
      "Managed social media presence for high-profile clients on TikTok and other platforms.",
      "Created engaging content strategies and visual graphics to enhance brand visibility.",
      "Analyzed performance metrics and optimized content for maximum audience engagement.",
      "Collaborated with clients to develop targeted campaigns aligned with business objectives.",
    ],
  },
  {
    title: "Computer Science Student",
    company_name: "I.T.I.S. Augusto Righi",
    icon: school,
    iconBg: "#E6DEDD",
    date: "Sep 2012 - Jul 2017",
    points: [
      "Achieved Bachelor's Degree in Computer Science and Telecommunications Technology with 90/100 grade.",
      "Developed strong foundation in software development, web technologies, and system architecture.",
      "Completed practical projects in full-stack development using various programming languages.",
      "Gained expertise in networking, database management, and software engineering principles.",
    ],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: user1,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: user2,
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: user3,
  },
] as const;

// Projects
export const PROJECTS = [
  {
    name: "Disney+ Clone",
    description:
      "Disney+ is one of the biggest streaming platforms used by millions of people world-wide and allows us to stream high quality content in 4k and various other formats",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: project1,
    source_code_link: "https://github.com/sanidhyy/disney-clone",
    live_site_link: "https://clonedisneyplus.web.app/",
  },
  {
    name: "Golds Gym",
    description:
      "Web application that enables users to search for fitness exercises, effective personalized positions, and recommends new exercises based on their personal preferences.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "rapidapi",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: project2,
    source_code_link: "https://github.com/sanidhyy/fitness-app",
    live_site_link: "https://fitness-gym-react.netlify.app/",
  },
  {
    name: "Shoppy",
    description:
      "The most personalised admin dashboard web application that allows enables users to choose customized themes and dark mode with different pages and variety of charts.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "syncfusion",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: project3,
    source_code_link: "https://github.com/sanidhyy/admin-dashboard",
    live_site_link: "https://shoppy-dashboard-react.netlify.app/",
  },
  {
    name: "TikTok Clone",
    description:
      "A Next JS Web Application that enables users to upload videos of any length and size, create accounts and connect with other people just like any other social media.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "pink-text-gradient",
      },
    ],
    image: project4,
    source_code_link: "https://github.com/sanidhyy/tiktok-clone",
    live_site_link: "https://tiktok-clone-react.vercel.app/",
  },
  {
    name: "Cryptoverse",
    description:
      "Best Cryptocurrency web application that allows users to view price, market cap and daily change in realtime for almost every cryptocurrency in the world.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "rapidapi",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: project5,
    source_code_link: "https://github.com/sanidhyy/crypto-app",
    live_site_link: "https://reactjscryptoapp.netlify.app/",
  },
  {
    name: "Travel Advisor",
    description:
      "Web application that enables you to view your nearby restaurants, hotels and attractions which can be sorted by ratings, price and much more.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "rapidapi",
        color: "green-text-gradient",
      },
      {
        name: "material-ui",
        color: "pink-text-gradient",
      },
    ],
    image: project6,
    source_code_link: "https://github.com/sanidhyy/travel-advisor",
    live_site_link: "https://travel-advisor-reactjs.netlify.app/",
  },
] as const;

// Blog Posts (preview cards)
export const BLOG_POSTS = [
  {
    slug: "monolith-to-microservices-laravel-react",
    title: "From Monolith to Microservices: A Practical Migration with Laravel & React",
    excerpt:
      "A pragmatic roadmap to decompose a legacy monolith into independently deployable services, without disrupting delivery.",
    date: "2025-08-10",
    read_time_min: 8,
    tags: ["architecture", "microservices", "laravel", "react", "kubernetes"],
    image: "https://picsum.photos/seed/monolith-microservices/800/450",
  },
  {
    slug: "cicd-github-actions-docker-k8s",
    title: "CI/CD for Modern Web Apps: GitHub Actions, Docker & K8s",
    excerpt:
      "Designing a robust pipeline from commit to production with build caching, preview deployments and progressive delivery.",
    date: "2025-08-08",
    read_time_min: 7,
    tags: ["ci/cd", "devops", "github-actions", "docker", "kubernetes"],
    image: "https://picsum.photos/seed/cicd-docker-k8s/800/450",
  },
  {
    slug: "security-first-patterns-full-stack-devops",
    title: "Hardening Your Stack: Security-first Patterns in Full Stack DevOps",
    excerpt:
      "Threat modeling, secrets management and minimal-privilege deployments that scale with your team.",
    date: "2025-08-06",
    read_time_min: 6,
    tags: ["security", "devsecops", "threat-modeling", "secrets"],
    image: "https://picsum.photos/seed/security-first/800/450",
  },
  {
    slug: "observability-tracing-metrics-logs",
    title: "Observability 101: Tracing, Metrics and Logs that Matter",
    excerpt:
      "From black-box to glass-box systems with actionable telemetry and SLOs.",
    date: "2025-08-05",
    read_time_min: 5,
    tags: ["observability", "otel", "sre"],
    image: "https://picsum.photos/seed/observability/800/450",
  },
  {
    slug: "react-performance-profiling",
    title: "Profiling React Apps: Rendering, Memoization and Suspense",
    excerpt:
      "Tactics to cut wasted renders and ship smoother UIs without premature optimization.",
    date: "2025-08-04",
    read_time_min: 9,
    tags: ["react", "performance", "profiling"],
    image: "https://picsum.photos/seed/react-performance/800/450",
  },
  {
    slug: "laravel-scaling-strategies",
    title: "Scaling Laravel APIs: Queues, Caching and Horizontal Sharding",
    excerpt:
      "Blueprints for resilient high-throughput backends with predictable latency.",
    date: "2025-08-03",
    read_time_min: 7,
    tags: ["laravel", "redis", "mysql"],
    image: "https://picsum.photos/seed/laravel-scaling/800/450",
  },
  {
    slug: "k8s-cost-optimization",
    title: "Kubernetes Cost Optimization: Requests, HPA and Spot Instances",
    excerpt:
      "Practical levers to reduce cloud spend while keeping SLAs intact.",
    date: "2025-08-02",
    read_time_min: 6,
    tags: ["kubernetes", "finops"],
    image: "https://picsum.photos/seed/k8s-cost/800/450",
  },
  {
    slug: "e2e-testing-strategy",
    title: "A Pragmatic E2E Testing Strategy: What to Test and Why",
    excerpt:
      "Reducing flakiness with the right pyramid, tooling and fixtures.",
    date: "2025-08-01",
    read_time_min: 8,
    tags: ["testing", "playwright", "cypress"],
    image: "https://picsum.photos/seed/e2e-testing/800/450",
  },
  {
    slug: "feature-flags-safe-releases",
    title: "Feature Flags & Safe Releases: Shipping Without Fear",
    excerpt:
      "Gate, gradually roll out and quickly roll back with confidence.",
    date: "2025-07-31",
    read_time_min: 5,
    tags: ["release", "feature-flags", "progressive-delivery"],
    image: "https://picsum.photos/seed/feature-flags/800/450",
  },
] as const;

export const SOCIALS = [
  {
    name: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/vincenzopirozzi-developer",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/sanidhyy",
  }
  // {
  //   name: "YouTube",
  //   icon: youtube,
  //   link: "todo",
  // },
  // {
  //   name: "Twitter",
  //   icon: twitter,
  //   link: "todo",
  // }
] as const;
