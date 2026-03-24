import React from 'react';

const LionAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <svg
        viewBox="0 0 260 175"
        className="w-full max-w-[260px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lion silhouette animation"
      >
        <style>{`
          .lion-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          .d1  { animation-delay: 0.05s; }
          .d2  { animation-delay: 0.18s; }
          .d3  { animation-delay: 0.31s; }
          .d4  { animation-delay: 0.44s; }
          .d5  { animation-delay: 0.57s; }
          .d6  { animation-delay: 0.70s; }
          .d7  { animation-delay: 0.83s; }
          .d8  { animation-delay: 1.00s; }
          .d9  { animation-delay: 1.15s; }
          .d10 { animation-delay: 1.28s; }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }

          .lion-fill {
            opacity: 0;
            animation: fadeIn 0.6s ease-out forwards;
            animation-delay: 1.5s;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .lion-glow {
            opacity: 0;
            animation: glowPulse 3s ease-in-out 1.8s infinite;
          }
          @keyframes glowPulse {
            0%, 100% { opacity: 0.06; }
            50%       { opacity: 0.16; }
          }
        `}</style>

        {/* Glow behind mane */}
        <ellipse cx="130" cy="88" rx="72" ry="55"
          fill="none" stroke="#a38a6a" strokeWidth="0.8"
          className="lion-glow" />

        {/* MANE — 7 flowing arcs */}
        <path d="M 178 48 C 158 44, 134 43, 112 46 C 88 49, 64 54, 46 60 C 30 65, 18 70, 10 74"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d1" />
        <path d="M 182 56 C 162 52, 138 51, 116 54 C 92 57, 68 63, 50 70 C 35 76, 23 81, 15 85"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d2" />
        <path d="M 184 64 C 165 60, 142 59, 120 62 C 96 65, 72 72, 54 80 C 40 86, 28 92, 20 97"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d3" />
        <path d="M 182 72 C 164 69, 142 69, 120 73 C 96 77, 74 85, 58 94 C 46 100, 35 107, 28 112"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d4" />
        <path d="M 176 80 C 160 77, 140 78, 120 83 C 96 88, 76 97, 62 106 C 51 112, 42 118, 37 122"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d5" />
        <path d="M 168 87 C 154 85, 136 87, 118 93 C 98 99, 80 108, 68 117 C 58 124, 50 130, 46 134"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d6" />
        <path d="M 158 93 C 146 92, 130 95, 114 102 C 96 110, 80 120, 70 129 C 62 136, 56 142, 54 146"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d7" />

        {/* BODY */}
        <path d="M 54 146 C 42 143, 30 136, 24 129 C 19 123, 16 115, 18 108 C 20 100, 27 93, 36 87 C 45 81, 58 78, 72 79 C 88 80, 106 86, 124 94 C 142 102, 160 114, 174 128 C 188 142, 198 158, 204 174 C 208 184, 210 193, 208 200 C 206 207, 202 214, 196 219 C 190 224, 182 227, 174 228 C 166 229, 158 228, 150 226 C 142 224, 134 220, 128 215 C 120 208, 114 199, 110 188 C 106 177, 104 165, 103 153 C 102 141, 102 129, 104 118 C 105 110, 110 103, 117 99 C 124 95, 133 93, 144 96 C 155 99, 168 106, 180 115 C 192 124, 206 135, 218 146 C 230 157, 240 168, 246 177 C 250 183, 252 187, 254 190"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d8" />

        {/* NECK */}
        <path d="M 254 190 C 254 186, 250 179, 244 170 C 236 159, 224 146, 208 133 C 190 118, 168 104, 146 93 C 124 82, 102 75, 86 72 C 74 70, 66 70, 62 72 C 60 73, 60 76, 62 79 C 64 83, 72 90, 82 97 C 96 106, 116 117, 140 128 C 164 139, 188 150, 206 159 C 218 165, 226 168, 230 170"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d9" />

        {/* HEAD */}
        <path d="M 230 170 C 234 164, 236 157, 234 150 C 231 142, 225 134, 216 126 C 204 115, 188 106, 170 99 C 152 92, 134 89, 120 89 C 108 89, 100 92, 96 98 C 93 102, 94 107, 100 112 C 107 119, 120 127, 138 134 C 156 141, 178 148, 200 154 C 218 159, 234 163, 246 167"
          fill="none" stroke="#a38a6a" strokeWidth="1.5" strokeLinecap="round"
          className="lion-draw d10" />

        {/* Eye */}
        <circle cx="196" cy="141" r="4" fill="#a38a6a" className="lion-fill" />

        {/* Nose */}
        <ellipse cx="246" cy="160" rx="5" ry="3.5" fill="#a38a6a" className="lion-fill" />
      </svg>
    </div>
  );
};

export default LionAnimation;
