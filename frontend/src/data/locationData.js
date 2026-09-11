/**
 * Jay Guru Dev - Standard State and District Dataset
 * Provides instant, zero-delay fallback options for all search dropdowns
 * so users never see blank state/district options.
 */

export const DEFAULT_STATES = [
  {
    _id: '6aa01d650bd118e676cae51e',
    id: '6aa01d650bd118e676cae51e',
    code: 'BR',
    name: 'Bihar',
    name_hi: 'बिहार',
    name_en: 'Bihar',
    districts: [
      { id: '6aa01d650bd118e676cae52b', _id: '6aa01d650bd118e676cae52b', name: 'Muzaffarpur', name_hi: 'मुजफ्फरपुर', name_en: 'Muzaffarpur' },
      { id: '6aa01d650bd118e676cae52c', _id: '6aa01d650bd118e676cae52c', name: 'Patna', name_hi: 'पटना', name_en: 'Patna' },
      { id: '6aa01d650bd118e676cae52d', _id: '6aa01d650bd118e676cae52d', name: 'Darbhanga', name_hi: 'दरभंगा', name_en: 'Darbhanga' },
      { id: '6aa01d650bd118e676cae52e', _id: '6aa01d650bd118e676cae52e', name: 'Samastipur', name_hi: 'समस्तीपुर', name_en: 'Samastipur' },
      { id: '6aa01d650bd118e676cae52f', _id: '6aa01d650bd118e676cae52f', name: 'Sitamarhi', name_hi: 'सीतामढ़ी', name_en: 'Sitamarhi' },
      { id: '6aa01d650bd118e676cae530', _id: '6aa01d650bd118e676cae530', name: 'Vaishali', name_hi: 'वैशाली', name_en: 'Vaishali' },
      { id: '6aa01d650bd118e676cae531', _id: '6aa01d650bd118e676cae531', name: 'Gaya', name_hi: 'गया', name_en: 'Gaya' },
      { id: '6aa01d650bd118e676cae532', _id: '6aa01d650bd118e676cae532', name: 'Bhagalpur', name_hi: 'भागलपुर', name_en: 'Bhagalpur' },
      { id: '6aa01d650bd118e676cae533', _id: '6aa01d650bd118e676cae533', name: 'Begusarai', name_hi: 'बेगूसराय', name_en: 'Begusarai' },
      { id: '6aa01d650bd118e676cae534', _id: '6aa01d650bd118e676cae534', name: 'Purnia', name_hi: 'पूर्णिया', name_en: 'Purnia' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae51f',
    id: '6aa01d650bd118e676cae51f',
    code: 'UP',
    name: 'Uttar Pradesh',
    name_hi: 'उत्तर प्रदेश',
    name_en: 'Uttar Pradesh',
    districts: [
      { id: '6aa01d650bd118e676cae535', _id: '6aa01d650bd118e676cae535', name: 'Mathura', name_hi: 'मथुरा', name_en: 'Mathura' },
      { id: '6aa01d650bd118e676cae536', _id: '6aa01d650bd118e676cae536', name: 'Varanasi', name_hi: 'वाराणसी', name_en: 'Varanasi' },
      { id: '6aa01d650bd118e676cae537', _id: '6aa01d650bd118e676cae537', name: 'Lucknow', name_hi: 'लखनऊ', name_en: 'Lucknow' },
      { id: '6aa01d650bd118e676cae538', _id: '6aa01d650bd118e676cae538', name: 'Agra', name_hi: 'आगरा', name_en: 'Agra' },
      { id: '6aa01d650bd118e676cae539', _id: '6aa01d650bd118e676cae539', name: 'Prayagraj', name_hi: 'प्रयागराज', name_en: 'Prayagraj' },
      { id: '6aa01d650bd118e676cae53a', _id: '6aa01d650bd118e676cae53a', name: 'Ayodhya', name_hi: 'अयोध्या', name_en: 'Ayodhya' },
      { id: '6aa01d650bd118e676cae53b', _id: '6aa01d650bd118e676cae53b', name: 'Gorakhpur', name_hi: 'गोरखपुर', name_en: 'Gorakhpur' },
      { id: '6aa01d650bd118e676cae53c', _id: '6aa01d650bd118e676cae53c', name: 'Kanpur', name_hi: 'कानपुर', name_en: 'Kanpur' },
      { id: '6aa01d650bd118e676cae53d', _id: '6aa01d650bd118e676cae53d', name: 'Bareilly', name_hi: 'बरेली', name_en: 'Bareilly' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae520',
    id: '6aa01d650bd118e676cae520',
    code: 'JH',
    name: 'Jharkhand',
    name_hi: 'झारखंड',
    name_en: 'Jharkhand',
    districts: [
      { id: '6aa01d650bd118e676cae53e', _id: '6aa01d650bd118e676cae53e', name: 'Ranchi', name_hi: 'रांची', name_en: 'Ranchi' },
      { id: '6aa01d650bd118e676cae53f', _id: '6aa01d650bd118e676cae53f', name: 'Dhanbad', name_hi: 'धनबाद', name_en: 'Dhanbad' },
      { id: '6aa01d650bd118e676cae540', _id: '6aa01d650bd118e676cae540', name: 'Jamshedpur', name_hi: 'जमशेदपुर', name_en: 'Jamshedpur' },
      { id: '6aa01d650bd118e676cae541', _id: '6aa01d650bd118e676cae541', name: 'Bokaro', name_hi: 'बोकारो', name_en: 'Bokaro' },
      { id: '6aa01d650bd118e676cae542', _id: '6aa01d650bd118e676cae542', name: 'Deoghar', name_hi: 'देवघर', name_en: 'Deoghar' },
      { id: '6aa01d650bd118e676cae543', _id: '6aa01d650bd118e676cae543', name: 'Hazaribagh', name_hi: 'हजारीबाग', name_en: 'Hazaribagh' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae521',
    id: '6aa01d650bd118e676cae521',
    code: 'RJ',
    name: 'Rajasthan',
    name_hi: 'राजस्थान',
    name_en: 'Rajasthan',
    districts: [
      { id: '6aa01d650bd118e676cae544', _id: '6aa01d650bd118e676cae544', name: 'Jaipur', name_hi: 'जयपुर', name_en: 'Jaipur' },
      { id: '6aa01d650bd118e676cae545', _id: '6aa01d650bd118e676cae545', name: 'Jodhpur', name_hi: 'जोधपुर', name_en: 'Jodhpur' },
      { id: '6aa01d650bd118e676cae546', _id: '6aa01d650bd118e676cae546', name: 'Kota', name_hi: 'कोटा', name_en: 'Kota' },
      { id: '6aa01d650bd118e676cae547', _id: '6aa01d650bd118e676cae547', name: 'Ajmer', name_hi: 'अजमेर', name_en: 'Ajmer' },
      { id: '6aa01d650bd118e676cae548', _id: '6aa01d650bd118e676cae548', name: 'Bikaner', name_hi: 'बीकानेर', name_en: 'Bikaner' },
      { id: '6aa01d650bd118e676cae549', _id: '6aa01d650bd118e676cae549', name: 'Udaipur', name_hi: 'उदयपुर', name_en: 'Udaipur' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae522',
    id: '6aa01d650bd118e676cae522',
    code: 'MP',
    name: 'Madhya Pradesh',
    name_hi: 'मध्य प्रदेश',
    name_en: 'Madhya Pradesh',
    districts: [
      { id: '6aa01d650bd118e676cae54a', _id: '6aa01d650bd118e676cae54a', name: 'Bhopal', name_hi: 'भोपाल', name_en: 'Bhopal' },
      { id: '6aa01d650bd118e676cae54b', _id: '6aa01d650bd118e676cae54b', name: 'Indore', name_hi: 'इंदौर', name_en: 'Indore' },
      { id: '6aa01d650bd118e676cae54c', _id: '6aa01d650bd118e676cae54c', name: 'Gwalior', name_hi: 'ग्वालियर', name_en: 'Gwalior' },
      { id: '6aa01d650bd118e676cae54d', _id: '6aa01d650bd118e676cae54d', name: 'Jabalpur', name_hi: 'जबलपुर', name_en: 'Jabalpur' },
      { id: '6aa01d650bd118e676cae54e', _id: '6aa01d650bd118e676cae54e', name: 'Ujjain', name_hi: 'उज्जैन', name_en: 'Ujjain' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae523',
    id: '6aa01d650bd118e676cae523',
    code: 'DL',
    name: 'Delhi',
    name_hi: 'दिल्ली',
    name_en: 'Delhi',
    districts: [
      { id: '6aa01d650bd118e676cae54f', _id: '6aa01d650bd118e676cae54f', name: 'New Delhi', name_hi: 'नई दिल्ली', name_en: 'New Delhi' },
      { id: '6aa01d650bd118e676cae550', _id: '6aa01d650bd118e676cae550', name: 'North Delhi', name_hi: 'उत्तरी दिल्ली', name_en: 'North Delhi' },
      { id: '6aa01d650bd118e676cae551', _id: '6aa01d650bd118e676cae551', name: 'South Delhi', name_hi: 'दक्षिणी दिल्ली', name_en: 'South Delhi' },
      { id: '6aa01d650bd118e676cae552', _id: '6aa01d650bd118e676cae552', name: 'East Delhi', name_hi: 'पूर्वी दिल्ली', name_en: 'East Delhi' },
      { id: '6aa01d650bd118e676cae553', _id: '6aa01d650bd118e676cae553', name: 'West Delhi', name_hi: 'पश्चिमी दिल्ली', name_en: 'West Delhi' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae524',
    id: '6aa01d650bd118e676cae524',
    code: 'MH',
    name: 'Maharashtra',
    name_hi: 'महाराष्ट्र',
    name_en: 'Maharashtra',
    districts: [
      { id: '6aa01d650bd118e676cae554', _id: '6aa01d650bd118e676cae554', name: 'Mumbai', name_hi: 'मुंबई', name_en: 'Mumbai' },
      { id: '6aa01d650bd118e676cae555', _id: '6aa01d650bd118e676cae555', name: 'Pune', name_hi: 'पुणे', name_en: 'Pune' },
      { id: '6aa01d650bd118e676cae556', _id: '6aa01d650bd118e676cae556', name: 'Nagpur', name_hi: 'नागपुर', name_en: 'Nagpur' },
      { id: '6aa01d650bd118e676cae557', _id: '6aa01d650bd118e676cae557', name: 'Nashik', name_hi: 'नासिक', name_en: 'Nashik' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae525',
    id: '6aa01d650bd118e676cae525',
    code: 'GJ',
    name: 'Gujarat',
    name_hi: 'गुजरात',
    name_en: 'Gujarat',
    districts: [
      { id: '6aa01d650bd118e676cae558', _id: '6aa01d650bd118e676cae558', name: 'Ahmedabad', name_hi: 'अहमदाबाद', name_en: 'Ahmedabad' },
      { id: '6aa01d650bd118e676cae559', _id: '6aa01d650bd118e676cae559', name: 'Surat', name_hi: 'सूरत', name_en: 'Surat' },
      { id: '6aa01d650bd118e676cae55a', _id: '6aa01d650bd118e676cae55a', name: 'Vadodara', name_hi: 'वडोदरा', name_en: 'Vadodara' },
      { id: '6aa01d650bd118e676cae55b', _id: '6aa01d650bd118e676cae55b', name: 'Rajkot', name_hi: 'राजकोट', name_en: 'Rajkot' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae526',
    id: '6aa01d650bd118e676cae526',
    code: 'HR',
    name: 'Haryana',
    name_hi: 'हरियाणा',
    name_en: 'Haryana',
    districts: [
      { id: '6aa01d650bd118e676cae55c', _id: '6aa01d650bd118e676cae55c', name: 'Gurugram', name_hi: 'गुरुग्राम', name_en: 'Gurugram' },
      { id: '6aa01d650bd118e676cae55d', _id: '6aa01d650bd118e676cae55d', name: 'Faridabad', name_hi: 'फरीदाबाद', name_en: 'Faridabad' },
      { id: '6aa01d650bd118e676cae55e', _id: '6aa01d650bd118e676cae55e', name: 'Panipat', name_hi: 'पानीपत', name_en: 'Panipat' },
      { id: '6aa01d650bd118e676cae55f', _id: '6aa01d650bd118e676cae55f', name: 'Ambala', name_hi: 'अम्बाला', name_en: 'Ambala' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae527',
    id: '6aa01d650bd118e676cae527',
    code: 'PB',
    name: 'Punjab',
    name_hi: 'पंजाब',
    name_en: 'Punjab',
    districts: [
      { id: '6aa01d650bd118e676cae560', _id: '6aa01d650bd118e676cae560', name: 'Amritsar', name_hi: 'अमृतसर', name_en: 'Amritsar' },
      { id: '6aa01d650bd118e676cae561', _id: '6aa01d650bd118e676cae561', name: 'Ludhiana', name_hi: 'लुधियाना', name_en: 'Ludhiana' },
      { id: '6aa01d650bd118e676cae562', _id: '6aa01d650bd118e676cae562', name: 'Jalandhar', name_hi: 'जालंधर', name_en: 'Jalandhar' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae528',
    id: '6aa01d650bd118e676cae528',
    code: 'WB',
    name: 'West Bengal',
    name_hi: 'पश्चिम बंगाल',
    name_en: 'West Bengal',
    districts: [
      { id: '6aa01d650bd118e676cae563', _id: '6aa01d650bd118e676cae563', name: 'Kolkata', name_hi: 'कोलकाता', name_en: 'Kolkata' },
      { id: '6aa01d650bd118e676cae564', _id: '6aa01d650bd118e676cae564', name: 'Howrah', name_hi: 'हावड़ा', name_en: 'Howrah' },
      { id: '6aa01d650bd118e676cae565', _id: '6aa01d650bd118e676cae565', name: 'Siliguri', name_hi: 'सिलीगुड़ी', name_en: 'Siliguri' },
    ],
  },
  {
    _id: '6aa01d650bd118e676cae529',
    id: '6aa01d650bd118e676cae529',
    code: 'UK',
    name: 'Uttarakhand',
    name_hi: 'उत्तराखंड',
    name_en: 'Uttarakhand',
    districts: [
      { id: '6aa01d650bd118e676cae566', _id: '6aa01d650bd118e676cae566', name: 'Dehradun', name_hi: 'देहरादून', name_en: 'Dehradun' },
      { id: '6aa01d650bd118e676cae567', _id: '6aa01d650bd118e676cae567', name: 'Haridwar', name_hi: 'हरिद्वार', name_en: 'Haridwar' },
    ],
  },
];

/**
 * Get districts for a given state ID, code, or name
 */
export const getStateDistricts = (stateIdOrCode) => {
  if (!stateIdOrCode) return [];
  const target = String(stateIdOrCode).trim().toLowerCase();
  const state = DEFAULT_STATES.find(
    (s) =>
      s._id === stateIdOrCode ||
      s.id === stateIdOrCode ||
      s.code.toLowerCase() === target ||
      s.name.toLowerCase() === target ||
      s.name_hi === stateIdOrCode ||
      s.name_en.toLowerCase() === target
  );
  return state ? state.districts : [];
};

/**
 * Get all available districts across all states
 */
export const getAllDistricts = () => {
  return DEFAULT_STATES.flatMap((s) =>
    s.districts.map((d) => ({
      ...d,
      stateCode: s.code,
      stateName: s.name,
      stateNameHi: s.name_hi,
    }))
  );
};

/**
 * Resolve state object by ID, code, or name
 */
export const resolveState = (stateIdOrCode) => {
  if (!stateIdOrCode) return null;
  const target = String(stateIdOrCode).trim().toLowerCase();
  return (
    DEFAULT_STATES.find(
      (s) =>
        s._id === stateIdOrCode ||
        s.id === stateIdOrCode ||
        s.code.toLowerCase() === target ||
        s.name.toLowerCase() === target ||
        s.name_hi === stateIdOrCode ||
        s.name_en.toLowerCase() === target
    ) || null
  );
};
