# 🕉️ जय गुरु देव (Jay Guru Dev) - पावन सत्संग पोर्टल

A complete, modern, responsive, elderly-friendly, and spiritual full-stack web application designed for the spiritual organization **“Jay Guru Dev” (जय गुरु देव)** to manage and discover Satsang events happening across States and Districts in India.

---

## 🌟 मुख्य विशेषताएं (Key Features)

- **मुख्य सत्संग प्रवाह (Home → State → District → Satsang)**:
  - भारत के सभी राज्यों (e.g. बिहार, उत्तर प्रदेश, झारखंड, राजस्थान, मध्य प्रदेश, दिल्ली, महाराष्ट्र, गुजरात, आदि) की सूची।
  - राज्य के अंतर्गत उपलब्ध जिले (e.g. मुजफ्फरपुर, पटना, दरभंगा, वाराणसी, मथुरा, रांची, जयपुर, आदि)।
  - चयनित जिले में आगामी, आज के और विशेष सत्संग की संपूर्ण जानकारी।
- **बुजुर्गों के अनुकूल डिज़ाइन (Elderly-Friendly UI)**:
  - बड़े एवं स्पष्ट अक्षर (Devanagari Typography & Google Fonts).
  - फॉन्ट साइज स्केलर बटन (`A`, `A+`, `A++`) ऊपर नेविगेशन बार में।
  - बड़े टच व क्लिक टारगेट्स (बटन, कार्ड्स)।
  - 1-क्लिक आयोजक फोन कॉल (`📞 कॉल करें`) और 1-क्लिक व्हाट्सएप निमंत्रण शेयर (`📤 शेयर करें`).
  - **“Google Maps पर रास्ता देखें”** सीधा गूगल मैप्स नेविगेशन बटन।
- **द्विभाषी समर्थन (Bilingual Hindi & English)**:
  - मुख्य रूप से हिंदी भाषा में और तुरंत हिंदी ↔ English भाषा बदलने का विकल्प।
- **सुरक्षित व्यवस्थापक पोर्टल (Admin Dashboard)**:
  - सुरक्षित व्यवस्थापक लॉगिन (`admin@jaygurudev.org` / `admin123`).
  - डैशबोर्ड आंकड़े (कुल सत्संग, आगामी सत्संग, आज के सत्संग, कुल राज्य, कुल जिले).
  - सत्संग जोड़ें, संपादित करें, स्थिति बदलें (Upcoming / Today / Completed / Cancelled), और हटाएं।
  - राज्य एवं जिला प्रबंधन (State & District CRUD).
- **सत्संग खोज एवं फ़िल्टर (Search & Filters)**:
  - स्थान, शहर, गांव, मोहल्ला या आयोजक के नाम से खोज।
  - राज्य, जिला एवं दिनांक के अनुसार त्वरित फ़िल्टर।
  - आज के विशेष सत्संग (Today's Events with live glow).
- **स्वचालित डेटाबेस इनिशियलाइज़ेशन (Auto-Seeding)**:
  - 12+ प्रमुख भारतीय राज्य, 60+ जिले और 14+ वास्तविक सत्संग कार्यक्रम पहले से भरे हुए हैं।
  - यदि स्थानीय मोंगोडीबी नहीं चल रहा हो, तो भी ऐप बिना किसी परेशानी के तुरंत चालू हो जाता है।

---

## 🚀 तुरंत शुरू करने की विधि (Quick Start Guide)

### आवश्यकताएं (Prerequisites)

- [Node.js](https://nodejs.org/) (v18+)

### 1. बैकएंड प्रारंभ करें (Start Backend)

```bash
cd backend
npm install
npm start
```

बैकएंड सर्वर `http://localhost:5000` पर चलेगा और डेटाबेस को स्वतः सीड कर देगा।

### 2. फ्रंटएंड प्रारंभ करें (Start Frontend)

```bash
cd frontend
npm run dev
```

फ्रंटएंड पोर्टल `http://localhost:5173` पर खुल जाएगा।

---

## 🔐 व्यवस्थापक क्रेडेंशियल (Admin Credentials)

- **व्यवस्थापक लॉगिन URL**: `http://localhost:5173/admin/login`
- **ईमेल**: `admin@jaygurudev.org`
- **पासवर्ड**: `admin123`

---

## 📁 प्रोजेक्ट संरचना (Project Structure)

```text
jay-guru-dev/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB & Embedded DB connection
│   │   ├── models/
│   │   │   ├── User.js               # Admin model & password hashing
│   │   │   ├── State.js              # State model (Hindi/English)
│   │   │   ├── District.js           # District model (Linked to state)
│   │   │   ├── Satsang.js            # Satsang event model
│   │   │   └── Announcement.js       # Ashram notices model
│   │   ├── controllers/
│   │   │   ├── authController.js     # Admin login/session
│   │   │   ├── stateController.js    # State queries & CRUD
│   │   │   ├── districtController.js # District queries & CRUD
│   │   │   ├── satsangController.js  # Search, filter & event CRUD
│   │   │   ├── statsController.js    # Metric calculations
│   │   │   └── announcementController.js
│   │   ├── routes/                   # Express REST API routes
│   │   ├── middleware/               # JWT Auth & Error handlers
│   │   ├── seed/
│   │   │   └── seedData.js           # Rich Indian states, districts & satsangs
│   │   ├── test/
│   │   │   └── verifyAll.js          # Automated end-to-end test suite
│   │   └── server.js                 # Express entrypoint
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   ├── LanguageContext.jsx   # Hindi (primary) & English translations
│   │   │   ├── AuthContext.jsx       # JWT persistence & state
│   │   │   └── AccessibilityContext.jsx # Font scaling A / A+ / A++
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Branding, links, font adjuster, lang toggle
│   │   │   ├── Footer.jsx            # Ashram address, helpline & shortcuts
│   │   │   ├── QuickFinderWidget.jsx # 3-step Home finder (State->District->Date)
│   │   │   ├── SatsangCard.jsx       # Accessible event card with directions & call
│   │   │   ├── AnnouncementTicker.jsx# Animated Ashram notice banner
│   │   │   ├── SpiritualQuote.jsx    # Daily thought / Gurudev teachings
│   │   │   ├── LoadingSpinner.jsx    # Spiritual Om spinner
│   │   │   ├── AlertMessage.jsx
│   │   │   └── Pagination.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Hero, Finder, Highlights, States Grid
│   │   │   ├── SatsangListingPage.jsx# Complete search & filters
│   │   │   ├── StatesPage.jsx        # Indian states directory
│   │   │   ├── DistrictsPage.jsx     # Districts under state with next dates
│   │   │   ├── SatsangDetailPage.jsx # Full event details with Google Maps route
│   │   │   ├── AboutPage.jsx         # Mission, Vegetarianism & De-addiction
│   │   │   ├── ContactPage.jsx       # Ashram helpline & seva inquiry
│   │   │   ├── AdminLoginPage.jsx    # Secure admin portal login
│   │   │   ├── AdminDashboard.jsx    # Metrics and quick overview
│   │   │   ├── AdminSatsangManager.jsx# Add/Edit/Delete Satsang modal & table
│   │   │   └── AdminLocationManager.jsx# States & Districts CRUD
│   │   ├── App.jsx                   # Routes and protected navigation
│   │   ├── main.jsx
│   │   └── index.css                 # Spiritual styling & font scaling
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 📡 REST API एंडपॉइंट्स (API Endpoints)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Admin Login & JWT | Public |
| `GET` | `/api/auth/me` | Current Admin Profile | Admin |
| `GET` | `/api/states` | All states with satsang counts | Public |
| `POST` | `/api/states` | Add state | Admin |
| `GET` | `/api/states/:id/districts` | All districts under a state | Public |
| `GET` | `/api/districts` | All districts with next dates | Public |
| `POST` | `/api/districts` | Add district | Admin |
| `GET` | `/api/satsang` | Search/Filter Satsangs (state, district, date, text) | Public |
| `GET` | `/api/satsang/highlights` | Today's events and upcoming featured | Public |
| `GET` | `/api/satsang/:id` | Single Satsang details | Public |
| `POST` | `/api/satsang` | Add new Satsang | Admin |
| `PUT` | `/api/satsang/:id` | Update Satsang | Admin |
| `DELETE` | `/api/satsang/:id` | Delete Satsang | Admin |
| `GET` | `/api/stats` | Dashboard metrics | Public |
| `GET` | `/api/announcements` | Active ashram announcements | Public |

---

### 🙏 जय गुरु देव (Jay Guru Dev)

> सत्य • अहिंसा • सदाचार • सत्संग

