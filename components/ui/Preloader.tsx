
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PixelSun, PixelCloud } from './PixelDecorations';
import Typewriter from './Typewriter';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Minimum load time of 4 seconds to show off the animation and text
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exit ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-pastel-cream flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 md:top-20 md:right-20">
           <PixelSun />
        </div>
        
        <PixelCloud top="10%" size="w-32 md:w-48" duration={25} />
        <PixelCloud top="30%" size="w-24 md:w-32" duration={35} delay={2} className="opacity-60" />
        <PixelCloud top="60%" size="w-40 md:w-56" duration={20} delay={5} className="opacity-80" />
        <PixelCloud top="80%" size="w-20 md:w-28" duration={40} delay={1} className="opacity-40" />
      </div>

      {/* Greeting Text */}
      <div className="absolute bottom-[20%] w-full flex justify-center px-4 z-20">
        <div className="font-pixel text-2xl md:text-3xl text-pastel-charcoal bg-white/40 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-pastel-charcoal shadow-pixel inline-block">
             <Typewriter text="Hi, nice to see you here. I'm Raza A." delay={40} />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
