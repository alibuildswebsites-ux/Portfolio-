import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pastel-cream/90 backdrop-blur-sm border-b-4 border-pastel-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-10 h-10 bg-pastel-blue border-2 border-pastel-charcoal flex items-center justify-center shadow-pixel-sm">
                <Rocket className="w-6 h-6 text-pastel-charcoal" />
             </div>
             <span className="font-pixel text-2xl font-bold text-pastel-charcoal tracking-tighter">RAZA A.</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.id)}
                  className="font-pixel text-lg text-pastel-charcoal hover:text-pastel-blue hover:underline transition-all duration-200 bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <a 
                 href="https://calendly.com/alibuildswebsites/30min" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="font-pixel bg-pastel-mint border-2 border-pastel-charcoal px-4 py-2 hover:bg-pastel-peach shadow-pixel-sm hover:translate-y-[2px] hover:shadow-none transition-all inline-block"
              >
                Hire Me
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-pastel-charcoal hover:bg-pastel-blue focus:outline-none border-2 border-transparent hover:border-pastel-charcoal transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-pastel-cream border-b-4 border-pastel-charcoal overflow-hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScroll(item.id)}
                  className="block w-full text-left px-3 py-3 font-pixel text-xl text-pastel-charcoal hover:bg-pastel-blue hover:text-white transition-colors border-2 border-transparent hover:border-pastel-charcoal"
                >
                  {item.name}
                </button>
              ))}
               <a 
                 href="https://calendly.com/alibuildswebsites/30min" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full text-center mt-4 font-pixel bg-pastel-mint border-2 border-pastel-charcoal px-4 py-3 hover:bg-pastel-peach shadow-pixel-sm hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;