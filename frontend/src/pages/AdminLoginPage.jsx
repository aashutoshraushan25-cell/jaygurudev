import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { LotusLogo } from '../components/spiritualAssets';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@jaygurudev.org');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(
        lang === 'hi'
          ? 'ईमेल या पासवर्ड गलत है।'
          : res.message || 'Invalid email or password.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-[#EBE3DA] space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#F5EBE6] flex items-center justify-center mx-auto shadow-xs">
            <LotusLogo className="w-10 h-10 text-maroon-800" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-devanagari">
            {t('adminLogin')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium font-devanagari">
            जय गुरु देव सत्संग प्रबंधन पोर्टल
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 font-devanagari">
              {t('email')}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jaygurudev.org"
                className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium"
              />
              <Mail className="w-4 h-4 text-maroon-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 font-devanagari">
              {t('password')}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-3 pl-10 pr-4 text-sm font-medium"
              />
              <Lock className="w-4 h-4 text-maroon-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#ECD7CC] text-[11px] text-maroon-900 font-semibold space-y-0.5">
            <div>
              <span className="font-bold">डिफ़ॉल्ट लॉगिन:</span> admin@jaygurudev.org
            </div>
            <div>
              <span className="font-bold">पासवर्ड:</span> admin123
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white font-black text-base py-3.5 px-6 rounded-xl shadow transition-all font-devanagari"
          >
            <span>{loading ? t('loading') : t('loginBtn')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
