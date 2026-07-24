import React from 'react';

interface PeaceGainerLogoProps {
  variant?: 'full' | 'badge' | 'icon' | 'horizontal';
  className?: string;
  size?: number;
}

export const PeaceGainerLogo: React.FC<PeaceGainerLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size = 40
}) => {
  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
      >
        {/* Dark Teal Background Circle */}
        <circle cx="100" cy="100" r="98" fill="#06131A" stroke="#3FCDA8" strokeWidth="2" strokeOpacity="0.3" />
        
        {/* Outer Guide Circles */}
        <circle cx="100" cy="100" r="80" stroke="#C89D52" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="1 0" />
        <circle cx="100" cy="100" r="62" stroke="#105C61" strokeWidth="1" strokeOpacity="0.8" />
        
        {/* Crosshair Ticks */}
        <line x1="100" y1="12" x2="100" y2="24" stroke="#C89D52" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="176" x2="100" y2="188" stroke="#C89D52" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="12" y1="100" x2="24" y2="100" stroke="#C89D52" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="176" y1="100" x2="188" y2="100" stroke="#C89D52" strokeWidth="2.5" strokeLinecap="round" />

        {/* Center Emblem Background Circle */}
        <circle cx="100" cy="100" r="44" fill="#0C373C" />

        {/* Stylized Peace Dove Symbol */}
        <path
          d="M62 90 C 72 82, 85 82, 98 88 C 108 92, 122 82, 138 78 C 126 92, 120 102, 132 118 C 118 110, 108 122, 112 138 C 102 122, 92 115, 80 118 C 88 108, 76 102, 62 90 Z"
          fill="#3FCDA8"
        />
        {/* Eye/Detail Notch */}
        <circle cx="98" cy="91" r="1.5" fill="#06131A" />
      </svg>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <svg
          width={size * 2.2}
          height={size * 2.2}
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Card */}
          <rect width="240" height="240" rx="32" fill="#06131A" />

          {/* Outer Guide Circles */}
          <circle cx="120" cy="100" r="72" stroke="#105C61" strokeWidth="1.2" strokeOpacity="0.8" />
          <circle cx="120" cy="100" r="54" stroke="#C89D52" strokeWidth="1" strokeOpacity="0.7" />

          {/* Crosshair Ticks */}
          <line x1="120" y1="22" x2="120" y2="32" stroke="#C89D52" strokeWidth="2" />
          <line x1="120" y1="168" x2="120" y2="178" stroke="#C89D52" strokeWidth="2" />
          <line x1="42" y1="100" x2="52" y2="100" stroke="#C89D52" strokeWidth="2" />
          <line x1="188" y1="100" x2="198" y2="100" stroke="#C89D52" strokeWidth="2" />

          {/* Center Emblem Background Circle */}
          <circle cx="120" cy="100" r="38" fill="#0C373C" />

          {/* Dove Silhouette */}
          <path
            d="M86 91 C 95 84, 106 84, 118 89 C 127 93, 139 84, 153 81 C 142 93, 137 102, 148 116 C 135 109, 126 119, 130 133 C 121 119, 112 113, 102 116 C 109 107, 98 102, 86 91 Z"
            fill="#3FCDA8"
          />
          <circle cx="118" cy="92" r="1.5" fill="#06131A" />

          {/* Brand Name Text */}
          <text
            x="120"
            y="198"
            fontFamily="Playfair Display, Georgia, serif"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="3"
            fill="#F7F3E9"
            textAnchor="middle"
          >
            PEACE GAINER
          </text>

          {/* Tagline */}
          <text
            x="120"
            y="218"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="8"
            fontWeight="600"
            letterSpacing="2.5"
            fill="#3FCDA8"
            textAnchor="middle"
          >
            BREATHE · RETURN · GROW
          </text>
        </svg>
      </div>
    );
  }

  // Default 'horizontal' variant
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="100" cy="100" r="96" fill="#06131A" stroke="#3FCDA8" strokeWidth="2" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="76" stroke="#105C61" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="100" cy="100" r="58" stroke="#C89D52" strokeWidth="1" strokeOpacity="0.7" />

        <line x1="100" y1="18" x2="100" y2="28" stroke="#C89D52" strokeWidth="2" />
        <line x1="100" y1="172" x2="100" y2="182" stroke="#C89D52" strokeWidth="2" />
        <line x1="18" y1="100" x2="28" y2="100" stroke="#C89D52" strokeWidth="2" />
        <line x1="172" y1="100" x2="182" y2="100" stroke="#C89D52" strokeWidth="2" />

        <circle cx="100" cy="100" r="42" fill="#0C373C" />

        <path
          d="M62 90 C 72 82, 85 82, 98 88 C 108 92, 122 82, 138 78 C 126 92, 120 102, 132 118 C 118 110, 108 122, 112 138 C 102 122, 92 115, 80 118 C 88 108, 76 102, 62 90 Z"
          fill="#3FCDA8"
        />
        <circle cx="98" cy="91" r="1.5" fill="#06131A" />
      </svg>

      <div className="flex flex-col text-left">
        <span className="text-lg sm:text-xl font-serif font-bold text-[#0B1F2A] dark:text-[#F7F3E9] tracking-wider uppercase leading-none">
          PEACE GAINER
        </span>
        <span className="text-[9px] sm:text-[10px] font-sans font-semibold tracking-[0.2em] text-[#169375] dark:text-[#3FCDA8] uppercase mt-1">
          BREATHE · RETURN · GROW
        </span>
      </div>
    </div>
  );
};
