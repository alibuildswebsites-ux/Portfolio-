
import { supabase } from './supabaseClient';

export const seedDatabase = async () => {
  console.log("Starting seed...");
  
  // 1. Projects Data
  const projects = [
    {
      title: "Retro Pixel Shop",
      description: "A full-stack e-commerce platform with a retro 8-bit aesthetic. Features a custom cart, Stripe integration, and user authentication.",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      category: "Web Development",
      date_completed: new Date().toISOString(),
      is_visible: true
    },
    {
      title: "DataViz Dashboard",
      description: "Interactive analytics dashboard visualizing global climate trends using D3.js and Python backend processing.",
      technologies: ["Python", "Pandas", "D3.js", "Flask"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      category: "Data Science",
      date_completed: new Date().toISOString(),
      is_visible: true
    },
    {
      title: "Neon Mobile App",
      description: "A productivity task manager with a cyberpunk neon theme, built with React Native for iOS and Android.",
      technologies: ["React Native", "Firebase", "Redux"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      thumbnail_url: "https://images.unsplash.com/photo-1555421689-4922cd29c5da?auto=format&fit=crop&q=80&w=800",
      category: "Mobile App",
      date_completed: new Date().toISOString(),
      is_visible: true
    }
  ];

  // 2. Testimonials Data
  const testimonials = [
    {
      client_name: "Sarah Jenkins",
      company_name: "TechNova Inc.",
      text: "Raza transformed our outdated site into a modern, high-converting masterpiece. The pixel art theme was a bold choice that paid off immensely!",
      rating: 5,
      date_received: new Date().toISOString(),
      is_visible: true,
      is_featured: true
    },
    {
      client_name: "Mike Chen",
      company_name: "StartUp Flow",
      text: "Incredible attention to detail. The backend integration was seamless, and the project was delivered ahead of schedule.",
      rating: 5,
      date_received: new Date().toISOString(),
      is_visible: true,
      is_featured: false
    },
    {
      client_name: "Emily Davis",
      company_name: "Creative Studios",
      text: "A true professional. Raza understood our vision immediately and executed it with precision. Highly recommended for any web dev needs.",
      rating: 5,
      date_received: new Date().toISOString(),
      is_visible: true,
      is_featured: false
    }
  ];

  // Insert Projects
  const { error: pError } = await supabase.from('projects').insert(projects);
  if (pError) throw new Error("Projects Error: " + pError.message);

  // Insert Testimonials
  const { error: tError } = await supabase.from('testimonials').insert(testimonials);
  if (tError) throw new Error("Testimonials Error: " + tError.message);

  return true;
};
