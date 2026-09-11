import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { AlertMessage } from '../components/AlertMessage';
import {
  MapPin,
  Building,
  PlusCircle,
  Edit,
  Trash2,
  ChevronLeft,
  X,
  AlertTriangle,
} from 'lucide-react';

import {
  DEFAULT_STATES,
  getAllDistricts,
} from '../data/locationData';

export const AdminLocationManager = () => {
  const { getAuthHeaders } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('states'); // 'states' | 'districts'
  const [states, setStates] = useState(DEFAULT_STATES);
  const [districts, setDistricts] = useState(getAllDistricts());
  const [selectedStateFilter, setSelectedStateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // State Modal
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [isStateEdit, setIsStateEdit] = useState(false);
  const [stateForm, setStateForm] = useState({ name_hi: '', name_en: '', code: '', description: '' });
  const [editStateId, setEditStateId] = useState(null);

  // District Modal
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [isDistrictEdit, setIsDistrictEdit] = useState(false);
  const [districtForm, setDistrictForm] = useState({ name_hi: '', name_en: '', stateId: '' });
  const [editDistrictId, setEditDistrictId] = useState(null);

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'state'|'district', item }

  const loadData = async () => {
    setLoading(true);
    try {
      const [sRes, dRes] = await Promise.all([
        fetch('/api/states'),
        fetch('/api/districts'),
      ]);
      const sJson = await sRes.json();
      const dJson = await dRes.json();
      if (sJson.success && sJson.data && sJson.data.length > 0) setStates(sJson.data);
      if (dJson.success && dJson.data && dJson.data.length > 0) setDistricts(dJson.data);
    } catch (err) {
      console.warn('Using default locations data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save State
  const handleSaveState = async (e) => {
    e.preventDefault();
    try {
      const url = isStateEdit ? `/api/states/${editStateId}` : '/api/states';
      const method = isStateEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: stateForm.name_en,
          name_en: stateForm.name_en,
          name_hi: stateForm.name_hi,
          code: stateForm.code,
          description: stateForm.description,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'त्रुटि हुई');
      setAlert({ type: 'success', message: 'राज्य सफलतापूर्वक सहेजा गया।' });
      setIsStateModalOpen(false);
      loadData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  // Save District
  const handleSaveDistrict = async (e) => {
    e.preventDefault();
    try {
      const url = isDistrictEdit ? `/api/districts/${editDistrictId}` : '/api/districts';
      const method = isDistrictEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: districtForm.name_en,
          name_en: districtForm.name_en,
          name_hi: districtForm.name_hi,
          stateId: districtForm.stateId,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'त्रुटि हुई');
      setAlert({ type: 'success', message: 'जिला सफलतापूर्वक सहेजा गया।' });
      setIsDistrictModalOpen(false);
      loadData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
    }
  };

  // Delete action
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const endpoint =
        deleteTarget.type === 'state'
          ? `/api/states/${deleteTarget.item.id || deleteTarget.item._id}`
          : `/api/districts/${deleteTarget.item.id || deleteTarget.item._id}`;

      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'हटाने में त्रुटि हुई');
      setAlert({ type: 'success', message: 'सफलतापूर्वक हटा दिया गया।' });
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
      loadData();
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
      setIsDeleteModalOpen(false);
    }
  };

  const filteredDistricts = selectedStateFilter
    ? districts.filter(
        (d) =>
          d.stateId?._id === selectedStateFilter ||
          d.stateId === selectedStateFilter
      )
    : districts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:underline mb-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>डैशबोर्ड पर वापस जाएं</span>
        </Link>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 font-devanagari">
          राज्य एवं जिला प्रबंधन (Location Management)
        </h1>
      </div>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('states')}
            className={`py-3 px-5 font-black text-base border-b-4 transition-all ${
              activeTab === 'states'
                ? 'border-orange-600 text-orange-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            राज्य (States) ({states.length})
          </button>
          <button
            onClick={() => setActiveTab('districts')}
            className={`py-3 px-5 font-black text-base border-b-4 transition-all ${
              activeTab === 'districts'
                ? 'border-orange-600 text-orange-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            जिले (Districts) ({districts.length})
          </button>
        </div>

        {activeTab === 'states' ? (
          <button
            onClick={() => {
              setIsStateEdit(false);
              setStateForm({ name_hi: '', name_en: '', code: '', description: '' });
              setIsStateModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow hover:bg-orange-700"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया राज्य जोड़ें</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsDistrictEdit(false);
              setDistrictForm({
                name_hi: '',
                name_en: '',
                stateId: states.length > 0 ? states[0].id || states[0]._id : '',
              });
              setIsDistrictModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow hover:bg-orange-700"
          >
            <PlusCircle className="w-4 h-4" />
            <span>नया जिला जोड़ें</span>
          </button>
        )}
      </div>

      {/* STATES TAB CONTENT */}
      {activeTab === 'states' && (
        <div className="bg-white rounded-3xl border-2 border-orange-100 shadow-xl overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-orange-50 text-orange-950 font-bold text-xs uppercase">
                <tr>
                  <th className="p-4">कोड</th>
                  <th className="p-4">राज्य का नाम (Hindi)</th>
                  <th className="p-4">State Name (English)</th>
                  <th className="p-4">सत्संग संख्या</th>
                  <th className="p-4 text-right">कार्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {states.map((st) => (
                  <tr key={st.id || st._id} className="hover:bg-orange-50/30">
                    <td className="p-4 font-black text-orange-700">{st.code}</td>
                    <td className="p-4 font-bold text-gray-900">{st.name_hi}</td>
                    <td className="p-4 text-gray-600">{st.name_en || st.name}</td>
                    <td className="p-4 font-semibold text-gray-700">{st.upcomingCount || 0}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setIsStateEdit(true);
                          setEditStateId(st.id || st._id);
                          setStateForm({
                            name_hi: st.name_hi || '',
                            name_en: st.name_en || st.name || '',
                            code: st.code || '',
                            description: st.description || '',
                          });
                          setIsStateModalOpen(true);
                        }}
                        className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTarget({ type: 'state', item: st });
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* DISTRICTS TAB CONTENT */}
      {activeTab === 'districts' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-600">राज्य अनुसार फ़िल्टर:</span>
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="bg-white border-2 border-orange-200 rounded-xl px-3 py-1.5 text-xs font-bold"
            >
              <option value="">-- सभी राज्य --</option>
              {states.map((st) => (
                <option key={st.id || st._id} value={st.id || st._id}>
                  {st.name_hi} ({st.name_en})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-3xl border-2 border-orange-100 shadow-xl overflow-hidden">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-orange-50 text-orange-950 font-bold text-xs uppercase">
                  <tr>
                    <th className="p-4">जिले का नाम (Hindi)</th>
                    <th className="p-4">District (English)</th>
                    <th className="p-4">संबंधित राज्य</th>
                    <th className="p-4">सत्संग संख्या</th>
                    <th className="p-4 text-right">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDistricts.map((dst) => (
                    <tr key={dst.id || dst._id} className="hover:bg-orange-50/30">
                      <td className="p-4 font-bold text-gray-900">{dst.name_hi}</td>
                      <td className="p-4 text-gray-600">{dst.name_en || dst.name}</td>
                      <td className="p-4 font-semibold text-orange-800">
                        {dst.stateId?.name_hi || dst.stateId?.name_en || '-'}
                      </td>
                      <td className="p-4 font-semibold text-gray-700">{dst.upcomingCount || 0}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setIsDistrictEdit(true);
                            setEditDistrictId(dst.id || dst._id);
                            setDistrictForm({
                              name_hi: dst.name_hi || '',
                              name_en: dst.name_en || dst.name || '',
                              stateId: dst.stateId?._id || dst.stateId || '',
                            });
                            setIsDistrictModalOpen(true);
                          }}
                          className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget({ type: 'district', item: dst });
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* STATE MODAL */}
      {isStateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">
                {isStateEdit ? 'राज्य संपादित करें' : 'नया राज्य जोड़ें'}
              </h3>
              <button onClick={() => setIsStateModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveState} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">राज्य का नाम (Hindi) *</label>
                <input
                  type="text"
                  required
                  value={stateForm.name_hi}
                  onChange={(e) => setStateForm({ ...stateForm, name_hi: e.target.value })}
                  placeholder="उदा. बिहार"
                  className="w-full border-2 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">State Name (English) *</label>
                <input
                  type="text"
                  required
                  value={stateForm.name_en}
                  onChange={(e) => setStateForm({ ...stateForm, name_en: e.target.value })}
                  placeholder="e.g. Bihar"
                  className="w-full border-2 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">राज्य कोड (Code e.g. BR, UP) *</label>
                <input
                  type="text"
                  required
                  maxLength="4"
                  value={stateForm.code}
                  onChange={(e) => setStateForm({ ...stateForm, code: e.target.value.toUpperCase() })}
                  placeholder="BR"
                  className="w-full border-2 rounded-xl p-2.5 text-sm uppercase"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStateModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  रद्द करें
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-600 text-white font-bold rounded-xl">
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DISTRICT MODAL */}
      {isDistrictModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">
                {isDistrictEdit ? 'जिला संपादित करें' : 'नया जिला जोड़ें'}
              </h3>
              <button onClick={() => setIsDistrictModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDistrict} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">संबंधित राज्य *</label>
                <select
                  required
                  value={districtForm.stateId}
                  onChange={(e) => setDistrictForm({ ...districtForm, stateId: e.target.value })}
                  className="w-full border-2 rounded-xl p-2.5 text-sm font-bold"
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
                <label className="font-bold block mb-1">जिले का नाम (Hindi) *</label>
                <input
                  type="text"
                  required
                  value={districtForm.name_hi}
                  onChange={(e) => setDistrictForm({ ...districtForm, name_hi: e.target.value })}
                  placeholder="उदा. मुजफ्फरपुर"
                  className="w-full border-2 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">District Name (English) *</label>
                <input
                  type="text"
                  required
                  value={districtForm.name_en}
                  onChange={(e) => setDistrictForm({ ...districtForm, name_en: e.target.value })}
                  placeholder="e.g. Muzaffarpur"
                  className="w-full border-2 rounded-xl p-2.5 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDistrictModalOpen(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  रद्द करें
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-600 text-white font-bold rounded-xl">
                  सहेजें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DIALOG */}
      {isDeleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-2 border-red-200">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="font-bold text-lg text-gray-900">
              हटाने की पुष्टि करें
            </h3>
            <p className="text-sm text-gray-600">
              क्या आप निश्चित रूप से{' '}
              <strong>
                "{deleteTarget.item.name_hi || deleteTarget.item.name_en}"
              </strong>{' '}
              को हटाना चाहते हैं?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-xl font-bold text-sm"
              >
                रद्द करें
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white font-bold rounded-xl text-sm"
              >
                हटाएं
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
