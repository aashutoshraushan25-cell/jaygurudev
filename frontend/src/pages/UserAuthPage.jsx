import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LotusLogo } from '../components/spiritualAssets';
import { DEFAULT_STATES } from '../data/locationData';
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Camera,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Sun,
  Shield,
  Upload,
} from 'lucide-react';

export const UserAuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, user } = useAuth();

  // Switch between 'login' and 'register'
  const isRegisterParam = location.pathname.includes('register');
  const [activeTab, setActiveTab] = useState(isRegisterParam ? 'register' : 'login');

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('बिहार');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Default preset avatars if user doesn't upload a personal photo
  const defaultAvatars = [
    { id: 'av1', label: 'सत्संगी भक्त (पुरुष)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80' },
    { id: 'av2', label: 'सत्संगी भक्त (महिला)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
    { id: 'av3', label: 'प्रेमी साधक', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
    { id: 'av4', label: 'गुरु भक्त', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80' },
  ];

  // Handle local photo upload via FileReader
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('फोटो का आकार 5MB से कम होना चाहिए।');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await login(loginEmail.trim(), loginPassword);
      if (res.success) {
        setSuccessMsg('लॉगिन सफल रहा! दैनिक बैनर पर ले जाया जा रहा है...');
        setTimeout(() => {
          navigate('/daily-banner');
        }, 600);
      } else {
        setErrorMsg(res.message || 'लॉगिन विफल रहा। कृपया विवरण जांचें।');
      }
    } catch (err) {
      setErrorMsg('लॉगिन में त्रुटि हुई।');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें।');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('कृपया अपना ईमेल अथवा मोबाइल नंबर दर्ज करें।');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।');
      return;
    }

    setLoading(true);

    try {
      const cleanEmail = email.includes('@')
        ? email.trim()
        : `${phone || email.replace(/\D/g, '')}@jaygurudev.user`;

      const res = await register({
        name: name.trim(),
        email: cleanEmail,
        phone: phone.trim() || (email.includes('@') ? '' : email.trim()),
        password,
        photoUrl: photoUrl || photoPreview || '',
        city: city.trim(),
        state: state.trim(),
      });

      if (res.success) {
        setSuccessMsg('जय गुरु देव! आपका खाता बन गया है। दैनिक बैनर तैयार हो रहा है...');
        setTimeout(() => {
          navigate('/daily-banner');
        }, 800);
      } else {
        setErrorMsg(res.message || 'पंजीकरण विफल रहा।');
      }
    } catch (err) {
      setErrorMsg('पंजीकरण में समस्या हुई।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-to-b from-[#FAF6F0] to-[#F3EBE0]">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-[#EBE3DA] p-6 sm:p-10 font-devanagari">
        
        {/* Header Branding */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center border border-amber-300 shadow-sm">
              <LotusLogo className="w-10 h-10 text-maroon-900" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-maroon-900 tracking-tight">
            जय गुरु देव सत्संगी पोर्टल
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            दैनिक प्रभात सुविचार, पावन सत्संग एवं अपने फोटो युक्त स्टेटस बैनर के लिए जुड़ें
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD3] mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-maroon-900 text-white shadow-md'
                : 'text-gray-700 hover:text-maroon-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>लॉगिन करें</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'bg-maroon-900 text-white shadow-md'
                : 'text-gray-700 hover:text-maroon-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>नया खाता बनाएं (Sign Up)</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                ईमेल अथवा मोबाइल नंबर
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="अपना ईमेल या मोबाइल नंबर दर्ज करें"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 text-sm font-medium bg-white"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                पासवर्ड
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="अपना पासवर्ड दर्ज करें"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 text-sm font-medium bg-white"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-maroon-900 to-amber-900 hover:from-maroon-950 hover:to-amber-950 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>लॉगिन करें एवं दैनिक बैनर पाएं</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* REGISTRATION FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Photo Upload Section */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-maroon-900">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>अपनी प्रोफाइल फोटो जोड़ें (दैनिक स्टेटस बैनर के लिए)</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Image Preview */}
                <div className="relative w-20 h-20 rounded-full border-2 border-amber-500 p-0.5 shadow-sm overflow-hidden bg-white flex-shrink-0">
                  {photoPreview || photoUrl ? (
                    <img
                      src={photoPreview || photoUrl}
                      alt="User Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 text-[10px] font-bold">
                      <Camera className="w-6 h-6 mb-0.5 text-gray-400" />
                      <span>फोटो चुनें</span>
                    </div>
                  )}
                </div>

                {/* Upload Action */}
                <div className="space-y-1.5 text-left">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-amber-400 hover:bg-amber-100 text-maroon-900 rounded-xl text-xs font-bold shadow-2xs transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>गैलरी / फाइल से फोटो अपलोड करें</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-gray-500">
                    आपकी फोटो प्रतिदिन सुबह के सुविचार बैनर पर सुंदर गोल फ्रेम में दिखाई देगी।
                  </p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                पूरा नाम (Full Name) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल शर्मा / शिव कुमार जी"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  ईमेल / यूजर आईडी *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  मोबाइल नंबर (वैकल्पिक)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* State & City Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  राज्य (State)
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                >
                  {DEFAULT_STATES.map((st) => (
                    <option key={st.code} value={st.name_hi}>
                      {st.name_hi} ({st.name_en})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                  शहर / जिला (City/District)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="उदा. मुजफ्फरपुर / मथुरा"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1">
                नया पासवर्ड बनाएं *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="सुरक्षित पासवर्ड दर्ज करें"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-maroon-800 text-sm font-medium bg-white"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-maroon-900 to-amber-900 hover:from-maroon-950 hover:to-amber-950 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>पंजीकरण करें एवं दैनिक स्टेटस बैनर बनाएं</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className="mt-8 pt-5 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            परम पूज्य बाबा जयगुरुदेव जी महाराज की असीम दया व कृपा से यह पोर्टल सभी सत्संगी प्रेमियों के आत्म कल्याण हेतु समर्पित है।
          </p>
        </div>

      </div>
    </div>
  );
};
