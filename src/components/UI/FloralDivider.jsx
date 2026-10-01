import React from 'react';

export default function FloralDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 my-2 ${className}`}>
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold/50" />
      
      {/* Botanical SVG Leaf Ornament */}
      <svg className="w-8 h-8 text-gold opacity-85 animate-pulse-glow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M50 15 C 40 35, 20 40, 15 50 C 20 60, 40 65, 50 85 C 60 65, 80 60, 85 50 C 80 40, 60 35, 50 15 Z" strokeWidth="1.5" fill="rgba(181, 154, 99, 0.1)" />
        <path d="M50 25 L50 75" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="4" fill="#B59A63" />
        <circle cx="35" cy="45" r="2" fill="#D4B87C" />
        <circle cx="65" cy="45" r="2" fill="#D4B87C" />
      </svg>

      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}
