import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const ClinicDigitalProLogo: React.FC<LogoProps> = ({ 
  className = "", 
  showText = true,
  variant = 'dark'
}) => {
  const uniqueId = useId();
  const blueDGradId = `blueDGrad-${uniqueId.replace(/:/g, '')}`;
  const tealCrossGradId = `tealCrossGrad-${uniqueId.replace(/:/g, '')}`;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Logo Icon Mark */}
      <svg 
        viewBox="0 0 105 100" 
        className="h-10 w-auto shrink-0" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={blueDGradId} x1="40" y1="16" x2="100" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#006df0" />
            <stop offset="50%" stopColor="#0551bc" />
            <stop offset="100%" stopColor="#093c90" />
          </linearGradient>
          
          <linearGradient id={tealCrossGradId} x1="13" y1="34" x2="63" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#00ceff" />
            <stop offset="100%" stopColor="#0099ff" />
          </linearGradient>
        </defs>

        <rect x="30" y="8" width="5" height="5" rx="1.2" fill="#00f0ff" />
        <rect x="15" y="20" width="7" height="7" rx="1.5" fill="#00b8ff" />
        <rect x="33" y="22" width="6.5" height="6.5" rx="1.5" fill="#0a4392" />
        <rect x="23" y="33" width="7.5" height="7.5" rx="1.5" fill="#00f0ff" />
        <rect x="36" y="44" width="5" height="5" rx="1.2" fill="#00ceff" />

        <path 
          d="M 40,16 
             H 70 
             C 88,16 99,30 99,50 
             C 99,70 88,84 70,84 
             H 48
             C 44,84 41.5,81.5 41.5,77.5
             V 70.5
             H 48
             C 65,70.5 74,65 74,50 
             C 74,35 65,29.5 48,29.5 
             H 40 
             Z" 
          fill={`url(#${blueDGradId})`} 
        />

        <path 
          d="M 32,34
             h 12
             a 4,4 0 0 1 4,4
             v 11
             h 11
             a 4,4 0 0 1 4,4
             v 12
             a 4,4 0 0 1 -4,4
             H 48
             v 11
             a 4,4 0 0 1 -4,4
             H 32
             a 4,4 0 0 1 -4,-4
             V 69
             H 17
             a 4,4 0 0 1 -4,-4
             V 53
             a 4,4 0 0 1 4,-4
             h 11
             V 38
             a 4,4 0 0 1 4,-4
             z"
          fill={`url(#${tealCrossGradId})`}
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline font-display leading-none">
            <span className={`text-sm sm:text-[16px] font-black tracking-tight ${variant === 'dark' ? 'text-slate-900' : 'text-white'}`}>Clinic</span>
            <span className="text-sm sm:text-[16px] font-black tracking-tight text-blue-600 ml-1">Digital</span>
            <span className="text-sm sm:text-[16px] font-black tracking-tight text-cyan-500 ml-1">Pro</span>
          </div>
          <span className={`hidden sm:inline-block text-[8px] font-extrabold tracking-widest uppercase mt-1 font-mono ${variant === 'dark' ? 'text-gray-400' : 'text-indigo-200/60'}`}>
            Grow Your Clinic. Digitally.
          </span>
        </div>
      )}
    </div>
  );
};
