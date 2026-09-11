import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  hi: {
    // Branding & Nav
    siteTitle: 'जय गुरु देव',
    siteSubtitle: 'पावन सत्संग खोज एवं प्रबंधन पोर्टल',
    home: 'मुख्य पृष्ठ',
    satsang: 'सत्संग',
    upcomingSatsang: 'आगामी सत्संग',
    todaySatsang: 'आज का सत्संग',
    states: 'राज्य',
    districts: 'जिले',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    admin: 'व्यवस्थापक',
    adminLogin: 'व्यवस्थापक लॉगिन',
    adminDashboard: 'प्रशासन डैशबोर्ड',
    logout: 'लॉगआउट',

    // Hero & Home
    heroHeading: 'जय गुरु देव',
    heroSubheading: 'अपने नजदीकी सत्संग की जानकारी आसानी से प्राप्त करें',
    heroFindBtn: 'सत्संग खोजें',
    heroStatesBtn: 'राज्य अनुसार देखें',
    quickFinderTitle: 'सत्संग कहाँ हो रहा है?',
    quickFinderSub: 'सरल 3 चरणों में अपने क्षेत्र का सत्संग खोजें',
    selectState: 'राज्य चुनें',
    selectDistrict: 'जिला चुनें',
    selectDate: 'दिनांक चुनें',
    searchBtn: 'सत्संग खोजें',
    resetBtn: 'रीसेट करें',
    allStates: 'सभी राज्य',
    allDistricts: 'सभी जिले',

    // Sections
    featuredSatsangs: 'प्रमुख एवं आगामी सत्संग',
    todaySatsangsHeading: 'आज के विशेष सत्संग',
    browseByState: 'राज्य के अनुसार सत्संग खोजें',
    importantAnnouncements: 'महत्वपूर्ण सूचनाएं एवं घोषणाएं',
    spiritualQuoteTitle: 'आज का अनमोल विचार',
    noSatsangInDistrict: 'इस जिले में अभी कोई आगामी सत्संग उपलब्ध नहीं है।',
    noSatsangsFound: 'कोई सत्संग कार्यक्रम नहीं मिला। कृपया अन्य राज्य या जिला चुनें।',
    loading: 'लोड हो रहा है...',
    errorMsg: 'कुछ समस्या हुई है। कृपया थोड़ी देर बाद पुनः प्रयास करें।',

    // Card & Details
    date: 'दिनांक',
    time: 'समय',
    state: 'राज्य',
    district: 'जिला',
    address: 'पता',
    venue: 'सत्संग स्थल',
    landmark: 'निकटतम पहचान (Landmark)',
    organizer: 'आयोजक / संयोजक',
    phone: 'फोन नंबर',
    viewDetails: 'विवरण देखें',
    getDirections: 'रास्ता देखें',
    callOrganizer: 'कॉल करें',
    shareWhatsApp: 'व्हाट्सएप पर शेयर करें',
    seeOnGoogleMaps: 'Google Maps पर रास्ता देखें',
    instructions: 'सत्संग संबंधित महत्वपूर्ण निर्देश',
    defaultInstructions: 'कृपया सत्संग समय से 15 मिनट पूर्व पधारें। शाकाहार एवं सादगी का पालन करें। लंगर प्रसाद की उत्तम व्यवस्था रहेगी।',

    // Statuses
    statusUpcoming: 'आगामी',
    statusToday: 'आज का कार्यक्रम',
    statusCompleted: 'संपन्न',
    statusCancelled: 'सत्संग रद्द हो गया है',

    // Admin
    totalSatsang: 'कुल सत्संग',
    upcomingSatsangCount: 'आगामी सत्संग',
    todaySatsangCount: 'आज का सत्संग',
    totalStates: 'कुल राज्य',
    totalDistricts: 'कुल जिले',
    addNewSatsang: 'नया सत्संग जोड़ें',
    manageLocations: 'राज्य एवं जिला प्रबंधन',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    save: 'सुरक्षित करें',
    cancel: 'रद्द करें',
    confirmDeleteTitle: 'सत्संग हटाने की पुष्टि',
    confirmDeleteMsg: 'क्या आप निश्चित रूप से इस सत्संग को हटाना चाहते हैं?',
    actionSuccess: 'कार्य सफलतापूर्वक पूरा हुआ।',
    loginPrompt: 'कृपया व्यवस्थापक क्रेडेंशियल दर्ज करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    loginBtn: 'लॉगिन करें',
  },
  en: {
    // Branding & Nav
    siteTitle: 'Jay Guru Dev',
    siteSubtitle: 'Spiritual Satsang Portal & Events',
    home: 'Home',
    satsang: 'Satsang',
    upcomingSatsang: 'Upcoming Satsang',
    todaySatsang: "Today's Satsang",
    states: 'States',
    districts: 'Districts',
    about: 'About Us',
    contact: 'Contact Us',
    admin: 'Admin',
    adminLogin: 'Admin Login',
    adminDashboard: 'Admin Dashboard',
    logout: 'Logout',

    // Hero & Home
    heroHeading: 'Jay Guru Dev',
    heroSubheading: 'Easily find Satsang events happening near you',
    heroFindBtn: 'Find Satsang',
    heroStatesBtn: 'Browse by States',
    quickFinderTitle: 'Where is Satsang happening?',
    quickFinderSub: 'Find Satsang in your area in 3 easy steps',
    selectState: 'Select State',
    selectDistrict: 'Select District',
    selectDate: 'Select Date',
    searchBtn: 'Search Satsang',
    resetBtn: 'Reset',
    allStates: 'All States',
    allDistricts: 'All Districts',

    // Sections
    featuredSatsangs: 'Featured & Upcoming Satsang',
    todaySatsangsHeading: "Today's Special Satsang",
    browseByState: 'Browse Satsang by State',
    importantAnnouncements: 'Important Announcements & Updates',
    spiritualQuoteTitle: 'Thought for the Day',
    noSatsangInDistrict: 'No upcoming Satsang events are currently scheduled in this district.',
    noSatsangsFound: 'No Satsang events found. Please try other filters or states.',
    loading: 'Loading...',
    errorMsg: 'An error occurred. Please try again later.',

    // Card & Details
    date: 'Date',
    time: 'Time',
    state: 'State',
    district: 'District',
    address: 'Address',
    venue: 'Venue',
    landmark: 'Landmark',
    organizer: 'Organizer',
    phone: 'Phone Number',
    viewDetails: 'View Details',
    getDirections: 'Get Directions',
    callOrganizer: 'Call Organizer',
    shareWhatsApp: 'Share on WhatsApp',
    seeOnGoogleMaps: 'View Route on Google Maps',
    instructions: 'Important Guidelines for Attendees',
    defaultInstructions: 'Please arrive 15 minutes before start. Maintain discipline and sanctity. Mahaprasad will be served following the Satsang.',

    // Statuses
    statusUpcoming: 'Upcoming',
    statusToday: "Today's Event",
    statusCompleted: 'Completed',
    statusCancelled: 'Satsang has been Cancelled',

    // Admin
    totalSatsang: 'Total Satsang',
    upcomingSatsangCount: 'Upcoming Satsang',
    todaySatsangCount: "Today's Satsang",
    totalStates: 'Total States',
    totalDistricts: 'Total Districts',
    addNewSatsang: 'Add New Satsang',
    manageLocations: 'Manage States & Districts',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirmDeleteTitle: 'Confirm Delete',
    confirmDeleteMsg: 'Are you sure you want to delete this Satsang event?',
    actionSuccess: 'Action completed successfully.',
    loginPrompt: 'Please enter admin credentials to continue',
    email: 'Email',
    password: 'Password',
    loginBtn: 'Login',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('jay_guru_dev_lang') || 'hi';
  });

  useEffect(() => {
    localStorage.setItem('jay_guru_dev_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['hi']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
