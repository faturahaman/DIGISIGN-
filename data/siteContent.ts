export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  color: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  icon: string;
}

export interface ClientItem {
  name: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export const SITE_BRAND = {
  name: "Arvion Creative",
  legalName: "Arvion Creative Studio",
  tagline: "Ideas into Impact.",
  badge: "CREATIVE DIGITAL STUDIO",
  subtitle: "WE DESIGN. WE BUILD. WE CREATE.",
  description:
    "Arvion Creative helps brands grow through strategic digital experiences, strong visuals, and creative solutions designed to deliver meaningful results.",
  email: "hello@arvioncreative.com",
  phone: "+62 859-2436-1892",
  phoneRaw: "6285924361892",
  location: "Jakarta & Bogor, Indonesia",
  availability: "Available for new projects",
  logoUrl: "/images/arvion-logo.png",
};

export const HERO_STATS = [
  { value: "06+", label: "Years Experience" },
  { value: "80+", label: "Projects Completed" },
  { value: "45+", label: "Happy Clients" },
];

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "fintrack",
    name: "FinTrack Dashboard",
    category: "Dashboard Design",
    description: "Real-time fintech telemetry & analytics platform with predictive cashflow insights.",
    image: "/portfolio-img/fintrack.png",
    tags: ["UI/UX", "Dashboard", "Fintech"],
    link: "#contact",
    color: "#F47721",
  },
  {
    id: "luxora",
    name: "Luxora Interiors",
    category: "Website Design",
    description: "High-end bespoke architectural interior showcase with immersive editorial layout.",
    image: "/portfolio-img/luxora.png",
    tags: ["Web Design", "Architecture", "Luxury"],
    link: "#contact",
    color: "#FF9B4A",
  },
  {
    id: "movefit",
    name: "MoveFit App",
    category: "Mobile App Design",
    description: "Adaptive fitness companion with smart workout pacing and biometric tracking.",
    image: "/portfolio-img/movefit.png",
    tags: ["Mobile App", "iOS & Android", "Health"],
    link: "#contact",
    color: "#171A22",
  },
  {
    id: "nova-ecommerce",
    name: "Nova E-Commerce",
    category: "Website Design",
    description: "Modern direct-to-consumer lifestyle commerce platform built for high conversions.",
    image: "/portfolio-img/nova.png",
    tags: ["E-Commerce", "Next.js", "Branding"],
    link: "#contact",
    color: "#F47721",
  },
];

export const SERVICES_LIST: Service[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Intuitive, human-centered interfaces designed with meticulous wireframes, user testing, and scalable design systems.",
    iconName: "Layout",
    details: ["User Flow & Wireframing", "Interactive Prototypes", "Design Systems & Tokens"],
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Blazing fast, SEO-optimized, and responsive web applications built with modern frameworks and clean architecture.",
    iconName: "Code2",
    details: ["Next.js & React Apps", "High-Performance APIs", "Tailwind CSS Styling"],
  },
  {
    id: "mobile-app",
    title: "Mobile App Design",
    description: "Engaging iOS and Android mobile app experiences with native gestures, micro-interactions, and refined layouts.",
    iconName: "Smartphone",
    details: ["Cross-Platform UI", "Micro-Interactions", "App Store Guidelines"],
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Distinct visual identities that tell your unique story—including logos, color palettes, guidelines, and collateral.",
    iconName: "Palette",
    details: ["Logo & Visual Identity", "Brand Guidelines Book", "Social & Marketing Assets"],
  },
  {
    id: "strategy",
    title: "Creative Strategy",
    description: "Transformative digital roadmaps connecting brand narrative with measurable customer growth and market positioning.",
    iconName: "Compass",
    details: ["Brand Positioning", "Conversion Optimization", "Content Direction"],
  },
];

export const TOOLS_LIST: ToolItem[] = [
  { name: "Figma", category: "UI/UX Design", icon: "figma" },
  { name: "Adobe XD", category: "Prototyping", icon: "adobexd" },
  { name: "Sketch", category: "Vector Design", icon: "sketch" },
  { name: "Photoshop", category: "Image Editing", icon: "photoshop" },
  { name: "Illustrator", category: "Vector Graphics", icon: "illustrator" },
  { name: "Webflow", category: "Visual Dev", icon: "webflow" },
  { name: "HTML5", category: "Semantic Markup", icon: "html5" },
  { name: "CSS3", category: "Modern Styling", icon: "css3" },
  { name: "JavaScript", category: "Interaction Logic", icon: "javascript" },
];

export const CLIENTS_LIST: ClientItem[] = [
  { name: "APEX STUDIO", label: "Creative Media" },
  { name: "VANGUARD LABS", label: "AI & Tech" },
  { name: "KINETIX VENTURES", label: "Capital" },
  { name: "LUMIO HEALTH", label: "Biotech" },
  { name: "AETHEL GROUP", label: "Architecture" },
  { name: "SYMPHONY COMMERCE", label: "Retail & DTC" },
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    quote:
      "Arvion transformed our digital identity completely. Their attention to detail, sleek design aesthetic, and proactive communication made our product relaunch effortless and high-impact.",
    name: "Michael Thorne",
    position: "Founder & CEO",
    company: "FinTrack Technologies",
    avatar: "MT",
    rating: 5,
  },
  {
    quote:
      "The team at Arvion delivered a web experience that exceeded every metric. Our user engagement jumped significantly and customer inquiries increased by 42% within the first month.",
    name: "Sarah Alamsyah",
    position: "Head of Product",
    company: "Luxora Living",
    avatar: "SA",
    rating: 5,
  },
  {
    quote:
      "Exceptional execution from initial concept to deployment. Arvion combines deep strategic understanding with world-class craft and modern engineering. Truly a partner we rely on.",
    name: "David Tan",
    position: "Managing Director",
    company: "Nova Group",
    avatar: "DT",
    rating: 5,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    number: "01",
    title: "Discover",
    description: "Deep dive into your business goals, target audience, competitive landscape, and specific project requirements.",
    deliverable: "Strategic Brief & Project Scope",
  },
  {
    step: "02",
    number: "02",
    title: "Design",
    description: "Crafting wireframes, aesthetic visual directions, design systems, and interactive prototypes tailored to your brand.",
    deliverable: "High-Fidelity Prototype & UI Kit",
  },
  {
    step: "03",
    number: "03",
    title: "Develop",
    description: "Transforming approved designs into clean, responsive, fast, and accessible digital code using modern technologies.",
    deliverable: "Production Code & Staging Preview",
  },
  {
    step: "04",
    number: "04",
    title: "Deliver",
    description: "Rigorous quality assurance, cross-device testing, performance audits, and smooth deployment followed by handover.",
    deliverable: "Live Launch & Documentation",
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/arvioncreative", icon: "Instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/arvioncreative", icon: "Linkedin" },
  { label: "Twitter", href: "https://twitter.com/arvioncreative", icon: "Twitter" },
  { label: "Dribbble", href: "https://dribbble.com/arvioncreative", icon: "Dribbble" },
  { label: "GitHub", href: "https://github.com/arvioncreative", icon: "Github" },
];
