
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

export const PixelSun = memo(() => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    className="absolute top-24 right-4 w-14 h-14 sm:top-28 sm:right-8 sm:w-20 sm:h-20 md:top-32 md:right-10 md:w-24 md:h-24 z-0 opacity-80"
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

export const PixelMoon = memo(() => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    className="absolute top-24 right-4 w-14 h-14 sm:top-28 sm:right-8 sm:w-20 sm:h-20 md:top-32 md:right-10 md:w-24 md:h-24 z-0"
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

export const PixelComputerAvatar = memo(() => {
  return (
    <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 max-w-full transition-all duration-300">
      {/* Floating Status Window */}
      <motion.div
        initial={{ y: 5 }}
        animate={{ y: -5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 z-20 cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
         <div className="bg-white border-2 border-pastel-charcoal shadow-pixel-lg w-48 sm:w-72 p-5 sm:p-7">
            <div className="bg-pastel-lavender border-b-2 border-pastel-charcoal px-3 py-1 flex justify-between items-center h-8 sm:h-10 absolute top-0 left-0 w-full">
               <span className="font-pixel text-xs sm:text-sm text-black">System.exe</span>
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-pastel-charcoal"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-pastel-charcoal opacity-50"></div>
               </div>
            </div>
            <div className="mt-5 sm:mt-6 flex items-center gap-3">
               <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse border border-pastel-charcoal"></div>
               <span className="font-pixel text-base sm:text-xl font-bold text-black whitespace-nowrap">
                  Open for Work!
               </span>
            </div>
         </div>
      </motion.div>

      <svg viewBox="0 0 64 64" className="w-full h-full pixel-antialiased drop-shadow-xl" shapeRendering="crispEdges">
        {/* Floor Shadow - Widened for new desk */}
        <ellipse cx="32" cy="58" rx="28" ry="4" fill="#000" opacity="0.1" />

        {/* --- MONKEY TAIL --- */}
        <motion.path 
          d="M20 50 Q 15 50 15 45 Q 15 40 12 42" 
          stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="square"
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
           <rect x="18" y="26" width="4" height="6" fill="#5D4037" /> 
           <rect x="19" y="27" width="2" height="4" fill="#D7CCC8" /> 
           
           <rect x="42" y="26" width="4" height="6" fill="#5D4037" /> 
           <rect x="43" y="27" width="2" height="4" fill="#D7CCC8" /> 

           {/* Main Head Shape */}
           <rect x="22" y="20" width="20" height="18" fill="#795548" /> 
           <rect x="22" y="20" width="20" height="2" fill="#8D6E63" /> 
           
           {/* Face Mask (Beige) */}
           <path d="M24 26 H40 V36 H36 V38 H28 V36 H24 Z" fill="#EFEBE9" />
           <rect x="30" y="26" width="4" height="2" fill="#795548" /> 

           {/* Eyes (Restored Normal Eyes - No Sunglasses) */}
           <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1], repeatDelay: 4 }}>
              <rect x="27" y="29" width="2" height="2" fill="#2D2D2D" />
              <rect x="35" y="29" width="2" height="2" fill="#2D2D2D" />
           </motion.g>
           
           {/* Screen Glow on Face (Subtler without sunglasses) */}
           <motion.rect 
              x="24" y="32" width="16" height="6" 
              fill="#0078D7" 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ mixBlendMode: 'color-dodge' }}
           />

           {/* Snout & Mouth */}
           <rect x="29" y="32" width="6" height="3" fill="#D7CCC8" /> 
           <rect x="31" y="33" width="2" height="1" fill="#4E342E" /> 
           <rect x="30" y="35" width="4" height="1" fill="#4E342E" opacity="0.4" /> 
        </g>

        {/* Typing Arms (Animation) - Behind the computer */}
        <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.15, repeat: Infinity }}>
           <rect x="20" y="44" width="4" height="8" fill="#A8DAFF" /> 
           <rect x="20" y="52" width="4" height="2" fill="#795548" /> 
        </motion.g>
        <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 0.15, repeat: Infinity, delay: 0.07 }}>
           <rect x="40" y="44" width="4" height="8" fill="#A8DAFF" /> 
           <rect x="40" y="52" width="4" height="2" fill="#795548" /> 
        </motion.g>

        {/* --- DESK (Improved Size & Detail) --- */}
        {/* Main Desktop - Wider */}
        <rect x="2" y="54" width="60" height="3" fill="#8D6E63" /> 
        <rect x="2" y="54" width="60" height="1" fill="#A1887F" /> {/* Top Highlight */}
        
        {/* Legs - Sturdier */}
        <rect x="4" y="57" width="5" height="7" fill="#6D4C41" /> 
        <rect x="55" y="57" width="5" height="7" fill="#6D4C41" /> 
        
        {/* Side Panels/Drawers Illusion */}
        <rect x="4" y="57" width="5" height="2" fill="#5D4037" opacity="0.3" />
        <rect x="55" y="57" width="5" height="2" fill="#5D4037" opacity="0.3" />
        
        {/* Feet */}
        <rect x="2" y="62" width="9" height="2" fill="#5D4037" />
        <rect x="53" y="62" width="9" height="2" fill="#5D4037" />

        {/* --- RETRO COMPUTER (BACK VIEW) --- */}
        {/* Positioned centrally on new desk */}
        
        {/* Desktop Case (Horizontal, Beige) */}
        <rect x="14" y="50" width="36" height="6" fill="#D7CCC8" /> 
        <rect x="14" y="55" width="36" height="1" fill="#A1887F" /> 
        <rect x="14" y="50" width="1" height="6" fill="#BCAAA4" /> 
        
        {/* Cables */}
        <path d="M18 53 L14 56" stroke="#4E342E" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M22 53 L24 58" stroke="#4E342E" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Monitor Base */}
        <rect x="26" y="48" width="12" height="2" fill="#8D6E63" /> 
        
        {/* CRT Monitor Back (Bulky Beige) */}
        <rect x="18" y="34" width="28" height="16" fill="#D7CCC8" /> 
        <rect x="18" y="34" width="28" height="1" fill="#EFEBE9" /> 
        <rect x="18" y="34" width="1" height="16" fill="#A1887F" /> 
        <rect x="45" y="34" width="1" height="16" fill="#A1887F" /> 
        
        {/* The "Hump" (CRT Tube Back) */}
        <rect x="22" y="36" width="20" height="12" fill="#BCAAA4" /> 
        
        {/* Vents on Back */}
        <rect x="24" y="38" width="16" height="1" fill="#5D4037" opacity="0.4" />
        <rect x="24" y="40" width="16" height="1" fill="#5D4037" opacity="0.4" />
        <rect x="24" y="42" width="16" height="1" fill="#5D4037" opacity="0.4" />

        {/* Asset Sticker (Yellow) */}
        <rect x="36" y="44" width="4" height="3" fill="#FFECB3" />
        
        {/* Power Cable from Monitor */}
        <path d="M32 46 L32 50" stroke="#2D2D2D" strokeWidth="2" />

      </svg>
    </div>
  );
});

export const PixelMonkeyWaving = memo(() => {
   return (
     <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-all duration-300">
       <svg viewBox="0 0 64 64" className="w-full h-full pixel-antialiased" shapeRendering="crispEdges">
         {/* Shadow */}
         <ellipse cx="32" cy="58" rx="20" ry="4" fill="#000" opacity="0.15" />
 
         {/* Tail */}
         <motion.path 
            d="M20 50 Q 12 50 12 42"
            fill="none" stroke="#5D4037" strokeWidth="3" strokeLinecap="round"
            animate={{ d: ["M20 50 Q 12 50 12 42", "M20 50 Q 10 54 10 40", "M20 50 Q 12 50 12 42"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
 
         {/* Legs */}
         <rect x="24" y="50" width="6" height="8" fill="#795548" />
         <rect x="34" y="50" width="6" height="8" fill="#795548" />
         
         {/* Body (Hoodie) - Matches Avatar Color #A8DAFF */}
         <rect x="22" y="36" width="20" height="16" fill="#A8DAFF" /> 
         <rect x="22" y="36" width="20" height="2" fill="#E1F5FE" /> {/* Highlight */}
         <rect x="29" y="38" width="6" height="8" fill="#81D4FA" opacity="0.3" /> {/* Pocket/Detail */}
         
         {/* Head - Matching PixelComputerAvatar Style */}
         <g transform="translate(0, -4)">
             {/* Ears */}
             <rect x="18" y="26" width="4" height="6" fill="#5D4037" />
             <rect x="19" y="27" width="2" height="4" fill="#D7CCC8" />
             
             <rect x="42" y="26" width="4" height="6" fill="#5D4037" />
             <rect x="43" y="27" width="2" height="4" fill="#D7CCC8" />
             
             {/* Main Head Shape */}
             <rect x="22" y="20" width="20" height="18" fill="#795548" />
             <rect x="22" y="20" width="20" height="2" fill="#8D6E63" />
             
             {/* Face Mask (Beige) */}
             <path d="M24 26 H40 V36 H36 V38 H28 V36 H24 Z" fill="#EFEBE9" />
             <rect x="30" y="26" width="4" height="2" fill="#795548" /> {/* Widow's peak */}
             
             {/* Sunglasses (Cool Mode) - KEPT FOR WAVING MONKEY AS REQUESTED */}
             {/* Left Lens */}
             <rect x="25" y="28" width="6" height="4" fill="#111111" />
             <rect x="26" y="29" width="2" height="1" fill="#555555" /> {/* Glint */}
             {/* Bridge */}
             <rect x="31" y="29" width="2" height="1" fill="#111111" />
             {/* Right Lens */}
             <rect x="33" y="28" width="6" height="4" fill="#111111" />
             <rect x="34" y="29" width="2" height="1" fill="#555555" /> {/* Glint */}
             
             {/* Snout & Mouth */}
             <rect x="29" y="32" width="6" height="3" fill="#D7CCC8" />
             <rect x="31" y="33" width="2" height="1" fill="#4E342E" /> {/* Nose */}
             
             {/* Smile */}
             <rect x="30" y="35" width="4" height="1" fill="#4E342E" opacity="0.6" />
         </g>
 
         {/* Left Arm (Resting) */}
         <rect x="18" y="38" width="4" height="10" fill="#A8DAFF" />
         <rect x="18" y="48" width="4" height="3" fill="#795548" /> {/* Hand */}
 
         {/* Right Arm (Waving) */}
         <motion.g 
            style={{ originX: "46px", originY: "38px" }}
            animate={{ rotate: [0, 20, -5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
         >
            <rect x="42" y="24" width="4" height="14" fill="#A8DAFF" /> {/* Arm Up */}
            <rect x="42" y="20" width="4" height="4" fill="#795548" /> {/* Hand */}
         </motion.g>
       </svg>
     </div>
   );
});
