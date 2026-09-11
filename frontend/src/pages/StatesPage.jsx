import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { StateSilhouette } from '../components/spiritualAssets';

export const StatesPage = () => {
  const { lang, t } = useLanguage();
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch('/api/states');
        const json = await res.json();
        if (json.success) {
          setStates(json.data);
        }
      } catch (err) {
        console.error('Error fetching states:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE6] text-maroon-900 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-[#ECD7CC]">
          <MapPin className="w-4 h-4 text-maroon-800" />
          <span>{lang === 'hi' ? 'राज्यवार सत्संग विवरण' : 'State-wise Satsang Directory'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 font-devanagari">
          {t('browseByState')}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto font-devanagari">
          {lang === 'hi'
            ? 'नीचे दिए गए राज्यों में से अपना राज्य चुनें और उस राज्य के सभी जिलों में होने वाले सत्संग देखें।'
            : 'Select a state below to explore districts and upcoming Satsang gatherings scheduled there.'}
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {states.map((state) => (
            <Link
              key={state.id || state._id}
              to={`/states/${state.code.toLowerCase()}`}
              className="group bg-white rounded-3xl p-6 border border-[#EBE3DA] hover:border-maroon-800 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top decoration */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F5EBE6] flex items-center justify-center p-1.5">
                  <StateSilhouette code={state.code} className="w-9 h-9" />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-maroon-900 bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#ECD7CC]">
                  <Compass className="w-3.5 h-3.5 text-maroon-800" />
                  <span>{lang === 'hi' ? 'जिले देखें' : 'View Districts'}</span>
                </span>
              </div>

              {/* State Name */}
              <div className="my-4 space-y-1">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-maroon-800 transition-colors font-devanagari">
                  {lang === 'hi' ? state.name_hi : state.name_en}
                </h3>
                <div className="text-sm font-semibold text-gray-500">
                  {lang === 'hi' ? state.name_en : state.name_hi}
                </div>
                {state.description && (
                  <p className="text-xs text-gray-500 pt-1 line-clamp-2 font-devanagari">
                    {state.description}
                  </p>
                )}
              </div>

              {/* Satsang Count and CTA */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="font-extrabold text-sm text-maroon-800 font-devanagari">
                  {state.upcomingCount || 0} {t('upcomingSatsang')}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF6F0] group-hover:bg-maroon-900 group-hover:text-white text-maroon-800 flex items-center justify-center transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
