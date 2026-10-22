// Edit this file to update the portfolio.
// Photos: put your portrait at src/assets/photo.jpg and optional project
// screenshots at src/assets/projects/<slug>.jpg (slugs are listed below).

export const profile = {
  name: "Mohammad Sohel",
  role: "Full stack developer",
  location: "Hyderabad, India",
  email: "sohelmohammad8143@gmail.com",
  phone: "+91-8143724456",
  linkedinLabel: "Sohel Mohammad",
  linkedinUrl: "https://www.linkedin.com/in/sohel-mohammad-84a966222", // e.g. "https://www.linkedin.com/in/your-handle"
  githubUrl: "https://github.com/Sohel1811", // e.g. "https://github.com/your-handle"
  lede:
    "I build full-stack web apps with React, TypeScript and Node.js, and add LLM features on Google Cloud Vertex AI. Four years on enterprise products for Verizon and Telefónica.",
  about: [
    "I'm a Full Stack Developer who has spent four years shipping production features in globally distributed Agile teams. My core stack is React.js, Redux Toolkit, TypeScript, Node.js and Express.js, backed by MongoDB and MySQL.",
    "Lately I've been working on applied AI: designing an LLM-powered support chatbot on Google Cloud Vertex AI, and using GitHub Copilot and Claude to scaffold components, review code and debug faster.",
  ],
  openTo: ["Hyderabad", "Bengaluru", "Pune"],
};

export const results = [
  { value: "40%", label: "less duplicated code" },
  { value: "1.5s", label: "faster Largest Contentful Paint" },
  { value: "20%", label: "fewer post-release defects" },
  { value: "99%", label: "high-priority tickets resolved each sprint" },
];

export const job = {
  title: "Full Stack Developer, Tech Mahindra",
  meta: "Nov 2021 to Oct 2025 · Hyderabad, India",
  clients: [
    {
      name: "Verizon, USA · TESS (Third-Party Sourcing & Contracts System)",
      groups: [
        {
          label: "Features and APIs",
          points: [
            "Built features across the TESS stack with React.js and Node.js, covering supplier sourcing, bidding and contract approvals.",
            "Built REST APIs with Node.js and Express.js connecting the React frontend, the database services and the chatbot.",
            "Tested and validated APIs with Swagger and Postman, and fixed SQL defects (INSERT, UPDATE, DELETE) to protect data integrity.",
            "Built responsive HTML5 and CSS3 interfaces for both internal teams and external suppliers.",
          ],
        },
        {
          label: "Frontend quality",
          points: [
            "Created a reusable React component library of 5+ components, cutting code duplication by 40%.",
            "Managed application state with Redux and Redux Toolkit to keep data in sync across connected interfaces.",
            "Migrated a legacy frontend to TypeScript, reducing post-release defects by 20%.",
            "Improved Core Web Vitals on key pages, lowering Largest Contentful Paint by 1.5 seconds through lazy loading and image compression.",
          ],
        },
        {
          label: "Generative AI",
          points: [
            "Designed and integrated an LLM-powered support chatbot on Google Cloud Vertex AI so suppliers and internal users can resolve questions in natural language, reducing manual support effort.",
          ],
        },
        {
          label: "Team and delivery",
          points: [
            "Worked in a 10-person Agile team split across 4 onsite and 6 offshore members, using Jira for backlog, prioritization and sprint tracking.",
            "Kept a 99% resolution rate on high-priority Jira tickets each sprint while delivering new features.",
          ],
        },
      ],
    },
    {
      name: "Telefónica, SA · Telecommunication Application",
      groups: [
        {
          label: "",
          points: [
            "Built and maintained full-stack features in an Agile team, using Node.js for backend services and a type-safe, component-based frontend.",
            "Kept frontend and backend microservices consistent through type-safe contracts, improving API reliability and reducing integration defects.",
          ],
        },
      ],
    },
  ],
};

export const projects = [
  {
    slug: "support-chatbot",
    title: "AI Customer Support Chatbot",
    text: "An LLM chatbot on Google Cloud Vertex AI with a Node.js backend. It answers natural-language questions using designed conversation flows and prompt logic for common support cases.",
    tags: ["Vertex AI", "Node.js", "Prompt design"],
    code: "", // add repo URL
    demo: "", // add live URL
  },
  {
    slug: "skill-passport",
    title: "Skill Passport",
    text: "A platform for tracking student skill progression in an organization. It has role-based access for administrators, trainers and students, plus performance dashboards and feedback APIs.",
    tags: ["React", "Express", "MongoDB", "Role-based access"],
    code: "",
    demo: "",
  },
  {
    slug: "transport-app",
    title: "Transport Web App",
    text: "A vehicle rental booking app where users browse, pick and reserve vehicles by the hour or day, backed by a real-time availability API.",
    tags: ["React", "Node.js", "MongoDB"],
    code: "",
    demo: "",
  },
];

export const skills = [
  ["Frontend", "React.js, Redux Toolkit, TypeScript, JavaScript (ES6+), HTML5, CSS3, Responsive Design"],
  ["Backend", "Node.js, Express.js, Java, REST APIs, Microservices"],
  ["Databases", "MongoDB, MySQL, SQL"],
  ["Generative AI", "Google Cloud Vertex AI, LLM integration, Prompt engineering"],
  ["AI-assisted dev", "GitHub Copilot, Claude"],
  ["Tools and cloud", "Git, Postman, Swagger, Jira, Figma, Google Cloud, Azure"],
  ["Practices", "Agile/Scrum, Sprint planning, Core Web Vitals, Performance tuning"],
];

export const education = [
  {
    title: "Bachelor of Engineering",
    text: "Muffakham Jah College of Engineering & Technology, Hyderabad",
    when: "2015 to 2018",
  },
  {
    title: "Diploma in Engineering",
    text: "JN Govt Polytechnic, Ramanthapur, Hyderabad",
    when: "2012 to 2015",
  },
  {
    title: "Microsoft Azure Fundamentals",
    text: "AZ-900 certification",
    when: "",
  },
];

export const recognition = [
  {
    title: "Pat on the Back Award",
    text: "Tech Mahindra, for outstanding contributions to full-stack project delivery and team performance.",
  },
  {
    title: "Client recognition",
    text: "Verizon USA, for meeting Agile sprint commitments and delivering core features ahead of key deadlines.",
  },
];
