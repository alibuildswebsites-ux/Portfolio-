import React from 'react';
import { ArrowUp, Heart, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-pastel-charcoal text-pastel-cream pt-16 pb-8 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h3 className="font-pixel text-3xl mb-4 text-pastel-blue">RAZA A.</h3>
            <p className="text-pastel-gray mb-6 max-w-xs">
              Helping small and medium sized businesses establish a strong online presence digitally.
            </p>
            <div className="flex gap-4">
               {/* Social Icons */}
               <a 
                 href="https://linkedin.com/in/alibuildswebsites" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-pastel-lavender border-2 border-white hover:bg-pastel-blue transition-colors flex items-center justify-center text-pastel-charcoal shadow-sm cursor-pointer"
                 title="LinkedIn"
               >
                 <Linkedin size={20} />
               </a>
               <a 
                 href="mailto:alibuildswebsites@gmail.com"
                 className="w-10 h-10 bg-pastel-mint border-2 border-white hover:bg-pastel-peach transition-colors flex items-center justify-center text-pastel-charcoal shadow-sm cursor-pointer"
                 title="Send Email"
               >
                 <Mail size={20} />
               </a>
            </div>
          </div>

          <div>
            <h4 className="font-pixel text-xl mb-4 text-white border-b-2 border-pastel-gray inline-block">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Testimonials', 'Contact'].map(link => (
                <li key={link}>
                  <button 
                    onClick={() => handleScroll(link.toLowerCase())}
                    className="hover:text-pastel-blue transition-colors hover:underline decoration-wavy text-left bg-transparent border-none cursor-pointer text-pastel-cream"
                  >
                    {link}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => navigate('/admin-login')}
                  className="text-gray-600 hover:text-gray-400 text-sm bg-transparent border-none cursor-pointer p-0"
                >
                  Admin Access
                </button>
              </li>
            </ul>
          </div>

          <div>
             <h4 className="font-pixel text-xl mb-4 text-white border-b-2 border-pastel-gray inline-block">Contact</h4>
             <ul className="space-y-2">
               <li><a href="mailto:alibuildswebsites@gmail.com" className="hover:text-pastel-blue text-pastel-cream flex items-center gap-2"><Mail size={16} /> alibuildswebsites@gmail.com</a></li>
               <li>
                 <a href="https://linkedin.com/in/alibuildswebsites" target="_blank" rel="noopener noreferrer" className="hover:text-pastel-blue text-pastel-cream flex items-center gap-2">
                   <Linkedin size={16} /> linkedin.com/in/alibuildswebsites
                 </a>
               </li>
               <li className="pt-2">Project-Based Freelance Work</li>
               <li className="text-pastel-gray text-sm mt-4">Available for new projects</li>
             </ul>
          </div>

        </div>

        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-pixel text-sm">© 2024 Raza A. All rights reserved.</p>
          
          <div className="flex items-center gap-2 text-sm">
            Made with <Heart size={16} className="fill-red-500 text-red-500 animate-pulse" /> using React & Tailwind
          </div>

          <button 
            onClick={scrollToTop}
            className="bg-pastel-blue text-pastel-charcoal p-3 border-2 border-white hover:bg-pastel-lavender hover:-translate-y-1 transition-all shadow-pixel cursor-pointer"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;