import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('jay_guru_dev_font_size') || 'normal';
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('jay_guru_dev_high_contrast') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('jay_guru_dev_font_size', fontSize);
    const root = document.documentElement;
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xlarge');
    root.classList.add(`font-scale-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('jay_guru_dev_high_contrast', highContrast);
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
