import React, { useState, useEffect } from 'react';

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
      className="fixed inset-0 z-[99999] bg-[#0b0f16] flex flex-col items-center justify-center"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.8s ease-out'
      }}
    >
      <style>{`
        @keyframes letterDraw {
          from { 
            stroke-dashoffset: 100;
            opacity: 0;
          }
          to { 
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes fillIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .letter {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: letterDraw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .letter-fill {
          opacity: 0;
          animation: fillIn 0.5s ease-out forwards;
        }
        .letter-1 { animation-delay: 0.1s; }
        .letter-2 { animation-delay: 0.2s; }
        .letter-3 { animation-delay: 0.3s; }
        .letter-4 { animation-delay: 0.4s; }
        .letter-5 { animation-delay: 0.5s; }
        .letter-6 { animation-delay: 0.6s; }
        .letter-7 { animation-delay: 0.7s; }
        .letter-8 { animation-delay: 0.8s; }
      `}</style>

      <svg viewBox="0 0 320 80" className="w-full max-w-[320px]">
        {/* P */}
        <path 
          d="M 20 65 L 20 15 L 35 15 L 35 35 L 35 65 M 35 25 L 50 25 L 50 40 L 35 40 L 35 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-1"
        />
        
        {/* A */}
        <path 
          d="M 55 65 L 65 15 L 75 65 M 58 50 L 72 50" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-2"
        />
        
        {/* T */}
        <path 
          d="M 80 15 L 110 15 M 95 15 L 95 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-3"
        />
        
        {/* H */}
        <path 
          d="M 115 15 L 115 65 M 115 40 L 145 40 M 145 15 L 145 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-4"
        />
        
        {/* M */}
        <path 
          d="M 150 65 L 150 15 L 170 45 L 190 15 L 190 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-5"
        />
        
        {/* A */}
        <path 
          d="M 195 65 L 205 15 L 215 65 M 198 50 L 212 50" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-6"
        />
        
        {/* K */}
        <path 
          d="M 220 15 L 220 65 M 245 15 L 220 40 L 245 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-7"
        />
        
        {/* E */}
        <path 
          d="M 250 15 L 280 15 M 250 40 L 275 40 M 250 65 L 280 65 M 250 15 L 250 65" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-8"
        />
      </svg>

      <div 
        className="mt-4 text-[#C5A059] tracking-[0.4em] uppercase text-[10px]"
        style={{ 
          fontFamily: "'JetBrains Mono', monospace",
          opacity: 0,
          animation: 'fillIn 0.5s ease-out 1.5s forwards'
        }}
      >
        <style>{`
          @keyframes fillIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 0.5; transform: translateY(0); }
          }
        `}</style>
        Intelligence
      </div>
    </div>
  );
};

export default Preloader;
