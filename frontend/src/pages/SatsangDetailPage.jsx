import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Navigation,
  Share2,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const SatsangDetailPage = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const [satsang, setSatsang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSatsang = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/satsang/${id}`);
        const json = await res.json();
        if (json.success) {
          setSatsang(json.data);
        }
      } catch (err) {
        console.error('Error fetching satsang detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSatsang();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text={lang === 'hi' ? 'सत्संग विवरण लोड हो रहा है...' : 'Loading Satsang details...'} />;
  }

  if (!satsang) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 font-devanagari">
          {lang === 'hi' ? 'सत्संग कार्यक्रम नहीं मिला।' : 'Satsang event not found.'}
        </h2>
        <Link
          to="/satsang"
          className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{lang === 'hi' ? 'सभी सत्संग देखें' : 'Back to Satsang List'}</span>
        </Link>
      </div>
    );
  }

  const stateName =
    lang === 'hi'
      ? satsang.stateId?.name_hi || satsang.stateId?.name
      : satsang.stateId?.name_en || satsang.stateId?.name;

  const districtName =
    lang === 'hi'
      ? satsang.districtId?.name_hi || satsang.districtId?.name
      : satsang.districtId?.name_en || satsang.districtId?.name;

  // Format Date & Day
  const eventDate = new Date(satsang.date + 'T00:00:00');
  const dayNameHi = [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरुवार',
    'शुक्रवार',
    'शनिवार',
  ][eventDate.getDay()];
  const dayNameEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][eventDate.getDay()];
  const dayName = lang === 'hi' ? dayNameHi : dayNameEn;

  const monthsHi = [
    'जनवरी',
    'फरवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ];
  const monthsEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateDay = eventDate.getDate();
  const dateMonth =
    lang === 'hi'
      ? monthsHi[eventDate.getMonth()]
      : monthsEn[eventDate.getMonth()];
  const dateYear = eventDate.getFullYear();

  const formattedDate = `${dateDay} ${dateMonth} ${dateYear}`;

  const isToday = satsang.status === 'today';
  const isCancelled = satsang.status === 'cancelled';

  const title =
    lang === 'hi'
      ? satsang.title_hi || satsang.title
      : satsang.title || satsang.title_hi;

  const mapsUrl =
    satsang.googleMapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent(
      `${satsang.venue}, ${districtName || ''}, ${stateName || ''}`
    )}`;

  const handleShare = () => {
    const shareText = `*जय गुरु देव पावन सत्संग निमंत्रण*\n\n📌 *${title}*\n📅 *दिनांक:* ${formattedDate} (${dayName})\n⏰ *समय:* ${satsang.startTime} से ${satsang.endTime}\n📍 *स्थान:* ${satsang.venue}\n🏠 *पता:* ${satsang.address}\n👤 *आयोजक:* ${satsang.organizerName} (${satsang.organizerPhone})\n\nगूगल मैप्स पर रास्ता देखें: ${mapsUrl}\n\nजय गुरु देव!`;

    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
        '_blank'
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/satsang"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-orange-700 hover:text-orange-900 bg-white px-4 py-2 rounded-xl border border-orange-200 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{lang === 'hi' ? 'सभी सत्संग सूची' : 'Back to Satsang List'}</span>
        </Link>
      </div>

      {/* Cancelled Banner if applicable */}
      {isCancelled && (
        <div className="bg-red-600 text-white p-6 rounded-3xl shadow-xl flex items-center gap-4 animate-pulse">
          <AlertTriangle className="w-10 h-10 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-black font-devanagari">
              {t('statusCancelled')}
            </h2>
            <p className="text-sm font-medium text-red-100">
              {lang === 'hi'
                ? 'यह सत्संग कार्यक्रम अपरिहार्य कारणों से स्थगित कर दिया गया है। नई तिथि की जानकारी जल्द दी जाएगी।'
                : 'This Satsang event has been cancelled/postponed. Please check back for updated schedules.'}
            </p>
          </div>
        </div>
      )}

      {/* Main Event Card */}
      <div className="bg-white rounded-3xl shadow-card border border-[#EBE3DA] overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/20">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>
                {districtName}, {stateName}
              </span>
            </div>

            {isToday ? (
              <span className="bg-white text-maroon-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow sacred-pulse">
                ⚡ {t('statusToday')}
              </span>
            ) : (
              <span className="bg-white/20 text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
                {t('statusUpcoming')}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-devanagari leading-tight drop-shadow-xs">
            {title}
          </h1>
        </div>

        {/* Date, Time & Venue Key Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 sm:p-8 bg-[#FAF6F0] border-b border-[#E8DFD3]">
          {/* Date & Time */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#EBE3DA] shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-maroon-900 text-white flex flex-col items-center justify-center font-black shadow-md flex-shrink-0">
              <div className="text-2xl leading-none">{dateDay}</div>
              <div className="text-[11px] uppercase tracking-wider">{dateMonth.slice(0, 3)}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-maroon-800 uppercase">
                {dayName}, {formattedDate}
              </div>
              <div className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2 mt-1">
                <Clock className="w-5 h-5 text-maroon-800" />
                <span>
                  {satsang.startTime} - {satsang.endTime}
                </span>
              </div>
            </div>
          </div>

          {/* Venue & Location */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#EBE3DA] shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#F5EBE6] text-maroon-800 flex items-center justify-center font-black text-2xl shadow-xs flex-shrink-0">
              📍
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-500 uppercase">
                {lang === 'hi' ? 'सत्संग स्थल' : 'Venue Location'}
              </div>
              <div className="text-base sm:text-lg font-extrabold text-gray-900 truncate">
                {satsang.venue}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {satsang.city || satsang.village ? `${satsang.city || satsang.village}, ` : ''}
                {districtName}
              </div>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Action Buttons: Big Google Maps Route Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Navigation className="w-6 h-6 text-amber-300" />
              <span>{t('seeOnGoogleMaps')}</span>
              <ExternalLink className="w-4 h-4 text-white/80" />
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Share2 className="w-6 h-6" />
              <span>{t('shareWhatsApp')}</span>
            </button>
          </div>

          {/* Full Address Details */}
          <div className="bg-[#FCFBF7] p-6 rounded-2xl border-2 border-orange-100 space-y-3">
            <h3 className="text-lg font-bold text-orange-950 font-devanagari flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span>{lang === 'hi' ? 'पूरा पता एवं स्थान विवरण' : 'Full Address & Location'}</span>
            </h3>
            <div className="space-y-1.5 text-base font-medium text-gray-800 pl-7">
              <p className="font-bold text-lg text-gray-900">{satsang.venue}</p>
              <p>{satsang.address}</p>
              {satsang.landmark && (
                <p className="text-sm font-semibold text-amber-900">
                  <span className="font-bold">{lang === 'hi' ? 'निकटतम पहचान:' : 'Landmark:'}</span>{' '}
                  {satsang.landmark}
                </p>
              )}
              <p className="text-xs text-gray-500 pt-1">
                {lang === 'hi' ? 'क्षेत्र:' : 'Area:'} {satsang.village ? `${satsang.village}, ` : ''}{satsang.city ? `${satsang.city}, ` : ''}{districtName}, {stateName}
              </p>
            </div>
          </div>

          {/* Organizer Card */}
          <div className="bg-orange-50/80 p-6 rounded-2xl border-2 border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xl shadow">
                <User className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold text-orange-800 uppercase">
                  {lang === 'hi' ? 'सत्संग संयोजक / आयोजक' : 'Event Organizer / In-charge'}
                </div>
                <div className="text-xl font-bold text-gray-900 font-devanagari">
                  {satsang.organizerName}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  {satsang.organizerPhone}
                </div>
              </div>
            </div>

            {satsang.organizerPhone && (
              <a
                href={`tel:${satsang.organizerPhone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base py-3 px-6 rounded-xl shadow transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>{t('callOrganizer')}</span>
              </a>
            )}
          </div>

          {/* Description & Spiritual Discourses */}
          {satsang.description && (
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 font-devanagari">
                {lang === 'hi' ? 'सत्संग विवरण एवं प्रवचन' : 'About this Satsang'}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 font-devanagari leading-relaxed bg-white p-6 rounded-2xl border border-gray-200">
                {satsang.description}
              </p>
            </div>
          )}

          {/* Instructions for Attendees */}
          <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200 space-y-3">
            <h3 className="text-lg font-bold text-amber-950 font-devanagari flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-700" />
              <span>{t('instructions')}</span>
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-amber-900 font-medium list-disc list-inside">
              <li>{t('defaultInstructions')}</li>
              <li>{lang === 'hi' ? 'सत्संग स्थल पर पूर्ण अनुशासन एवं शांति बनाए रखें।' : 'Please maintain discipline and peace at the venue.'}</li>
              <li>{lang === 'hi' ? 'बुजुर्गों एवं बच्चों हेतु विशेष बैठने की व्यवस्था रहेगी।' : 'Special seating arrangements are made for elderly devotees.'}</li>
              <li>{lang === 'hi' ? 'वाहन पार्किंग की उचित व्यवस्था सत्संग स्थल के समीप उपलब्ध है।' : 'Designated parking is available near the satsang premises.'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
