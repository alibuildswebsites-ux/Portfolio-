import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-pastel-blue text-pastel-charcoal border-2 border-pastel-charcoal p-3 shadow-pixel hover:-translate-y-1 hover:shadow-pixel-lg active:translate-y-0 active:shadow-pixel transition-all group flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-6 h-6" />
          {/* Pixel tooltip hint (Hidden on mobile to prevent clutter) */}
          <span className="absolute right-full mr-4 bg-white border-2 border-pastel-charcoal px-2 py-1 text-xs font-pixel whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-pixel-sm pointer-events-none hidden md:block">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;