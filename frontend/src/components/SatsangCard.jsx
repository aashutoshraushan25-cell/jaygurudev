import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Navigation, X, Phone } from 'lucide-react';
import { SatsangPandalImage } from './spiritualAssets';

export const SatsangCard = ({ satsang, cardIndex = 0 }) => {
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  if (!satsang) return null;

  const stateName = satsang.stateId?.name_hi || satsang.stateId?.name || 'बिहार';
  const districtName = satsang.districtId?.name_hi || satsang.districtId?.name || 'मुजफ्फरपुर';

  // Format Date
  let dateDay = '15';
  let dateMonth = 'सितम्बर';
  let dateYear = '2026';
  let dayName = 'मंगलवार';

  if (satsang.date) {
    try {
      const eventDate = new Date(satsang.date + 'T00:00:00');
      const dayNamesHi = [
        'रविवार',
        'सोमवार',
        'मंगलवार',
        'बुधवार',
        'गुरुवार',
        'शुक्रवार',
        'शनिवार',
      ];
      const monthsHi = [
        'जनवरी',
        'फरवरी',
        'मार्च',
        'अप्रैल',
        'मई',
        'जून',
        'जुलाई',
        'अगस्त',
        'सितम्बर',
        'अक्टूबर',
        'नवंबर',
        'दिसंबर',
      ];
      
      const d = eventDate.getDate();
      dateDay = d < 10 ? `0${d}` : `${d}`;
      dateMonth = monthsHi[eventDate.getMonth()];
      dateYear = `${eventDate.getFullYear()}`;
      dayName = dayNamesHi[eventDate.getDay()];
    } catch (e) {
      console.error('Date parse error:', e);
    }
  }

  // Format Time in Hindi (e.g., शाम 6:00 बजे – 8:00 बजे)
  const formatHindiTime = (start, end) => {
    if (!start) return 'शाम 6:00 बजे – 8:00 बजे';
    let formatted = start.replace('PM', 'बजे').replace('AM', 'बजे').trim();
    if (!formatted.includes('शाम') && !formatted.includes('सुबह')) {
      formatted = `शाम ${formatted}`;
    }
    if (end) {
      const endFormatted = end.replace('PM', 'बजे').replace('AM', 'बजे').trim();
      return `${formatted} – ${endFormatted}`;
    }
    return formatted;
  };

  const timeString = formatHindiTime(satsang.startTime, satsang.endTime);

  const title = satsang.title_hi || satsang.title || 'जय गुरु देव सत्संग';
  const organizer = satsang.organizerName || 'शिव कुमार जी';

  const mapsUrl =
    satsang.googleMapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(
      `${satsang.venue || ''}, ${districtName}, ${stateName}`
    )}`;

  // Sacred Ashram Temple & Satsang photo as requested ("jo box me photo lgao wahi wala photo lgao")
  const cardImage = (satsang.imageUrl && !satsang.imageUrl.includes('unsplash.com'))
    ? satsang.imageUrl
    : '/hero_bg.jpg';

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-[#EBE3DA] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
        {/* Card Header with Sacred Satsang Image & Floating Date Badge */}
        <div className="relative">
          {/* Image */}
          <div className="w-full h-44 overflow-hidden bg-[#F5EBE6] relative">
            <img
              src={cardImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = '/hero_bg.jpg';
              }}
            />
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Top-Left Maroon Date Badge matching reference screenshot */}
          <div className="absolute top-3 left-3 bg-maroon-900 text-white rounded-xl px-2.5 py-1.5 text-center shadow-md min-w-[58px] leading-tight">
            <div className="text-xl font-black leading-none">{dateDay}</div>
            <div className="text-[11px] font-bold mt-0.5">{dateMonth}</div>
            <div className="text-[10px] text-maroon-200 font-medium">{dateYear}</div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Title */}
            <Link
              to={`/satsang/${satsang.id || satsang._id}`}
              className="block group-hover:text-maroon-800 transition-colors"
            >
              <h3 className="text-lg font-black text-gray-900 leading-snug font-devanagari">
                {title.length > 30 ? 'जय गुरु देव सत्संग' : title}
              </h3>
            </Link>

            {/* Info Rows with Icons */}
            <div className="mt-3 space-y-2 text-xs sm:text-[13px] text-gray-700 font-devanagari">
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                <span className="font-bold text-gray-800">
                  {districtName}, {stateName}
                </span>
              </div>

              {/* Date & Day */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                <span>
                  {dateDay} {dateMonth} {dateYear} ({dayName})
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                <span>{timeString}</span>
              </div>

              {/* Organizer */}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-maroon-800 flex-shrink-0" />
                <span>आयोजक: {organizer.replace('(संयोजक)', '').trim()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons matching the reference screenshot */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            {/* Left Button: विवरण देखें */}
            <Link
              to={`/satsang/${satsang.id || satsang._id}`}
              className="flex items-center justify-center py-2 px-3 rounded-xl border border-[#D8CFC5] hover:border-maroon-800 text-gray-800 hover:text-maroon-800 font-bold text-xs sm:text-sm transition-colors text-center font-devanagari bg-white shadow-2xs"
            >
              विवरण देखें
            </Link>

            {/* Right Button: 📍 रास्ता देखें */}
            <button
              type="button"
              onClick={() => setShowDirectionsModal(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs sm:text-sm shadow-xs transition-all text-center font-devanagari"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>रास्ता देखें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Route & Direction Modal */}
      {showDirectionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-maroon-100 space-y-4 relative">
            <button
              onClick={() => setShowDirectionsModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center text-maroon-800">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900 font-devanagari">
                  सत्संग स्थल मार्ग एवं दिशा
                </h4>
                <p className="text-xs text-gray-500 font-medium font-devanagari">
                  {districtName}, {stateName}
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE3DA] space-y-2 text-xs sm:text-sm font-devanagari">
              <div className="font-bold text-gray-900">
                📍 स्थल: <span className="font-normal text-gray-700">{satsang.venue || 'सत्संग भवन'}</span>
              </div>
              <div className="font-bold text-gray-900">
                🏠 पता: <span className="font-normal text-gray-700">{satsang.address || `${districtName}, ${stateName}`}</span>
              </div>
              {satsang.landmark && (
                <div className="font-bold text-maroon-800">
                  🚩 पहचान: <span className="font-normal text-gray-700">{satsang.landmark}</span>
                </div>
              )}
              {satsang.organizerPhone && (
                <div className="pt-2 border-t border-gray-200 flex items-center gap-2 text-emerald-800 font-bold">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${satsang.organizerPhone}`} className="hover:underline">
                    संपर्क: {satsang.organizerPhone}
                  </a>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50"
              >
                बंद करें
              </button>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-sm text-center flex items-center justify-center gap-1.5 shadow"
              >
                <Navigation className="w-4 h-4" />
                <span>गूगल मैप्स खोलें</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
