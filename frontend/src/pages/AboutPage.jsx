import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Heart, Shield, Sun, CheckCircle, Users, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { LotusLogo, GuruJiPortrait, AshramTempleArt } from '../components/spiritualAssets';

export const AboutPage = () => {
  const { lang } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE6] text-maroon-900 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-[#ECD7CC]">
          <Sparkles className="w-4 h-4 text-maroon-800" />
          <span>{lang === 'hi' ? 'आध्यात्मिक परिचय' : 'About Mission'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 font-devanagari">
          {lang === 'hi' ? 'जय गुरु देव मिशन एवं परंपरा' : 'Jay Guru Dev Mission & Tradition'}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed font-devanagari">
          {lang === 'hi'
            ? 'मानव कल्याण, आत्मिक उत्थान, शाकाहार और नशामुक्ति के पावन संदेश को जन-जन तक पहुँचाने का एक दिव्य प्रयास।'
            : 'A dedicated spiritual journey for self-realization, vegetarianism, moral values, and global brotherhood.'}
        </p>
      </div>

      {/* Hero Guru Ji & Ashram Section */}
      <div className="bg-gradient-to-b from-[#FAF4EA] via-[#F6ECE0] to-[#F1E4D4] p-8 sm:p-10 rounded-3xl border border-[#E8DDD0] shadow-card grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 font-devanagari">
          <div className="inline-block bg-maroon-900 text-amber-100 text-xs font-extrabold px-3.5 py-1 rounded-full border border-amber-400/30">
            पूज्य बाबा उमाकान्त जी महाराज
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-maroon-900 leading-snug">
            सभी का कल्याण, सभी का उदय — यही है हमारा संदेश
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            पूज्य बाबा उमाकान्त जी महाराज के पावन मार्गदर्शन में जय गुरु देव मिशन द्वारा जन-जन तक सत्य, शाकाहार, नशामुक्ति और प्रभु भक्ति का दिव्य संदेश पहुँचाया जा रहा है। मानव देह प्रभु भक्ति और जीवों के कल्याण के लिए मिली है, यही पावन सीख जनमानस को दी जा रही है।
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative group w-64 sm:w-72 flex flex-col items-center">
            {/* Divine Aura Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tl from-amber-300/50 via-yellow-200/35 to-orange-200/25 rounded-full blur-2xl -z-10 pointer-events-none" />
            
            <img
              src="/umakant_maharaj.png"
              alt="पूज्य बाबा उमाकान्त जी महाराज"
              className="w-auto h-[260px] sm:h-[300px] object-contain drop-shadow-2xl select-none group-hover:scale-103 transition-transform duration-300"
            />
            
            {/* Revered Name Badge */}
            <div className="mt-2 bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 text-amber-100 text-xs font-extrabold px-4 py-1.5 rounded-full shadow-md border border-amber-400/40 font-devanagari whitespace-nowrap tracking-wide">
              पूज्य बाबा उमाकान्त जी महाराज
            </div>
          </div>
        </div>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE3DA] shadow-card space-y-6">
        <div className="flex items-center gap-3 border-b border-[#EBE3DA] pb-4">
          <LotusLogo className="w-10 h-10 text-maroon-800" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-devanagari">
              {lang === 'hi' ? 'परम पूज्य गुरुदेव का पावन संदेश' : 'Divine Teachings'}
            </h2>
            <p className="text-xs sm:text-sm text-maroon-800 font-bold font-devanagari">
              {lang === 'hi' ? 'सत्य • प्रेम • सेवा • मानवता' : 'Truth, Love, Compassion and Service'}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-base sm:text-lg text-gray-700 font-devanagari leading-relaxed">
          <p>
            {lang === 'hi'
              ? 'संस्था द्वारा पूरे भारतवर्ष में समय-समय पर निःशुल्क सत्संग, नामदान, ध्यान साधना शिविर एवं 24 घंटे चलने वाले अटूट लंगर (महाप्रसाद) का आयोजन किया जाता है। यहाँ किसी भी जाति, धर्म या संप्रदाय का कोई भेद नहीं है।'
              : 'The organization holds regular Satsang gatherings, meditation sessions, spiritual awakening camps, and continuous community langar across all states of India, open to all seekers without distinction.'}
          </p>
        </div>
      </div>

      {/* 4 Pillars of Jay Guru Dev */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE3DA] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#48BB78] text-white flex items-center justify-center font-bold text-xl shadow">
            🌱
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-devanagari">
            {lang === 'hi' ? '1. शुद्ध शाकाहारी जीवन' : '1. Pure Vegetarianism'}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-devanagari leading-relaxed">
            {lang === 'hi'
              ? 'सभी जीवों में एक ही ईश्वर का अंश है। किसी भी मूक प्राणी की हत्या न करें और पूर्ण रूप से शाकाहार अपनाएं।'
              : 'Every living being carries the divine spark. Practice non-violence and embrace pure vegetarian food.'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE3DA] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-maroon-900 text-white flex items-center justify-center font-bold text-xl shadow">
            🚫
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-devanagari">
            {lang === 'hi' ? '2. नशामुक्ति संकल्प' : '2. Freedom from Addictions'}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-devanagari leading-relaxed">
            {lang === 'hi'
              ? 'नशा तन, मन और समाज को बर्बाद कर देता है। पूर्ण नशामुक्त रहकर सदाचारी जीवन व्यतीत करें।'
              : 'Addiction destroys body and soul. Live an alert, addiction-free and disciplined life.'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE3DA] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FBBF24] text-white flex items-center justify-center font-bold text-xl shadow">
            🙏
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-devanagari">
            {lang === 'hi' ? '3. नाम साधना व ईश्वर भक्ति' : '3. Spiritual Meditation'}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-devanagari leading-relaxed">
            {lang === 'hi'
              ? 'प्रतिदिन समय निकालकर प्रभु का स्मरण व नाम साधना करें। इसी से आंतरिक शांति एवं मोक्ष संभव है।'
              : 'Dedicate daily time for inner meditation and contemplation to attain true supreme peace.'}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE3DA] shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#3182CE] text-white flex items-center justify-center font-bold text-xl shadow">
            🤝
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-devanagari">
            {lang === 'hi' ? '4. निःस्वार्थ मानव सेवा' : '4. Selfless Service'}
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-devanagari leading-relaxed">
            {lang === 'hi'
              ? 'दीन-दुखियों, पीड़ितों एवं जरूरतमंदों की सेवा ही ईश्वर की सच्ची पूजा है।'
              : 'Serving the distressed, elderly and helpless is the most authentic worship of the Divine.'}
          </p>
        </div>
      </div>

      {/* NEW: Official Ashram Location & Address Section */}
      <div className="bg-gradient-to-br from-[#FAF5ED] via-white to-[#F6EDE1] rounded-3xl p-6 sm:p-10 border border-[#E5D7C7] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBE3DA] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-maroon-900 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <MapPin className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-devanagari">
                {lang === 'hi' ? 'पावन मुख्य आश्रम एवं पता' : 'Central Ashram Location & Address'}
              </h2>
              <p className="text-xs sm:text-sm text-maroon-800 font-bold font-devanagari">
                बाबा जयगुरुदेव आश्रम, उज्जैन (मध्य प्रदेश)
              </p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/Su4LdxPNmDKfd4cQ6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-102 self-start sm:self-auto font-devanagari"
          >
            <Navigation className="w-4 h-4 text-amber-300" />
            <span>गूगल मैप पर देखें</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Detailed Address Information */}
          <div className="space-y-4 font-devanagari">
            <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-amber-900/10 shadow-xs space-y-3">
              <div className="text-sm font-black text-maroon-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-maroon-800" />
                मुख्य आश्रम पता विवरण (Official Location Details)
              </div>

              <div className="grid grid-cols-1 gap-2.5 text-sm text-gray-800">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 min-w-[80px]">सड़क (Road):</span>
                  <span>मक्सी रोड (Maksi Road)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 min-w-[80px]">लैंडमार्क:</span>
                  <span className="text-maroon-900 font-semibold">पिंगलेश्वर रेलवे स्टेशन के सामने (Opposite Pingleshwar Railway Station)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 min-w-[80px]">शहर व राज्य:</span>
                  <span>उज्जैन, मध्य प्रदेश (Ujjain, Madhya Pradesh)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-900 min-w-[80px]">पिनकोड:</span>
                  <span className="font-mono font-bold bg-amber-100/80 px-2 py-0.5 rounded text-amber-900">456664</span>
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-600 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/50">
              ℹ️ आश्रम में प्रतिदिन सुबह-शाम सत्संग, ध्यान-साधना एवं सभी आगंतुक श्रद्धालुओं के लिए 24 घंटे अटूट भंडारा (प्रसाद) की निःशुल्क व्यवस्था रहती है।
            </div>
          </div>

          {/* Temple Photo Preview with Direct Maps Link */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#E5D7C7] shadow-lg group">
            <img
              src="/hero_bg.jpg"
              alt="बाबा जयगुरुदेव आश्रम उज्जैन"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white font-devanagari">
              <div className="font-black text-base sm:text-lg text-amber-200">बाबा जयगुरुदेव आश्रम, उज्जैन</div>
              <div className="text-xs text-gray-200">मक्सी रोड, पिंगलेश्वर रेलवे स्टेशन के सामने, उज्जैन (म.प्र.) - 456664</div>
              <a
                href="https://maps.app.goo.gl/Su4LdxPNmDKfd4cQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold bg-white text-maroon-900 px-3.5 py-1.5 rounded-full shadow hover:bg-amber-100 transition-colors self-start"
              >
                <MapPin className="w-3.5 h-3.5 text-maroon-800" />
                <span>गूगल मैप्स नेविगेशन शुरू करें</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
