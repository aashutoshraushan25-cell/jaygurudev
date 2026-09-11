import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Send, CheckCircle, Sparkles, Clock, ExternalLink } from 'lucide-react';
import { LotusLogo } from '../components/spiritualAssets';

export const ContactPage = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE6] text-maroon-900 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-[#ECD7CC]">
          <Phone className="w-4 h-4 text-maroon-800" />
          <span>{lang === 'hi' ? 'संपर्क एवं सहायता' : 'Contact & Helpline'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 font-devanagari">
          {t('contact')}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto font-devanagari">
          {lang === 'hi'
            ? 'सत्संग आयोजन, आश्रम में आवास, लंगर सेवा अथवा अन्य किसी जानकारी हेतु संपर्क करें।'
            : 'Get in touch for Satsang event coordination, Ashram stay, voluntary service or general queries.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ashram Information Cards */}
        <div className="space-y-6">
          {/* Main Ashram */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3DA] shadow-card space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <LotusLogo className="w-10 h-10 text-maroon-800" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-devanagari">
                  {lang === 'hi' ? 'मुख्य पावन आश्रम (उज्जैन)' : 'Central Ashram (Ujjain)'}
                </h3>
                <p className="text-xs text-maroon-800 font-semibold font-devanagari">
                  बाबा जयगुरुदेव आश्रम, उज्जैन (मध्य प्रदेश)
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-gray-700 font-devanagari">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-maroon-800 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-gray-900">
                    बाबा जयगुरुदेव आश्रम
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">सड़क (Road):</span> मक्सी रोड (Maksi Road)
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">लैंडमार्क:</span> पिंगलेश्वर रेलवे स्टेशन के सामने (Opposite Pingleshwar Railway Station)
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">शहर व राज्य:</span> उज्जैन, मध्य प्रदेश (Ujjain, Madhya Pradesh) - <span className="font-mono font-bold text-maroon-900">456664</span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="https://maps.app.goo.gl/Su4LdxPNmDKfd4cQ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow transition-all hover:scale-102"
                >
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>गूगल मैप पर लोकेशन देखें (View on Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <a href="tel:+919837000111" className="font-bold text-maroon-800 hover:underline">
                  +91 98370 00111 / +91 94150 33445
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-maroon-800 flex-shrink-0" />
                <p>{lang === 'hi' ? 'सेवा समय: प्रातः 06:00 से सायं 09:00 बजे तक' : 'Timing: 6:00 AM to 9:00 PM'}</p>
              </div>
            </div>
          </div>

          {/* Regional Assistance Box */}
          <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border border-[#EBE3DA] space-y-3">
            <h3 className="text-xl font-bold text-maroon-900 font-devanagari">
              {lang === 'hi' ? 'सत्संग आयोजन हेतु मार्गदर्शन' : 'Organizing a Satsang in your Area'}
            </h3>
            <p className="text-sm text-gray-700 font-devanagari leading-relaxed">
              {lang === 'hi'
                ? 'यदि आप अपने गांव, कस्बे या शहर में जय गुरु देव पावन सत्संग का आयोजन करवाना चाहते हैं, तो कृपया अपने जिला संयोजक से संपर्क करें अथवा दिए गए फॉर्म के माध्यम से विवरण भेजें।'
                : 'If you wish to organize a Satsang in your town or village, please reach out to your district coordinator or submit your request via the form.'}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3DA] shadow-card">
          {submitted ? (
            <div className="text-center py-12 space-y-4 font-devanagari">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                {lang === 'hi' ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Message Received!'}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {lang === 'hi'
                  ? 'जय गुरु देव! आपका संदेश आश्रम सेवा केंद्र तक पहुँच गया है। जल्द ही आपसे संपर्क किया जाएगा।'
                  : 'Jai Guru Dev! Your inquiry has been forwarded to the Ashram coordination team.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-devanagari">
              <h3 className="text-xl font-bold text-gray-900 pb-2 border-b border-gray-100">
                {lang === 'hi' ? 'सत्संग संपर्क फॉर्म' : 'Send Message'}
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'hi' ? 'आपका नाम' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="उदा. रमेश कुमार"
                  className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98000 00000"
                  className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'hi' ? 'राज्य' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="उदा. बिहार"
                    className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {lang === 'hi' ? 'जिला' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="उदा. मुजफ्फरपुर"
                    className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'hi' ? 'संदेश / विवरण' : 'Message'} *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="सत्संग आयोजन अथवा अन्य जानकारी के बारे में लिखें..."
                  className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white font-bold py-3 px-6 rounded-xl shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'hi' ? 'संदेश भेजें' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
