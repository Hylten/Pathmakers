import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 seconds total
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible && document.readyState === "complete") return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[#0b0f16] flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.8s ease-out'
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* PATHMAKER Text - Large, sharp, minimal glow */}
        <div className="absolute inset-0 flex items-center justify-center animate-[pathmakerSeq_4s_linear_forwards]">
          <h1 className="text-white font-serif text-4xl md:text-6xl tracking-[0.4em] uppercase font-medium">
            PATHMAKER
          </h1>
        </div>

        {/* Lion Logo - Smaller, strong white glow */}
        <div className="absolute inset-0 flex items-center justify-center animate-[lionSeq_4s_linear_forwards]">
          <img
            src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
            alt="Pathmaker Lion"
            className="h-24 w-24 md:h-32 md:w-32 object-contain rounded-sm brightness-0 invert filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          />
        </div>

      </div>

      <style>{`
        /* 
          Total 4 seconds = 100%
          0-2s (0% - 50%): Pathmaker Text
          2-4s (50% - 100%): Lion Logo
        */
        @keyframes pathmakerSeq {
          0% { opacity: 0; transform: scale(0.95); filter: blur(4px); }
          10% { opacity: 1; transform: scale(1); filter: blur(0px); }
          40% { opacity: 1; transform: scale(1); filter: blur(0px); }
          50% { opacity: 0; transform: scale(1.05); filter: blur(6px); }
          100% { opacity: 0; }
        }

        @keyframes lionSeq {
          0% { opacity: 0; transform: scale(0.9); }
          45% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
          55% { opacity: 1; transform: scale(1); filter: blur(0px); }
          90% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.1); filter: blur(10px); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
