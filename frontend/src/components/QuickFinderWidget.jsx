import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import {
  DEFAULT_STATES,
  getStateDistricts,
  getAllDistricts,
  resolveState,
} from '../data/locationData';

export const QuickFinderWidget = ({ initialStates = [] }) => {
  const navigate = useNavigate();

  const [states, setStates] = useState(
    initialStates && initialStates.length > 0 ? initialStates : DEFAULT_STATES
  );
  const [districts, setDistricts] = useState([]);
  const [allDistrictsList, setAllDistrictsList] = useState(getAllDistricts());
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Sync states when initialStates arrive or fetch from backend
  useEffect(() => {
    if (initialStates && initialStates.length > 0) {
      setStates(initialStates);
      return;
    }
    const fetchStates = async () => {
      try {
        const res = await fetch('/api/states');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setStates(json.data);
        }
      } catch (err) {
        console.warn('Using default states:', err);
      }
    };
    fetchStates();
  }, [initialStates]);

  // When state changes, immediately load default districts and fetch live meta
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict('');
      return;
    }

    // 1. Instant fallback districts so dropdown is NEVER empty or blocked
    const fallbackList = getStateDistricts(selectedState);
    if (fallbackList && fallbackList.length > 0) {
      setDistricts(fallbackList);
    }

    // 2. Fetch live data from server
    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const res = await fetch(`/api/states/${selectedState}/districts`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setDistricts(json.data);
        }
      } catch (err) {
        console.warn('Using fallback districts for state:', selectedState);
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
    setSelectedDistrict('');
  }, [selectedState]);

  const handleDistrictSelect = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);

    // If state was not selected, auto-detect state from the selected district
    if (!selectedState && val) {
      const found = allDistrictsList.find((d) => d.id === val || d._id === val);
      if (found && found.stateId) {
        setSelectedState(found.stateId);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedState) params.append('stateId', selectedState);
    if (selectedDistrict) params.append('districtId', selectedDistrict);
    if (selectedDate) params.append('date', selectedDate);
    navigate(`/satsang?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-heroSearch border border-[#EBE3DA]">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-maroon-800 flex-shrink-0 fill-maroon-800" />
        <h2 className="text-xl sm:text-2xl font-black text-maroon-900 font-devanagari">
          सत्संग कहाँ हो रहा है?
        </h2>
      </div>

      {/* 3 Step Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
        {/* Field 1: राज्य चुनें */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-gray-700 font-devanagari">
            राज्य चुनें
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-white border border-[#D5CDC5] focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 rounded-xl py-2.5 px-3.5 pr-8 text-sm font-semibold text-gray-800 appearance-none cursor-pointer"
            >
              <option value="">राज्य चुनें</option>
              {states.map((st) => (
                <option key={st.id || st._id} value={st.id || st._id}>
                  {st.name_hi || st.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Field 2: जिला चुनें */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-gray-700 font-devanagari">
            जिला चुनें
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={handleDistrictSelect}
              className="w-full bg-white border border-[#D5CDC5] text-gray-800 focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 rounded-xl py-2.5 px-3.5 pr-8 text-sm font-semibold appearance-none cursor-pointer"
            >
              <option value="">
                {selectedState ? 'जिला चुनें (सभी जिले)' : 'जिला चुनें (सभी राज्य)'}
              </option>
              {(selectedState && districts.length > 0 ? districts : allDistrictsList).map((dst) => (
                <option key={dst.id || dst._id} value={dst.id || dst._id}>
                  {dst.name_hi || dst.name} {!selectedState && dst.stateNameHi ? `[${dst.stateNameHi}]` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Field 3: तारीख (वैकल्पिक) */}
        <div className="md:col-span-3 space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-gray-700 font-devanagari">
            तारीख (वैकल्पिक)
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              className="w-full bg-white border border-[#D5CDC5] focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 rounded-xl py-2.5 px-3.5 text-sm font-semibold text-gray-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Field 4: खोजें बटन */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-sm sm:text-base py-2.5 px-4 rounded-xl shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="w-4 h-4 text-white" />
            <span>खोजें</span>
          </button>
        </div>
      </form>
    </div>
  );
};
