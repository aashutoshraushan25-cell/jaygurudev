import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Quote } from 'lucide-react';

export const SpiritualQuote = () => {
  const { lang, t } = useLanguage();

  const quotes = [
    {
      hi: '“मानव जीवन का सबसे बड़ा धर्म है जीवों पर दया करना, शाकाहार अपनाना और प्रभु भक्ति में समय लगाना।”',
      en: '“The greatest duty of human life is compassion towards all beings, embracing vegetarianism, and devoting time to remembrance of the Divine.”',
      author: '— पूज्य गुरुदेव जी महाराज',
    },
    {
      hi: '“सत्संग वह पावन गंगा है जिसमें स्नान करने से मन के सारे मैल धुल जाते हैं और आत्मा को परम शांति मिलती है।”',
      en: '“Satsang is the holy stream in which the impurities of the mind are cleansed, bringing supreme peace to the soul.”',
      author: '— पूज्य गुरुदेव जी महाराज',
    },
    {
      hi: '“नशा नाश की जड़ है। सादा जीवन, उच्च विचार और गुरु भक्ति ही सच्चे सुख का मार्ग है।”',
      en: '“Intoxication leads to ruin. Simple living, noble thinking, and devotion to the Guru are the true path to eternal bliss.”',
      author: '— पूज्य गुरुदेव जी महाराज',
    },
  ];

  // Pick quote based on day
  const index = new Date().getDate() % quotes.length;
  const quote = quotes[index];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-sm relative overflow-hidden my-8">
      <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-amber-200/30 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-900 bg-amber-200/70 px-3.5 py-1 rounded-full border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-orange-700" />
          <span>{t('spiritualQuoteTitle')}</span>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-orange-950 font-devanagari leading-relaxed">
          {lang === 'hi' ? quote.hi : quote.en}
        </p>
        <p className="text-sm sm:text-base font-extrabold text-amber-800">
          {quote.author}
        </p>
      </div>
    </div>
  );
};
