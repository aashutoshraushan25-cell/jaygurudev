import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SatsangCard } from '../components/SatsangCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Pagination } from '../components/Pagination';
import {
  Search,
  MapPin,
  Calendar,
  Filter,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import {
  DEFAULT_STATES,
  getStateDistricts,
  getAllDistricts,
  resolveState,
} from '../data/locationData';

export const SatsangListingPage = () => {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Resolve initial state from URL (handles ObjectId or code like 'BR', 'UP')
  const rawStateParam = searchParams.get('stateId') || '';
  const initialResolvedState = resolveState(rawStateParam);
  const initialSelectedState = initialResolvedState
    ? (initialResolvedState.id || initialResolvedState._id)
    : rawStateParam;

  // Filter States
  const [states, setStates] = useState(DEFAULT_STATES);
  const [districts, setDistricts] = useState(
    initialSelectedState ? getStateDistricts(initialSelectedState) : []
  );
  const [allDistrictsList] = useState(getAllDistricts());
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('districtId') || '');
  const [selectedDate, setSelectedDate] = useState(searchParams.get('date') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  // Result States
  const [satsangs, setSatsangs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load live States from server and merge with defaults
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch('/api/states');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setStates(json.data);
        }
      } catch (err) {
        console.warn('Using default states list:', err);
      }
    };
    fetchStates();
  }, []);

  // Load Districts when state changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      return;
    }

    // 1. Instantly set fallback districts for selected state
    const fallbackDistricts = getStateDistricts(selectedState);
    if (fallbackDistricts.length > 0) {
      setDistricts(fallbackDistricts);
    }

    // 2. Fetch live data with upcoming counts
    const fetchDistricts = async () => {
      try {
        const res = await fetch(`/api/states/${selectedState}/districts`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setDistricts(json.data);
        }
      } catch (err) {
        console.warn('Using fallback districts for state:', selectedState);
      }
    };
    fetchDistricts();
  }, [selectedState]);

  // Sync state with URL params
  useEffect(() => {
    const stateIdParam = searchParams.get('stateId');
    const districtIdParam = searchParams.get('districtId');
    const dateParam = searchParams.get('date');
    const searchParam = searchParams.get('search');
    const statusParam = searchParams.get('status');

    if (stateIdParam !== null) {
      const resolved = resolveState(stateIdParam);
      setSelectedState(resolved ? (resolved.id || resolved._id) : stateIdParam);
    }
    if (districtIdParam !== null) setSelectedDistrict(districtIdParam);
    if (dateParam !== null) setSelectedDate(dateParam);
    if (searchParam !== null) setSearchTerm(searchParam);
    if (statusParam !== null) setStatusFilter(statusParam);
  }, [searchParams]);

  // Fetch Satsangs based on filters
  useEffect(() => {
    const fetchSatsangs = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedState) query.append('stateId', selectedState);
        if (selectedDistrict) query.append('districtId', selectedDistrict);
        if (selectedDate) query.append('date', selectedDate);
        if (searchTerm) query.append('search', searchTerm);
        if (statusFilter && statusFilter !== 'all') query.append('status', statusFilter);
        query.append('page', currentPage.toString());
        query.append('limit', '12');
        query.append('sortBy', 'date');
        query.append('sortOrder', 'asc');

        const res = await fetch(`/api/satsang?${query.toString()}`);
        const json = await res.json();
        if (json.success) {
          setSatsangs(json.data);
          setTotalPages(json.totalPages || 1);
          setTotalCount(json.total || 0);
        }
      } catch (err) {
        console.error('Error fetching satsangs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSatsangs();
  }, [selectedState, selectedDistrict, selectedDate, searchTerm, statusFilter, currentPage]);

  const handleStateChange = (e) => {
    const val = e.target.value;
    setSelectedState(val);
    setSelectedDistrict('');
    setCurrentPage(1);
    updateURL({ stateId: val, districtId: '' });
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);

    // If no state was selected, auto-select corresponding state from the district
    if (!selectedState && val) {
      const found = allDistrictsList.find((d) => d.id === val || d._id === val);
      if (found && found.stateId) {
        setSelectedState(found.stateId);
        updateURL({ stateId: found.stateId, districtId: val });
        setCurrentPage(1);
        return;
      }
    }

    setCurrentPage(1);
    updateURL({ districtId: val });
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    updateURL({ status });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    updateURL({ search: searchTerm });
  };

  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedDate('');
    setSearchTerm('');
    setStatusFilter('upcoming');
    setCurrentPage(1);
    setSearchParams({});
  };

  const updateURL = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v) updated.set(k, v);
      else updated.delete(k);
    });
    setSearchParams(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE6] text-maroon-900 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-[#ECD7CC]">
          <Sparkles className="w-4 h-4 text-maroon-800" />
          <span>{lang === 'hi' ? 'पावन सत्संग खोज' : 'Satsang Directory & Search'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 font-devanagari">
          {t('upcomingSatsang')}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
          {lang === 'hi'
            ? 'राज्य, जिला, शहर अथवा दिनांक चुनकर अपने आसपास आयोजित होने वाले सत्संग खोजें।'
            : 'Find upcoming spiritual Satsangs by filtering state, district, city or date.'}
        </p>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#EBE3DA] space-y-6">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder={
              lang === 'hi'
                ? 'सत्संग स्थल, शहर, गांव, पता या आयोजक के नाम से खोजें...'
                : 'Search by venue, town, village, organizer or address...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 rounded-2xl py-3.5 pl-12 pr-28 text-base font-semibold text-gray-800 transition-all shadow-xs"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-800" />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-maroon-900 hover:bg-maroon-950 text-white font-bold py-2 px-5 rounded-xl shadow text-sm transition-all"
          >
            {t('searchBtn')}
          </button>
        </form>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* State Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-extrabold text-gray-700 font-devanagari">
              {t('state')} ({t('selectState')})
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 pl-3 pr-8 text-sm sm:text-base font-bold text-gray-800 appearance-none shadow-xs cursor-pointer"
              >
                <option value="">{t('allStates')}</option>
                {states.map((st) => (
                  <option key={st.id || st._id} value={st.id || st._id}>
                    {lang === 'hi' ? st.name_hi : st.name_en}
                    {st.upcomingCount ? ` (${st.upcomingCount})` : ''}
                  </option>
                ))}
              </select>
              <MapPin className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-800" />
            </div>
          </div>

          {/* District Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-extrabold text-gray-700 font-devanagari">
              {t('district')} ({t('selectDistrict')})
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full bg-[#FAF7F2] border border-[#D5CDC5] focus:border-maroon-800 rounded-xl py-2.5 pl-3 pr-8 text-sm sm:text-base font-bold text-gray-800 appearance-none shadow-xs cursor-pointer"
              >
                <option value="">
                  {selectedState ? t('allDistricts') : lang === 'hi' ? 'सभी जिले (जिला चुनें)' : 'All Districts'}
                </option>
                {(selectedState && districts.length > 0 ? districts : allDistrictsList).map((dst) => (
                  <option key={dst.id || dst._id} value={dst.id || dst._id}>
                    {lang === 'hi' ? dst.name_hi : dst.name_en}
                    {!selectedState && dst.stateNameHi ? ` [${dst.stateNameHi}]` : ''}
                    {dst.upcomingCount ? ` (${dst.upcomingCount})` : ''}
                  </option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-maroon-800" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-extrabold text-gray-700 font-devanagari">
              {t('date')}
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setCurrentPage(1);
                  updateURL({ date: e.target.value });
                }}
                className="w-full bg-[#FCFBF7] border-2 border-orange-200 focus:border-orange-600 rounded-xl py-2.5 pl-3 pr-8 text-sm sm:text-base font-bold text-gray-800 shadow-sm"
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600" />
            </div>
          </div>

          {/* Reset Filters */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <button
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-orange-100 hover:text-orange-900 text-gray-700 font-bold text-sm transition-colors border border-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('resetBtn')}</span>
            </button>
          </div>
        </div>

        {/* Quick Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-orange-100">
          <span className="text-xs font-bold text-gray-500 mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {lang === 'hi' ? 'स्थिति:' : 'Status:'}
          </span>
          {[
            { id: 'upcoming', label: t('statusUpcoming') },
            { id: 'today', label: t('todaySatsang') },
            { id: 'all', label: lang === 'hi' ? 'सभी सत्संग' : 'All Events' },
            { id: 'cancelled', label: lang === 'hi' ? 'स्थगित/रद्द' : 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleStatusChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
                statusFilter === tab.id
                  ? 'bg-maroon-900 text-white shadow-xs'
                  : 'bg-[#F5EBE6] text-maroon-950 hover:bg-[#ECD7CC] border border-[#ECD7CC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS SECTION */}
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm sm:text-base font-bold text-gray-700">
          <span>
            {lang === 'hi'
              ? `कुल उपलब्ध सत्संग: ${totalCount}`
              : `Total Available Events: ${totalCount}`}
          </span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : satsangs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {satsangs.map((sat, idx) => (
                <SatsangCard key={sat.id || sat._id} satsang={sat} cardIndex={idx} />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#D5CDC5] p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-maroon-100 text-maroon-800 flex items-center justify-center mx-auto text-2xl font-bold">
              📍
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 font-devanagari">
              {selectedDistrict ? t('noSatsangInDistrict') : t('noSatsangsFound')}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              {lang === 'hi'
                ? 'कृपया दूसरा राज्य या जिला चुनकर प्रयास करें अथवा सभी आगामी सत्संग देखें।'
                : 'Please try selecting a different state or district, or reset your filters.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white font-bold px-6 py-2.5 rounded-xl shadow text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('resetBtn')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
