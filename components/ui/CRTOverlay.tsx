
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CRTOverlay: React.FC = () => {
  const { theme } = useTheme();

  if (theme !== 'night') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 crt-scanlines opacity-20"></div>
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 crt-vignette opacity-50"></div>
      
      {/* Subtle RGB Shift Overlay (Static) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,1), rgba(0,255,0,1), rgba(0,0,255,1))',
          backgroundSize: '3px 3px'
        }}
      ></div>
    </div>
  );
};

export default CRTOverlay;
