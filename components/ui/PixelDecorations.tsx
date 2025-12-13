
import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const PixelCloud = memo(({ size = "w-32", className = "", duration = 25, delay = 0, top = "10%" }: { size?: string, className?: string, duration?: number, delay?: number, top?: string }) => (
  <motion.div
    initial={{ x: "-20vw" }}
    animate={{ x: "110vw" }}
    transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    className={`absolute z-0 ${size} ${className}`}
    style={{ top }}
  >
    <svg viewBox="0 0 32 20" className="w-full h-full pixel-antialiased" shapeRendering="crispEdges">
       {/* Border Layer (Bluish Pastel) */}
       <g fill="#B0C4DE">
         {/* Top Borders */}
         <rect x="14" y="4" width="10" height="1" />
         <rect x="8" y="6" width="6" height="1" />
         <rect x="3" y="9" width="5" height="1" />
         <rect x="24" y="8" width="5" height="1" />
         
         {/* Bottom Borders */}
         <rect x="5" y="17" width="22" height="1" />
         <rect x="3" y="16" width="2" height="1" />
         <rect x="27" y="16" width="2" height="1" />
         
         {/* Left Borders */}
         <rect x="2" y="10" width="1" height="6" />
         <rect x="7" y="7" width="1" height="3" />
         <rect x="13" y="5" width="1" height="2" />
         
         {/* Right Borders */}
         <rect x="29" y="9" width="1" height="7" />
         <rect x="24" y="5" width="1" height="4" />
       </g>

       {/* Main Cloud Body - White */}
       <g fill="white">
         <rect x="5" y="13" width="22" height="4" />
         <rect x="3" y="10" width="7" height="6" />
         <rect x="8" y="7" width="8" height="9" />
         <rect x="14" y="5" width="10" height="11" />
         <rect x="22" y="9" width="7" height="7" />
       </g>
       
       {/* Shading */}
       <g fill="#E8E8E8">
          <rect x="5" y="16" width="22" height="1" />
          <rect x="22" y="10" width="1" height="5" />
          <rect x="14" y="6" width="1" height="8" />
       </g>
    </svg>
  </motion.div>
));

export const PixelSun = memo(({ className = "" }: { className?: string }) => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    className={`w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 z-0 opacity-80 ${className}`}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full pixel-antialiased">
       <rect x="8" y="8" width="8" height="8" fill="#FFB5A7" />
       <rect x="8" y="6" width="8" height="2" fill="#FFB5A7" />
       <rect x="8" y="16" width="8" height="2" fill="#FFB5A7" />
       <rect x="6" y="8" width="2" height="8" fill="#FFB5A7" />
       <rect x="16" y="8" width="2" height="8" fill="#FFB5A7" />
       <rect x="11" y="2" width="2" height="3" fill="#FFB5A7" />
       <rect x="11" y="19" width="2" height="3" fill="#FFB5A7" />
       <rect x="2" y="11" width="3" height="2" fill="#FFB5A7" />
       <rect x="19" y="11" width="3" height="2" fill="#FFB5A7" />
    </svg>
  </motion.div>
));

export const PixelMoon = memo(({ className = "" }: { className?: string }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    className={`w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 z-0 ${className}`}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full pixel-antialiased drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
       <path d="M8 3 H12 V5 H15 V8 H17 V16 H15 V19 H12 V21 H8 V19 H10 V17 H11 V7 H10 V5 H8 V3 Z" fill="#F5F5F5" />
       <rect x="13" y="10" width="2" height="2" fill="#E0E0E0" />
       <rect x="12" y="16" width="1" height="1" fill="#E0E0E0" />
       <rect x="14" y="6" width="1" height="1" fill="#E0E0E0" />
    </svg>
  </motion.div>
));

export const PixelStars = memo(() => {
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 60}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() > 0.5 ? 4 : 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
         <motion.div 
            key={s.id}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
            className="absolute bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, boxShadow: '0 0 4px #fff' }}
         />
      ))}
    </div>
  );
});

export const PixelStatusBadge = memo(() => {
   return (
      <motion.div
        initial={{ y: 5 }}
        animate={{ y: -5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        className="relative z-20 cursor-pointer inline-block"
        whileHover={{ scale: 1.05 }}
      >
         <div className="bg-white border-2 border-pastel-charcoal shadow-pixel-lg px-4 py-3 sm:px-8 sm:py-6">
            <div className="bg-pastel-lavender border-b-2 border-pastel-charcoal px-3 py-1 flex justify-between items-center h-6 sm:h-7 absolute top-0 left-0 w-full">
               <span className="font-pixel text-[8px] sm:text-xs text-black tracking-wider">SYSTEM.EXE</span>
               <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pastel-charcoal"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pastel-charcoal opacity-50"></div>
               </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
               <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse border border-pastel-charcoal"></div>
               <span className="font-pixel text-base sm:text-xl font-bold text-black whitespace-nowrap">
                  Open for Work!
               </span>
            </div>
         </div>
         {/* Speech Bubble Tail */}
         <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-pastel-charcoal border-r-[8px] border-r-transparent mx-auto relative mt-[-2px] z-10 hidden sm:block">
            <div className="absolute -top-[14px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-t-[10px] border-t-white border-r-[6px] border-r-transparent"></div>
         </div>
      </motion.div>
   );
});

export const PixelHuman = memo(({ className = "" }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`relative select-none ${className}`}
  >
     <svg viewBox="0 0 24 32" className="w-32 h-auto sm:w-40 md:w-48 pixel-antialiased drop-shadow-2xl" shapeRendering="crispEdges">
        {/* Shadow */}
        <ellipse cx="12" cy="30" rx="8" ry="1.5" fill="rgba(0,0,0,0.15)" />

        <motion.g
           animate={{ y: [0, -1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Pants */}
          <rect x="8" y="19" width="3" height="9" fill="#4A4A4A" /> 
          <rect x="13" y="19" width="3" height="9" fill="#4A4A4A" /> 
          <rect x="8" y="18" width="8" height="2" fill="#4A4A4A" /> 
          
          {/* Shoes */}
          <rect x="7" y="28" width="4" height="2" fill="#2D2D2D" />
          <rect x="13" y="28" width="4" height="2" fill="#2D2D2D" />

          {/* Shirt */}
          <rect x="7" y="10" width="10" height="9" fill="#A8DAFF" /> 
          <rect x="5" y="10" width="2" height="8" fill="#FFB5A7" /> 
          <rect x="17" y="10" width="2" height="8" fill="#FFB5A7" /> 
          
          {/* Head */}
          <rect x="9" y="3" width="6" height="6" fill="#FFB5A7" />
          <rect x="10" y="9" width="4" height="1" fill="#FFB5A7" />

          {/* Hair */}
          <rect x="9" y="2" width="6" height="2" fill="#4A4A4A" />
          <rect x="8" y="3" width="1" height="3" fill="#4A4A4A" />
          <rect x="15" y="3" width="1" height="3" fill="#4A4A4A" />

          {/* Face */}
          <rect x="10" y="5" width="1" height="1" fill="#2D2D2D" /> 
          <rect x="13" y="5" width="1" height="1" fill="#2D2D2D" /> 
        </motion.g>
     </svg>
  </motion.div>
));
