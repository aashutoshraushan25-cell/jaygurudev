import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Calendar,
  MapPin,
  PlusCircle,
  Settings,
  Eye,
  Trash2,
  Edit,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  Youtube,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, getAuthHeaders } = useAuth();
  const { lang, t } = useLanguage();

  const [stats, setStats] = useState(null);
  const [recentSatsangs, setRecentSatsangs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, satsangsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/satsang?limit=6&sortBy=createdAt&sortOrder=desc'),
        ]);

        const statsJson = await statsRes.json();
        const satsangsJson = await satsangsRes.json();

        if (statsJson.success) setStats(statsJson.data);
        if (satsangsJson.success) setRecentSatsangs(satsangsJson.data);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-amber-200 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('adminDashboard')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-devanagari">
            {lang === 'hi' ? 'जय गुरु देव प्रशासन केंद्र' : 'Jay Guru Dev Admin Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100">
            {lang === 'hi' ? `स्वागतम्, ${user?.name || 'व्यवस्थापक'}` : `Welcome, ${user?.name || 'Admin'}`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/satsangs"
            className="flex items-center gap-2 bg-white text-maroon-900 hover:bg-[#F5EBE6] font-extrabold text-sm py-3 px-5 rounded-xl shadow transition-all"
          >
            <PlusCircle className="w-4 h-4 text-maroon-800" />
            <span>{t('addNewSatsang')}</span>
          </Link>
          <Link
            to="/admin/youtube"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 px-5 rounded-xl shadow transition-all"
          >
            <Youtube className="w-4 h-4" />
            <span>यूट्यूब वीडियो प्रबंधन</span>
          </Link>
          <Link
            to="/admin/locations"
            className="flex items-center gap-2 bg-maroon-950/60 hover:bg-maroon-950/80 text-white border border-amber-300/40 font-bold text-sm py-3 px-5 rounded-xl backdrop-blur-xs transition-all"
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>{t('manageLocations')}</span>
          </Link>
        </div>
      </div>

      {/* METRICS CARDS */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border-2 border-orange-100 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('totalSatsang')}</span>
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.totalSatsangs}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-200 shadow-md flex flex-col justify-between bg-emerald-50/20">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-bold uppercase">{t('upcomingSatsangCount')}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-800">{stats.upcomingSatsangs}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-md flex flex-col justify-between bg-amber-50/40">
            <div className="flex items-center justify-between text-amber-800 mb-2">
              <span className="text-xs font-bold uppercase">{t('todaySatsangCount')}</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-amber-900">{stats.todaySatsangs}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-orange-100 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('totalStates')}</span>
              <Building className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.totalStates}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-orange-100 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-bold uppercase">{t('totalDistricts')}</span>
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-black text-gray-900">{stats.totalDistricts}</div>
          </div>
        </div>
      )}

      {/* RECENT SATSANGS TABLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-devanagari">
              {lang === 'hi' ? 'हाल में जोड़े गए सत्संग' : 'Recently Added Satsangs'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {lang === 'hi' ? 'सत्संग सूची एवं त्वरित संपादन' : 'Overview of latest scheduled events'}
            </p>
          </div>

          <Link
            to="/admin/satsangs"
            className="text-sm font-bold text-orange-700 hover:text-orange-900 hover:underline"
          >
            {lang === 'hi' ? 'संपूर्ण सत्संग सूची खोलें →' : 'Open Full Satsang Manager →'}
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : recentSatsangs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-orange-50/70 text-orange-950 font-bold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 rounded-l-xl">सत्संग शीर्षक</th>
                  <th className="p-3.5">दिनांक एवं समय</th>
                  <th className="p-3.5">राज्य एवं जिला</th>
                  <th className="p-3.5">आयोजक</th>
                  <th className="p-3.5">स्थिति</th>
                  <th className="p-3.5 rounded-r-xl text-right">कार्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentSatsangs.map((sat) => (
                  <tr key={sat.id || sat._id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-3.5 font-bold text-gray-900">
                      <div className="line-clamp-1">{sat.title}</div>
                      <div className="text-xs font-normal text-gray-500">{sat.venue}</div>
                    </td>
                    <td className="p-3.5 text-gray-700 whitespace-nowrap">
                      <div className="font-semibold">{sat.date}</div>
                      <div className="text-xs text-gray-500">{sat.startTime} - {sat.endTime}</div>
                    </td>
                    <td className="p-3.5 text-gray-700 whitespace-nowrap">
                      <span className="font-semibold">{sat.districtId?.name_hi || sat.districtId?.name_en}</span>,{' '}
                      <span className="text-xs text-gray-500">{sat.stateId?.name_hi || sat.stateId?.name_en}</span>
                    </td>
                    <td className="p-3.5 text-gray-700">
                      <div className="text-xs font-medium">{sat.organizerName}</div>
                      <div className="text-[11px] text-gray-500">{sat.organizerPhone}</div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          sat.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : sat.status === 'today'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {sat.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        to={`/satsang/${sat.id || sat._id}`}
                        target="_blank"
                        className="p-1.5 text-gray-500 hover:text-orange-600 inline-block"
                        title="वेबसाइट पर देखें"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/satsangs`}
                        className="p-1.5 text-gray-500 hover:text-blue-600 inline-block"
                        title="संपादित करें"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6 font-medium">
            कोई सत्संग उपलब्ध नहीं है।
          </p>
        )}
      </div>
    </div>
  );
};
