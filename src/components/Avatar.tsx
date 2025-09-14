import React, { useState } from 'react';
import { generateAvatarSVG } from '../utils/helpers';

interface AvatarProps {
  src?: string | Record<string, never>;
  name: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 64, 
  className = "rounded-full object-cover border-2 border-gray-200" 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const getInitialSrc = (): string => {
    if (typeof src === 'string' && src.trim() !== '') {
      return src;
    }
    return generateAvatarSVG(name);
  };

  const [currentSrc, setCurrentSrc] = useState<string>(getInitialSrc);

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      setCurrentSrc(generateAvatarSVG(name));
    }
  };

  const getSizeClass = (size: number): string => {
    switch (size) {
      case 32: return 'w-8 h-8';
      case 40: return 'w-10 h-10';
      case 48: return 'w-12 h-12';
      case 56: return 'w-14 h-14';
      case 64: return 'w-16 h-16';
      case 72: return 'w-18 h-18';
      case 80: return 'w-20 h-20';
      default: return 'w-16 h-16';
    }
  };

  return (
    <img
      src={currentSrc}
      alt={`Avatar de ${name}`}
      className={`${getSizeClass(size)} ${className}`}
      onError={handleError}
      loading="lazy"
      width={size}
      height={size}
      draggable={false}
    />
  );
};

export default Avatar;
