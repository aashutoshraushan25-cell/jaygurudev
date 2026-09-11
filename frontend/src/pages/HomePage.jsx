import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { QuickFinderWidget } from '../components/QuickFinderWidget';
import { SatsangCard } from '../components/SatsangCard';
import { StateSlider } from '../components/StateSlider';
import { ValuesPillars } from '../components/ValuesPillars';
import { YouTubeVideoSection } from '../components/YouTubeVideoSection';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, ArrowRight, Sun, Sparkles, Smartphone, Download } from 'lucide-react';

export const HomePage = () => {
  const [upcomingSatsangs, setUpcomingSatsangs] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback sample data matching the exact 4 cards in the screenshot
  const fallbackSatsangs = [
    {
      id: 'sat-1',
      title: 'जय गुरु देव सत्संग',
      title_hi: 'जय गुरु देव सत्संग',
      date: '2026-09-15',
      startTime: '06:00 PM',
      endTime: '08:00 PM',
      stateId: { name_hi: 'बिहार', name: 'Bihar' },
      districtId: { name_hi: 'मुजफ्फरपुर', name: 'Muzaffarpur' },
      venue: 'जय गुरु देव सत्संग भवन, ब्रह्मपुरा मैदान',
      address: 'ब्रह्मपुरा, मुजफ्फरपुर, बिहार',
      organizerName: 'शिव कुमार जी',
      organizerPhone: '+91 98350 12345',
    },
    {
      id: 'sat-2',
      title: 'जय गुरु देव सत्संग',
      title_hi: 'जय गुरु देव सत्संग',
      date: '2026-09-22',
      startTime: '05:00 PM',
      endTime: '07:00 PM',
      stateId: { name_hi: 'बिहार', name: 'Bihar' },
      districtId: { name_hi: 'पटना', name: 'Patna' },
      venue: 'गांधी मैदान शाखा सत्संग हाल',
      address: 'कंकड़बाग, पटना, बिहार',
      organizerName: 'राजेश जी',
      organizerPhone: '+91 94310 98765',
    },
    {
      id: 'sat-3',
      title: 'जय गुरु देव सत्संग',
      title_hi: 'जय गुरु देव सत्संग',
      date: '2026-09-28',
      startTime: '06:00 PM',
      endTime: '08:00 PM',
      stateId: { name_hi: 'बिहार', name: 'Bihar' },
      districtId: { name_hi: 'दरभंगा', name: 'Darbhanga' },
      venue: 'जय गुरु देव सेवा आश्रम',
      address: 'लहेरियासराय, दरभंगा, बिहार',
      organizerName: 'महेश जी',
      organizerPhone: '+91 91220 54321',
    },
    {
      id: 'sat-4',
      title: 'जय गुरु देव सत्संग',
      title_hi: 'जय गुरु देव सत्संग',
      date: '2026-10-05',
      startTime: '06:00 PM',
      endTime: '08:00 PM',
      stateId: { name_hi: 'बिहार', name: 'Bihar' },
      districtId: { name_hi: 'समस्तीपुर', name: 'Samastipur' },
      venue: 'पंचायत भवन प्रांगण, उजियारपुर',
      address: 'उजियारपुर, समस्तीपुर, बिहार',
      organizerName: 'अजय जी',
      organizerPhone: '+91 97090 11223',
    },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [hRes, sRes] = await Promise.all([
          fetch('/api/satsang/highlights'),
          fetch('/api/states'),
        ]);

        const hJson = await hRes.json();
        const sJson = await sRes.json();

        if (hJson.success && (hJson.data.upcoming?.length > 0 || hJson.data.today?.length > 0)) {
          const combined = [
            ...(hJson.data.today || []),
            ...(hJson.data.upcoming || []),
          ];
          setUpcomingSatsangs(combined.slice(0, 4));
        } else {
          setUpcomingSatsangs(fallbackSatsangs);
        }

        if (sJson.success && sJson.data.length > 0) {
          setStates(sJson.data);
        }
      } catch (err) {
        console.error('Error loading homepage data, using standard spiritual data:', err);
        setUpcomingSatsangs(fallbackSatsangs);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. FLOATING QUICK FINDER SEARCH BAR (Overlaps Hero slightly) */}
      <div id="satsang-finder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 relative z-20">
        <QuickFinderWidget initialStates={states} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* 3. आगामी सत्संग (UPCOMING SATSANGS) SECTION */}
        <section className="space-y-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-maroon-100 flex items-center justify-center text-maroon-800 flex-shrink-0 mt-0.5">
                <Calendar className="w-5 h-5 text-maroon-800" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-maroon-900 font-devanagari leading-tight">
                  आगामी सत्संग
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-medium font-devanagari">
                  आइए, सत्संग में जुड़ें और जीवन को सार्थक बनाएं।
                </p>
              </div>
            </div>

            <Link
              to="/satsang"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 hover:text-maroon-800 bg-white border border-[#D5CDC5] hover:border-maroon-800 px-3.5 py-1.5 rounded-full transition-colors self-start sm:self-auto font-devanagari shadow-2xs"
            >
              <span>सभी सत्संग देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Cards Grid */}
          {loading ? (
            <LoadingSpinner text="सत्संग जानकारी लोड हो रही है..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {upcomingSatsangs.map((sat, index) => (
                <SatsangCard
                  key={sat.id || sat._id || index}
                  satsang={sat}
                  cardIndex={index}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. DAILY MORNING BANNER GENERATOR CALLOUT (Pink, Black & White) */}
        <section className="bg-gradient-to-r from-[#000000] via-[#16000E] to-[#040003] rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden border-2 border-pink-500/70 shadow-2xl font-devanagari">
          {/* Subtle Pink Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-400/40 text-pink-200 px-3.5 py-1 rounded-full text-xs font-bold">
                <Sun className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
                <span>नया: दैनिक प्रभात पावन संदेश (Pink • Black • White Theme)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                ऊपर दोनों पूज्य गुरुदेवों के दर्शन, आपका <span className="text-pink-400 underline decoration-pink-500/60">फोटो और नाम</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                परम पूज्य बाबा जयगुरुदेव जी महाराज और पूज्य बाबा उमाकान्त जी महाराज के पावन स्वरूप, अमृत सुविचार और आपके नाम के साथ — 1 क्लिक में HD स्टेटस बनाएं।
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/daily-banner"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 via-rose-600 to-black hover:from-pink-700 hover:to-neutral-900 text-white font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-lg hover:shadow-pink-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4 text-pink-200" />
                  <span>अभी अपना स्टेटस बैनर बनाएं (100% निःशुल्क)</span>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl text-sm border border-white/20 transition-all"
                >
                  <span>लॉगिन / प्रोफाइल फोटो सेव करें</span>
                </Link>
              </div>
            </div>

            {/* Right Mini Visual Graphic */}
            <div className="relative flex-shrink-0 w-full max-w-[280px] sm:max-w-[310px]">
              <div className="bg-black/90 border-2 border-pink-500 rounded-2xl p-4 shadow-[0_0_30px_rgba(236,72,153,0.3)] backdrop-blur-md text-center space-y-3 transform lg:rotate-1 hover:rotate-0 transition-transform">
                
                {/* Mini Top Gurus row */}
                <div className="flex items-center justify-between gap-1 pb-2 border-b border-pink-500/30">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-pink-500 overflow-hidden bg-black ring-1 ring-pink-400">
                      <img src="/guruji_maharaj.png" alt="बाबा जयगुरुदेव जी" className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="text-[7px] text-pink-300 font-bold mt-0.5">जयगुरुदेव जी</span>
                  </div>

                  <div className="text-center">
                    <div className="text-white text-xs font-black">॥ जय गुरु देव ॥</div>
                    <div className="text-[9px] text-pink-300 font-bold">दैनिक प्रभात संदेश</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-pink-500 overflow-hidden bg-black ring-1 ring-pink-400">
                      <img src="/umakant_maharaj.png" alt="बाबा उमाकान्त जी" className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="text-[7px] text-pink-300 font-bold mt-0.5">उमाकान्त जी</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-white line-clamp-3 bg-white/5 p-2 rounded-xl border border-white/10 leading-relaxed">
                  "सभी जीवों पर दया करो, शाकाहारी बनो और मानव धर्म निभाओ।"
                </p>

                {/* Devotee Sample Badge */}
                <div className="flex items-center gap-2 bg-black/80 p-2 rounded-xl border border-pink-500/60 text-left">
                  <div className="w-8 h-8 rounded-full bg-pink-950 text-pink-200 flex items-center justify-center font-bold text-xs border border-pink-400">
                    🙏
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[9px] text-pink-300 font-bold">पावन सत्संगी</div>
                    <div className="text-xs font-black text-white truncate">आपका नाम एवं फोटो</div>
                  </div>
                </div>

                <Link
                  to="/daily-banner"
                  className="block w-full py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs font-black rounded-xl text-center shadow"
                >
                  डाउनलोड करके देखें ⬇️
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. नवीनतम वीडियो एवं लाइव सत्संग (LATEST YOUTUBE SATSANG VIDEOS) */}
        <YouTubeVideoSection />

        {/* 5.1 बाबा जयगुरुदेव आश्रम, उज्जैन दर्शन एवं फोटो गैलरी (UJJAIN ASHRAM SHOWCASE) */}
        <section className="bg-gradient-to-br from-[#240008] via-[#450010] to-[#150005] rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-amber-400/40 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>मुख्य आध्यात्मिक तीर्थ • उज्जैन धाम (म.प्र.)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                बाबा जयगुरुदेव आश्रम, उज्जैन
              </h2>
              <p className="text-sm text-gray-200 font-medium">
                पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.) स्थित पावन धाम — जहां 24 घंटे अटूट लंगर, गौशाला एवं पूज्य बाबा उमाकान्त जी महाराज के अमृत वचनों की वर्षा होती है।
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-maroon-950 font-black text-sm shadow-lg hover:shadow-xl transition-all self-start lg:self-auto flex-shrink-0"
            >
              <span>उज्जैन आश्रम की सभी तस्वीरें देखें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Preview Cards of Ujjain Ashram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/gallery"
              className="group bg-black/40 border border-amber-400/30 rounded-2xl overflow-hidden hover:border-amber-400 transition-all shadow-md block"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80"
                  alt="उज्जैन आश्रम मुख्य मंदिर"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-black">
                  मुख्य पावन मंदिर धाम
                </div>
              </div>
              <div className="p-3">
                <div className="text-[11px] text-amber-200 font-semibold">मक्सी रोड, पिंगलेश्वर</div>
                <div className="text-[11px] text-gray-300 line-clamp-1">दिव्य व भव्य मुख्य मंदिर परिसर</div>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="group bg-black/40 border border-amber-400/30 rounded-2xl overflow-hidden hover:border-amber-400 transition-all shadow-md block"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src="https://www.jaigurudevukm.com/Maharaj-Ji-Small-Images/Style-1/2.jpg"
                  alt="पूज्य महाराज जी प्रवचन मंच"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-black">
                  पूज्य महाराज जी प्रवचन मंच
                </div>
              </div>
              <div className="p-3">
                <div className="text-[11px] text-amber-200 font-semibold">उज्जैन व्यासपीठ</div>
                <div className="text-[11px] text-gray-300 line-clamp-1">बाबा उमाकान्त जी महाराज अमृत वचन</div>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="group bg-black/40 border border-amber-400/30 rounded-2xl overflow-hidden hover:border-amber-400 transition-all shadow-md block"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80"
                  alt="उज्जैन आश्रम भव्य द्वार"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-black">
                  भव्य सिंहद्वार (प्रवेश द्वार)
                </div>
              </div>
              <div className="p-3">
                <div className="text-[11px] text-amber-200 font-semibold">पिंगलेश्वर स्टेशन सामने</div>
                <div className="text-[11px] text-gray-300 line-clamp-1">नयनाभिराम पावन प्रवेश द्वार</div>
              </div>
            </Link>

            <Link
              to="/gallery"
              className="group bg-black/40 border border-amber-400/30 rounded-2xl overflow-hidden hover:border-amber-400 transition-all shadow-md block"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80"
                  alt="24 घंटे अटूट भंडारा"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-black">
                  अटूट लंगर एवं भंडारा भवन
                </div>
              </div>
              <div className="p-3">
                <div className="text-[11px] text-amber-200 font-semibold">निःशुल्क महाप्रसाद</div>
                <div className="text-[11px] text-gray-300 line-clamp-1">24 घंटे सभी के लिए शुद्ध भोजन</div>
              </div>
            </Link>
          </div>
        </section>

        {/* 5.2 राज्य के अनुसार (BROWSE BY STATE) SECTION */}
        <StateSlider states={states} />

        {/* 6. 4 CORE SPIRITUAL PILLARS / VALUES */}
        <ValuesPillars />
      </div>
    </div>
  );
};
