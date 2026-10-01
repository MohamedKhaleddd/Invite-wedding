import React from 'react';

export default function GoldBorder({ children, className = "" }) {
  return (
    <div className={`relative p-6 sm:p-10 border border-gold/30 rounded-sm bg-dark/40 backdrop-blur-md shadow-2xl ${className}`}>
      {/* Corner Ornaments */}
      <svg className="absolute -top-2 -left-2 w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 14V2H14M2 2L9 9" />
      </svg>
      <svg className="absolute -top-2 -right-2 w-6 h-6 text-gold transform rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 14V2H14M2 2L9 9" />
      </svg>
      <svg className="absolute -bottom-2 -left-2 w-6 h-6 text-gold transform -rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 14V2H14M2 2L9 9" />
      </svg>
      <svg className="absolute -bottom-2 -right-2 w-6 h-6 text-gold transform rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 14V2H14M2 2L9 9" />
      </svg>

      {/* Inner thin frame line */}
      <div className="absolute inset-1.5 border border-gold/15 pointer-events-none rounded-xs" />

      {children}
    </div>
  );
}
