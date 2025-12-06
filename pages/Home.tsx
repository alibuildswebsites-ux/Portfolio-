
import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import PixelButton from '../components/ui/PixelButton';
import Footer from '../components/layout/Footer';
import { 
  Github, Linkedin, ExternalLink, Code, 
  Briefcase, Star, Send, ArrowRight, ArrowLeft
} from 'lucide-react';
import * as db from '../services/storage';
import { Project, Testimonial } from '../types';

// --- COMPONENTS ---

// 1. Enhanced Particle Background System (Optimized for Mobile)
const ParticleBackground = memo(() => {
  // Use lazy state initialization to prevent flicker on reload
  // REDUCED COUNT: Dropped from 35 to 15 to prevent iOS WebKit memory crashes
  const [particles] = useState(() => {
    const colors = ['bg-pastel-blue', 'bg-pastel-lavender', 'bg-pastel-mint', 'bg-pastel-peach'];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.floor(Math.random() * 3 + 2) * 4, // Slightly restricted size
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 20, // Slower, calmer animation
      delay: Math.random() * 10,
      xDrift: (Math.random() - 0.5) * 30
    }));
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.x}vw`, 
            y: "110vh", 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            y: "-10vh", 
            x: `${p.x + p.xDrift}vw`,
            opacity: [0, 0.4, 0.8, 0.4, 0],
            rotate: p.xDrift > 0 ? 90 : -90
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: p.delay,
          }}
          // REMOVED: will-change-transform (Causes excessive memory usage on iOS)
          className={`absolute ${p.color} border-2 border-pastel-charcoal/10 shadow-sm`}
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
});

// 2. Typewriter Effect (Optimized)
const Typewriter = memo(({ text, delay = 50 }: { text: string, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="inline-block break-words min-h-[80px] leading-snug">
      {currentText}
      <span className="animate-pulse inline-block w-[2px] h-[1em] bg-pastel-charcoal ml-1 align-middle"></span>
    </span>
  );
});

// Section Wrapper
const Section: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = '' }) => (
  <section id={id} className={`py-16 md:py-32 px-4 relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      {children}
    </div>
  </section>
);

// Pixel Art Cloud Component
const PixelCloud = memo(({ size = "w-32", className = "", duration = 25, delay = 0, top = "10%" }: { size?: string, className?: string, duration?: number, delay?: number, top?: string }) => (
  <motion.div
    initial={{ x: "-20vw" }}
    animate={{ x: "110vw" }}
    transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    className={`absolute z-0 ${size} ${className}`}
    style={{ top }}
  >
    <svg viewBox="0 0 20 10" className="w-full h-full pixel-antialiased text-pastel-blue" shapeRendering="crispEdges">
       {/* Shadow */}
       <path d="M6 10h10v1H4v-4h2v3zm12-4h1v4h-3v-1h2v-3z" fill="currentColor" className="text-pastel-charcoal opacity-20" />
       {/* Border */}
       <path d="M6 0h8v1h3v3h3v6H0V4h3V1h3V0zm0 1v3H3v1H1v4h18V5h-2V4h-3V1H6z" fill="#4A4A4A" /> 
       {/* Fill */}
       <rect x="1" y="5" width="18" height="4" fill="currentColor" />
       <rect x="3" y="2" width="14" height="3" fill="currentColor" />
       <rect x="6" y="1" width="8" height="1" fill="currentColor" />
    </svg>
  </motion.div>
));

// Pixel Sun Component
const PixelSun = memo(() => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    className="absolute top-10 right-10 w-16 h-16 md:w-24 md:h-24 z-0 hidden sm:block opacity-80"
  >
    <svg viewBox="0 0 24 24" className="w-full h-full pixel-antialiased">
       <rect x="8" y="8" width="8" height="8" fill="#FFB5A7" />
       <rect x="8" y="6" width="8" height="2" fill="#FFB5A7" />
       <rect x="8" y="16" width="8" height="2" fill="#FFB5A7" />
       <rect x="6" y="8" width="2" height="8" fill="#FFB5A7" />
       <rect x="16" y="8" width="2" height="8" fill="#FFB5A7" />
       {/* Rays */}
       <rect x="11" y="2" width="2" height="3" fill="#FFB5A7" />
       <rect x="11" y="19" width="2" height="3" fill="#FFB5A7" />
       <rect x="2" y="11" width="3" height="2" fill="#FFB5A7" />
       <rect x="19" y="11" width="3" height="2" fill="#FFB5A7" />
    </svg>
  </motion.div>
));

// High Quality Pixel Art Monkey Avatar
const PixelComputerAvatar = memo(() => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 shrink-0 max-w-full">
      {/* Floating Status Window - Offset optimized for alignment */}
      <motion.div
        initial={{ y: 5 }}
        animate={{ y: -5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        className="absolute -top-10 right-12 sm:-top-16 sm:right-24 z-20 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
         <div className="bg-white border-2 border-pastel-charcoal shadow-pixel-lg w-36 sm:w-48 p-4 sm:p-5">
            {/* Title Bar */}
            <div className="bg-pastel-lavender border-b-2 border-pastel-charcoal px-2 py-1 flex justify-between items-center h-5 sm:h-6 absolute top-0 left-0 w-full">
               <span className="font-pixel text-[10px] sm:text-xs text-pastel-charcoal">System.exe</span>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pastel-charcoal"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pastel-charcoal opacity-50"></div>
               </div>
            </div>
            {/* Content */}
            <div className="mt-2 sm:mt-3 flex items-center gap-2">
               <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse border border-pastel-charcoal"></div>
               <span className="font-pixel text-xs sm:text-sm md:text-base font-bold text-pastel-charcoal whitespace-nowrap">
                  Open for Work!
               </span>
            </div>
         </div>
      </motion.div>

      <svg viewBox="0 0 64 64" className="w-full h-full pixel-antialiased drop-shadow-xl" shapeRendering="crispEdges">
        {/* Floor Shadow */}
        <ellipse cx="32" cy="58" rx="24" ry="4" fill="#000" opacity="0.1" />

        {/* --- MONKEY TAIL --- */}
        <motion.path 
          d="M20 50 Q 15 50 15 45 Q 15 40 12 42" 
          stroke="#5D4037" strokeWidth="2" fill="none"
          animate={{ d: [
            "M20 50 Q 15 50 15 45 Q 15 40 12 42", 
            "M20 50 Q 14 52 14 47 Q 14 42 11 44", 
            "M20 50 Q 15 50 15 45 Q 15 40 12 42"
          ] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* --- MONKEY CHARACTER --- */}

        {/* Body (Hoodie) */}
        <rect x="24" y="40" width="16" height="14" fill="#A8DAFF" />
        <rect x="24" y="40" width="16" height="2" fill="#81D4FA" opacity="0.6" /> {/* Shoulder highlight */}
        
        {/* Head Construction */}
        <g transform="translate(0, 0)">
           {/* Ears */}
           <rect x="18" y="26" width="4" height="6" fill="#5D4037" /> {/* Left Ear Dark */}
           <rect x="19" y="27" width="2" height="4" fill="#D7CCC8" /> {/* Left Ear Inner */}
           
           <rect x="42" y="26" width="4" height="6" fill="#5D4037" /> {/* Right Ear Dark */}
           <rect x="43" y="27" width="2" height="4" fill="#D7CCC8" /> {/* Right Ear Inner */}

           {/* Main Head Shape */}
           <rect x="22" y="20" width="20" height="18" fill="#795548" /> {/* Brown Fur */}
           <rect x="22" y="20" width="20" height="2" fill="#8D6E63" /> {/* Top Highlight */}
           
           {/* Face Mask (Beige) */}
           <path d="M24 26 H40 V36 H36 V38 H28 V36 H24 Z" fill="#EFEBE9" />
           <rect x="30" y="26" width="4" height="2" fill="#795548" /> {/* Widow's peak */}

           {/* Eyes (Blinking) */}
           <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1], repeatDelay: 3 }}>
              <rect x="27" y="29" width="2" height="2" fill="#2D2D2D" />
              <rect x="35" y="29" width="2" height="2" fill="#2D2D2D" />
           </motion.g>

           {/* Snout & Mouth */}
           <rect x="29" y="32" width="6" height="3" fill="#D7CCC8" /> {/* Snout Base */}
           <rect x="31" y="33" width="2" height="1" fill="#4E342E" /> {/* Nose */}
           <rect x="30" y="35" width="4" height="1" fill="#4E342E" opacity="0.4" /> {/* Mouth Smile */}
        </g>

        {/* Typing Arms (Animation) */}
        <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.15, repeat: Infinity }}>
           <rect x="20" y="44" width="4" height="8" fill="#A8DAFF" /> {/* Sleeve L */}
           <rect x="20" y="52" width="4" height="2" fill="#795548" /> {/* Paw L */}
        </motion.g>
        <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.15, repeat: Infinity, delay: 0.07 }}>
           <rect x="40" y="44" width="4" height="8" fill="#A8DAFF" /> {/* Sleeve R */}
           <rect x="40" y="52" width="4" height="2" fill="#795548" /> {/* Paw R */}
        </motion.g>

        {/* --- COMPUTER SETUP --- */}

        {/* Desk */}
        <rect x="8" y="54" width="48" height="2" fill="#8D6E63" /> {/* Desk Top */}
        <rect x="10" y="56" width="4" height="8" fill="#6D4C41" /> {/* Leg L */}
        <rect x="50" y="56" width="4" height="8" fill="#6D4C41" /> {/* Leg R */}

        {/* Laptop */}
        <rect x="22" y="52" width="20" height="2" fill="#424242" /> {/* Base */}
        <rect x="23" y="40" width="18" height="12" fill="#616161" /> {/* Bezel */}
        <rect x="24" y="41" width="16" height="10" fill="#2D2D2D" /> {/* Screen */}

        {/* Code Animation on Laptop */}
        <motion.rect x="25" y="43" width="8" height="1" fill="#00E676" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
        <motion.rect x="25" y="45" width="12" height="1" fill="#29B6F6" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.1 }} />
        <motion.rect x="25" y="47" width="10" height="1" fill="#FFCA28" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />

        {/* Pixel Banana (Snack) */}
        <g transform="translate(48, 48)">
           <path d="M0 4 Q 3 4 5 1" stroke="#FFEB3B" strokeWidth="2" fill="none" strokeLinecap="square" />
           <rect x="0" y="4" width="1" height="1" fill="#795548" /> {/* Stem */}
        </g>

      </svg>
    </div>
  );
});

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState('All');
  
  // Testimonial State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const loadData = async () => {
      const p = await db.getProjects();
      const t = await db.getTestimonials();
      setProjects(p.filter(x => x.isVisible));
      setTestimonials(t.filter(x => x.isVisible));
    };
    loadData();
  }, []);

  // Filter Logic - Memoized
  const categories = React.useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
  const filteredProjects = React.useMemo(() => filter === 'All' ? projects : projects.filter(p => p.category === filter), [filter, projects]);

  // Testimonial Logic
  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Autoplay Testimonials
  useEffect(() => {
    if (testimonials.length > 0 && !isTestimonialPaused) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 6000); 
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isTestimonialPaused]);

  // Contact Handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await db.saveMessage(contactForm);
      setFormStatus('success');
      setContactForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const cardVariants = {
    initial: { opacity: 0, x: 20, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-pastel-cream font-sans text-pastel-charcoal selection:bg-pastel-lavender overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden border-b-4 border-pastel-charcoal bg-[#E0F7FA]/30">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Particle System */}
          <ParticleBackground />

          {/* Sky Elements */}
          <PixelSun />
          {/* Distributed Clouds - Spaced out more naturally */}
          <PixelCloud top="5%" size="w-24 md:w-48" duration={60} delay={0} className="opacity-80" />
          <PixelCloud top="15%" size="w-16 md:w-32" duration={45} delay={20} className="opacity-60" />
          <PixelCloud top="45%" size="w-32 md:w-56" duration={70} delay={10} className="opacity-40" />
          <PixelCloud top="70%" size="w-20 md:w-36" duration={50} delay={30} className="opacity-50" />
          
          {/* Floating Geometric Particles - Kept as large focus elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-4 h-4 bg-pastel-blue border border-pastel-charcoal"
          />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white opacity-40 rounded-full blur-3xl z-[-1]" 
          />
        </div>

        <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left relative order-1 md:order-none"
          >
            <h1 className="font-pixel text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 leading-tight">
              Hi, I'm <span className="text-pastel-blue bg-pastel-charcoal px-2 shadow-pixel inline-block transform hover:scale-105 transition-transform mt-2 md:mt-0">Raza A.</span>
            </h1>
            <div className="font-mono text-base sm:text-xl md:text-2xl mb-8 min-h-[60px] md:min-h-[60px] border-l-4 border-pastel-blue pl-4 py-2 bg-white/50 backdrop-blur-sm rounded-r-lg text-left mx-auto md:mx-0 max-w-lg md:max-w-none">
              <Typewriter text="I help small and medium sized businesses establish a strong online presence digitally." delay={20} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <PixelButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})} size="lg">
                View My Projects
              </PixelButton>
              <PixelButton onClick={() => window.open('https://calendly.com/alibuildswebsites/30min', '_blank')} variant="secondary" size="lg">
                Start a Project
              </PixelButton>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mt-4 md:mt-0 order-first md:order-none"
          >
             <PixelComputerAvatar />
          </motion.div>
        </div>
      </div>

      {/* --- ABOUT ME --- */}
      <Section id="about" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-pixel text-3xl sm:text-4xl mb-6 flex items-center gap-3">
              <span className="w-3 h-8 sm:h-10 bg-pastel-peach border-2 border-pastel-charcoal"></span>
              About Me
            </h2>
            <div className="prose prose-lg text-pastel-charcoal space-y-4 font-medium text-base sm:text-lg">
              <p>Hi, nice to see you here. I'm Raza A.</p>
              <p>For the past few years, I've been helping businesses turn their outdated or underperforming websites into something that actually works for them. If you're frustrated by low conversions or worried about standing out in a crowded market, I get it. I've been there helping others bridge that gap.</p>
              <p>I'm currently pursuing my career in data science, and creating digital experiences that blend clean, intuitive design with smart development.</p>
              <p className="font-bold">Let's chat about building solutions that sets you apart.</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://linkedin.com/in/alibuildswebsites" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-2 border-pastel-charcoal px-4 py-2 hover:bg-pastel-blue transition-colors shadow-pixel-sm">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {[
              { label: 'Years Exp', value: '5+', icon: <Briefcase /> },
              { label: 'Projects', value: '20+', icon: <Code /> },
              { label: 'Satisfaction', value: '100%', icon: <Star /> },
              { label: 'Availability', value: 'Project', icon: <Briefcase /> }
            ].map((stat, idx) => (
              <div key={idx} className="bg-pastel-cream border-2 border-pastel-charcoal p-3 sm:p-6 shadow-pixel hover:translate-y-[-4px] transition-transform">
                <div className="mb-2 text-pastel-blue scale-75 sm:scale-100 origin-left">{stat.icon}</div>
                <div className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-1">{stat.value}</div>
                <div className="text-[10px] sm:text-sm font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* --- PROJECTS --- */}
      <Section id="projects" className="bg-white border-t-4 border-pastel-charcoal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="font-pixel text-3xl sm:text-4xl mb-2 sm:mb-4">My Projects</h2>
            <p className="text-base sm:text-lg">Selected works demonstrating value and functionality.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
             {categories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setFilter(cat)}
                 className={`font-pixel px-3 py-1 border-2 border-pastel-charcoal text-sm transition-all grow md:grow-0 ${filter === cat ? 'bg-pastel-blue shadow-pixel' : 'bg-white hover:bg-pastel-gray'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
             filteredProjects.map((project, index) => (
               <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.2)" }}
                  className="bg-white border-2 border-pastel-charcoal p-6 shadow-pixel relative group flex flex-col h-full"
               >
                  <div className="absolute -top-4 -right-4 bg-pastel-blue border-2 border-pastel-charcoal p-2 shadow-sm z-20 group-hover:rotate-12 transition-transform">
                      <Code size={20} className="text-pastel-charcoal" />
                  </div>

                  <div className="mb-4">
                     <span className="font-pixel text-xs bg-pastel-lavender/50 border border-pastel-charcoal px-2 py-1 shadow-sm uppercase tracking-wide inline-block">
                        {project.category}
                     </span>
                  </div>

                  <h3 className="font-pixel text-2xl mb-3 group-hover:text-pastel-blue transition-colors">
                      {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-sans text-sm flex-grow">
                     {project.description}
                  </p>

                  <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map(t => (
                              <span key={t} className="text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-50 px-2 py-1 border border-gray-200">
                                 {t}
                              </span>
                          ))}
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                           <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex-1 text-center bg-pastel-charcoal text-white font-pixel py-2 border-2 border-transparent hover:bg-pastel-blue hover:text-pastel-charcoal hover:border-pastel-charcoal transition-all shadow-sm flex items-center justify-center gap-2 text-sm">
                              <ExternalLink size={16} /> Live Demo
                           </a>
                           {project.githubUrl && (
                               <a href={project.githubUrl} target="_blank" rel="noreferrer" className="px-3 flex items-center justify-center border-2 border-pastel-charcoal hover:bg-gray-100 transition-colors shadow-sm" title="View Code">
                                  <Github size={18} />
                               </a>
                           )}
                      </div>
                  </div>
               </motion.div>
             ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50 bg-gray-50 border-2 border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 mb-4"></div>
                <p className="font-pixel text-xl">No projects found in this category.</p>
             </div>
          )}
        </div>
      </Section>

      {/* --- TESTIMONIALS --- */}
      <Section id="testimonials" className="bg-pastel-lavender/30 border-y-4 border-pastel-charcoal relative">
        <PixelCloud top="5%" size="w-24 md:w-32" duration={50} delay={0} className="opacity-50" />
        <PixelCloud top="80%" size="w-32 md:w-48" duration={60} delay={10} className="opacity-50" />
        
        <h2 className="font-pixel text-3xl sm:text-4xl text-center mb-8 md:mb-16 relative z-10">What Clients Say</h2>
        
        <div className="max-w-4xl mx-auto relative z-10 px-0 sm:px-4">
          {testimonials.length > 0 ? (
            <div 
               className="bg-white border-2 border-pastel-charcoal p-6 md:p-12 shadow-pixel-lg relative mx-2 sm:mx-0 group"
               onMouseEnter={() => setIsTestimonialPaused(true)}
               onMouseLeave={() => setIsTestimonialPaused(false)}
            >
              <div className="absolute -top-6 left-4 md:left-8 bg-pastel-peach border-2 border-pastel-charcoal p-2 shadow-pixel z-20">
                 <Star className="fill-pastel-charcoal text-pastel-charcoal" />
              </div>
              
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentTestimonial}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                   <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={20} className="fill-pastel-mint text-pastel-charcoal" />
                      ))}
                   </div>
                   <p className="font-pixel text-xl sm:text-2xl md:text-3xl leading-relaxed mb-6 md:mb-8">
                     "{testimonials[currentTestimonial].text}"
                   </p>
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t-2 border-pastel-gray pt-6">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-pastel-blue rounded-full border-2 border-pastel-charcoal overflow-hidden flex-shrink-0">
                       <img src={testimonials[currentTestimonial].photoUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${testimonials[currentTestimonial].id}`} alt="client" />
                     </div>
                     <div>
                       <div className="font-bold text-base md:text-lg">{testimonials[currentTestimonial].clientName || 'Anonymous Client'}</div>
                       <div className="text-xs md:text-sm text-gray-600">{testimonials[currentTestimonial].companyName}</div>
                     </div>
                   </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <button onClick={prevTestimonial} className="p-2 border-2 border-pastel-charcoal hover:bg-pastel-blue transition-colors bg-white shadow-pixel-sm active:translate-y-1">
                   <ArrowLeft size={20} />
                </button>
                <button onClick={nextTestimonial} className="p-2 border-2 border-pastel-charcoal hover:bg-pastel-blue transition-colors bg-white shadow-pixel-sm active:translate-y-1">
                   <ArrowRight size={20} />
                </button>
              </div>

              {/* Progress bar for autoplay (optional visual indicator) */}
              {!isTestimonialPaused && (
                 <motion.div 
                    key={currentTestimonial} // resets on change
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-pastel-blue/30"
                 />
              )}
            </div>
          ) : (
            <div className="text-center font-pixel text-xl">Testimonials coming soon!</div>
          )}
        </div>
      </Section>

      {/* --- CONTACT --- */}
      <Section id="contact" className="bg-white mb-12 md:mb-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <div>
            <h2 className="font-pixel text-3xl sm:text-4xl mb-4">Let's Build Something Great</h2>
            <p className="mb-6 md:mb-8 text-base sm:text-lg">Have a project in mind? I'm available for freelance work. Send me the details!</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-6 bg-pastel-cream p-5 sm:p-8 border-2 border-pastel-charcoal shadow-pixel relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Send size={100} />
              </div>

              <div>
                <label className="block font-pixel text-lg mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full bg-white border-2 border-pastel-charcoal p-3 focus:outline-none focus:shadow-pixel focus:border-pastel-blue transition-all text-base"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block font-pixel text-lg mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full bg-white border-2 border-pastel-charcoal p-3 focus:outline-none focus:shadow-pixel focus:border-pastel-blue transition-all text-base"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block font-pixel text-lg mb-2">Project Details</label>
                <textarea 
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-white border-2 border-pastel-charcoal p-3 focus:outline-none focus:shadow-pixel focus:border-pastel-blue transition-all text-base"
                  placeholder="Tell me about your website needs..."
                />
              </div>
              
              <div className="relative z-10">
                {formStatus === 'success' ? (
                   <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-pastel-mint border-2 border-pastel-charcoal p-4 text-center font-bold flex flex-col items-center justify-center gap-2 shadow-pixel w-full py-6"
                    >
                      <span className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-pastel-charcoal">✓</span> 
                      <span className="text-lg">Message Sent Successfully!</span>
                      <span className="text-sm font-normal">I'll get back to you within 24 hours.</span>
                    </motion.div>
                ) : formStatus === 'error' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-200 border-2 border-pastel-charcoal p-4 text-center font-bold shadow-pixel w-full"
                    >
                      <span className="text-xl mr-2">⚠</span> Something went wrong. Please try again.
                    </motion.div>
                ) : (
                    <PixelButton type="submit" size="lg" className="w-full" isLoading={formStatus === 'submitting'}>
                      Send Message
                    </PixelButton>
                )}
              </div>
            </form>
          </div>
          
          {/* Calendly Embed */}
          <div className="flex flex-col mt-12 lg:mt-0 w-full">
             <h3 className="font-pixel text-2xl mb-6 text-center lg:text-left">Or Schedule a Free 30-Minute Consultation</h3>
             <div className="w-full bg-white border-2 border-pastel-charcoal shadow-pixel relative overflow-hidden h-[500px] sm:h-[600px]">
                 <iframe 
                   src="https://calendly.com/alibuildswebsites/30min?embed_domain=1&embed_type=Inline&background_color=ffffff&text_color=4a4a4a&primary_color=a8daff" 
                   width="100%" 
                   height="100%"
                   frameBorder="0"
                   title="Schedule a consultation"
                 ></iframe>
             </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Home;
