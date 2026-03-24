import React, { useEffect, useRef } from 'react';

const LionAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const strokes = svg.querySelectorAll<SVGPathElement>('.lion-stroke');
    strokes.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      const delay = 0.1 + i * 0.25;
      path.style.animation = `lion-draw 1.0s cubic-bezier(0.4,0,0.2,1) ${delay}s forwards`;
    });

    const fills = svg.querySelectorAll<SVGPathElement>('.lion-fill');
    fills.forEach((path, i) => {
      path.style.opacity = '0';
      path.style.animation = `lion-fill-in 0.7s ease-out ${0.05 + i * 0.12}s forwards`;
    });
  }, []);

  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 380 260"
        className="w-full max-w-[380px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <style>{`
            @keyframes lion-draw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes lion-fill-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes lion-glow-pulse {
              0%,100% { opacity: 0.08; }
              50%      { opacity: 0.18; }
            }
            .lion-stroke {
              fill: none;
              stroke: #a38a6a;
              stroke-width: 1.2;
              stroke-linecap: round;
              stroke-linejoin: round;
              opacity: 0;
            }
            .lion-fill {
              fill: #a38a6a;
              opacity: 0;
            }
            .lion-glow {
              fill: none;
              stroke: #a38a6a;
              stroke-width: 0.8;
              opacity: 0;
              animation: lion-glow-pulse 3s ease-in-out 2s infinite;
            }
          `}</style>
        </defs>

        {/* Glow halo behind mane */}
        <ellipse className="lion-glow" cx="180" cy="130" rx="130" ry="100" />

        {/* MANE — left side flowing arcs */}
        <path className="lion-stroke" d="M 260 68 C 232 62, 200 60, 168 62 C 134 64, 100 70, 72 78 C 48 85, 30 92, 18 98" />
        <path className="lion-stroke" d="M 264 76 C 238 70, 206 68, 172 70 C 138 72, 104 78, 76 87 C 52 95, 34 103, 22 110" />
        <path className="lion-stroke" d="M 266 84 C 242 78, 210 77, 176 80 C 142 83, 108 90, 80 100 C 56 108, 38 117, 28 124" />
        <path className="lion-stroke" d="M 264 92 C 242 87, 212 87, 178 91 C 144 95, 112 104, 86 114 C 64 122, 46 132, 36 140" />
        <path className="lion-stroke" d="M 258 100 C 238 96, 210 97, 178 102 C 144 107, 114 117, 92 128 C 74 137, 58 146, 50 153" />
        <path className="lion-stroke" d="M 250 108 C 232 105, 206 107, 176 114 C 144 121, 116 132, 98 143 C 82 152, 70 160, 64 166" />
        <path className="lion-stroke" d="M 240 115 C 224 113, 200 117, 174 126 C 146 135, 122 148, 106 159 C 92 168, 82 176, 78 182" />

        {/* BODY — facing right, sleek silhouette */}
        <path className="lion-stroke" d="M 78 182 C 64 178, 50 172, 40 163 C 32 156, 28 148, 30 140 C 32 132, 40 124, 52 118 C 64 112, 80 110, 98 112 C 118 114, 140 120, 162 130 C 184 140, 206 154, 224 170 C 242 186, 256 204, 262 222 C 266 232, 268 242, 266 250 C 264 258, 260 264, 254 268 C 248 272, 240 274, 232 274 C 222 274, 212 271, 202 266 C 192 261, 182 254, 174 245 C 164 234, 156 220, 152 206 C 148 192, 146 178, 148 166 C 149 156, 154 149, 160 145 C 166 141, 174 140, 184 143 C 194 146, 206 153, 218 162 C 232 172, 248 184, 262 194 C 276 204, 288 212, 296 216 C 304 220, 310 222, 314 222" />

        {/* NECK — up to head facing right */}
        <path className="lion-stroke" d="M 314 222 C 314 220, 312 216, 308 210 C 302 202, 292 192, 278 180 C 262 166, 242 152, 220 140 C 198 128, 174 118, 154 112 C 140 108, 130 106, 124 108 C 120 109, 118 112, 118 116 C 118 120, 122 126, 130 132 C 140 140, 156 148, 176 156 C 196 164, 220 172, 244 178 C 260 182, 274 184, 284 184 C 292 184, 298 182, 302 178 C 306 174, 308 170, 308 166" />

        {/* FACE profile — right-facing head */}
        <path className="lion-stroke" d="M 308 166 C 310 162, 310 157, 308 152 C 305 146, 300 140, 292 134 C 282 126, 270 118, 256 112 C 242 106, 228 102, 216 100 C 206 99, 198 100, 192 104 C 188 107, 186 112, 188 117 C 191 124, 200 131, 214 138 C 228 145, 246 152, 264 158 C 280 163, 294 166, 304 168 C 312 169, 318 169, 322 167 C 325 165, 326 162, 326 158 C 326 153, 322 148, 316 144 C 308 139, 296 134, 282 130 C 268 126, 252 123, 238 122 C 226 121, 216 122, 210 126 C 206 129, 205 134, 208 140 C 212 148, 222 156, 236 163 C 250 170, 268 176, 286 180 C 298 183, 308 184, 314 183" />

        {/* EYE — small circle */}
        <circle className="lion-fill" cx="270" cy="152" r="4" />

        {/* NOSE tip */}
        <ellipse className="lion-fill" cx="326" cy="162" rx="6" ry="4" />
      </svg>
    </div>
  );
};

export default LionAnimation;
