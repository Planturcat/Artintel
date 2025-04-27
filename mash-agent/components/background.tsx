import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#00031b]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00cbdd 1px, transparent 1px), linear-gradient(to bottom, #00cbdd 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      ></div>
      
      {/* Glow effects */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00cbdd]/5 blur-[100px]"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#00cbdd]/5 blur-[100px]"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default Background; 