import React from 'react';

interface PixelImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const PixelImage: React.FC<PixelImageProps> = ({ className = '', ...props }) => {
  return (
    <img 
      className={`pixel-antialiased ${className}`}
      loading="lazy"
      {...props}
    />
  );
};

export default PixelImage;