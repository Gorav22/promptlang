import { faReact, faJsSquare, faHtml5, faCss3Alt, faNodeJs, faPython, faGitAlt, faWordpress, faDocker } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer, faCloud } from '@fortawesome/free-solid-svg-icons';

export const portfolioData = {
  name: "[Your Name]",
  title: "Full Stack Developer",
  hobbies: ["reading sci-fi novels", "hiking", "playing guitar"],
  
  skills: [
    { name: "React", icon: faReact },
    { name: "JavaScript", icon: faJsSquare },
    { name: "HTML5", icon: faHtml5 },
    { name: "CSS3", icon: faCss3Alt },
    { name: "Node.js", icon: faNodeJs },
    { name: "Python", icon: faPython },
    { name: "SQL", icon: faDatabase },
    { name: "MongoDB", icon: faDatabase },
    { name: "Git", icon: faGitAlt },
    { name: "RESTful APIs", icon: faServer },
    { name: "AWS", icon: faCloud },
    { name: "Docker", icon: faDocker },
    { name: "WordPress", icon: faWordpress },
  ],

  experience: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovators Inc.",
      duration: "Jan 2021 - Present",
      description: [
        "Led development of scalable web applications using React, Node.js, and MongoDB.",
        "Mentored junior developers and conducted code reviews to ensure best practices.",
        "Optimized application performance, reducing load times by 20%.",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Web Solutions Co.",
      duration: "Jul 2018 - Dec 2020",
      description: [
        "Developed and maintained client websites using a MERN stack.",
        "Implemented responsive designs, ensuring cross-browser compatibility.",
        "Collaborated with design team to translate UI/UX wireframes into interactive features.",
      ],
    },
    {
      title: "Junior Web Developer",
      company: "Startup Hub",
      duration: "Jan 2017 - Jun 2018",
      description: [
        "Assisted in front-end development using HTML, CSS, and JavaScript.",
        "Learned modern web development workflows and version control with Git.",
        "Participated in daily stand-ups and contributed to agile development cycles.",
      ],
    },
  ],

  projects: [
    {
      title: "E-commerce Platform",
      description: "A full-featured online store with user authentication, product catalog, shopping cart, and payment gateway integration.",
      image: "https://via.placeholder.com/400x220/6a11cb/ffffff?text=E-commerce", // Placeholder image
      techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      githubLink: "https://github.com/yourusername/ecommerce-platform",
      liveLink: "https://ecommerce.yourdomain.com",
    },
    {
      title: "Task Management App",
      description: "A responsive web application to organize tasks, set deadlines, and track progress with drag-and-drop functionality.",
      image: "https://via.placeholder.com/400x220/2575fc/ffffff?text=Task+App",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/task-manager",
      liveLink: "https://taskmanager.yourdomain.com",
    },
    {
      title: "Portfolio Website",
      description: "My personal portfolio showcasing my projects, skills, and experience, built with a focus on modern UI/UX.",
      image: "https://via.placeholder.com/400x220/a74af4/ffffff?text=Portfolio",
      techStack: ["React", "CSS3", "Framer Motion"],
      githubLink: "https://github.com/yourusername/my-portfolio-react",
      liveLink: "https://yourportfolio.com",
    },
    {
      title: "AI Chatbot Integration",
      description: "A web application demonstrating integration with OpenAI's GPT API for interactive conversations and content generation.",
      image: "https://via.placeholder.com/400x220/00d4ff/ffffff?text=AI+Chatbot",
      techStack: ["Next.js", "Python", "Flask", "OpenAI API"],
      githubLink: "https://github.com/yourusername/ai-chatbot-app",
      liveLink: "https://chatbot.yourdomain.com",
    },
    {
      title: "Recipe Finder",
      description: "Search for recipes based on ingredients, dietary preferences, and cuisines, powered by a third-party API.",
      image: "https://via.placeholder.com/400x220/00c6ff/ffffff?text=Recipe+Finder",
      techStack: ["React", "External API", "Sass"],
      githubLink: "https://github.com/yourusername/recipe-finder",
      liveLink: "https://recipes.yourdomain.com",
    },
  ],
};
