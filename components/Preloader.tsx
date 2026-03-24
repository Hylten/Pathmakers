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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .letter {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: letterDraw 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .letter-1 { animation-delay: 0.1s; }
        .letter-2 { animation-delay: 0.2s; }
        .letter-3 { animation-delay: 0.3s; }
        .letter-4 { animation-delay: 0.4s; }
        .letter-5 { animation-delay: 0.5s; }
        .letter-6 { animation-delay: 0.6s; }
        .letter-7 { animation-delay: 0.7s; }
      `}</style>

      <svg viewBox="0 0 280 70" className="w-full max-w-[280px]">
        {/* P */}
        <path 
          d="M 15 55 L 15 15 L 28 15 L 28 30 L 28 55 M 28 23 L 40 23 L 40 35 L 28 35 L 28 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-1"
        />
        
        {/* A */}
        <path 
          d="M 45 55 L 53 15 L 61 55 M 47 43 L 59 43" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-2"
        />
        
        {/* T */}
        <path 
          d="M 65 15 L 90 15 M 77 15 L 77 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-3"
        />
        
        {/* H */}
        <path 
          d="M 95 15 L 95 55 M 95 35 L 120 35 M 120 15 L 120 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-4"
        />
        
        {/* M */}
        <path 
          d="M 125 55 L 125 15 L 142 40 L 159 15 L 159 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-5"
        />
        
        {/* A */}
        <path 
          d="M 163 55 L 171 15 L 179 55 M 165 43 L 177 43" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-6"
        />
        
        {/* K */}
        <path 
          d="M 185 15 L 185 55 M 205 15 L 185 35 L 205 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-7"
        />
        
        {/* E */}
        <path 
          d="M 210 15 L 235 15 M 210 35 L 230 35 M 210 55 L 235 55 M 210 15 L 210 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-7"
        />
        
        {/* R */}
        <path 
          d="M 240 55 L 240 15 L 255 15 L 255 30 L 255 55 M 255 23 L 268 23 L 268 35 L 255 40 L 268 55" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="letter letter-7"
        />
      </svg>
    </div>
  );
};

export default Preloader;
