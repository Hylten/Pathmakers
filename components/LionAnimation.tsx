import React from 'react';

const LionAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <svg
        viewBox="0 0 300 200"
        className="w-full max-w-[300px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lion silhouette animation"
      >
        <style>{`
          .lion-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .d1  { animation-delay: 0.1s; }
          .d2  { animation-delay: 0.25s; }
          .d3  { animation-delay: 0.4s; }
          .d4  { animation-delay: 0.55s; }
          .d5  { animation-delay: 0.7s; }
          .d6  { animation-delay: 0.85s; }
          .d7  { animation-delay: 1.0s; }
          .d8  { animation-delay: 1.2s; }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }

          .lion-fill {
            opacity: 0;
            animation: fadeIn 0.8s ease-out forwards;
            animation-delay: 2s;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .lion-glow {
            opacity: 0;
            animation: glowPulse 4s ease-in-out 2.5s infinite;
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.08; }
            50%       { opacity: 0.2; }
          }
        `}</style>

        {/* Glow behind lion */}
        <ellipse cx="150" cy="100" rx="85" ry="60"
          fill="none" stroke="#C5A059" strokeWidth="1"
          className="lion-glow" />

        {/* MANE - big flowing mane around head */}
        <path d="M 240 45 C 220 35, 195 30, 170 32 C 145 34, 120 42, 100 55 C 85 65, 75 78, 70 92 C 68 100, 70 108, 75 115"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d1" />
        <path d="M 245 55 C 225 45, 200 40, 175 42 C 150 44, 125 52, 105 65 C 90 75, 78 88, 72 102 C 70 110, 72 118, 78 125"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d1" />
        <path d="M 248 68 C 228 58, 203 53, 178 55 C 153 57, 128 65, 108 78 C 93 88, 82 100, 76 114 C 74 122, 76 130, 82 137"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d2" />
        <path d="M 245 82 C 228 74, 205 70, 182 72 C 158 75, 135 83, 115 95 C 100 105, 90 116, 85 128 C 83 135, 86 142, 92 148"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d2" />
        <path d="M 238 95 C 222 88, 200 85, 178 88 C 156 91, 135 98, 118 108 C 104 117, 95 127, 92 138 C 90 145, 94 152, 100 158"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d3" />
        <path d="M 228 108 C 212 102, 192 100, 172 103 C 152 106, 132 113, 118 122 C 105 130, 98 140, 96 150 C 95 156, 100 162, 108 167"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d3" />

        {/* FACE - profile */}
        <path d="M 92 148 C 85 155, 80 165, 80 175 C 80 185, 85 192, 95 196 C 105 200, 118 200, 130 198"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d4" />

        {/* SNOUT */}
        <path d="M 95 196 C 100 198, 108 198, 118 196 C 128 194, 138 190, 145 185"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d5" />
        
        {/* NOSE */}
        <path d="M 145 185 C 148 182, 150 178, 150 175 C 150 172, 148 168, 145 165"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d5" />

        {/* EYE */}
        <circle cx="120" cy="115" r="5" fill="#C5A059" className="lion-fill" />

        {/* EAR */}
        <path d="M 155 70 C 158 60, 165 55, 175 55 C 182 55, 188 60, 190 68 C 192 75, 190 82, 185 85"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d6" />

        {/* BODY - chest and front legs */}
        <path d="M 80 175 C 70 180, 60 190, 55 205 C 52 215, 55 225, 65 232 C 75 238, 90 240, 105 238"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d6" />
        
        {/* FRONT LEGS */}
        <path d="M 65 232 C 60 238, 58 248, 62 258 C 66 265, 75 268, 85 268 C 92 268, 98 265, 100 260"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d7" />
        
        <path d="M 90 235 C 82 242, 78 252, 80 262 C 82 270, 90 275, 100 275 C 108 275, 115 270, 118 263"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d7" />

        {/* BELLY */}
        <path d="M 105 238 C 125 235, 150 232, 175 235 C 200 238, 220 245, 235 255"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d7" />

        {/* BACK HIND LEGS */}
        <path d="M 235 255 C 245 262, 252 272, 255 282 C 258 290, 255 298, 248 302 C 240 306, 228 305, 218 300"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />
        
        <path d="M 218 300 C 210 305, 205 315, 208 325 C 212 332, 222 335, 232 335 C 240 335, 248 330, 252 322"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />

        {/* TAIL */}
        <path d="M 255 282 C 265 275, 275 268, 280 258 C 285 248, 285 238, 278 230 C 272 224, 262 222, 252 225"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />
        
        {/* TAIL TUFT */}
        <circle cx="278" cy="228" r="8" fill="none" stroke="#C5A059" strokeWidth="2"
          className="lion-draw d8" />

      </svg>
    </div>
  );
};

export default LionAnimation;
