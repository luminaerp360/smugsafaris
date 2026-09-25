import React from 'react';

export interface LogoProps {
  variant?: 'horizontal' | 'full' | 'icon' | 'emblem' | 'badge';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';

  // 1. ICON / EMBLEM VARIANT (The authentic safari sunset, animals, Kilimanjaro & plane)
  if (variant === 'icon' || variant === 'emblem') {
    const sizeMap = {
      sm: 'h-9 w-9',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    };

    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src="/logo-emblem-transparent.png"
          alt="Smugsafaris Emblem"
          className={`${sizeMap[size] || sizeMap.md} object-contain drop-shadow-sm`}
          loading="eager"
        />
      </div>
    );
  }

  // 2. FULL BADGE VARIANT (The complete authentic logo with illustration & typography)
  if (variant === 'full') {
    const heightMap = {
      sm: 'h-20',
      md: 'h-28',
      lg: 'h-36',
      xl: 'h-48',
    };

    return (
      <div
        className={`inline-flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-[1.02] ${className}`}
      >
        <img
          src={isDark ? '/logo.png' : '/logo-transparent.png'}
          alt="Smugsafaris Tours & Travel - Explore • Discover • Experience"
          className={`${heightMap[size] || heightMap.md} w-auto object-contain drop-shadow-md`}
          loading="eager"
        />
      </div>
    );
  }

  // 3. BADGE / CREST VARIANT (Elegantly bordered dark crest for cards and showcases)
  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center p-2 rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src="/logo.png"
          alt="Smugsafaris Crest"
          className="h-24 w-auto object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // 4. HORIZONTAL VARIANT (Navbar, header, and compact footer)
  // Combines the authentic circular emblem artwork with crisp typography
  const emblemHeights = {
    sm: 'h-9 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
    xl: 'h-20 w-auto',
  };

  const titleSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] sm:text-[10px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.25em]',
    xl: 'text-xs tracking-[0.28em]',
  };

  const tagSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[9.5px]',
    lg: 'text-[10px]',
    xl: 'text-xs',
  };

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 transition-opacity duration-200 hover:opacity-95 ${className}`}
    >
      {/* Authentic Safari Emblem Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/logo-emblem-transparent.png"
          alt="Smugsafaris"
          className={`${emblemHeights[size] || emblemHeights.md} object-contain transition-transform duration-300 group-hover:scale-105`}
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center select-none">
        {/* Main Wordmark: "Smugsafaris" */}
        <div className="flex items-baseline leading-none">
          <span
            className={`font-black tracking-tight ${titleSizes[size] || titleSizes.md} ${
              isDark ? 'text-emerald-400' : 'text-[#1E7A2E]'
            }`}
          >
            Smug
          </span>
          <span
            className={`font-black tracking-tight ${titleSizes[size] || titleSizes.md} bg-gradient-to-r from-[#F7941D] to-[#E8720C] bg-clip-text text-transparent`}
          >
            safaris
          </span>
        </div>

        {/* Subtitle: — TOURS & TRAVEL — */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`h-[1px] w-2.5 sm:w-3 ${
              isDark ? 'bg-emerald-400/50' : 'bg-[#1E7A2E]/60'
            }`}
          />
          <span
            className={`font-extrabold uppercase whitespace-nowrap ${subSizes[size] || subSizes.md} ${
              isDark ? 'text-emerald-300' : 'text-[#1E7A2E]'
            }`}
          >
            TOURS & TRAVEL
          </span>
          <span
            className={`h-[1px] w-2.5 sm:w-3 ${
              isDark ? 'bg-emerald-400/50' : 'bg-[#1E7A2E]/60'
            }`}
          />
        </div>

        {/* Tagline: Explore • Discover • Experience */}
        {showTagline && (
          <span
            className={`italic font-medium whitespace-nowrap mt-0.5 ${tagSizes[size] || tagSizes.md} ${
              isDark ? 'text-neutral-300' : 'text-neutral-500'
            }`}
          >
            Explore • Discover • Experience
          </span>
        )}
      </div>
    </div>
  );
};
