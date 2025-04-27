import React from 'react';

interface MashLogoProps {
  className?: string;
}

export const MashLogo: React.FC<MashLogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-full bg-[#00cbdd] flex items-center justify-center text-[#00031b] font-bold text-lg">
        M
      </div>
    </div>
  );
};

export default MashLogo;

