import React from 'react';

interface NiponLogoProps {
  layout?: 'horizontal' | 'vertical';
  className?: string;
  inverse?: boolean; // true for dark background (white text), false for light background (black text)
  circleSize?: number;
  useOriginalImage?: boolean; // toggle to use either the uploaded high-res image or the dynamic SVG calligraphy
}

export default function NiponLogo({
  layout = 'horizontal',
  className = '',
  inverse = true,
  circleSize = 44,
  useOriginalImage = true
 }: NiponLogoProps) {
  
  const originalLogoUrl = "/src/assets/images/WhatsApp Image 2026-06-10 at 13.48.56.jpeg";
 
  // Render high-fidelity SVG calligraphy if the image is disabled or we fallback to it
  const renderCalligraphyCircle = () => {
    return (
      <svg
        width={circleSize}
        height={circleSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Red Circle (Hinomaru) representing the Rising Sun of Japan */}
        <circle cx="50" cy="50" r="42" fill="#E60012" />
        
        {/* Calligraphy strokes for '日' (Left side) */}
        <g fill="#000000" style={{ mixBlendMode: 'normal' }}>
          {/* Left vertical trunk */}
          <path d="M 23 34 C 23.5 34 24 37 24 48 C 24 59 23 71 22.5 73 C 22.5 74.5 20.5 75 20 73 C 19.5 71 20 59 20.5 48 C 21 37 22 34 23 34 Z" parser-id="日-1" />
          {/* Top bar and right vertical trunk with expressive corner hook */}
          <path d="M 23 34.5 C 28 34 36.5 33 42 33.5 C 44 33.5 45 35 44.5 38.5 C 43 50 43.5 66 43.5 72.5 C 43.5 74.5 42 75 39.5 73.5 C 37 72 38 64.5 38.5 49 C 39 36 32 37 23 37 Z" parser-id="日-2" strokeLinejoin="miter" strokeLinecap="round" />
          {/* Middle horizontal accent line representing the brush lift */}
          <path d="M 24 52.5 C 27.5 52 33.5 51.5 38.5 51.5 C 40 51.5 40.5 53 38 53.5 C 35 54 29 54.5 24 54.5 C 23 54.5 23.2 52.5 24 52.5 Z" parser-id="日-3" />
          {/* Bottom closing horizontal line */}
          <path d="M 23 70 C 27.5 69.5 32 69 37 69 C 39.5 69 40 70.5 37.5 71 C 32.5 71.5 27.5 72 23 72 C 21.5 72 21.5 70.5 23 70 Z" parser-id="日-4" />
        </g>
        
        {/* Calligraphy strokes for '本' (Right side) */}
        <g fill="#000000">
          {/* Main horizontal crossbar with soft entry and heavy exit brush terminals */}
          <path d="M 50.5 44 C 56.5 41 66.5 37.5 79.5 35 C 81.5 34.5 82.5 36 80.5 37.5 C 73 41 64.5 44.5 52.5 47 C 49.5 47.5 48.5 45.5 50.5 44 Z" parser-id="本-1" />
          {/* Central vertical trunk, slightly tapered */}
          <path d="M 65 17 C 66 17 66.5 20 L 65.5 77 C 65 80.5 62.5 81.5 62 79 L 63 21 C 63.5 17 64 17 65 17 Z" parser-id="本-2" />
          {/* Sweeping fluid left-downward diagonal tail */}
          <path d="M 64.5 45 C 61 53.5 54.5 64 45.5 71 C 43.5 72.5 42.5 70 44.5 68.5 C 52 61 58.5 51.5 61.5 43.5 C 62.5 42 64.5 42.5 64.5 45 Z" parser-id="本-3" />
          {/* Sweeping dynamic right-downward diagonal tail with heavy ink weight */}
          <path d="M 65.5 47 C 69 54.5 75.5 63 83 67.5 C 85 68.7 84.5 70.5 82 69.5 C 75.5 66.5 69 58 64.5 49 C 64 48 65 46.5 65.5 47 Z" parser-id="本-4" />
          {/* Short horizontal bar near base representing the origin/foundation notch */}
          <path d="M 57 61.5 C 60.5 60.5 65 59.5 69.5 59 C 71 59 71.5 60.5 69 61 C 64 61.5 59.5 62 57 62.5 C 55.5 62.5 55.5 61.5 57 61.5 Z" parser-id="本-5" />
        </g>
      </svg>
    );
  };
 
  // If useOriginalImage is active, we render the high-res uploaded logo screenshot beautifully
  if (useOriginalImage) {
    const isCentered = !className.includes('items-start');
    
    return (
      <>
        {/* Invisible SVG filter declaration to dynamically map black text/graphics to white while fully preserving the red circle */}
        <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="keep-red-white-text">
              {/* Generate white mask strictly for black/dark pixels where R is low but element is present (A is high) */}
              <feColorMatrix type="matrix" values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                -5 5 0 3 0" result="whiteMask"/>
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="whiteMask" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {layout === 'vertical' ? (
          <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'} ${className}`}>
            {/* Fully transparent wrapper without the white card */}
            <div className="hover:scale-105 transition-all duration-300 flex items-center justify-center max-w-[160px] sm:max-w-[180px]">
              <img 
                src={originalLogoUrl} 
                alt="Nipon Spa Original Logo" 
                className="object-contain w-full h-auto logo-filter-responsive"
                style={{ maxHeight: circleSize * 2.8 }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : (
          <div className={`flex items-center space-x-3.5 select-none ${className}`}>
            {/* Fully transparent, elegant, compact wrapper without the white badge */}
            <div className="flex items-center justify-center hover:scale-[1.03] transition-all duration-200">
              <img 
                src={originalLogoUrl} 
                alt="Nipon Spa Logo" 
                className="object-contain logo-filter-responsive"
                style={{ height: circleSize * 1.25, width: 'auto' }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback to dynamic SVG Calligraphy + Premium CSS Typography (Original look)
  if (layout === 'vertical') {
    const isCentered = !className.includes('items-start');
    return (
      <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'} ${className}`}>
        <div className="mb-3">
          {renderCalligraphyCircle()}
        </div>
        
        <div className={isCentered ? 'text-center' : 'text-left'}>
          <h2 className={`font-sans font-black tracking-[0.16em] text-2xl leading-none uppercase ${inverse ? 'text-white' : 'text-brand-black'}`}>
            NIPON
          </h2>
          <p className={`font-sans font-light tracking-[0.24em] text-[10.5px] uppercase mt-1.5 whitespace-nowrap ${inverse ? 'text-gray-400' : 'text-gray-600'}`}>
            SPA JAPONÊS
          </p>
        </div>
      </div>
    );
  }

  // Horizontal layout fallback
  return (
    <div className={`flex items-center space-x-3.5 select-none ${className}`}>
      {renderCalligraphyCircle()}
      
      <div className="flex flex-col text-left">
        <span className={`font-sans font-black tracking-[0.18em] text-base leading-none uppercase ${inverse ? 'text-white' : 'text-brand-black'}`}>
          NIPON
        </span>
        <span className={`font-sans font-light tracking-[0.26em] text-[9.5px] uppercase mt-1 ${inverse ? 'text-gray-400/90' : 'text-gray-500'}`}>
          SPA JAPONÊS
        </span>
      </div>
    </div>
  );
}
