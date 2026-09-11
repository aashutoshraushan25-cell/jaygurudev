import React, { useState } from 'react';
import {
  Image,
  MapPin,
  Calendar,
  Heart,
  Share2,
  Sparkles,
  Filter,
  Maximize2,
  X,
  Download,
  MessageCircle,
  ExternalLink,
  Compass,
  Building,
} from 'lucide-react';

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('ashram');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const categories = [
    { id: 'all', label: 'सभी तस्वीरें' },
    { id: 'ashram', label: '✨ उज्जैन पावन आश्रम', highlight: true },
    { id: 'guru', label: 'पूज्य गुरु दर्शन' },
    { id: 'satsang', label: 'सत्संग एवं नामदान' },
    { id: 'bhandara', label: 'गुरु का लंगर (भंडारा)' },
    { id: 'seva', label: 'मानव सेवा एवं संदेश' },
  ];

  const galleryItems = [
    // --- UJJAIN ASHRAM DEDICATED PHOTOS ---
    {
      id: 101,
      category: 'ashram',
      title: 'बाबा जयगुरुदेव आश्रम मुख्य पावन धाम, उज्जैन',
      location: 'मक्सी रोड, पिंगलेश्वर, उज्जैन (म.प्र.)',
      date: 'सदा पावन धाम',
      photoUrl:
        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1000&auto=format&fit=crop&q=80',
      tag: 'मुख्य मंदिर',
      description:
        'मक्सी रोड, पिंगलेश्वर रेलवे स्टेशन के सामने स्थित बाबा जयगुरुदेव आश्रम का दिव्य व भव्य मुख्य मंदिर परिसर, जहां प्रतिदिन हजारों श्रद्धालु गुरु दर्शन व सुमिरन हेतु आते हैं।',
    },
    {
      id: 102,
      category: 'ashram',
      title: 'उज्जैन आश्रम का भव्य अलौकिक प्रवेश द्वार',
      location: 'पिंगलेश्वर स्टेशन के सामने, उज्जैन',
      date: 'आश्रम प्रवेश द्वार',
      photoUrl:
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1000&auto=format&fit=crop&q=80',
      tag: 'सिंहद्वार',
      description:
        'बाबा जयगुरुदेव आश्रम, उज्जैन का विशाल एवं नयनाभिराम मुख्य द्वार। यहां प्रवेश करते ही मन में शांति, दिव्यता और गुरु भक्ति का अलौकिक संचार होता है।',
    },
    {
      id: 103,
      category: 'ashram',
      title: 'उज्जैन आश्रम विशाल सत्संग पंडाल एवं ध्यान केंद्र',
      location: 'आश्रम प्रांगण, उज्जैन',
      date: 'सत्संग पंडाल',
      photoUrl:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80',
      tag: 'सत्संग भवन',
      description:
        'उज्जैन आश्रम में लाखों श्रद्धालुओं के एक साथ बैठने योग्य विशाल सत्संग पंडाल, जहां पूज्य बाबा उमाकान्त जी महाराज के मुखारविंद से अमृत वचनों की वर्षा होती है।',
    },
    {
      id: 104,
      category: 'ashram',
      title: 'उज्जैन आश्रम अटूट गुरु लंगर एवं पावन भंडारा भवन',
      location: 'भंडारा भवन, उज्जैन आश्रम',
      date: 'अटूट लंगर',
      photoUrl:
        'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1000&auto=format&fit=crop&q=80',
      tag: 'गुरु लंगर',
      description:
        'उज्जैन आश्रम में 24 घंटे चलने वाला अटूट पावन भंडारा, जहां बिना किसी भेदभाव के सभी दर्शनार्थियों व जरूरतमंदों को भरपेट शुद्ध सात्विक महाप्रसाद कराया जाता है।',
    },
    {
      id: 105,
      category: 'ashram',
      title: 'उज्जैन आश्रम में पूज्य महाराज जी का पावन प्रवचन मंच',
      location: 'प्रवचन मंच, उज्जैन धाम',
      date: 'दिव्य दर्शन',
      photoUrl:
        'https://www.jaigurudevukm.com/Maharaj-Ji-Small-Images/Style-1/2.jpg',
      tag: 'प्रवचन मंच',
      description:
        'उज्जैन पावन आश्रम में पूज्य बाबा उमाकान्त जी महाराज व्यासपीठ से देश-विदेश से पधारे प्रेमी भक्तों को नाम सुमिरन, शाकाहार व सदाचार की सीख देते हुए।',
    },
    {
      id: 106,
      category: 'ashram',
      title: 'उज्जैन आश्रम साधना कुटीर एवं शांत परिक्रमा पथ',
      location: 'साधना क्षेत्र, उज्जैन आश्रम',
      date: 'साधना स्थल',
      photoUrl:
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1000&auto=format&fit=crop&q=80',
      tag: 'शांति निकेतन',
      description:
        'आश्रम का शांत, हरा-भरा एवं पवित्र साधना परिसर, जहां सत्संगी साधक भाई-बहन ब्रह्म मुहूर्त में गुरु चरणों का ध्यान व सुरत-शब्द योग साधना करते हैं।',
    },
    {
      id: 107,
      category: 'ashram',
      title: 'उज्जैन आश्रम पावन गौशाला एवं जीव दया केंद्र',
      location: 'गौशाला, उज्जैन आश्रम परिसर',
      date: 'गौ सेवा',
      photoUrl:
        'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1000&auto=format&fit=crop&q=80',
      tag: 'जीव दया',
      description:
        '“सभी जीवों पर दया करो, गोवंश की रक्षा करो” के गुरु संकल्प को साकार करती उज्जैन आश्रम की आदर्श गौशाला, जहां सैकड़ों गौमाताओं की निस्वार्थ सेवा होती है।',
    },
    {
      id: 108,
      category: 'ashram',
      title: 'उज्जैन आश्रम पावन गुरु पूर्णिमा एवं दीप उत्सव',
      location: 'उज्जैन धाम',
      date: 'वार्षिक महोत्सव',
      photoUrl:
        'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=1000&auto=format&fit=crop&q=80',
      tag: 'दीपोत्सव',
      description:
        'वार्षिक भंडारे एवं गुरु पूर्णिमा के पावन अवसर पर लाखों दीयों की रोशनी से जगमगाता उज्जैन का बाबा जयगुरुदेव आश्रम।',
    },

    // --- GURU DARSHAN ---
    {
      id: 1,
      category: 'guru',
      title: 'परम पूज्य बाबा जयगुरुदेव जी महाराज',
      location: 'मथुरा / उज्जैन पावन धाम',
      date: 'अमर स्वरूप',
      photoUrl: '/guruji_maharaj.png',
      isGuruCutout: true,
      tag: 'परम पूज्य गुरुदेव',
      description:
        'शाकाहार, नशामुक्ति, जीव दया और प्रभु भक्ति का अलौकिक संदेश देने वाले युग पुरुष परम पूज्य बाबा जयगुरुदेव जी महाराज का दिव्य पावन स्वरूप।',
    },
    {
      id: 2,
      category: 'guru',
      title: 'पूज्य बाबा उमाकान्त जी महाराज',
      location: 'उज्जैन पावन आश्रम (म.प्र.)',
      date: 'अमृत दर्शन',
      photoUrl: '/umakant_maharaj.png',
      isGuruCutout: true,
      tag: 'पूज्य महाराज जी',
      description:
        'परम पूज्य बाबा जयगुरुदेव जी महाराज के वैचारिक उत्तराधिकारी पूज्य बाबा उमाकान्त जी महाराज, जो उज्जैन आश्रम से जन-जन को आत्म कल्याण का मार्ग दिखा रहे हैं।',
    },

    // --- SATSANG & PUBLIC SAMAGAM ---
    {
      id: 3,
      category: 'satsang',
      title: 'भव्य सत्संग पंडाल एवं विशाल जनसमूह',
      location: 'सत्संग मैदान, बिहार',
      date: 'पावन सत्संग समागम',
      photoUrl: '/hero_bg.jpg',
      tag: 'विराट समागम',
      description:
        'सत्संग में लाखों श्रद्धालुओं की उपस्थिति में गुरु नाम की अमृत वर्षा और शाकाहारी बनने का सामूहिक संकल्प।',
    },
    {
      id: 4,
      category: 'satsang',
      title: 'मुजफ्फरपुर भव्य सत्संग समारोह',
      location: 'ब्रह्मपुरा मैदान, मुजफ्फरपुर, बिहार',
      date: '15 सितम्बर 2026',
      photoUrl:
        'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1000&auto=format&fit=crop&q=80',
      tag: 'जिला सत्संग',
      description:
        'लाखों श्रद्धालुओं की उपस्थिति में आयोजित दिव्य सत्संग एवं नामदान कार्यक्रम, जिसमें जन-जन ने गुरु चरणों में शीश नवाया।',
    },

    // --- SEVA & SOCIAL CAMPAIGNS ---
    {
      id: 5,
      category: 'seva',
      title: 'शाकाहार व जीव दया जन-जागरण शोभा यात्रा',
      location: 'विभिन्न नगर एवं ग्राम',
      date: 'सेवा संदेश',
      photoUrl:
        'https://images.unsplash.com/photo-1561361066-619f7a77517c?w=1000&auto=format&fit=crop&q=80',
      tag: 'शोभा यात्रा',
      description:
        '“जीवों पर दया करो, बेजुबानों को मारकर मत खाओ” के नारों और पावन ध्वज के साथ निकाली गई जन-जागरण शोभा यात्रा।',
    },
    {
      id: 6,
      category: 'bhandara',
      title: 'समस्तीपुर सत्संग स्थल पर श्रद्धालुओं की सेवा',
      location: 'समस्तीपुर, बिहार',
      date: '05 अक्टूबर 2026',
      photoUrl:
        'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1000&auto=format&fit=crop&q=80',
      tag: 'भंडारा सेवा',
      description:
        'सत्संग में दूर-दूर से आने वाले प्रेमी भाई-बहनों का सप्रेम स्वागत, शीतल जल एवं भोजन प्रसाद की व्यवस्था।',
    },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sharePhoto = (item, e) => {
    e.stopPropagation();
    const text = `🌸 *जय गुरु देव - उज्जैन आश्रम एवं पावन दर्शन* 🌸\n\n📌 *${item.title}*\n📍 ${item.location}\n📅 ${item.date}\n\n"${item.description}"\n\n🌐 https://jaygurudev.org/gallery`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 pb-16 font-devanagari">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-[#FAF4EA] via-[#F6ECE0] to-[#F1E4D4] py-10 px-4 border-b border-[#E8DDD0] text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/80 px-4 py-1.5 rounded-full text-xs font-bold text-maroon-800 border border-maroon-100 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-maroon-800" />
            <span>बाबा जयगुरुदेव आश्रम, उज्जैन एवं पावन दर्शन</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-maroon-900">
            जय गुरु देव फोटो गैलरी
          </h1>
          <p className="text-sm sm:text-base text-gray-700 font-medium max-w-2xl mx-auto">
            मक्सी रोड, पिंगलेश्वर स्थित <strong>बाबा जयगुरुदेव आश्रम (उज्जैन)</strong> के पावन मंदिर, भव्य द्वार, अटूट लंगर, गौशाला एवं दिव्य सत्संग समागमों की अलौकिक छवियां।
          </p>
        </div>
      </div>

      {/* SPECIAL UJJAIN ASHRAM HERO SPOTLIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#240008] via-[#480010] to-[#160005] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-200 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>मुख्य तीर्थ धाम • उज्जैन (मध्य प्रदेश)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              बाबा जयगुरुदेव आश्रम, पिंगलेश्वर (उज्जैन)
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              स्थान: <strong>पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन, मध्य प्रदेश (456661)</strong>। यह पवित्र आध्यात्मिक केंद्र पूज्य बाबा उमाकान्त जी महाराज के सानिध्य में 24 घंटे निःशुल्क लंगर, गौ सेवा और आत्म कल्याण साधना का पावन धाम है।
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory('ashram')}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-maroon-950 font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow transition-all"
              >
                <Building className="w-4 h-4" />
                <span>केवल उज्जैन आश्रम की तस्वीरें देखें</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm border border-white/20 transition-all"
              >
                <span>सभी तस्वीरें देखें ({galleryItems.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Ashram Landmark Card */}
          <div className="w-full max-w-xs bg-black/50 border border-amber-400/40 rounded-2xl p-3.5 text-center space-y-2 backdrop-blur-sm">
            <div className="w-full h-36 rounded-xl overflow-hidden relative shadow">
              <img
                src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80"
                alt="उज्जैन आश्रम मंदिर"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold truncate">
                अलौकिक मंदिर • उज्जैन आश्रम
              </div>
            </div>
            <div className="text-[11px] text-amber-200 font-semibold">
              सम्पर्क: +91 9754700200, 9575600700
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? cat.highlight
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-maroon-900 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#F5EBE6] border border-[#EBE3DA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBE3DA] shadow-card hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="w-full h-64 bg-gradient-to-tr from-[#1A0A10] to-[#0A0005] overflow-hidden relative flex items-center justify-center">
                {item.isGuruCutout ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 relative bg-[radial-gradient(circle_at_50%_40%,rgba(236,72,153,0.3),transparent_70%)]">
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="w-auto h-52 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <>
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/hero_bg.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 group-hover:from-black/85 transition-colors duration-300" />
                  </>
                )}

                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span className="truncate max-w-[170px]">{item.location}</span>
                </div>

                {/* Category Tag Pill */}
                {item.tag && (
                  <div className="absolute bottom-3 left-3 bg-amber-500/90 text-maroon-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                    {item.tag}
                  </div>
                )}

                {/* Top Right: Zoom Preview Hint */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow border border-white/30">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Text & Meta */}
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug group-hover:text-maroon-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-maroon-800" />
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(item.id, e)}
                      className={`p-1.5 rounded-full transition-colors ${
                        likedPhotos[item.id]
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                      }`}
                      title="पसंद करें"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedPhotos[item.id] ? 'fill-current text-red-600' : ''
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => sharePhoto(item, e)}
                      className="p-1.5 rounded-full text-gray-400 hover:text-[#25D366] hover:bg-emerald-50 transition-colors"
                      title="व्हाट्सएप पर शेयर करें"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-neutral-950 text-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] flex flex-col border border-neutral-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors border border-white/20 shadow-lg"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Display */}
            <div className="w-full flex-1 max-h-[58vh] bg-black/95 flex items-center justify-center overflow-hidden p-2 sm:p-4">
              {selectedPhoto.isGuruCutout ? (
                <div className="h-full max-h-[54vh] flex items-center justify-center p-4 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.35),transparent_70%)]">
                  <img
                    src={selectedPhoto.photoUrl}
                    alt={selectedPhoto.title}
                    className="max-h-[50vh] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              ) : (
                <img
                  src={selectedPhoto.photoUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[55vh] max-w-full object-contain rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/hero_bg.jpg';
                  }}
                />
              )}
            </div>

            {/* Modal Details Footer */}
            <div className="p-5 sm:p-6 bg-neutral-900 border-t border-neutral-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedPhoto.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedPhoto.date}</span>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {selectedPhoto.title}
                  </h2>
                </div>

                {/* Share on WhatsApp Button in Lightbox */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => sharePhoto(selectedPhoto, e)}
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow transition-transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp पर शेयर करें</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
