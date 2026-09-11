import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LotusLogo } from './spiritualAssets';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Users,
  Map,
  MapPin,
  Image,
  Info,
  Phone,
  Search,
  User,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Youtube,
  Sun,
  Sparkles,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'मुख्य पृष्ठ', icon: Home },
    { to: '/daily-banner', label: 'दैनिक प्रभात बैनर', icon: Sun, highlight: true },
    { to: '/satsang', label: 'सत्संग', icon: Users },
    { to: '/#youtube-videos', label: 'वीडियो', icon: Youtube },
    { to: '/states', label: 'राज्य', icon: Map },
    { to: '/states', label: 'जिले', icon: MapPin },
    { to: '/gallery', label: 'गैलरी', icon: Image },
    { to: '/about', label: 'हमारे बारे में', icon: Info },
    { to: '/contact', label: 'संपर्क करें', icon: Phone },
  ];

  const isActive = (path, label) => {
    if (label === 'जिले' && location.pathname.includes('/districts')) return true;
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/satsang?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#EFE7DE] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Left: Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center space-x-3 group select-none flex-shrink-0"
          >
            <LotusLogo className="w-11 h-11 text-maroon-800 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-[26px] font-black text-maroon-900 tracking-tight leading-none font-devanagari">
                जय गुरु देव
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 mt-1 tracking-wider font-devanagari">
                सत्य • प्रेम • सेवा • मानवता
              </span>
            </div>
          </Link>

          {/* 2. Center: Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1.5 2xl:space-x-2">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const active = isActive(link.to, link.label);
              return (
                <Link
                  key={idx}
                  to={link.to}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                    link.highlight
                      ? active
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                      : active
                      ? 'bg-[#F5EBE6] text-maroon-900 border border-[#ECD7CC] shadow-xs'
                      : 'text-gray-700 hover:text-maroon-800 hover:bg-[#F8F2EC]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      link.highlight
                        ? active ? 'text-white' : 'text-amber-700'
                        : active ? 'text-maroon-800' : 'text-gray-500'
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Search Icon Circle Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 rounded-full bg-[#F5EBE6]/60 hover:bg-[#F5EBE6] text-gray-700 hover:text-maroon-800 flex items-center justify-center transition-colors border border-[#ECD7CC]/80"
                aria-label="सत्संग खोजें"
                title="सत्संग खोजें"
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-maroon-100 p-2 z-50 flex items-center gap-1.5 animate-fadeIn"
                >
                  <input
                    type="text"
                    placeholder="सत्संग या स्थान खोजें..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 text-xs sm:text-sm px-3 py-1.5 border border-gray-200 rounded-xl focus:outline-none focus:border-maroon-800"
                  />
                  <button
                    type="submit"
                    className="bg-maroon-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-maroon-900"
                  >
                    खोजें
                  </button>
                </form>
              )}
            </div>
          </nav>

          {/* 3. Right: User / Admin Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 font-devanagari">
                {/* Devotee Profile Link to Daily Banner */}
                <Link
                  to="/daily-banner"
                  className="flex items-center space-x-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-maroon-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs transition-all"
                  title="दैनिक प्रभात बैनर बनाएं"
                >
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover border border-amber-500"
                    />
                  ) : (
                    <User className="w-4 h-4 text-amber-700" />
                  )}
                  <span className="max-w-[110px] truncate">{user?.name || 'सत्संगी'}</span>
                </Link>

                {/* If user is admin, show dashboard button */}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-1.5 bg-maroon-900 hover:bg-maroon-950 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>व्यवस्थापक</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="लॉगआउट"
                  className="p-2 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 font-devanagari">
                {/* Public Login */}
                <Link
                  to="/login"
                  className="flex items-center space-x-1.5 bg-maroon-900 hover:bg-maroon-950 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <User className="w-3.5 h-3.5 text-amber-300" />
                  <span>लॉगिन / साइन-अप</span>
                </Link>

                {/* Subtle Admin Link */}
                <Link
                  to="/admin/login"
                  title="व्यवस्थापक लॉगिन"
                  className="p-2 text-gray-400 hover:text-maroon-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex items-center xl:hidden space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-maroon-900 bg-[#F5EBE6] hover:bg-[#ECD7CC] focus:outline-none"
              aria-label="मेनू खोलें"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF7F2] border-t border-[#EFE7DE] px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg font-devanagari">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            const active = isActive(link.to, link.label);
            return (
              <Link
                key={idx}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-base ${
                  link.highlight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : active
                    ? 'bg-[#F5EBE6] text-maroon-900 border border-[#ECD7CC]'
                    : 'text-gray-800 hover:bg-[#F3EBE3]'
                }`}
              >
                <Icon className={`w-5 h-5 ${link.highlight ? 'text-amber-700' : active ? 'text-maroon-800' : 'text-gray-600'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#EFE7DE] space-y-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/daily-banner"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2.5 w-full bg-amber-100 text-maroon-900 px-4 py-3 rounded-xl font-bold text-base border border-amber-300"
                >
                  <Sun className="w-5 h-5 text-amber-700" />
                  <span>दैनिक बैनर बनाएं ({user?.name || 'सत्संगी'})</span>
                </Link>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2.5 w-full bg-maroon-900 text-white px-4 py-3 rounded-xl font-bold text-base"
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                    <span>व्यवस्थापक पैनल</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-2.5 w-full bg-red-100 text-red-800 px-4 py-3 rounded-xl font-bold text-base"
                >
                  <LogOut className="w-5 h-5" />
                  <span>लॉगआउट</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-maroon-900 text-white px-4 py-3 rounded-xl font-bold text-base shadow"
                >
                  <User className="w-5 h-5" />
                  <span>लॉगिन / साइन-अप (Login / Sign Up)</span>
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full text-xs text-gray-500 hover:text-maroon-900 py-1 font-semibold"
                >
                  <span>व्यवस्थापक लॉगिन</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
