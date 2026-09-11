import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LotusLogo } from '../components/spiritualAssets';
import {
  DAILY_QUOTES,
  getHindiFormattedDate,
  getTodayQuote,
} from '../data/dailyQuotes';
import {
  Download,
  Share2,
  Camera,
  Sparkles,
  Sun,
  Smartphone,
  Square,
  CheckCircle,
  RefreshCw,
  User,
  MapPin,
  LogIn,
  Heart,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export const DailyBannerPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Selected format: 'story' (9:16) or 'square' (1:1)
  const [bannerFormat, setBannerFormat] = useState('story');
  
  // Selected Quote
  const [selectedQuote, setSelectedQuote] = useState(getTodayQuote());
  
  // Customizable user details (pre-filled with logged-in user data)
  const [devoteeName, setDevoteeName] = useState(
    user?.name || (isAuthenticated ? 'सत्संगी प्रेमी' : 'प्रेमी भक्त (आपका नाम)')
  );
  const [devoteeLocation, setDevoteeLocation] = useState(
    user?.city && user?.state
      ? `${user.city}, ${user.state}`
      : user?.city || user?.state || 'भारत'
  );
  const [devoteePhoto, setDevoteePhoto] = useState(
    user?.photoUrl || ''
  );

  const [downloading, setDownloading] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const canvasRef = useRef(null);

  // Sync with user auth state if user changes
  useEffect(() => {
    if (user) {
      if (user.name) setDevoteeName(user.name);
      if (user.photoUrl) setDevoteePhoto(user.photoUrl);
      if (user.city || user.state) {
        setDevoteeLocation(
          user.city && user.state
            ? `${user.city}, ${user.state}`
            : user.city || user.state
        );
      }
    }
  }, [user]);

  const todayHindiDate = getHindiFormattedDate();

  // Photo upload directly on this page
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDevoteePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Render and Download banner as true High Definition PNG image
   * Theme: Pink (गुलाबी), Black (काला), and White (सफ़ेद)
   * Top Left: Param Pujya Baba Jai Guru Dev Ji Maharaj
   * Top Right: Pujya Baba Umakant Ji Maharaj
   */
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const isStory = bannerFormat === 'story';
      const width = 1080;
      const height = isStory ? 1920 : 1080;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Helper to load images safely
      const loadImage = (src) =>
        new Promise((resolve) => {
          if (!src) return resolve(null);
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });

      // Load both Guru photos and devotee photo
      const [guru1Img, guru2Img, userPhotoImg] = await Promise.all([
        loadImage('/guruji_maharaj.png'),
        loadImage('/umakant_maharaj.png'),
        devoteePhoto ? loadImage(devoteePhoto) : Promise.resolve(null),
      ]);

      // 1. Background Gradient (Deep Pure Black with subtle dark pink undertone)
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#040003'); // Pure Deep Black with pink undertone
      grad.addColorStop(0.3, '#14000C');
      grad.addColorStop(0.7, '#080005');
      grad.addColorStop(1, '#000000'); // Black
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Divine Pink Aura Glow in Center-Top
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.25,
        20,
        width / 2,
        height * 0.25,
        width * 0.7
      );
      radialGlow.addColorStop(0, 'rgba(236, 72, 153, 0.25)'); // Pink
      radialGlow.addColorStop(0.5, 'rgba(244, 63, 94, 0.08)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Ornate Outer Border (Pink & White Double Line)
      ctx.strokeStyle = '#EC4899'; // Bright Pink
      ctx.lineWidth = 6;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // Crisp White accent
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // 4. TOP SECTION: Gurus on Both Sides & Center Title
      const guruSize = isStory ? 170 : 130;
      const guruY = isStory ? 80 : 65;

      // 4A. Left Guru: Param Pujya Baba Jai Guru Dev Ji Maharaj
      const guru1X = 70;
      const guru1CenterX = guru1X + guruSize / 2;
      const guru1CenterY = guruY + guruSize / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(guru1CenterX, guru1CenterY, guruSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = '#000000';
      ctx.fillRect(guru1X, guruY, guruSize, guruSize);
      if (guru1Img) {
        ctx.drawImage(guru1Img, guru1X, guruY, guruSize, guruSize);
      }
      ctx.restore();

      // Outer Pink Halo & White Ring around Left Guru
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(guru1CenterX, guru1CenterY, guruSize / 2 + 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(guru1CenterX, guru1CenterY, guruSize / 2 - 2, 0, Math.PI * 2);
      ctx.stroke();

      // Left Guru Label Text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F472B6';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('परम पूज्य', guru1CenterX, guruY + guruSize + 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('बाबा जयगुरुदेव जी महाराज', guru1CenterX, guruY + guruSize + 44);

      // 4B. Right Guru: Pujya Baba Umakant Ji Maharaj
      const guru2X = width - 70 - guruSize;
      const guru2CenterX = guru2X + guruSize / 2;
      const guru2CenterY = guruY + guruSize / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(guru2CenterX, guru2CenterY, guruSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = '#000000';
      ctx.fillRect(guru2X, guruY, guruSize, guruSize);
      if (guru2Img) {
        ctx.drawImage(guru2Img, guru2X, guruY, guruSize, guruSize);
      }
      ctx.restore();

      // Outer Pink Halo & White Ring around Right Guru
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(guru2CenterX, guru2CenterY, guruSize / 2 + 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(guru2CenterX, guru2CenterY, guruSize / 2 - 2, 0, Math.PI * 2);
      ctx.stroke();

      // Right Guru Label Text
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F472B6';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText('पूज्य', guru2CenterX, guruY + guruSize + 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('बाबा उमाकान्त जी महाराज', guru2CenterX, guruY + guruSize + 44);

      // 4C. Center Header: "॥ जय गुरु देव ॥", Date & Category
      ctx.textAlign = 'center';

      // Sacred Monogram Top
      ctx.fillStyle = '#FFFFFF';
      ctx.font = isStory ? 'bold 50px sans-serif' : 'bold 42px sans-serif';
      ctx.fillText('॥ जय गुरु देव ॥', width / 2, isStory ? 120 : 95);

      // Daily Prabhat Sandesh in Pink
      ctx.fillStyle = '#F472B6';
      ctx.font = isStory ? 'bold 26px sans-serif' : 'bold 22px sans-serif';
      ctx.fillText('🌅 दैनिक प्रभात संदेश', width / 2, isStory ? 168 : 132);

      // Date in Crisp White
      ctx.fillStyle = '#FFFFFF';
      ctx.font = isStory ? 'bold 22px sans-serif' : 'bold 19px sans-serif';
      ctx.fillText(todayHindiDate, width / 2, isStory ? 206 : 164);

      // Category Pill (Translucent black with pink border and white text)
      const pillWidth = 400;
      const pillHeight = 46;
      const pillY = isStory ? 236 : 186;
      ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect((width - pillWidth) / 2, pillY, pillWidth, pillHeight, 23);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`✨ ${selectedQuote.category} ✨`, width / 2, pillY + 31);

      // Divider Line between Top Header and Quote
      const dividerY = isStory ? 335 : 255;
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(70, dividerY);
      ctx.lineTo(width - 70, dividerY);
      ctx.stroke();

      // 5. Main Spiritual Quote Text (Wrapped nicely)
      const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = context.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            context.fillText(line.trim(), x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line.trim(), x, currentY);
        return currentY;
      };

      // Quote Opening Symbol ❝
      ctx.fillStyle = '#EC4899';
      ctx.font = isStory ? 'bold 85px serif' : 'bold 65px serif';
      ctx.fillText('❝', width / 2, isStory ? 430 : 315);

      // Main Quote in Pure Crisp White (Bigger & Bolder)
      ctx.fillStyle = '#FFFFFF';
      ctx.font = isStory ? 'bold 56px sans-serif' : 'bold 40px sans-serif';
      const quoteStartY = isStory ? 525 : 375;
      const maxWidth = width - 160;
      const quoteEndY = wrapText(
        ctx,
        `"${selectedQuote.quote_hi}"`,
        width / 2,
        quoteStartY,
        maxWidth,
        isStory ? 82 : 58
      );

      // Author Name in Pink (Bigger)
      ctx.fillStyle = '#F472B6';
      ctx.font = isStory ? 'italic bold 34px sans-serif' : 'italic bold 28px sans-serif';
      ctx.fillText(`— ${selectedQuote.author}`, width / 2, quoteEndY + (isStory ? 75 : 55));

      // Sacred Divider Line
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 200, quoteEndY + (isStory ? 120 : 90));
      ctx.lineTo(width / 2 + 200, quoteEndY + (isStory ? 120 : 90));
      ctx.stroke();

      // Universal Slogan in White
      ctx.fillStyle = '#FFFFFF';
      ctx.font = isStory ? 'bold 26px sans-serif' : 'bold 22px sans-serif';
      ctx.fillText('शाकाहारी रहें • नशामुक्त रहें • सभी जीवों पर दया करें', width / 2, quoteEndY + (isStory ? 165 : 128));

      // 6. Bottom Personalized Devotee Badge (User Photo, Name, Location)
      const badgeY = height - (isStory ? 320 : 230);
      const badgeHeight = isStory ? 240 : 170;
      const badgeWidth = width - 120;
      const badgeX = 60;

      // Badge Container Box (Deep Black glass with Pink border)
      ctx.fillStyle = 'rgba(10, 0, 6, 0.88)';
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 26);
      ctx.fill();
      ctx.stroke();

      // Inner white hairline accent on badge
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(badgeX + 6, badgeY + 6, badgeWidth - 12, badgeHeight - 12, 20);
      ctx.stroke();

      // Devotee Photo / Circle Avatar
      const photoSize = isStory ? 140 : 105;
      const photoX = badgeX + 35;
      const photoY = badgeY + (badgeHeight - photoSize) / 2;

      // Draw photo or fallback avatar
      if (userPhotoImg) {
        try {
          ctx.save();
          ctx.beginPath();
          ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(userPhotoImg, photoX, photoY, photoSize, photoSize);
          ctx.restore();
        } catch (e) {
          ctx.fillStyle = '#EC4899';
          ctx.beginPath();
          ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = '#3A021B';
        ctx.beginPath();
        ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 50px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🙏', photoX + photoSize / 2, photoY + photoSize / 2 + 18);
      }

      // Pink & White Halo Ring around Devotee Photo
      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 - 1, 0, Math.PI * 2);
      ctx.stroke();

      // Devotee Name & Details Text
      ctx.textAlign = 'left';

      ctx.fillStyle = '#F472B6'; // Pink
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('॥ पावन सत्संगी सेवक ॥', photoX + photoSize + 30, photoY + (isStory ? 42 : 30));

      ctx.fillStyle = '#FFFFFF'; // Pure White
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(devoteeName || 'सत्संगी प्रेमी', photoX + photoSize + 30, photoY + (isStory ? 86 : 64));

      ctx.fillStyle = '#E2E8F0'; // White / Light Gray
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`📍 ${devoteeLocation}`, photoX + photoSize + 30, photoY + (isStory ? 124 : 96));

      // 7. Trigger File Download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const safeDate = new Date().toISOString().split('T')[0];
      a.href = dataUrl;
      a.download = `JayGuruDev_DailyStatus_${safeDate}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `🌸 *जय गुरु देव - आज का प्रभात पावन संदेश* 🌸\n\n"${selectedQuote.quote_hi}"\n\n— *${selectedQuote.author}*\n\n📅 ${todayHindiDate}\n👤 प्रेषक: ${devoteeName} (${devoteeLocation})\n\n🙏 शाकाहारी रहें • नशामुक्त रहें • जीवों पर दया करें\n🌐 https://jaygurudev.org`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-devanagari">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-900 border border-pink-300 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-2xs">
          <Sun className="w-4 h-4 text-pink-600 animate-spin-slow" />
          <span>दैनिक प्रभात स्टेटस एवं सुविचार बैनर (Pink • Black • White Theme)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-maroon-900 tracking-tight">
          आज का पावन प्रभात संदेश (Daily Status)
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          ऊपर दोनों ओर पूज्य गुरुदेवों के पावन दर्शन, आज का अमृत संदेश और नीचे आपके फोटो-नाम के साथ HD स्टेटस बैनर बनाएं।
        </p>
      </div>

      {/* Guest Notice if not logged in */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-pink-500/15 border border-pink-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center flex-shrink-0 shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-maroon-900">
                क्या आप अपना फोटो और नाम स्वतः लगाना चाहते हैं?
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                एक बार लॉगिन या साइन-अप करें, फिर प्रतिदिन सुबह आपका स्टेटस बैनर आपके फोटो के साथ स्वतः तैयार मिलेगा!
              </p>
            </div>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow transition-transform hover:scale-105 flex-shrink-0"
          >
            <LogIn className="w-4 h-4 text-pink-400" />
            <span>लॉगिन / साइन अप करें</span>
          </Link>
        </div>
      )}

      {/* Main Grid: Left Controls (5 cols) & Right Banner Preview (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Customization */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Format Toggle (Story vs Square) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBE3DA] shadow-card space-y-3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              1. बैनर प्रारूप चुनें (Format)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBannerFormat('story')}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                  bannerFormat === 'story'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-md scale-[1.02]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-pink-500'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>व्हाट्सएप स्टोरी (9:16)</span>
              </button>

              <button
                type="button"
                onClick={() => setBannerFormat('square')}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all ${
                  bannerFormat === 'square'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-md scale-[1.02]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-pink-500'
                }`}
              >
                <Square className="w-4 h-4" />
                <span>पोस्ट / चौकोर (1:1)</span>
              </button>
            </div>
          </div>

          {/* Devotee Info Card (Photo, Name, Location) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBE3DA] shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                2. आपका विवरण (Your Details on Banner)
              </label>
              {isAuthenticated && (
                <span className="text-[11px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>सत्यापित प्रोफाइल</span>
                </span>
              )}
            </div>

            {/* Photo Preview and Change */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full border-2 border-pink-500 p-0.5 shadow overflow-hidden bg-pink-50 flex-shrink-0 ring-2 ring-pink-300/40">
                {devoteePhoto ? (
                  <img
                    src={devoteePhoto}
                    alt="Devotee"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-pink-700 font-black text-xl">
                    🙏
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 border border-pink-300 text-pink-900 rounded-xl text-xs font-bold transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                  <span>फोटो बदलें</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-gray-500">
                  यह फोटो बैनर के निचले भाग में गुलाबी-सफेद घेरे में दिखेगी।
                </p>
              </div>
            </div>

            {/* Devotee Name Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                आपका नाम
              </label>
              <input
                type="text"
                value={devoteeName}
                onChange={(e) => setDevoteeName(e.target.value)}
                placeholder="उदा. राहुल शर्मा"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:border-pink-600 focus:outline-none"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                स्थान (शहर / जिला, राज्य)
              </label>
              <input
                type="text"
                value={devoteeLocation}
                onChange={(e) => setDevoteeLocation(e.target.value)}
                placeholder="उदा. मुजफ्फरपुर, बिहार"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:border-pink-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Quotes Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBE3DA] shadow-card space-y-3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              3. आज का सुविचार चुनें (Select Quote)
            </label>
            <div className="space-y-2">
              {DAILY_QUOTES.map((q) => {
                const isSelected = selectedQuote.id === q.id;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setSelectedQuote(q)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-pink-50/80 border-pink-400 shadow-xs'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        isSelected ? 'bg-pink-600 ring-2 ring-pink-300' : 'bg-gray-300'
                      }`}
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-pink-900">
                        {q.category}
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-snug">
                        "{q.quote_hi}"
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={downloading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-black hover:from-pink-700 hover:to-neutral-900 text-white font-extrabold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {downloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5 text-pink-200" />
              )}
              <span>⬇️ स्टेटस फोटो डाउनलोड करें (HD Image)</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>व्हाट्सएप पर शेयर करें (WhatsApp Share)</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Banner Canvas Preview (Pink, Black & White) */}
        <div className="lg:col-span-7 flex flex-col items-center sticky top-24">
          
          <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5 self-center">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>लाइव बैनर प्रीव्यू (Pink • Black • White Design)</span>
          </div>

          {/* LIVE BANNER CARD */}
          <div
            className={`w-full relative rounded-3xl overflow-hidden border-4 border-pink-500 bg-gradient-to-b from-[#050003] via-[#14000C] to-[#000000] text-white flex flex-col justify-between p-3.5 sm:p-5 select-none transition-all shadow-[0_0_35px_rgba(236,72,153,0.3)] ${
              bannerFormat === 'story'
                ? 'max-w-sm sm:max-w-md aspect-[9/16]'
                : 'max-w-md sm:max-w-lg aspect-square'
            }`}
          >
            {/* Subtle Pink Divine Halo Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(236,72,153,0.22),transparent_70%)] pointer-events-none" />

            {/* Inner White Hairline Border */}
            <div className="absolute inset-2 sm:inset-3 border border-white/20 rounded-2xl pointer-events-none" />

            {/* TOP SECTION: Gurus on Both Sides + Center Title */}
            <div className="relative z-10 flex items-start justify-between gap-1 sm:gap-2 pt-1 border-b border-pink-500/30 pb-2.5">
              {/* Left Guru: Param Pujya Baba Jai Guru Dev Ji Maharaj */}
              <div className="flex flex-col items-center text-center w-20 sm:w-24 flex-shrink-0">
                <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-pink-500 p-0.5 shadow-md bg-black overflow-hidden ring-2 ring-pink-400/40">
                  <img
                    src="/guruji_maharaj.png"
                    alt="परम पूज्य बाबा जयगुरुदेव जी महाराज"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[8px] sm:text-[9px] font-extrabold text-pink-300 mt-1 leading-tight">
                  परम पूज्य
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-white leading-tight">
                  बाबा जयगुरुदेव जी महाराज
                </span>
              </div>

              {/* Center: Monogram, Date, Category */}
              <div className="text-center space-y-0.5 my-auto px-1 flex-1">
                <div className="text-white text-base sm:text-xl font-black tracking-wider drop-shadow-[0_2px_8px_rgba(236,72,153,0.6)]">
                  ॥ जय गुरु देव ॥
                </div>
                <div className="text-pink-300 text-[10px] sm:text-xs font-bold">
                  🌅 दैनिक प्रभात संदेश
                </div>
                <div className="text-white/90 text-[9px] sm:text-[10px] font-medium">
                  {todayHindiDate}
                </div>
                <div className="inline-block bg-pink-500/20 backdrop-blur-xs border border-pink-400/40 text-pink-200 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
                  ✨ {selectedQuote.category} ✨
                </div>
              </div>

              {/* Right Guru: Pujya Baba Umakant Ji Maharaj */}
              <div className="flex flex-col items-center text-center w-20 sm:w-24 flex-shrink-0">
                <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full border-2 border-pink-500 p-0.5 shadow-md bg-black overflow-hidden ring-2 ring-pink-400/40">
                  <img
                    src="/umakant_maharaj.png"
                    alt="पूज्य बाबा उमाकान्त जी महाराज"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[8px] sm:text-[9px] font-extrabold text-pink-300 mt-1 leading-tight">
                  पूज्य
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-white leading-tight">
                  बाबा उमाकान्त जी महाराज
                </span>
              </div>
            </div>

            {/* Center Spiritual Quote Body (Bigger & Bolder Text) */}
            <div className="relative z-10 text-center px-2 sm:px-4 my-auto space-y-3">
              <div className="text-pink-500 text-4xl sm:text-5xl leading-none font-serif select-none opacity-90">
                ❝
              </div>
              <p
                className={`font-black text-white leading-relaxed tracking-wide drop-shadow-md font-devanagari ${
                  bannerFormat === 'story'
                    ? 'text-lg sm:text-xl md:text-2xl leading-snug sm:leading-relaxed'
                    : 'text-base sm:text-lg md:text-xl leading-snug sm:leading-relaxed'
                }`}
              >
                {selectedQuote.quote_hi}
              </p>
              <div className="text-pink-300 text-xs sm:text-sm md:text-base font-bold italic">
                — {selectedQuote.author}
              </div>

              <div className="w-24 h-0.5 bg-pink-500/50 mx-auto mt-2" />
              <div className="text-[11px] sm:text-xs text-white/90 font-semibold tracking-wide">
                शाकाहारी रहें • नशामुक्त रहें • जीवों पर दया करें
              </div>
            </div>

            {/* Bottom Personalized Badge (Black Glass + Pink Border + White Text) */}
            <div className="relative z-10 bg-black/85 backdrop-blur-md border-2 border-pink-500 rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 shadow-xl">
              {/* Devotee Photo */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-pink-400 p-0.5 shadow-md flex-shrink-0 overflow-hidden bg-pink-950 ring-2 ring-pink-500/30">
                {devoteePhoto ? (
                  <img
                    src={devoteePhoto}
                    alt={devoteeName}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-pink-200 text-lg font-bold">
                    🙏
                  </div>
                )}
              </div>

              {/* Devotee Name & Details */}
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[9px] sm:text-[10px] font-bold text-pink-300 uppercase tracking-wider">
                  ॥ पावन सत्संगी सेवक ॥
                </span>
                <span className="text-xs sm:text-sm font-black text-white truncate">
                  {devoteeName || 'सत्संगी प्रेमी'}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-200 flex items-center gap-1 font-semibold truncate">
                  <MapPin className="w-3 h-3 text-pink-400 flex-shrink-0" />
                  <span className="truncate">{devoteeLocation}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Quick Help Tip below preview */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            💡 टिप: <strong>"स्टेटस फोटो डाउनलोड करें"</strong> दबाएं और सीधे अपने WhatsApp स्टेटस पर लगाएं।
          </p>

        </div>

      </div>

    </div>
  );
};
