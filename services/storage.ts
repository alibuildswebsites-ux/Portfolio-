import { Project, Testimonial, ContactSubmission, User } from '../types';

// Initial Data Seeding
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization.',
    technologies: ['React', 'D3.js', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#',
    thumbnailUrl: 'https://picsum.photos/800/450?random=1',
    category: 'Web Development',
    dateCompleted: '2023-11-15',
    isVisible: true
  },
  {
    id: '2',
    title: 'Pixel Art Editor',
    description: 'Browser-based tool for creating 8-bit art assets with export functionality.',
    technologies: ['TypeScript', 'Canvas API', 'React'],
    demoUrl: '#',
    thumbnailUrl: 'https://picsum.photos/800/450?random=2',
    category: 'Web Development',
    dateCompleted: '2024-01-20',
    isVisible: true
  },
  {
    id: '3',
    title: 'FinTech Landing Page',
    description: 'High-conversion landing page design for a fintech startup.',
    technologies: ['Figma', 'Next.js', 'Framer Motion'],
    demoUrl: '#',
    thumbnailUrl: 'https://picsum.photos/800/450?random=3',
    category: 'UI Design',
    dateCompleted: '2024-03-10',
    isVisible: true
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    companyName: 'TechFlow Solutions',
    text: 'Raza transformed our outdated site into a conversion machine. The new design is clean, fast, and exactly what we needed.',
    rating: 5,
    dateReceived: '2024-02-15',
    isVisible: true,
    isFeatured: true
  },
  {
    id: '2',
    clientName: 'Mike Ross',
    companyName: 'StartUp Inc',
    text: 'Exceptional attention to detail. Raza delivered the project ahead of schedule and the code quality was top notch.',
    rating: 5,
    dateReceived: '2024-01-10',
    isVisible: true,
    isFeatured: true
  }
];

const DEFAULT_USER: User = {
  username: 'admin',
  passwordHash: 'admin123', 
  lastLogin: new Date().toISOString()
};

const KEYS = {
  PROJECTS: 'raza_portfolio_projects',
  TESTIMONIALS: 'raza_portfolio_testimonials',
  MESSAGES: 'raza_portfolio_messages',
  USER: 'raza_portfolio_user',
  SESSION: 'raza_portfolio_session'
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get or initialize data
const getStoredData = <T>(key: string, initialValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  return JSON.parse(data);
};

// --- Projects ---
export const getProjects = async (): Promise<Project[]> => {
  return getStoredData(KEYS.PROJECTS, INITIAL_PROJECTS);
};

export const saveProject = async (project: Project): Promise<void> => {
  await delay(500);
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push({ ...project, id: Date.now().toString() });
  }
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
};

export const deleteProject = async (id: string): Promise<void> => {
  await delay(500);
  const projects = await getProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(filtered));
};

// --- Testimonials ---
export const getTestimonials = async (): Promise<Testimonial[]> => {
  return getStoredData(KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
};

export const saveTestimonial = async (item: Testimonial): Promise<void> => {
  await delay(500);
  const list = await getTestimonials();
  const index = list.findIndex(p => p.id === item.id);
  
  if (index >= 0) {
    list[index] = item;
  } else {
    list.push({ ...item, id: Date.now().toString() });
  }
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(list));
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await delay(500);
  const list = await getTestimonials();
  const filtered = list.filter(p => p.id !== id);
  localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(filtered));
};

// --- Messages ---
export const getMessages = async (): Promise<ContactSubmission[]> => {
  const data = localStorage.getItem(KEYS.MESSAGES);
  return data ? JSON.parse(data) : [];
};

export const saveMessage = async (msg: Omit<ContactSubmission, 'id' | 'status' | 'submittedAt'>): Promise<void> => {
  await delay(800);
  const messages = await getMessages();
  const newMsg: ContactSubmission = {
    ...msg,
    id: Date.now().toString(),
    status: 'unread',
    submittedAt: new Date().toISOString()
  };
  messages.unshift(newMsg);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
};

export const markMessageRead = async (id: string): Promise<void> => {
  const messages = await getMessages();
  const updated = messages.map(m => m.id === id ? { ...m, status: 'read' as const } : m);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(updated));
};

export const deleteMessage = async (id: string): Promise<void> => {
  await delay(500);
  const messages = await getMessages();
  const filtered = messages.filter(m => m.id !== id);
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(filtered));
};

// --- Auth ---
export const getUser = (): User => {
  return getStoredData(KEYS.USER, DEFAULT_USER);
};

export const updateUser = async (updates: Partial<User>): Promise<void> => {
  await delay(500);
  const current = getUser();
  const updated = { ...current, ...updates };
  localStorage.setItem(KEYS.USER, JSON.stringify(updated));
};

export const setSession = (isActive: boolean) => {
  if (isActive) {
    localStorage.setItem(KEYS.SESSION, 'active');
    updateUser({ lastLogin: new Date().toISOString() });
  } else {
    localStorage.removeItem(KEYS.SESSION);
  }
};

export const checkSession = (): boolean => {
  return localStorage.getItem(KEYS.SESSION) === 'active';
};