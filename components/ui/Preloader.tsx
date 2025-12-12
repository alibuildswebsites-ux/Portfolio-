
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import { PixelMonkeyWaving } from './PixelDecorations';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Total duration of preloader (approx 3.5s)
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    // Optional: Show a "Skip" hint if it takes too long (rarely needed for fixed time)
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pastel-cream text-pastel-charcoal p-4"
    >
      <div className="relative flex flex-col items-center">
        {/* Speech Bubble */}
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mb-8 relative"
        >
            <div className="bg-white border-2 border-pastel-charcoal px-6 py-4 shadow-pixel-lg max-w-xs sm:max-w-md">
                <p className="font-pixel text-xl sm:text-2xl leading-relaxed text-center">
                    <Typewriter text="Hi, nice to see you here. I'm Raza A." delay={40} />
                </p>
            </div>
            {/* Pixel Arrow pointing down to monkey */}
            <div className="w-4 h-4 bg-white border-r-2 border-b-2 border-pastel-charcoal transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
        </motion.div>

        {/* Waving Monkey */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <PixelMonkeyWaving />
        </motion.div>
      </div>
      
      {/* Loading Bar at bottom */}
      <div className="absolute bottom-10 w-48 h-2 border-2 border-pastel-charcoal p-0.5">
          <motion.div 
             className="h-full bg-pastel-blue"
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 3, ease: "easeInOut" }}
          />
      </div>
    </motion.div>
  );
};

export default Preloader;
