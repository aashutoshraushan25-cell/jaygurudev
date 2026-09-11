import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LoadingSpinner = ({ text }) => {
  const { lang, t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-orange-600 font-bold text-lg">
          ॐ
        </div>
      </div>
      <p className="text-base sm:text-lg font-bold text-gray-700 font-devanagari animate-pulse">
        {text || t('loading')}
      </p>
    </div>
  );
};
