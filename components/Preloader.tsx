import React, { useState, useEffect } from 'react';
import LionAnimation from './LionAnimation';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-[#0b0f16] flex flex-col items-center justify-center transition-opacity duration-700 ease-out"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <div className="mb-6">
        <LionAnimation />
      </div>
      <div 
        className="text-[#C5A059] tracking-[0.5em] uppercase text-xs animate-pulse"
        style={{ 
          fontFamily: "'Playfair Display', serif",
          animation: 'pulse 2s cubic-bezier(.4, 0, .6, 1) infinite'
        }}
      >
        Pathmakers
      </div>
      <div 
        className="text-white/30 tracking-[0.3em] uppercase text-[10px] mt-3 animate-pulse"
        style={{ 
          fontFamily: "'JetBrains Mono', monospace",
          animation: 'pulse 2s cubic-bezier(.4, 0, .6, 1) infinite',
          animationDelay: '0.3s'
        }}
      >
        AI Intelligence
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
