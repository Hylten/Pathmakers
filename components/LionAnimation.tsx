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
            animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .d1  { animation-delay: 0.1s; }
          .d2  { animation-delay: 0.3s; }
          .d3  { animation-delay: 0.5s; }
          .d4  { animation-delay: 0.7s; }
          .d5  { animation-delay: 0.9s; }
          .d6  { animation-delay: 1.1s; }
          .d7  { animation-delay: 1.3s; }
          .d8  { animation-delay: 1.5s; }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }

          .lion-fill {
            opacity: 0;
            animation: fadeIn 0.8s ease-out forwards;
            animation-delay: 2.2s;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .lion-glow {
            opacity: 0;
            animation: glowPulse 4s ease-in-out 2.8s infinite;
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.08; }
            50%       { opacity: 0.2; }
          }
        `}</style>

        {/* Glow behind lion */}
        <ellipse cx="150" cy="100" rx="90" ry="65"
          fill="none" stroke="#C5A059" strokeWidth="1"
          className="lion-glow" />

        {/* TAIL - on right side now */}
        <path d="M 45 255 C 35 248, 25 238, 20 225 C 15 212, 15 200, 22 190 C 28 182, 38 178, 48 180"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d1" />
        
        {/* TAIL TUFT */}
        <circle cx="20" cy="188" r="10" fill="none" stroke="#C5A059" strokeWidth="2"
          className="lion-draw d1" />

        {/* BACK HIND LEGS - right side */}
        <path d="M 55 255 C 45 265, 40 278, 45 292 C 50 305, 65 315, 82 315 C 95 315, 108 308, 115 298"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d2" />
        
        <path d="M 82 310 C 75 318, 72 328, 78 338 C 84 346, 98 350, 112 348 C 122 346, 130 338, 132 328"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d2" />

        {/* BELLY */}
        <path d="M 115 298 C 140 290, 170 285, 200 288 C 230 292, 255 302, 272 318"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d3" />

        {/* FRONT LEGS - left side */}
        <path d="M 210 315 C 200 322, 195 335, 200 348 C 205 360, 220 368, 238 368 C 252 368, 262 360, 265 350"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d4" />
        
        <path d="M 235 365 C 225 372, 218 382, 222 394 C 226 404, 240 410, 255 408 C 266 406, 275 396, 278 385"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d4" />

        {/* CHEST */}
        <path d="M 272 318 C 282 325, 290 338, 292 352 C 294 365, 290 378, 280 388 C 270 398, 255 402, 240 402"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d5" />

        {/* MANE - large mane around head on left side */}
        <path d="M 280 250 C 295 235, 305 215, 308 195 C 310 175, 308 155, 300 138 C 292 122, 280 108, 265 98 C 250 88, 232 82, 215 80 C 198 78, 182 80, 168 85"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d5" />
        <path d="M 285 240 C 300 225, 312 205, 315 185 C 318 165, 316 145, 308 128 C 300 112, 288 98, 272 88 C 258 79, 240 74, 222 73 C 205 72, 188 75, 172 82"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d6" />
        <path d="M 288 230 C 303 215, 315 195, 318 175 C 321 155, 319 135, 310 118 C 302 102, 290 88, 275 78 C 260 69, 242 64, 224 63 C 207 62, 190 66, 175 74"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d6" />
        <path d="M 288 220 C 302 206, 314 188, 316 170 C 318 152, 315 134, 306 118 C 298 103, 285 90, 270 81 C 255 72, 238 68, 220 68 C 203 68, 186 73, 172 82"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d6" />
        <path d="M 285 210 C 298 197, 308 180, 310 163 C 312 147, 308 130, 298 116 C 288 102, 275 90, 260 82 C 245 74, 228 70, 212 71 C 195 72, 178 78, 165 88"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d7" />
        <path d="M 280 200 C 292 188, 302 172, 303 156 C 304 140, 300 124, 290 110 C 280 97, 266 86, 250 79 C 235 72, 218 69, 202 71 C 185 73, 168 80, 155 90"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d7" />

        {/* HEAD - facing right */}
        <path d="M 202 71 C 192 72, 180 76, 168 82 C 155 89, 145 98, 138 108 C 130 120, 125 133, 125 147 C 125 160, 130 172, 138 182 C 145 191, 155 198, 165 202"
          fill="none" stroke="#C5A059" strokeWidth="2.5" strokeLinecap="round"
          className="lion-draw d7" />

        {/* SNOUT - pointing right */}
        <path d="M 165 202 C 172 206, 180 208, 188 208 C 198 208, 208 204, 215 198"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />

        {/* NOSE */}
        <path d="M 215 198 C 218 195, 220 190, 220 185 C 220 180, 218 175, 215 172"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />

        {/* EYE - lower, in face area */}
        <circle cx="175" cy="135" r="5" fill="#C5A059" className="lion-fill" />

        {/* EAR */}
        <path d="M 190 95 C 195 85, 205 78, 218 78 C 228 78, 238 84, 245 94 C 250 102, 252 112, 250 120"
          fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
          className="lion-draw d8" />

        {/* BROW RIDGE */}
        <path d="M 165 115 C 175 110, 188 108, 200 110 C 212 112, 222 118, 228 125"
          fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d8" />

        {/* WHISKER DOTS */}
        <circle cx="208" cy="188" r="1.5" fill="#C5A059" className="lion-fill" />
        <circle cx="212" cy="182" r="1.5" fill="#C5A059" className="lion-fill" />
        <circle cx="215" cy="176" r="1.5" fill="#C5A059" className="lion-fill" />

      </svg>
    </div>
  );
};

export default LionAnimation;
