import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PixelButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: React.ReactNode;
}

const PixelButton: React.FC<PixelButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  disabled,
  ...props 
}) => {
  
  const baseStyles = "relative font-pixel uppercase tracking-wide border-2 border-pastel-charcoal transition-all duration-75 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-pastel-blue hover:bg-pastel-lavender text-pastel-charcoal shadow-pixel active:shadow-pixel-press active:translate-y-[3px] active:translate-x-[3px]",
    secondary: "bg-white hover:bg-pastel-gray text-pastel-charcoal shadow-pixel active:shadow-pixel-press active:translate-y-[3px] active:translate-x-[3px]",
    danger: "bg-red-400 hover:bg-red-500 text-white shadow-pixel active:shadow-pixel-press active:translate-y-[3px] active:translate-x-[3px]",
    accent: "bg-pastel-peach hover:bg-pastel-mint text-pastel-charcoal shadow-pixel active:shadow-pixel-press active:translate-y-[3px] active:translate-x-[3px]"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </motion.button>
  );
};

export default PixelButton;