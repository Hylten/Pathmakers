import React, { useState, useEffect, useRef } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4 seconds total
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rows = Math.floor(canvas.height / fontSize);

    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.floor(Math.random() * rows);
    }

    const startTime = Date.now();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      const elapsed = Date.now() - startTime;
      
      // We will render PATHMAKER for the first half (0 to 2000ms)
      const showPathmaker = elapsed < 2000;

      for (let i = 0; i < rainDrops.length; i++) {
        let text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

        if (showPathmaker) {
          const word = "PATHMAKER";
          const startCol = Math.floor((columns - word.length) / 2);
          const targetRow = Math.floor(rows / 2);

          if (i >= startCol && i < startCol + word.length) {
            const charIndex = i - startCol;
            
            if (rainDrops[i] >= targetRow) {
               ctx.fillStyle = '#FFFFFF';
               ctx.shadowBlur = 8;
               ctx.shadowColor = '#FFFFFF';
               ctx.fillText(word[charIndex], i * fontSize, targetRow * fontSize);
               ctx.shadowBlur = 0;
            }

            if (rainDrops[i] === targetRow) {
               text = word[charIndex];
               ctx.fillStyle = '#FFFFFF';
            }
          }
        }

        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const intervalId = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      
      {/* Container for Lion overlay, hidden for first 2s, fading in from 2s to 4s */}
      <div className="relative z-10 text-center animate-[lionFadeIn_4s_ease-out_forwards] pointer-events-none">
        <img
          src="https://i.postimg.cc/1XnVpHkM/Screenshot-2026-01-18-at-18-20-12-Photoroom.png"
          alt="Pathmaker Lion"
          className="h-32 w-32 md:h-48 md:w-48 object-contain rounded-sm brightness-0 invert filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
      </div>

      <style>{`
        @keyframes lionFadeIn {
          0% { opacity: 0; transform: scale(0.9); filter: blur(10px); }
          45% { opacity: 0; transform: scale(0.95); filter: blur(5px); }
          55% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
