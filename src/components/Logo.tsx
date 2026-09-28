import React from 'react';

export interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'emblem' | 'badge';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';

  // Height mappings for proportional scaling (aspect ratio is ~1.59:1)
  const sizeMap = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  };

  // Pure transparent logo with zero black background
  const imageSrc = '/logo.png';

  // Badge / Crest format with transparent glass backing
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/20 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src={imageSrc}
          alt="Smugsafaris Tours & Travel"
          className="h-16 sm:h-20 w-auto object-contain drop-shadow"
          loading="eager"
        />
      </div>
    );
  }

  // Pure icon / emblem variant (compact circular view)
  if (variant === 'icon' || variant === 'emblem') {
    const iconSizes = {
      sm: 'h-9 w-9',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    };

    return (
      <div
        className={`inline-flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src={imageSrc}
          alt="Smugsafaris"
          className={`${iconSizes[size] || iconSizes.md} w-auto object-contain drop-shadow-sm`}
          loading="eager"
        />
      </div>
    );
  }

  // Standard & Full variant: The authentic, pristine complete official logo
  // (Emblem + "Smugsafaris" + "TOURS & TRAVEL" + "Explore • Discover • Experience")
  // 100% uncut, flawless transparent background with no black box
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <img
        src={imageSrc}
        alt="Smugsafaris Tours & Travel - Explore • Discover • Experience"
        className={`${sizeMap[size] || sizeMap.md} w-auto object-contain ${
          isDark
            ? 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] filter brightness-105'
            : 'drop-shadow-xs'
        }`}
        loading="eager"
      />
    </div>
  );
};
