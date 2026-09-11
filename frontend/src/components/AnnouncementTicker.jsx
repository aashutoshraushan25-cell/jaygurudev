import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';

export const AnnouncementTicker = () => {
  const { lang, t } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcements');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setAnnouncements(json.data);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [announcements]);

  if (announcements.length === 0) return null;

  const current = announcements[currentIndex];
  const title = lang === 'hi' ? current.title_hi : current.title_en;
  const content = lang === 'hi' ? current.content_hi : current.content_en;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-3 px-4 shadow-md rounded-2xl border-2 border-amber-300 my-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-black/25 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider flex-shrink-0 text-amber-200 border border-white/20">
          <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>{lang === 'hi' ? 'विशेष सूचना' : 'Announcement'}</span>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 text-center sm:text-left text-sm sm:text-base font-semibold leading-snug truncate">
          <span className="font-bold underline decoration-amber-200 mr-2">{title}:</span>
          <span className="text-amber-50">{content}</span>
        </div>

        {/* Indicator dots */}
        {announcements.length > 1 && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {announcements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Announcement ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
