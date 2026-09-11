import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronLeft,
  Compass,
  Sparkles,
} from 'lucide-react';

export const DistrictsPage = () => {
  const { stateId } = useParams();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [stateData, setStateData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/states/${stateId}/districts`);
        const json = await res.json();
        if (json.success) {
          setStateData(json.state);
          setDistricts(json.data);
        }
      } catch (err) {
        console.error('Error fetching districts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [stateId]);

  const stateName =
    lang === 'hi'
      ? stateData?.name_hi || stateData?.name
      : stateData?.name_en || stateData?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/states"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-gray-700 hover:text-maroon-800 bg-white px-4 py-2 rounded-xl border border-[#D5CDC5] shadow-2xs transition-all font-devanagari"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{lang === 'hi' ? 'सभी राज्य' : 'All States'}</span>
        </Link>
      </div>

      {/* State Header Banner */}
      {stateData && (
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white rounded-3xl p-8 sm:p-10 shadow-card relative overflow-hidden">
          <div className="max-w-3xl space-y-2 relative z-10 font-devanagari">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'राज्यवार जिला सूची' : 'State Districts Directory'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white">
              {stateName}
            </h1>
            <p className="text-base sm:text-lg text-amber-100 font-medium">
              {lang === 'hi'
                ? `${stateName} के अंतर्गत सभी उपलब्ध जिले एवं उनमें आयोजित होने वाले आगामी सत्संग`
                : `All districts and upcoming Satsang events organized across ${stateName}`}
            </p>
          </div>
        </div>
      )}

      {/* Districts List Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-devanagari flex items-center gap-2">
            <span>{t('districts')}</span>
            <span className="text-sm font-bold text-maroon-900 bg-[#F5EBE6] px-3 py-1 rounded-full border border-[#ECD7CC]">
              {districts.length} {lang === 'hi' ? 'जिले' : 'Districts'}
            </span>
          </h2>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : districts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((district) => {
              const dName =
                lang === 'hi' ? district.name_hi : district.name_en;
              const hasEvents = district.upcomingCount > 0;

              return (
                <Link
                  key={district.id || district._id}
                  to={`/satsang?stateId=${district.stateId?._id || district.stateId || stateData?._id}&districtId=${district.id || district._id}`}
                  className={`group bg-white rounded-3xl p-6 border transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between hover:-translate-y-1 ${
                    hasEvents
                      ? 'border-[#EBE3DA] hover:border-maroon-800'
                      : 'border-gray-200 hover:border-gray-400 opacity-90'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#F5EBE6] group-hover:bg-maroon-900 text-maroon-800 group-hover:text-white flex items-center justify-center transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full font-devanagari ${
                          hasEvents
                            ? 'bg-[#FAF6F0] text-maroon-900 border border-[#ECD7CC]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {district.upcomingCount || 0} {t('satsang')}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-maroon-800 transition-colors font-devanagari">
                        {dName}
                      </h3>
                      <div className="text-xs font-semibold text-gray-400">
                        {lang === 'hi' ? district.name_en : district.name_hi}
                      </div>
                    </div>

                    {/* Next Satsang Date */}
                    {district.nextSatsangDate && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-maroon-900 bg-[#FAF6F0] p-2 rounded-xl border border-[#ECD7CC]">
                        <Calendar className="w-3.5 h-3.5 text-maroon-800 flex-shrink-0" />
                        <span>
                          {lang === 'hi' ? 'अगला सत्संग:' : 'Next Event:'}{' '}
                          {district.nextSatsangDate}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-bold text-maroon-800 group-hover:text-maroon-900 font-devanagari">
                    <span>
                      {hasEvents
                        ? lang === 'hi'
                          ? 'सत्संग विवरण देखें'
                          : 'View Satsang'
                        : lang === 'hi'
                        ? 'सूची देखें'
                        : 'Explore'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
            <p className="text-lg font-bold text-gray-600 font-devanagari">
              {lang === 'hi'
                ? 'इस राज्य के अंतर्गत अभी कोई जिला सूचीबद्ध नहीं है।'
                : 'No districts currently listed under this state.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
