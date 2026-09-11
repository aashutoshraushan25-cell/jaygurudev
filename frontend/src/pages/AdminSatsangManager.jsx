import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AlertMessage } from '../components/AlertMessage';
import {
  PlusCircle,
  Edit,
  Trash2,
  Search,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ChevronLeft,
  X,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  DEFAULT_STATES,
  getStateDistricts,
} from '../data/locationData';

export const AdminSatsangManager = () => {
  const { getAuthHeaders } = useAuth();
  const { lang, t } = useLanguage();

  const [satsangs, setSatsangs] = useState([]);
  const [states, setStates] = useState(DEFAULT_STATES);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Search & Filter in Admin
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form State
  const initialFormState = {
    title: '',
    title_hi: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '06:00 PM',
    endTime: '08:30 PM',
    stateId: '',
    districtId: '',
    city: '',
    village: '',
    venue: '',
    address: '',
    landmark: '',
    googleMapsUrl: '',
    organizerName: '',
    organizerPhone: '',
    description: '',
    imageUrl: '',
    status: 'upcoming',
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formDistricts, setFormDistricts] = useState([]);
  const [saving, setSaving] = useState(false);

  // Load States & Satsangs
  const loadData = async () => {
    setLoading(true);
    try {
      const [satsangRes, statesRes] = await Promise.all([
        fetch('/api/satsang?limit=100&sortBy=date&sortOrder=asc'),
        fetch('/api/states'),
      ]);

      const sJson = await satsangRes.json();
      const stJson = await statesRes.json();

      if (sJson.success) setSatsangs(sJson.data);
      if (stJson.success && stJson.data && stJson.data.length > 0) {
        setStates(stJson.data);
      }
    } catch (err) {
      console.warn('Using default states:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // When form stateId changes, load districts for form
  useEffect(() => {
    if (!formData.stateId) {
      setFormDistricts([]);
      return;
    }

    // 1. Instant fallback districts
    const fallback = getStateDistricts(formData.stateId);
    if (fallback && fallback.length > 0) {
      setFormDistricts(fallback);
    }

    const fetchDistricts = async () => {
      try {
        const res = await fetch(`/api/states/${formData.stateId}/districts`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setFormDistricts(json.data);
        }
      } catch (err) {
        console.warn('Using fallback districts for form:', err);
      }
    };
    fetchDistricts();
  }, [formData.stateId]);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setFormData({
      ...initialFormState,
      stateId: states.length > 0 ? states[0].id || states[0]._id : '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditMode(true);
    setSelectedId(item.id || item._id);
    setFormData({
      title: item.title || '',
      title_hi: item.title_hi || item.title || '',
      date: item.date || '',
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      stateId: item.stateId?._id || item.stateId || '',
      districtId: item.districtId?._id || item.districtId || '',
      city: item.city || '',
      village: item.village || '',
      venue: item.venue || '',
      address: item.address || '',
      landmark: item.landmark || '',
      googleMapsUrl: item.googleMapsUrl || '',
      organizerName: item.organizerName || '',
      organizerPhone: item.organizerPhone || '',
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      status: item.status || 'upcoming',
      isFeatured: !!item.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      const url = isEditMode ? `/api/satsang/${selectedId}` : '/api/satsang';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'त्रुटि हुई');
      }

      setAlert({
        type: 'success',
        message: isEditMode
          ? 'सत्संग कार्यक्रम सफलतापूर्वक अपडेट किया गया।'
          : 'नया सत्संग कार्यक्रम सफलतापूर्वक जोड़ा गया।',
      });

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/satsang/${itemToDelete.id || itemToDelete._id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'हटाने में समस्या हुई');
      }
      setAlert({ type: 'success', message: 'सत्संग सफलतापूर्वक हटा दिया गया।' });
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      loadData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  // Filtered satsangs
  const filteredList = satsangs.filter((s) => {
    const matchesSearch =
      !search ||
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.venue?.toLowerCase().includes(search.toLowerCase()) ||
      s.organizerName?.toLowerCase().includes(search.toLowerCase()) ||
      s.city?.toLowerCase().includes(search.toLowerCase());

    const matchesState =
      !filterState ||
      s.stateId?._id === filterState ||
      s.stateId === filterState;

    return matchesSearch && matchesState;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:underline mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>डैशबोर्ड पर वापस जाएं</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 font-devanagari">
            सत्संग कार्यक्रम प्रबंधन (Satsang Management)
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm sm:text-base py-3 px-6 rounded-2xl shadow-lg transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{t('addNewSatsang')}</span>
        </button>
      </div>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-orange-100 shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            placeholder="सत्संग शीर्षक, स्थान, शहर अथवा आयोजक खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium"
          />
          <Search className="w-4 h-4 text-orange-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl py-2.5 px-3 text-sm font-bold"
          >
            <option value="">-- सभी राज्य --</option>
            {states.map((st) => (
              <option key={st.id || st._id} value={st.id || st._id}>
                {lang === 'hi' ? st.name_hi : st.name_en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Satsang Table */}
      <div className="bg-white rounded-3xl border-2 border-orange-100 shadow-xl overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-orange-50 text-orange-950 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">सत्संग विवरण</th>
                  <th className="p-4">दिनांक व समय</th>
                  <th className="p-4">राज्य / जिला</th>
                  <th className="p-4">आयोजक</th>
                  <th className="p-4">स्थिति</th>
                  <th className="p-4 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList.map((sat) => (
                  <tr key={sat.id || sat._id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="p-4 font-bold text-gray-900 max-w-xs">
                      <div className="truncate text-base">{sat.title}</div>
                      <div className="text-xs font-medium text-gray-500 truncate">{sat.venue}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-bold text-orange-800">{sat.date}</div>
                      <div className="text-xs text-gray-500">{sat.startTime} - {sat.endTime}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-bold text-gray-800">
                        {sat.districtId?.name_hi || sat.districtId?.name_en}
                      </div>
                      <div className="text-xs text-gray-500">
                        {sat.stateId?.name_hi || sat.stateId?.name_en}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{sat.organizerName}</div>
                      <div className="text-xs text-emerald-700">{sat.organizerPhone}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          sat.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : sat.status === 'today'
                            ? 'bg-amber-100 text-orange-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {sat.status === 'cancelled'
                          ? 'रद्द (Cancelled)'
                          : sat.status === 'today'
                          ? 'आज (Today)'
                          : 'आगामी (Upcoming)'}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <Link
                        to={`/satsang/${sat.id || sat._id}`}
                        target="_blank"
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg inline-block"
                        title="देखें"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleOpenEditModal(sat)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg inline-block"
                        title="संपादित करें"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(sat)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg inline-block"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-bold">
            कोई सत्संग कार्यक्रम नहीं मिला।
          </div>
        )}
      </div>

      {/* ADD / EDIT SATSANG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border-2 border-orange-200 space-y-6 animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-devanagari">
                {isEditMode ? 'सत्संग कार्यक्रम संपादित करें' : 'नया सत्संग कार्यक्रम जोड़ें'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Title Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    सत्संग शीर्षक (Hindi) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_hi}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title_hi: e.target.value,
                        title: formData.title || e.target.value,
                      });
                    }}
                    placeholder="उदा. जय गुरु देव भव्य सत्संग समारोह"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    सत्संग नाम / Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Jay Guru Dev Grand Satsang"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Date & Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">दिनांक (Date) *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">प्रारंभ समय (Start Time) *</label>
                  <input
                    type="text"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    placeholder="06:00 PM"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">समापन समय (End Time) *</label>
                  <input
                    type="text"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="08:30 PM"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
              </div>

              {/* State & District Cascade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">राज्य (State) *</label>
                  <select
                    required
                    value={formData.stateId}
                    onChange={(e) => setFormData({ ...formData, stateId: e.target.value, districtId: '' })}
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-bold"
                  >
                    <option value="">-- राज्य चुनें --</option>
                    {states.map((st) => (
                      <option key={st.id || st._id} value={st.id || st._id}>
                        {st.name_hi} ({st.name_en})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">जिला (District) *</label>
                  <select
                    required
                    value={formData.districtId}
                    onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
                    disabled={!formData.stateId}
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-bold"
                  >
                    <option value="">-- जिला चुनें --</option>
                    {formDistricts.map((dst) => (
                      <option key={dst.id || dst._id} value={dst.id || dst._id}>
                        {dst.name_hi} ({dst.name_en})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City, Village, Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">शहर / कस्बा (City/Town)</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="उदा. मुजफ्फरपुर"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">गांव / क्षेत्र (Village/Area)</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="उदा. ब्रह्मपुरा"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">सत्संग स्थल (Venue Name) *</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="उदा. सत्संग भवन / मैदान"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Address & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पूरा पता (Full Address) *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="सड़क, मोहल्ला, पिनकोड सहित पूरा पता"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">पहचान / Landmark</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    placeholder="उदा. रेलवे स्टेशन के पास / मंदिर के सामने"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Organizer & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">संयोजक / आयोजक का नाम *</label>
                  <input
                    type="text"
                    required
                    value={formData.organizerName}
                    onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                    placeholder="उदा. रामेश्वर प्रसाद जी"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">आयोजक फोन नंबर *</label>
                  <input
                    type="text"
                    required
                    value={formData.organizerPhone}
                    onChange={(e) => setFormData({ ...formData, organizerPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Google Maps & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">गूगल मैप्स लिंक (Google Maps URL)</label>
                  <input
                    type="url"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">सत्संग स्थिति (Status)</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-bold"
                  >
                    <option value="upcoming">आगामी (Upcoming)</option>
                    <option value="today">आज (Today)</option>
                    <option value="completed">संपन्न (Completed)</option>
                    <option value="cancelled">रद्द / स्थगित (Cancelled)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">सत्संग विवरण / निर्देश</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="सत्संग, प्रवचन, नामदान और लंगर व्यवस्था संबंधी विवरण..."
                  className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl p-3 text-sm font-medium"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 text-sm"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-2.5 rounded-xl shadow text-sm transition-all"
                >
                  {saving ? t('loading') : t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-red-200 space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 font-devanagari">
              {t('confirmDeleteTitle')}
            </h3>
            <p className="text-sm text-center text-gray-600">
              {t('confirmDeleteMsg')}
              <br />
              <strong className="text-gray-900 mt-1 inline-block">
                "{itemToDelete.title}"
              </strong>
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-100 text-sm"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-xl shadow text-sm"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
