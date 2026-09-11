import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#E8DDD0]">
      {/* Background Ashram Temple & Satsang Congregation Photo - Clearly Visible */}
      <img
        src="/hero_bg.jpg"
        alt="बाबा जयगुरुदेव आश्रम मंदिर व सत्संग"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      
      {/* Subtle Soft Divine Tint Overlay - Ensures temple and devotees are clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4EA]/45 via-white/30 to-[#FAF4EA]/55 z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* 1. Left Column: Spiritual Quote Bubble + Param Sant Baba Jai Gurudev Ji Maharaj Photo */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            {/* Top Left Spiritual Quote Bubble with Tail */}
            <div className="relative bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-amber-900/15 shadow-lg max-w-xs select-none">
              <p className="text-xs sm:text-[13px] font-bold text-gray-800 leading-relaxed font-devanagari italic">
                “सत्य की राह पर चलो,<br />
                प्रेम फैलाओ,<br />
                मानवता की सेवा करो।”
              </p>
              <div className="text-[11px] font-extrabold text-maroon-800 mt-1 font-devanagari">
                - जय गुरु देव
              </div>
              {/* Speech bubble downward pointer */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r border-b border-amber-900/15 rotate-45" />
            </div>

            {/* Baba Jai Gurudev Ji Maharaj Transparent HD Cutout Photo */}
            <div className="relative group w-64 sm:w-72 lg:w-80 flex flex-col items-center pt-2">
              {/* Divine Aura Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-amber-300/60 via-yellow-200/40 to-orange-200/30 rounded-full blur-2xl -z-10 pointer-events-none" />
              
              <img
                src="/guruji_maharaj.png"
                alt="परम पूज्य बाबा जयगुरुदेव जी महाराज"
                className="w-auto h-[290px] sm:h-[330px] lg:h-[360px] object-contain drop-shadow-2xl select-none group-hover:scale-103 transition-transform duration-300"
              />
              
              {/* Revered Name Badge */}
              <div className="mt-2 bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 text-amber-100 text-[11px] sm:text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg border border-amber-400/40 font-devanagari whitespace-nowrap tracking-wide">
                परम पूज्य बाबा जयगुरुदेव जी महाराज
              </div>
            </div>
          </div>

          {/* 2. Center Column: Grand Title, Slogan, and CTA Button with Glassmorphism Card */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4 py-6 px-6 bg-white/80 backdrop-blur-md rounded-3xl border border-amber-900/15 shadow-xl">
            {/* Main Grand Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[74px] font-black text-maroon-900 tracking-tight font-devanagari drop-shadow-xs leading-none">
              जय गुरु देव
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center space-x-3 w-full max-w-sm">
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-maroon-800 to-maroon-900 flex-1" />
              <span className="text-xs sm:text-sm font-bold text-maroon-900 px-2 tracking-wide font-devanagari whitespace-nowrap">
                सत्य का संदेश, मानवता के लिए
              </span>
              <div className="h-[1.5px] bg-gradient-to-l from-transparent via-maroon-800 to-maroon-900 flex-1" />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-bold text-gray-800 max-w-md leading-snug font-devanagari">
              अपने नजदीकी सत्संग की जानकारी आसानी से प्राप्त करें
            </p>

            {/* Main Maroon Pill CTA Button */}
            <div className="pt-2">
              <a
                href="#satsang-finder"
                className="inline-flex items-center justify-center gap-2.5 bg-maroon-900 hover:bg-maroon-950 text-white font-black text-base sm:text-lg py-3.5 px-8 rounded-full shadow-maroon hover:shadow-maroon-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 font-devanagari"
              >
                <Search className="w-5 h-5 text-amber-300" />
                <span>सत्संग खोजें</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* 3. Right Column: Top Quote Bubble + Pujya Baba Umakant Ji Maharaj Photo */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-4">
            {/* Top Right Sacred Quote Bubble with Tail */}
            <div className="relative bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl border border-amber-900/15 shadow-md max-w-xs select-none">
              <p className="text-xs sm:text-[13px] font-bold text-maroon-950 leading-relaxed font-devanagari">
                सभी का कल्याण<br />
                सभी का उदय<br />
                <span className="text-maroon-800 font-black">यही है हमारा संदेश</span>
              </p>
              {/* Speech bubble downward pointer */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-amber-900/15 rotate-45" />
            </div>

            {/* Baba Umakant Ji Maharaj Transparent HD Cutout Photo */}
            <div className="relative group w-64 sm:w-72 lg:w-80 flex flex-col items-center pt-2">
              {/* Divine Aura Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tl from-amber-300/40 via-yellow-200/30 to-orange-200/20 rounded-full blur-2xl -z-10 pointer-events-none" />
              
              <img
                src="/umakant_maharaj.png"
                alt="पूज्य बाबा उमाकान्त जी महाराज"
                className="w-auto h-[290px] sm:h-[330px] lg:h-[360px] object-contain drop-shadow-2xl select-none group-hover:scale-103 transition-transform duration-300"
              />
              
              {/* Revered Name Badge */}
              <div className="mt-2 bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 text-amber-100 text-[11px] sm:text-xs font-extrabold px-4 py-1.5 rounded-full shadow-md border border-amber-400/40 font-devanagari whitespace-nowrap tracking-wide">
                पूज्य बाबा उमाकान्त जी महाराज
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
