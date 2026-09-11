import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import State from '../models/State.js';
import District from '../models/District.js';
import Satsang from '../models/Satsang.js';
import Announcement from '../models/Announcement.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('[Seed] Database already contains data. Skipping initial seeding.');
      return;
    }

    console.log('[Seed] Starting database seeding...');

    // 1. Create Admin User
    const adminSalt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('admin123', adminSalt);
    await User.create({
      name: 'जय गुरु देव व्यवस्थापक (Admin)',
      email: 'admin@jaygurudev.org',
      passwordHash: adminPasswordHash,
      role: 'admin',
    });
    console.log('[Seed] Admin user created: admin@jaygurudev.org / admin123');

    // 2. States Data
    const statesData = [
      { name: 'Bihar', name_en: 'Bihar', name_hi: 'बिहार', code: 'BR', description: 'पावन भूमि बिहार' },
      { name: 'Uttar Pradesh', name_en: 'Uttar Pradesh', name_hi: 'उत्तर प्रदेश', code: 'UP', description: 'धार्मिक और आध्यात्मिक केंद्र' },
      { name: 'Jharkhand', name_en: 'Jharkhand', name_hi: 'झारखंड', code: 'JH', description: 'प्रकृति और साधना की भूमि' },
      { name: 'Rajasthan', name_en: 'Rajasthan', name_hi: 'राजस्थान', code: 'RJ', description: 'भक्ति और परंपरा का प्रदेश' },
      { name: 'Madhya Pradesh', name_en: 'Madhya Pradesh', name_hi: 'मध्य प्रदेश', code: 'MP', description: 'हृदय स्थल एवं पवित्र धाम' },
      { name: 'Delhi', name_en: 'Delhi', name_hi: 'दिल्ली', code: 'DL', description: 'राष्ट्रीय राजधानी क्षेत्र' },
      { name: 'Maharashtra', name_en: 'Maharashtra', name_hi: 'महाराष्ट्र', code: 'MH', description: 'संतों की पावन भूमि' },
      { name: 'Gujarat', name_en: 'Gujarat', name_hi: 'गुजरात', code: 'GJ', description: 'भक्ति और सेवा का राज्य' },
      { name: 'Haryana', name_en: 'Haryana', name_hi: 'हरियाणा', code: 'HR', description: 'गीता की पावन धरती' },
      { name: 'Punjab', name_en: 'Punjab', name_hi: 'पंजाब', code: 'PB', description: 'गुरुओं की पावन भूमि' },
      { name: 'West Bengal', name_en: 'West Bengal', name_hi: 'पश्चिम बंगाल', code: 'WB', description: 'चेतन और भक्ति की भूमि' },
      { name: 'Uttarakhand', name_en: 'Uttarakhand', name_hi: 'उत्तराखंड', code: 'UK', description: 'देवभूमि' },
    ];

    const stateDocs = await State.insertMany(statesData);
    const stateMap = {};
    stateDocs.forEach((s) => {
      stateMap[s.code] = s._id;
    });

    // 3. Districts Data
    const districtsData = [
      // Bihar
      { name: 'Muzaffarpur', name_en: 'Muzaffarpur', name_hi: 'मुजफ्फरपुर', stateId: stateMap['BR'] },
      { name: 'Patna', name_en: 'Patna', name_hi: 'पटना', stateId: stateMap['BR'] },
      { name: 'Darbhanga', name_en: 'Darbhanga', name_hi: 'दरभंगा', stateId: stateMap['BR'] },
      { name: 'Samastipur', name_en: 'Samastipur', name_hi: 'समस्तीपुर', stateId: stateMap['BR'] },
      { name: 'Sitamarhi', name_en: 'Sitamarhi', name_hi: 'सीतामढ़ी', stateId: stateMap['BR'] },
      { name: 'Vaishali', name_en: 'Vaishali', name_hi: 'वैशाली', stateId: stateMap['BR'] },
      { name: 'Gaya', name_en: 'Gaya', name_hi: 'गया', stateId: stateMap['BR'] },
      { name: 'Bhagalpur', name_en: 'Bhagalpur', name_hi: 'भागलपुर', stateId: stateMap['BR'] },
      { name: 'Begusarai', name_en: 'Begusarai', name_hi: 'बेगूसराय', stateId: stateMap['BR'] },
      { name: 'Purnia', name_en: 'Purnia', name_hi: 'पूर्णिया', stateId: stateMap['BR'] },

      // Uttar Pradesh
      { name: 'Mathura', name_en: 'Mathura', name_hi: 'मथुरा', stateId: stateMap['UP'] },
      { name: 'Varanasi', name_en: 'Varanasi', name_hi: 'वाराणसी', stateId: stateMap['UP'] },
      { name: 'Lucknow', name_en: 'Lucknow', name_hi: 'लखनऊ', stateId: stateMap['UP'] },
      { name: 'Agra', name_en: 'Agra', name_hi: 'आगरा', stateId: stateMap['UP'] },
      { name: 'Prayagraj', name_en: 'Prayagraj', name_hi: 'प्रयागराज', stateId: stateMap['UP'] },
      { name: 'Ayodhya', name_en: 'Ayodhya', name_hi: 'अयोध्या', stateId: stateMap['UP'] },
      { name: 'Gorakhpur', name_en: 'Gorakhpur', name_hi: 'गोरखपुर', stateId: stateMap['UP'] },
      { name: 'Kanpur', name_en: 'Kanpur', name_hi: 'कानपुर', stateId: stateMap['UP'] },
      { name: 'Bareilly', name_en: 'Bareilly', name_hi: 'बरेली', stateId: stateMap['UP'] },

      // Jharkhand
      { name: 'Ranchi', name_en: 'Ranchi', name_hi: 'रांची', stateId: stateMap['JH'] },
      { name: 'Dhanbad', name_en: 'Dhanbad', name_hi: 'धनबाद', stateId: stateMap['JH'] },
      { name: 'Jamshedpur', name_en: 'Jamshedpur', name_hi: 'जमशेदपुर', stateId: stateMap['JH'] },
      { name: 'Bokaro', name_en: 'Bokaro', name_hi: 'बोकारो', stateId: stateMap['JH'] },
      { name: 'Deoghar', name_en: 'Deoghar', name_hi: 'देवघर', stateId: stateMap['JH'] },
      { name: 'Hazaribagh', name_en: 'Hazaribagh', name_hi: 'हजारीबाग', stateId: stateMap['JH'] },

      // Rajasthan
      { name: 'Jaipur', name_en: 'Jaipur', name_hi: 'जयपुर', stateId: stateMap['RJ'] },
      { name: 'Jodhpur', name_en: 'Jodhpur', name_hi: 'जोधपुर', stateId: stateMap['RJ'] },
      { name: 'Kota', name_en: 'Kota', name_hi: 'कोटा', stateId: stateMap['RJ'] },
      { name: 'Ajmer', name_en: 'Ajmer', name_hi: 'अजमेर', stateId: stateMap['RJ'] },
      { name: 'Bikaner', name_en: 'Bikaner', name_hi: 'बीकानेर', stateId: stateMap['RJ'] },
      { name: 'Udaipur', name_en: 'Udaipur', name_hi: 'उदयपुर', stateId: stateMap['RJ'] },

      // Madhya Pradesh
      { name: 'Bhopal', name_en: 'Bhopal', name_hi: 'भोपाल', stateId: stateMap['MP'] },
      { name: 'Indore', name_en: 'Indore', name_hi: 'इंदौर', stateId: stateMap['MP'] },
      { name: 'Gwalior', name_en: 'Gwalior', name_hi: 'ग्वालियर', stateId: stateMap['MP'] },
      { name: 'Jabalpur', name_en: 'Jabalpur', name_hi: 'जबलपुर', stateId: stateMap['MP'] },
      { name: 'Ujjain', name_en: 'Ujjain', name_hi: 'उज्जैन', stateId: stateMap['MP'] },

      // Delhi
      { name: 'New Delhi', name_en: 'New Delhi', name_hi: 'नई दिल्ली', stateId: stateMap['DL'] },
      { name: 'North Delhi', name_en: 'North Delhi', name_hi: 'उत्तरी दिल्ली', stateId: stateMap['DL'] },
      { name: 'South Delhi', name_en: 'South Delhi', name_hi: 'दक्षिणी दिल्ली', stateId: stateMap['DL'] },
      { name: 'East Delhi', name_en: 'East Delhi', name_hi: 'पूर्वी दिल्ली', stateId: stateMap['DL'] },
      { name: 'West Delhi', name_en: 'West Delhi', name_hi: 'पश्चिमी दिल्ली', stateId: stateMap['DL'] },

      // Maharashtra
      { name: 'Mumbai', name_en: 'Mumbai', name_hi: 'मुंबई', stateId: stateMap['MH'] },
      { name: 'Pune', name_en: 'Pune', name_hi: 'पुणे', stateId: stateMap['MH'] },
      { name: 'Nagpur', name_en: 'Nagpur', name_hi: 'नागपुर', stateId: stateMap['MH'] },
      { name: 'Nashik', name_en: 'Nashik', name_hi: 'नासिक', stateId: stateMap['MH'] },

      // Gujarat
      { name: 'Ahmedabad', name_en: 'Ahmedabad', name_hi: 'अहमदाबाद', stateId: stateMap['GJ'] },
      { name: 'Surat', name_en: 'Surat', name_hi: 'सूरत', stateId: stateMap['GJ'] },
      { name: 'Vadodara', name_en: 'Vadodara', name_hi: 'वडोदरा', stateId: stateMap['GJ'] },
      { name: 'Rajkot', name_en: 'Rajkot', name_hi: 'राजकोट', stateId: stateMap['GJ'] },

      // Haryana
      { name: 'Gurugram', name_en: 'Gurugram', name_hi: 'गुरुग्राम', stateId: stateMap['HR'] },
      { name: 'Faridabad', name_en: 'Faridabad', name_hi: 'फरीदाबाद', stateId: stateMap['HR'] },
      { name: 'Panipat', name_en: 'Panipat', name_hi: 'पानीपत', stateId: stateMap['HR'] },
      { name: 'Ambala', name_en: 'Ambala', name_hi: 'अम्बाला', stateId: stateMap['HR'] },

      // Punjab
      { name: 'Amritsar', name_en: 'Amritsar', name_hi: 'अमृतसर', stateId: stateMap['PB'] },
      { name: 'Ludhiana', name_en: 'Ludhiana', name_hi: 'लुधियाना', stateId: stateMap['PB'] },
      { name: 'Jalandhar', name_en: 'Jalandhar', name_hi: 'जालंधर', stateId: stateMap['PB'] },

      // West Bengal
      { name: 'Kolkata', name_en: 'Kolkata', name_hi: 'कोलकाता', stateId: stateMap['WB'] },
      { name: 'Howrah', name_en: 'Howrah', name_hi: 'हावड़ा', stateId: stateMap['WB'] },
      { name: 'Siliguri', name_en: 'Siliguri', name_hi: 'सिलीगुड़ी', stateId: stateMap['WB'] },

      // Uttarakhand
      { name: 'Dehradun', name_en: 'Dehradun', name_hi: 'देहरादून', stateId: stateMap['UK'] },
      { name: 'Haridwar', name_en: 'Haridwar', name_hi: 'हरिद्वार', stateId: stateMap['UK'] },
    ];

    const districtDocs = await District.insertMany(districtsData);
    const districtMap = {};
    districtDocs.forEach((d) => {
      districtMap[d.name_en] = d._id;
    });

    // Dates for upcoming events
    const todayStr = '2026-09-08';
    const dPlus1 = '2026-09-09';
    const dPlus3 = '2026-09-11';
    const dPlus5 = '2026-09-13';
    const dPlus7 = '2026-09-15';
    const dPlus10 = '2026-09-18';
    const dPlus12 = '2026-09-20';
    const dPlus15 = '2026-09-23';
    const dPlus18 = '2026-09-26';
    const dPlus22 = '2026-09-30';
    const dPlus25 = '2026-10-03';
    const dPast = '2026-09-01';

    // 4. Satsang Events Data
    const satsangsData = [
      // Muzaffarpur, Bihar (Featured)
      {
        title: 'जय गुरु देव भव्य सत्संग एवं नामदान समारोह',
        title_hi: 'जय गुरु देव भव्य सत्संग एवं नामदान समारोह',
        date: dPlus7,
        startTime: '06:00 PM',
        endTime: '08:30 PM',
        stateId: stateMap['BR'],
        districtId: districtMap['Muzaffarpur'],
        city: 'मुजफ्फरपुर (Muzaffarpur)',
        village: 'ब्रह्मपुरा (Brahmpura)',
        venue: 'जय गुरु देव सत्संग भवन, ब्रह्मपुरा मैदान',
        address: 'ब्रह्मपुरा मुख्य मार्ग, रेलवे स्टेशन के निकट, मुजफ्फरपुर, बिहार - 842003',
        landmark: 'ब्रह्मपुरा थाना के समीप',
        googleMapsUrl: 'https://maps.google.com/?q=Muzaffarpur+Bihar',
        organizerName: 'रामेश्वर प्रसाद जी (संयोजक)',
        organizerPhone: '+91 98350 12345',
        description: 'परम पूज्य गुरुदेव जी के सानिध्य में आत्म कल्याणकारी अमृतमयी सत्संग एवं नामदान का पावन आयोजन। सभी प्रेमी भाई-बहन सपरिवार सादर आमंत्रित हैं। सत्संग के उपरांत गुरु का अटूट लंगर (महाप्रसाद) वितरित किया जाएगा।',
        imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf67362df55?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Patna, Bihar
      {
        title: 'पटना जिला स्तरीय साप्ताहिक सत्संग',
        title_hi: 'पटना जिला स्तरीय साप्ताहिक सत्संग',
        date: dPlus3,
        startTime: '05:30 PM',
        endTime: '07:30 PM',
        stateId: stateMap['BR'],
        districtId: districtMap['Patna'],
        city: 'पटना (Patna)',
        village: 'कंकड़बाग (Kankarbagh)',
        venue: 'गांधी मैदान शाखा सत्संग हाल',
        address: 'रोड नंबर 4, कंकड़बाग मुख्य चौक, पटना, बिहार - 800020',
        landmark: 'सेंट्रल पार्क के सामने',
        googleMapsUrl: 'https://maps.google.com/?q=Gandhi+Maidan+Patna',
        organizerName: 'सुरेश कुमार वर्मा जी',
        organizerPhone: '+91 94310 98765',
        description: 'आध्यात्मिक विचार, भजन-कीर्तन एवं गुरु महिमा का गुणगान। आत्मिक शांति और मानव जीवन के वास्तविक लक्ष्य पर विशेष प्रवचन।',
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Darbhanga, Bihar (Today's event)
      {
        title: 'दरभंगा संध्या सत्संग एवं आरती',
        title_hi: 'दरभंगा संध्या सत्संग एवं आरती',
        date: todayStr,
        startTime: '06:30 PM',
        endTime: '08:30 PM',
        stateId: stateMap['BR'],
        districtId: districtMap['Darbhanga'],
        city: 'दरभंगा (Darbhanga)',
        village: 'लहेरियासराय (Laheriasarai)',
        venue: 'जय गुरु देव सेवा आश्रम',
        address: 'टावर चौक, लहेरियासराय, दरभंगा, बिहार - 846001',
        landmark: 'काली मंदिर रोड',
        googleMapsUrl: 'https://maps.google.com/?q=Laheriasarai+Darbhanga',
        organizerName: 'दीनानाथ झा जी',
        organizerPhone: '+91 91220 54321',
        description: 'आज का विशेष संध्या सत्संग एवं गुरु वंदना। सभी संगत से समय पर पधारने का विनम्र निवेदन है।',
        imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
        status: 'today',
        isFeatured: true,
      },
      // Samastipur, Bihar
      {
        title: 'समस्तीपुर ग्रामीण सत्संग प्रचार सभा',
        title_hi: 'समस्तीपुर ग्रामीण सत्संग प्रचार सभा',
        date: dPlus10,
        startTime: '04:00 PM',
        endTime: '07:00 PM',
        stateId: stateMap['BR'],
        districtId: districtMap['Samastipur'],
        city: 'समस्तीपुर (Samastipur)',
        village: 'उजियारपुर (Ujiarpur)',
        venue: 'पंचायत भवन प्रांगण, उजियारपुर',
        address: 'उजियारपुर बाजार, समस्तीपुर, बिहार - 848132',
        landmark: 'उच्च विद्यालय के पास',
        googleMapsUrl: 'https://maps.google.com/?q=Samastipur+Bihar',
        organizerName: 'महेंद्र राय जी',
        organizerPhone: '+91 97090 11223',
        description: 'शाकाहार, नशामुक्ति और सदाचार पर आधारित गुरु संदेश एवं सत्संग।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: false,
      },
      // Sitamarhi, Bihar
      {
        title: 'सीतामढ़ी पावन धाम सत्संग',
        title_hi: 'सीतामढ़ी पावन धाम सत्संग',
        date: dPlus15,
        startTime: '05:00 PM',
        endTime: '07:30 PM',
        stateId: stateMap['BR'],
        districtId: districtMap['Sitamarhi'],
        city: 'सीतामढ़ी (Sitamarhi)',
        village: 'डुमरा (Dumra)',
        venue: 'कम्युनिटी हॉल, डुमरा',
        address: 'कलेक्ट्रेट रोड, डुमरा, सीतामढ़ी, बिहार - 843301',
        landmark: 'कोर्ट परिसर के पीछे',
        googleMapsUrl: 'https://maps.google.com/?q=Sitamarhi+Bihar',
        organizerName: 'मनोज कुमार सिंह जी',
        organizerPhone: '+91 99340 77889',
        description: 'पवित्र गुरु वचनों का श्रवण एवं आध्यात्मिक जागृति कार्यक्रम।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: false,
      },
      // Mathura, Uttar Pradesh (Grand Featured)
      {
        title: 'मथुरा पावन धाम - जय गुरु देव मुख्य आश्रम सत्संग एवं विशाल भंडारा',
        title_hi: 'मथुरा पावन धाम - जय गुरु देव मुख्य आश्रम सत्संग एवं विशाल भंडारा',
        date: dPlus12,
        startTime: '09:00 AM',
        endTime: '02:00 PM',
        stateId: stateMap['UP'],
        districtId: districtMap['Mathura'],
        city: 'मथुरा (Mathura)',
        village: 'मथुरा आश्रम',
        venue: 'जय गुरु देव धर्म विकास संस्था आश्रम',
        address: 'दिल्ली-आगरा राष्ट्रीय राजमार्ग-2, मथुरा, उत्तर प्रदेश - 281001',
        landmark: 'जय गुरु देव मंदिर, टोल प्लाजा के पास',
        googleMapsUrl: 'https://maps.google.com/?q=Jai+Guru+Dev+Temple+Mathura',
        organizerName: 'आश्रम प्रबंध समिति, मथुरा',
        organizerPhone: '+91 98370 00111',
        description: 'सर्व प्रेमी भक्तों के लिए वार्षिक पावन सत्संग, महाप्रवचन, नामदान और 24 घंटे का अटूट महाभंडारा। देश-विदेश से लाखों संगत की उपस्थिति रहेगी। निःशुल्क आवास व भोजन व्यवस्था उपलब्ध।',
        imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf67362df55?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Varanasi, Uttar Pradesh
      {
        title: 'काशी विश्वनाथ नगरी विशेष सत्संग विचार गोष्ठी',
        title_hi: 'काशी विश्वनाथ नगरी विशेष सत्संग विचार गोष्ठी',
        date: dPlus5,
        startTime: '06:00 PM',
        endTime: '08:30 PM',
        stateId: stateMap['UP'],
        districtId: districtMap['Varanasi'],
        city: 'वाराणसी (Varanasi)',
        village: 'सारनाथ (Sarnath)',
        venue: 'सारनाथ सत्संग केंद्र',
        address: 'सारनाथ मुख्य मार्ग, वाराणसी, उत्तर प्रदेश - 221007',
        landmark: 'पुरातत्व संग्रहालय के निकट',
        googleMapsUrl: 'https://maps.google.com/?q=Sarnath+Varanasi',
        organizerName: 'भोलानाथ त्रिपाठी जी',
        organizerPhone: '+91 94150 33445',
        description: 'संत मत और गुरु कृपा पर अमृत वर्षा। जीवन को सार्थक बनाने हेतु गुरु युक्ति का ज्ञान।',
        imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Lucknow, Uttar Pradesh
      {
        title: 'लखनऊ राजधानी क्षेत्र सत्संग',
        title_hi: 'लखनऊ राजधानी क्षेत्र सत्संग',
        date: dPlus18,
        startTime: '05:00 PM',
        endTime: '07:30 PM',
        stateId: stateMap['UP'],
        districtId: districtMap['Lucknow'],
        city: 'लखनऊ (Lucknow)',
        village: 'गोमती नगर (Gomti Nagar)',
        venue: 'संगीत नाटक अकादमी ऑडिटोरियम लॉन',
        address: 'विपुल खंड, गोमती नगर, लखनऊ, उत्तर प्रदेश - 226010',
        landmark: 'मनोज पाण्डेय चौक',
        googleMapsUrl: 'https://maps.google.com/?q=Gomti+Nagar+Lucknow',
        organizerName: 'अखिलेश बाजपेयी जी',
        organizerPhone: '+91 94500 22334',
        description: 'राजधानी क्षेत्र के सभी सत्संगी बंधुओं हेतु विशेष सत्संग।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: false,
      },
      // Ranchi, Jharkhand
      {
        title: 'रांची मोरहाबादी सत्संग एवं भजन संध्या',
        title_hi: 'रांची मोरहाबादी सत्संग एवं भजन संध्या',
        date: dPlus7,
        startTime: '05:30 PM',
        endTime: '08:00 PM',
        stateId: stateMap['JH'],
        districtId: districtMap['Ranchi'],
        city: 'रांची (Ranchi)',
        village: 'मोरहाबादी (Morabadi)',
        venue: 'मोरहाबादी मैदान कम्युनिटी हॉल',
        address: 'मोरहाबादी, रांची, झारखंड - 834008',
        landmark: 'टैगोर हिल रोड',
        googleMapsUrl: 'https://maps.google.com/?q=Morabadi+Ranchi',
        organizerName: 'विनोद भगत जी',
        organizerPhone: '+91 94311 44556',
        description: 'झारखंड प्रदेश का भव्य सत्संग। आत्मा और परमात्मा के संबंध पर पावन प्रकाश।',
        imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Jaipur, Rajasthan
      {
        title: 'जयपुर गुलाबी नगरी सत्संग समागम',
        title_hi: 'जयपुर गुलाबी नगरी सत्संग समागम',
        date: dPlus10,
        startTime: '06:00 PM',
        endTime: '08:30 PM',
        stateId: stateMap['RJ'],
        districtId: districtMap['Jaipur'],
        city: 'जयपुर (Jaipur)',
        village: 'मानसरोवर (Mansarovar)',
        venue: 'जय गुरु देव सत्संग भवन, मानसरोवर',
        address: 'मध्यम मार्ग, शिप्रा पथ के पास, मानसरोवर, जयपुर, राजस्थान - 302020',
        landmark: 'सिटी पार्क मानसरोवर के सामने',
        googleMapsUrl: 'https://maps.google.com/?q=Mansarovar+Jaipur',
        organizerName: 'गोविंद सिंह राठौड़ जी',
        organizerPhone: '+91 98290 88776',
        description: 'राजस्थान संगत हेतु विशाल आध्यात्मिक सत्संग। सदाचार व शाकाहार का पावन संदेश।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: true,
      },
      // Bhopal, MP
      {
        title: 'भोपाल झील नगरी सत्संग',
        title_hi: 'भोपाल झील नगरी सत्संग',
        date: dPlus15,
        startTime: '05:00 PM',
        endTime: '07:30 PM',
        stateId: stateMap['MP'],
        districtId: districtMap['Bhopal'],
        city: 'भोपाल (Bhopal)',
        village: 'एमपी नगर (MP Nagar)',
        venue: 'रवींद्र भवन सभागार',
        address: 'पॉलीटेक्निक चौराहा, भोपाल, मध्य प्रदेश - 462003',
        landmark: 'कमला पार्क के पास',
        googleMapsUrl: 'https://maps.google.com/?q=Bhopal+Madhya+Pradesh',
        organizerName: 'दिलीप शर्मा जी',
        organizerPhone: '+91 98260 12987',
        description: 'मध्य प्रदेश सत्संग मंडल द्वारा आयोजित अमृत विचार।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: false,
      },
      // Delhi
      {
        title: 'दिल्ली राष्ट्रीय राजधानी सत्संग महोत्सव',
        title_hi: 'दिल्ली राष्ट्रीय राजधानी सत्संग महोत्सव',
        date: dPlus5,
        startTime: '05:30 PM',
        endTime: '08:30 PM',
        stateId: stateMap['DL'],
        districtId: districtMap['New Delhi'],
        city: 'नई दिल्ली (New Delhi)',
        village: 'करोल बाग (Karol Bagh)',
        venue: 'अजमल खान पार्क ओपन ऑडिटोरियम',
        address: 'देशबंधु गुप्ता रोड, करोल बाग, नई दिल्ली - 110005',
        landmark: 'झंडेवालान मेट्रो स्टेशन के पास',
        googleMapsUrl: 'https://maps.google.com/?q=Karol+Bagh+New+Delhi',
        organizerName: 'सतपाल कपूर जी',
        organizerPhone: '+91 98110 55667',
        description: 'दिल्ली व एनसीआर की सभी संगतों के लिए विशेष मासिक सत्संग। लंगर प्रसाद की उत्तम व्यवस्था।',
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
        status: 'upcoming',
        isFeatured: true,
      },
      // Mumbai, Maharashtra
      {
        title: 'मुंबई महानगर सत्संग एवं ध्यान सत्र',
        title_hi: 'मुंबई महानगर सत्संग एवं ध्यान सत्र',
        date: dPlus22,
        startTime: '06:00 PM',
        endTime: '08:30 PM',
        stateId: stateMap['MH'],
        districtId: districtMap['Mumbai'],
        city: 'मुंबई (Mumbai)',
        village: 'दादर (Dadar)',
        venue: 'स्वातंत्र्य वीर सावरकर ऑडिटोरियम',
        address: 'शिवाजी पार्क, दादर वेस्ट, मुंबई, महाराष्ट्र - 400028',
        landmark: 'शिवाजी पार्क मैदान',
        googleMapsUrl: 'https://maps.google.com/?q=Dadar+Mumbai',
        organizerName: 'अनिल पाटिल जी',
        organizerPhone: '+91 98200 44332',
        description: 'मानव जीवन में आत्म कल्याण, नाम साधना और गुरु महिमा पर विशेष सत्संग।',
        imageUrl: '',
        status: 'upcoming',
        isFeatured: false,
      },
      // Cancelled Event Example (Agra, UP)
      {
        title: 'आगरा सत्संग विचार सभा (स्थगित/रद्द)',
        title_hi: 'आगरा सत्संग विचार सभा (स्थगित/रद्द)',
        date: dPlus1,
        startTime: '04:00 PM',
        endTime: '06:30 PM',
        stateId: stateMap['UP'],
        districtId: districtMap['Agra'],
        city: 'आगरा (Agra)',
        village: 'संजय प्लेस (Sanjay Place)',
        venue: 'नागरिक विकास भवन',
        address: 'संजय प्लेस, एमजी रोड, आगरा, उत्तर प्रदेश - 282002',
        landmark: 'सूरसदन प्रेक्षागृह के सामने',
        googleMapsUrl: 'https://maps.google.com/?q=Agra+Uttar+Pradesh',
        organizerName: 'कमलकांत मिश्रा जी',
        organizerPhone: '+91 97600 33221',
        description: 'अपरिहार्य कारणों से यह सत्संग स्थगित कर दिया गया है। नई तिथि की सूचना शीघ्र दी जाएगी।',
        imageUrl: '',
        status: 'cancelled',
        isFeatured: false,
      },
    ];

    await Satsang.insertMany(satsangsData);
    console.log(`[Seed] Seeded ${satsangsData.length} Satsang events across states and districts.`);

    // 5. Announcements Data
    const announcementsData = [
      {
        title_hi: 'मथुरा आश्रम में आगामी विशाल भंडारे एवं सत्संग की तैयारी प्रारंभ',
        title_en: 'Preparations begin for Grand Satsang and Bhandara at Mathura Ashram',
        content_hi: 'सभी प्रेमी भाई-बहनों को सूचित किया जाता है कि मथुरा आश्रम में होने वाले वार्षिक सत्संग में भाग लेने हेतु अपनी यात्रा की अग्रिम तैयारी करें। आश्रम में आवास एवं प्रसाद की निशुल्क व्यवस्था है।',
        content_en: 'All devotees are informed to plan their travel for the annual grand satsang at Mathura Ashram. Free lodging and mahaprasad arrangements are in place.',
        date: '2026-09-08',
        priority: 'high',
        active: true,
      },
      {
        title_hi: 'शाकाहार एवं नशामुक्ति संदेश यात्रा',
        title_en: 'Vegetarianism and Anti-Addiction Awakening Drive',
        content_hi: 'गुरुदेव के पावन आदेशानुसार विभिन्न जिलों में शाकाहार प्रचार एवं नशामुक्ति जनजागरण यात्रा निरंतर चल रही है। सभी जनसेवक इसमें सहयोग दें।',
        content_en: 'By the divine grace of Gurudev, the awareness drive for vegetarianism and addiction-free living is underway across various districts.',
        date: '2026-09-05',
        priority: 'normal',
        active: true,
      },
      {
        title_hi: 'सत्संग समय पर पहुंचने का विनम्र अनुरोध',
        title_en: 'Humble Request for Punctuality at Satsang Venues',
        content_hi: 'कृपया सत्संग प्रारंभ होने से कम से कम 15 मिनट पूर्व अपना स्थान ग्रहण करें ताकि शांत एवं अनुशासित वातावरण बना रहे।',
        content_en: 'Devotees are requested to be seated at least 15 minutes prior to the start of Satsang to maintain spiritual peace.',
        date: '2026-09-01',
        priority: 'normal',
        active: true,
      },
    ];

    await Announcement.insertMany(announcementsData);
    console.log('[Seed] Database seeding completed successfully.');
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
  }
};
