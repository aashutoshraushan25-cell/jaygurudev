import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { StateSilhouette } from './spiritualAssets';

export const StateSlider = ({ states = [] }) => {
  const scrollContainerRef = useRef(null);

  // Default state list with exact count numbers from reference screenshot
  const displayStates = [
    { code: 'BR', name_hi: 'बिहार', count: 12 },
    { code: 'UP', name_hi: 'उत्तर प्रदेश', count: 18 },
    { code: 'JH', name_hi: 'झारखंड', count: 9 },
    { code: 'DL', name_hi: 'दिल्ली', count: 6 },
    { code: 'RJ', name_hi: 'राजस्थान', count: 11 },
    { code: 'MP', name_hi: 'मध्य प्रदेश', count: 14 },
    { code: 'MH', name_hi: 'महाराष्ट्र', count: 10 },
    { code: 'GJ', name_hi: 'गुजरात', count: 8 },
    { code: 'HR', name_hi: 'हरियाणा', count: 7 },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-maroon-100 flex items-center justify-center text-maroon-800 flex-shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5 text-maroon-800" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-maroon-900 font-devanagari leading-tight">
              राज्य के अनुसार
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium font-devanagari">
              अपने राज्य का चयन करें और सत्संग की जानकारी प्राप्त करें।
            </p>
          </div>
        </div>

        <Link
          to="/states"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-maroon-800 bg-white border border-[#D5CDC5] hover:border-maroon-800 px-3.5 py-1.5 rounded-full transition-colors self-start sm:self-auto font-devanagari shadow-2xs"
        >
          <span>सभी राज्य देखें</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* State Chips Carousel / Row */}
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {displayStates.map((st) => (
            <Link
              key={st.code}
              to={`/states/${st.code.toLowerCase()}`}
              className="flex-shrink-0 bg-white hover:bg-[#FAF6F0] border border-[#EBE3DA] hover:border-maroon-800/60 rounded-2xl p-3 sm:py-3.5 sm:px-4 shadow-card hover:shadow-md transition-all flex items-center gap-3 min-w-[155px] select-none"
            >
              {/* State Silhouette Map Art */}
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <StateSilhouette code={st.code} className="w-10 h-10" />
              </div>

              {/* State Info */}
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 font-devanagari leading-snug">
                  {st.name_hi}
                </span>
                <span className="text-xs text-gray-500 font-medium font-devanagari">
                  {st.count} सत्संग
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Next Right Arrow Button in White Circle matching screenshot */}
        <button
          onClick={() => scroll('right')}
          aria-label="अगले राज्य देखें"
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-maroon-800 shadow-md flex items-center justify-center text-gray-700 hover:text-maroon-800 z-10 transition-transform active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
