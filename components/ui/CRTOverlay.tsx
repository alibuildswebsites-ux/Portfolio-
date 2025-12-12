
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const CRTOverlay: React.FC = () => {
  const { theme } = useTheme();

  if (theme !== 'night') return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden h-screen w-screen">
      {/* 1. Base Phosphor Grid (Scanlines + RGB Mesh) */}
      <div className="crt-phosphor-grid absolute inset-0 opacity-100 mix-blend-multiply"></div>
      
      {/* 2. Moving Refresh Bar */}
      <div className="crt-refresh-line absolute top-0 left-0 w-full h-32 z-10"></div>
      
      {/* 3. Flicker Layer */}
      <div className="crt-flicker absolute inset-0 z-20 mix-blend-overlay"></div>

      {/* 4. Heavy Vignette & Screen Curve Simulation */}
      <div className="crt-vignette absolute inset-0 z-30"></div>
    </div>
  );
};

export default CRTOverlay;
