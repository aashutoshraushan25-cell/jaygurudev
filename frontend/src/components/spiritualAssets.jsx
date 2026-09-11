import React from 'react';

/**
 * Official Jay Guru Dev Emblem Logo (with transparent background)
 */
export const LotusLogo = ({ className = 'w-11 h-11' }) => (
  <img
    src="/logo.png"
    alt="जय गुरु देव पावन प्रतीक"
    className={`${className} object-contain select-none`}
    onError={(e) => {
      e.target.style.display = 'none';
      if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
    }}
  />
);


/**
 * Guru Ji's Serene Portrait Illustration with Abhaya Mudra Blessing Hand and Divine Aura
 */
export const GuruJiPortrait = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Subtle soft divine aura radial glow */}
    <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-200/50 via-orange-100/40 to-transparent blur-2xl -z-0 pointer-events-none" />
    
    <svg
      viewBox="0 0 340 360"
      className="w-full h-auto max-h-[340px] drop-shadow-lg select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="haloGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FDE68A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F9F6F0" />
          <stop offset="100%" stopColor="#ECE4D8" />
        </linearGradient>
        <linearGradient id="beardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F3F0EA" />
          <stop offset="100%" stopColor="#E2DDD5" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8D3B0" />
          <stop offset="60%" stopColor="#EAB98F" />
          <stop offset="100%" stopColor="#D99B6A" />
        </linearGradient>
        <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5EFE6" />
          <stop offset="100%" stopColor="#E6DCCE" />
        </linearGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" floodColor="#780016" />
        </filter>
      </defs>

      {/* Divine Golden Halo */}
      <circle cx="170" cy="140" r="130" fill="url(#haloGlow)" />

      {/* Main Body & White Spiritual Robes */}
      <g filter="url(#softShadow)">
        {/* Torso / Robe */}
        <path
          d="M60 360 C65 290 90 260 130 250 C150 255 190 255 210 250 C250 260 275 290 280 360 Z"
          fill="url(#robeGrad)"
          stroke="#E5DACD"
          strokeWidth="1.5"
        />
        {/* Shawl folds */}
        <path
          d="M85 360 C95 300 130 270 170 275 C210 270 245 300 255 360"
          fill="none"
          stroke="#D4C8B8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M120 280 C140 310 150 340 155 360"
          fill="none"
          stroke="#DDD2C4"
          strokeWidth="1.5"
        />
        <path
          d="M220 280 C200 310 190 340 185 360"
          fill="none"
          stroke="#DDD2C4"
          strokeWidth="1.5"
        />

        {/* Head and Face Base */}
        <ellipse cx="170" cy="145" rx="52" ry="58" fill="url(#skinGrad)" />

        {/* White Spiritual Head Cover / Cloth */}
        <path
          d="M108 135 C108 80 130 55 170 55 C210 55 232 80 232 135 C232 140 228 145 224 140 C218 85 204 70 170 70 C136 70 122 85 116 140 C112 145 108 140 108 135 Z"
          fill="url(#turbanGrad)"
          stroke="#DFD5C7"
          strokeWidth="1.2"
        />
        <path
          d="M112 110 C130 65 210 65 228 110"
          fill="none"
          stroke="#ECE2D4"
          strokeWidth="2"
        />

        {/* Forehead and Brow */}
        <path
          d="M142 125 Q154 120 162 125"
          fill="none"
          stroke="#A66F48"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M178 125 Q186 120 198 125"
          fill="none"
          stroke="#A66F48"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Sacred Tilak / Chandan on Forehead */}
        <path
          d="M168 100 Q170 94 172 100 L171 114 Q170 116 169 114 Z"
          fill="#C27803"
        />
        <circle cx="170" cy="118" r="2.5" fill="#82121E" />

        {/* Serene Smiling Eyes */}
        <path
          d="M144 135 Q153 141 161 135"
          fill="none"
          stroke="#4A2810"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M179 135 Q187 141 196 135"
          fill="none"
          stroke="#4A2810"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Subtle eye smile creases */}
        <path d="M140 134 Q138 138 141 140" stroke="#B37E55" strokeWidth="1" fill="none" />
        <path d="M200 134 Q202 138 199 140" stroke="#B37E55" strokeWidth="1" fill="none" />

        {/* Gentle Nose */}
        <path
          d="M170 128 L168 152 Q170 156 174 153"
          fill="none"
          stroke="#BD7E50"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Gentle Smile under Mustache */}
        <path
          d="M158 166 Q170 174 182 166"
          fill="none"
          stroke="#9C5230"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Flowing Sacred White Beard & Mustache */}
        <path
          d="M142 155 C132 168 120 200 128 230 C136 260 155 285 170 288 C185 285 204 260 212 230 C220 200 208 168 198 155 C186 162 178 164 170 164 C162 164 154 162 142 155 Z"
          fill="url(#beardGrad)"
          stroke="#E5DACD"
          strokeWidth="1.5"
        />
        {/* Beard hair strand details */}
        <path d="M148 180 Q152 230 162 270" stroke="#ECE4D8" strokeWidth="1.5" fill="none" />
        <path d="M170 170 L170 280" stroke="#E2D7C8" strokeWidth="1.5" fill="none" />
        <path d="M192 180 Q188 230 178 270" stroke="#ECE4D8" strokeWidth="1.5" fill="none" />
        <path d="M136 205 Q145 240 165 275" stroke="#F5EFE6" strokeWidth="1.2" fill="none" />
        <path d="M204 205 Q195 240 175 275" stroke="#F5EFE6" strokeWidth="1.2" fill="none" />

        {/* Revered Blessing Hand (Abhaya Mudra on Left/Center) */}
        <g transform="translate(48, 160)">
          {/* Hand Glow */}
          <circle cx="32" cy="40" r="38" fill="#FEF3C7" opacity="0.6" />
          {/* Palm Base */}
          <path
            d="M20 38 C15 30 18 10 24 6 C28 4 33 8 32 18 L33 4 C37 2 41 4 41 16 L42 2 C46 1 50 3 50 16 L50 6 C54 5 58 8 57 22 C56 36 52 56 46 68 C38 72 26 70 20 62 C16 54 16 46 20 38 Z"
            fill="url(#skinGrad)"
            stroke="#C48455"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Thumb */}
          <path
            d="M19 36 C13 38 6 42 8 48 C10 52 18 50 22 44"
            fill="url(#skinGrad)"
            stroke="#C48455"
            strokeWidth="1.5"
          />
          {/* Palm Lines (Hastarekha / Sacred marks) */}
          <path d="M26 36 Q34 44 42 42" stroke="#B36F40" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M28 46 Q36 50 40 60" stroke="#B36F40" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* White sleeve cuff */}
          <path
            d="M15 65 C25 60 45 60 55 68 L50 90 C35 88 20 88 10 90 Z"
            fill="url(#robeGrad)"
            stroke="#DCD0C0"
            strokeWidth="1.5"
          />
        </g>
      </g>
    </svg>
  </div>
);

/**
 * Mathura Ashram Temple Architecture Artwork (Matching Right Side of Hero Banner)
 */
export const AshramTempleArt = ({ className = 'w-full h-full' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg
      viewBox="0 0 380 340"
      className="w-full h-auto max-h-[320px] drop-shadow-md select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="templeMarble" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F9F6F0" />
          <stop offset="100%" stopColor="#E9DFD2" />
        </linearGradient>
        <linearGradient id="domeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F4ECE1" />
          <stop offset="100%" stopColor="#D9CBB9" />
        </linearGradient>
        <linearGradient id="goldKalash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Sky subtle gradient / clouds */}
      <path
        d="M20 280 C60 270 120 285 180 275 C240 265 300 280 360 270"
        stroke="#E2D7C8"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Base Platform / Steps */}
      <rect x="30" y="270" width="320" height="15" rx="3" fill="#DFD2C2" />
      <rect x="45" y="255" width="290" height="15" rx="2" fill="#ECE0D2" />
      <rect x="60" y="240" width="260" height="15" rx="2" fill="url(#templeMarble)" />

      {/* Ground Pillars / Arches Row */}
      <rect x="75" y="180" width="230" height="60" fill="url(#templeMarble)" stroke="#D4C4B0" strokeWidth="1" />
      {/* Arch Cutouts */}
      {[90, 125, 160, 195, 230, 265].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 240 L${x} 205 Q${x + 12} 190 ${x + 24} 205 L${x + 24} 240 Z`}
            fill="#780016"
            opacity="0.8"
          />
          <circle cx={x + 12} cy={198} r="2" fill="#FBBF24" />
        </g>
      ))}

      {/* Middle Floor Balcony / Railing */}
      <rect x="70" y="172" width="240" height="8" fill="#E2D4C2" />
      {/* Parapet jali work */}
      <line x1="70" y1="168" x2="310" y2="168" stroke="#C8B8A4" strokeWidth="2" />
      {[...Array(20)].map((_, i) => (
        <line key={i} x1={76 + i * 12} y1="168" x2={76 + i * 12} y2="172" stroke="#C8B8A4" strokeWidth="1.5" />
      ))}

      {/* Second Tier / Inner Sanctum Walls */}
      <rect x="105" y="115" width="170" height="53" fill="url(#templeMarble)" stroke="#D4C4B0" strokeWidth="1" />
      {/* 3 Upper Arches */}
      {[125, 175, 225].map((x, i) => (
        <path
          key={i}
          d={`M${x} 168 L${x} 138 Q${x + 15} 124 ${x + 30} 138 L${x + 30} 168 Z`}
          fill="#54000F"
          opacity="0.85"
        />
      ))}

      {/* Left Minor Dome */}
      <g transform="translate(100, 115)">
        <path
          d="M-15 0 C-15 -35 35 -35 35 0 Z"
          fill="url(#domeGrad)"
          stroke="#C8B6A0"
          strokeWidth="1"
        />
        {/* Kalash */}
        <circle cx="10" cy="-38" r="3.5" fill="url(#goldKalash)" />
        <line x1="10" y1="-38" x2="10" y2="-48" stroke="#B45309" strokeWidth="1.5" />
        {/* Red Flag */}
        <path d="M10 -48 L22 -44 L10 -40 Z" fill="#82121E" />
      </g>

      {/* Right Minor Dome */}
      <g transform="translate(260, 115)">
        <path
          d="M-15 0 C-15 -35 35 -35 35 0 Z"
          fill="url(#domeGrad)"
          stroke="#C8B6A0"
          strokeWidth="1"
        />
        {/* Kalash */}
        <circle cx="10" cy="-38" r="3.5" fill="url(#goldKalash)" />
        <line x1="10" y1="-38" x2="10" y2="-48" stroke="#B45309" strokeWidth="1.5" />
        {/* Red Flag */}
        <path d="M10 -48 L22 -44 L10 -40 Z" fill="#82121E" />
      </g>

      {/* Grand Central White Marble Dome / Shikhar */}
      <g transform="translate(190, 115)">
        {/* Drum Base */}
        <rect x="-45" y="-12" width="90" height="12" fill="#E2D4C2" stroke="#C8B6A0" strokeWidth="1" />
        {/* Grand Dome Curve */}
        <path
          d="M-45 -12 C-45 -70 -20 -85 0 -92 C20 -85 45 -70 45 -12 Z"
          fill="url(#domeGrad)"
          stroke="#C8B6A0"
          strokeWidth="1.5"
        />
        {/* Dome ribbed lines */}
        <path d="M0 -92 C-15 -60 -25 -20 -25 -12" stroke="#EDE2D4" strokeWidth="1.5" fill="none" />
        <path d="M0 -92 C15 -60 25 -20 25 -12" stroke="#EDE2D4" strokeWidth="1.5" fill="none" />
        
        {/* Grand Golden Kalash & Flag */}
        <ellipse cx="0" cy="-94" rx="6" ry="4" fill="url(#goldKalash)" />
        <circle cx="0" cy="-100" r="4.5" fill="url(#goldKalash)" />
        <line x1="0" y1="-100" x2="0" y2="-118" stroke="#9A3412" strokeWidth="2" />
        {/* Red Spiritual Flag Flying in Wind */}
        <path d="M0 -118 L24 -112 L0 -106 Z" fill="#82121E" />
      </g>

      {/* Decorative Tree / Garden on sides */}
      <path d="M40 270 Q30 240 50 220 Q65 240 55 270 Z" fill="#4B6B46" opacity="0.8" />
      <path d="M330 270 Q320 240 340 220 Q355 240 345 270 Z" fill="#4B6B46" opacity="0.8" />
    </svg>
  </div>
);

/**
 * Authentic Satsang Event Card Images (SVG Renderers)
 */
export const SatsangPandalImage = ({ type = '1', className = 'w-full h-44 object-cover' }) => {
  if (type === '1') {
    // Large Devotee Gathering under Canopy Tent (Muzaffarpur)
    return (
      <svg viewBox="0 0 400 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#F4EDE4" />
        {/* White Pandal Roof Canopy */}
        <path d="M0 0 L400 0 L400 70 L200 40 L0 70 Z" fill="#FFFFFF" />
        <path d="M0 70 L200 40 L400 70" stroke="#82121E" strokeWidth="4" />
        <line x1="70" y1="55" x2="70" y2="180" stroke="#CBD5E1" strokeWidth="6" />
        <line x1="200" y1="40" x2="200" y2="180" stroke="#CBD5E1" strokeWidth="6" />
        <line x1="330" y1="55" x2="330" y2="180" stroke="#CBD5E1" strokeWidth="6" />
        {/* Stage on the left/center */}
        <rect x="130" y="80" width="140" height="40" rx="4" fill="#82121E" />
        <text x="200" y="105" textAnchor="middle" fill="#FFE5B4" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
          जय गुरु देव
        </text>
        {/* Audience rows in white clothes */}
        {[...Array(6)].map((_, row) => (
          <g key={row} transform={`translate(0, ${130 + row * 18})`}>
            {[...Array(14)].map((_, col) => (
              <circle
                key={col}
                cx={25 + col * 27 + (row % 2) * 10}
                cy="0"
                r={6 + row * 0.8}
                fill={row % 2 === 0 ? '#FFFFFF' : '#F1E9DF'}
                stroke="#D1C4B4"
                strokeWidth="0.8"
              />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  if (type === '2') {
    // Grand Decorated Ashram Stage (Patna)
    return (
      <svg viewBox="0 0 400 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#EFE8DD" />
        {/* Stage Platform */}
        <rect x="40" y="60" width="320" height="110" rx="6" fill="#FFFFFF" stroke="#E2D4C2" strokeWidth="2" />
        {/* Stage Arch */}
        <path d="M60 170 L60 90 Q200 40 340 90 L340 170" fill="none" stroke="#82121E" strokeWidth="6" />
        {/* Garland & Lights */}
        {[...Array(11)].map((_, i) => (
          <circle key={i} cx={80 + i * 24} cy={82 + Math.sin(i * 0.6) * 10} r="5" fill="#F59E0B" />
        ))}
        {/* Center Banner */}
        <rect x="130" y="85" width="140" height="35" rx="4" fill="#780016" />
        <text x="200" y="108" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
          जय गुरु देव
        </text>
        {/* Stage Dais */}
        <rect x="170" y="125" width="60" height="30" rx="3" fill="#D97706" />
        <circle cx="200" cy="138" r="8" fill="#FFFFFF" />
        {/* Audience in foreground */}
        {[...Array(4)].map((_, row) => (
          <g key={row} transform={`translate(0, ${180 + row * 16})`}>
            {[...Array(15)].map((_, col) => (
              <circle key={col} cx={15 + col * 26} cy="0" r="7" fill="#FFFFFF" stroke="#D1C4B4" strokeWidth="0.8" />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  if (type === '3') {
    // Pink and White Satsang Hall (Darbhanga)
    return (
      <svg viewBox="0 0 400 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#FDF2F4" />
        {/* Pink & White Shamiana Canopy */}
        <path d="M0 0 L400 0 L400 80 L0 80 Z" fill="#FBCFE8" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d={`M${i * 50} 0 L${i * 50 + 25} 80 L${i * 50 + 50} 0 Z`} fill="#FFFFFF" />
        ))}
        <line x1="0" y1="80" x2="400" y2="80" stroke="#DB2777" strokeWidth="4" />
        {/* Audience in Hall */}
        {[...Array(6)].map((_, row) => (
          <g key={row} transform={`translate(0, ${120 + row * 20})`}>
            {[...Array(14)].map((_, col) => (
              <circle
                key={col}
                cx={20 + col * 28 + (row % 2) * 12}
                cy="0"
                r={7 + row * 0.7}
                fill={col % 3 === 0 ? '#FED7AA' : '#FFFFFF'}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
      </svg>
    );
  }

  // Type 4: White Ashram Gate / Entrance (Samastipur)
  return (
    <svg viewBox="0 0 400 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#FAF6F0" />
      {/* Gate Pillars */}
      <rect x="60" y="50" width="36" height="150" fill="#FFFFFF" stroke="#D1C4B4" strokeWidth="2" />
      <rect x="304" y="50" width="36" height="150" fill="#FFFFFF" stroke="#D1C4B4" strokeWidth="2" />
      {/* Arch Over Entrance */}
      <path d="M60 70 Q200 15 340 70 L340 95 Q200 40 60 95 Z" fill="#82121E" />
      <text x="200" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
        जय गुरु देव
      </text>
      {/* Pathway and Devotees entering */}
      <path d="M96 200 L140 100 L260 100 L304 200 Z" fill="#ECE2D4" />
      {[...Array(4)].map((_, i) => (
        <circle key={i} cx={160 + i * 26} cy={140 + i * 15} r="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
      ))}
    </svg>
  );
};

/**
 * Indian State Map Silhouettes for the State Browser Carousel
 */
export const StateSilhouette = ({ code = 'BR', className = 'w-10 h-10' }) => {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Warm Golden/Tan State Shape matching image */}
      <path
        d="M12 25 C14 18 22 14 30 15 C38 16 46 20 48 28 C50 36 44 44 38 46 C30 48 20 45 15 40 C10 35 10 30 12 25 Z"
        fill="#E8CBA8"
        stroke="#D9B78F"
        strokeWidth="1.5"
      />
      {/* Specific regional silhouette touch */}
      {code === 'BR' && (
        <path d="M18 24 Q32 20 44 26 Q40 38 28 42 Q16 38 18 24 Z" fill="#DEBA91" />
      )}
      {code === 'UP' && (
        <path d="M14 28 Q24 16 46 22 Q48 36 34 44 Q16 40 14 28 Z" fill="#DEBA91" />
      )}
    </svg>
  );
};

/**
 * Social Media Badges matching the bottom footer in reference image
 */
export const SocialLogos = () => (
  <div className="flex items-center space-x-2.5">
    {/* YouTube */}
    <a
      href="https://www.youtube.com/@Jaigurudevukm"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube Channel - @Jaigurudevukm"
      title="जय गुरु देव आधिकारिक यूट्यूब चैनल (@Jaigurudevukm)"
      className="w-7 h-7 rounded-md bg-[#FF0000] flex items-center justify-center text-white shadow hover:scale-110 transition-transform"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </a>

    {/* Facebook */}
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook Page"
      className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow hover:scale-110 transition-transform"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </a>

    {/* Instagram */}
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram Profile"
      className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow hover:scale-110 transition-transform"
    >
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </a>
  </div>
);
