/**
 * Daily Spiritual Quotes & Suvichar from Param Pujya Baba Jai Guru Dev Ji Maharaj
 * and Pujya Baba Umakant Ji Maharaj
 */

export const DAILY_QUOTES = [
  {
    id: 'quote-1',
    category: 'शाकाहार एवं जीव दया',
    quote_hi: 'सभी जीवों पर दया करो, किसी भी मूक बेजुबान प्राणी को मारकर मत खाओ। शाकाहारी बनो और मानव धर्म निभाओ।',
    author: 'परम पूज्य बाबा जयगुरुदेव जी महाराज',
    theme: 'vegetarian',
    bgColor: 'from-amber-900 via-orange-950 to-stone-900',
    accentColor: '#F59E0B',
  },
  {
    id: 'quote-2',
    category: 'प्रभात अमृत विचार',
    quote_hi: 'सुबह का समय प्रभु सुमिरन और साधना का अमृत वेला है। मन को शांत रखकर गुरु चरणों का ध्यान करें।',
    author: 'पूज्य बाबा उमाकान्त जी महाराज',
    theme: 'morning',
    bgColor: 'from-rose-950 via-maroon-950 to-neutral-950',
    accentColor: '#E11D48',
  },
  {
    id: 'quote-3',
    category: 'नशामुक्ति संदेश',
    quote_hi: 'शराब, मांस, नशा विनाश की जड़ हैं। जो इनसे दूर रहता है, उसका परिवार सुखी और जीवन सफल होता है।',
    author: 'परम पूज्य बाबा जयगुरुदेव जी महाराज',
    theme: 'addiction_free',
    bgColor: 'from-emerald-950 via-stone-900 to-neutral-950',
    accentColor: '#10B981',
  },
  {
    id: 'quote-4',
    category: 'गुरु महिमा एवं आत्म कल्याण',
    quote_hi: 'सच्चे गुरु वही हैं जो बुराइयां छुड़ाकर जीवात्मा को प्रभु से जोड़ दें। नाम की कमाई ही असली पूंजी है।',
    author: 'पूज्य बाबा उमाकान्त जी महाराज',
    theme: 'devotion',
    bgColor: 'from-amber-950 via-yellow-950 to-stone-950',
    accentColor: '#D97706',
  },
  {
    id: 'quote-5',
    category: 'मानव धर्म एवं सेवा',
    quote_hi: 'मानव तन बार-बार नहीं मिलता। परोपकार, सेवा और सत्य के मार्ग पर चलकर इस अमूल्य जीवन को सार्थक बनाएं।',
    author: 'परम पूज्य बाबा जयगुरुदेव जी महाराज',
    theme: 'service',
    bgColor: 'from-blue-950 via-slate-900 to-stone-950',
    accentColor: '#38BDF8',
  },
  {
    id: 'quote-6',
    category: 'शाकाहारी सदाचारी संसार',
    quote_hi: 'शाकाहारी सदाचारी नशामुक्त हो संसार। जीव दया ही सबसे बड़ा पुण्य है। जय गुरु देव।',
    author: 'पूज्य बाबा उमाकान्त जी महाराज',
    theme: 'peace',
    bgColor: 'from-orange-950 via-amber-950 to-neutral-950',
    accentColor: '#F97316',
  },
];

/**
 * Get date formatted in elegant Hindi Devanagari
 * e.g. "शुक्रवार, 11 सितम्बर 2026"
 */
export const getHindiFormattedDate = (dateObj = new Date()) => {
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const months = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'
  ];

  const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
  const dayName = days[d.getDay()];
  const dateNum = d.getDate();
  const monthName = months[d.getMonth()];
  const yearNum = d.getFullYear();

  return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
};

/**
 * Returns today's automatic quote based on day of month
 */
export const getTodayQuote = () => {
  const today = new Date();
  const dayIndex = today.getDate() % DAILY_QUOTES.length;
  return DAILY_QUOTES[dayIndex];
};
