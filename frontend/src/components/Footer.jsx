import React from 'react';
import { Link } from 'react-router-dom';
import { LotusLogo, SocialLogos } from './spiritualAssets';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/', label: 'मुख्य पृष्ठ' },
    { to: '/satsang', label: 'सत्संग' },
    { to: '/states', label: 'राज्य' },
    { to: '/states', label: 'जिले' },
    { to: '/gallery', label: 'गैलरी' },
    { to: '/about', label: 'हमारे बारे में' },
    { to: '/contact', label: 'संपर्क करें' },
  ];

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#E8DFD3] py-8 sm:py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Identity with Lotus Logo */}
          <div className="flex items-center space-x-3 select-none flex-shrink-0">
            <LotusLogo className="w-10 h-10 text-maroon-800" />
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-black text-maroon-900 tracking-tight leading-none font-devanagari">
                जय गुरु देव
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-600 mt-1 font-devanagari">
                सत्य • प्रेम • सेवा • मानवता
              </span>
            </div>
          </div>

          {/* Center: Navigation Links in a Single Clean Line */}
          <nav className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold text-gray-700 font-devanagari">
            {footerLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <Link
                  to={link.to}
                  className="hover:text-maroon-800 hover:underline transition-colors"
                >
                  {link.label}
                </Link>
                {idx < footerLinks.length - 1 && (
                  <span className="text-gray-400 font-normal">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Social Media Icons + Copyright */}
          <div className="flex flex-col sm:flex-row items-center lg:items-end gap-3 sm:gap-4 text-center sm:text-right">
            <SocialLogos />
            <div className="text-xs text-gray-500 font-medium font-devanagari leading-snug">
              <div>© {currentYear} जय गुरु देव</div>
              <div>सभी अधिकार सुरक्षित</div>
            </div>
          </div>

        </div>

        {/* Official Ashram Address Banner */}
        <div className="mt-6 pt-5 border-t border-[#E8DFD3]/90 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-700 font-devanagari text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <span className="font-black text-maroon-900 bg-maroon-100/70 px-2 py-0.5 rounded text-[11px]">📍 मुख्य आश्रम</span>
            <span className="font-semibold text-gray-900">बाबा जयगुरुदेव आश्रम:</span>
            <span>मक्सी रोड, पिंगलेश्वर रेलवे स्टेशन के सामने, उज्जैन, मध्य प्रदेश - 456664</span>
          </div>

          <a
            href="https://maps.app.goo.gl/Su4LdxPNmDKfd4cQ6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-maroon-900 hover:text-maroon-700 bg-white border border-amber-900/20 px-3 py-1 rounded-full shadow-2xs transition-colors flex-shrink-0"
          >
            <span>गूगल मैप पर देखें</span>
            <span className="text-maroon-800">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
