import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Youtube,
  Plus,
  RefreshCw,
  Trash2,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Radio,
  Sparkles,
  Link as LinkIcon,
  Play,
} from 'lucide-react';

export const AdminYouTubeManager = () => {
  const { getAuthHeaders } = useAuth();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Add form state
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Config state
  const [channelId, setChannelId] = useState('');
  const [channelUrl, setChannelUrl] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/youtube/videos');
      const json = await res.json();
      if (json.success) {
        setVideos(json.data || []);
        if (json.config) {
          setChannelId(json.config.channelId || '');
          setChannelUrl(json.config.channelUrl || '');
        }
      }
    } catch (err) {
      console.error('Error loading videos:', err);
      setStatusMsg({ type: 'error', text: 'डेटा लोड करने में समस्या हुई।' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    try {
      setAdding(true);
      setStatusMsg({ type: '', text: '' });

      const res = await fetch('/api/youtube/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          url: newUrl.trim(),
          title: newTitle.trim(),
          isLive,
          isPinned,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMsg({ type: 'success', text: 'वीडियो सफलतापूर्वक जोड़ दिया गया है!' });
        setNewUrl('');
        setNewTitle('');
        setIsLive(false);
        setIsPinned(false);
        loadData();
      } else {
        setStatusMsg({ type: 'error', text: json.message || 'वीडियो जोड़ने में त्रुटि हुई।' });
      }
    } catch (err) {
      console.error('Add video error:', err);
      setStatusMsg({ type: 'error', text: 'सर्वर से संपर्क नहीं हो सका।' });
    } finally {
      setAdding(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      setStatusMsg({ type: '', text: '' });

      const res = await fetch('/api/youtube/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          channelId: channelId || 'UCTP6TFqDUWMxobhpkFjgE0Q',
          channelUrl: channelUrl || 'https://www.youtube.com/@Jaigurudevukm',
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMsg({ type: 'success', text: json.message || 'यूट्यूब से वीडियो सिंक हो गए हैं!' });
        loadData();
      } else {
        setStatusMsg({ type: 'error', text: json.message || 'सिंक करने में त्रुटि हुई।' });
      }
    } catch (err) {
      console.error('Sync error:', err);
      setStatusMsg({ type: 'error', text: 'चैनल सिंक नहीं हो सका। कृपया Channel ID जांचें।' });
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    try {
      setSavingConfig(true);
      setStatusMsg({ type: '', text: '' });

      const res = await fetch('/api/youtube/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          channelId: channelId.trim(),
          channelUrl: channelUrl.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setStatusMsg({ type: 'success', text: 'चैनल सेटिंग्स सफलतापूर्वक सुरक्षित कर दी गई हैं!' });
      } else {
        setStatusMsg({ type: 'error', text: json.message || 'सेटिंग्स अपडेट नहीं हो सकीं।' });
      }
    } catch (err) {
      console.error('Config error:', err);
      setStatusMsg({ type: 'error', text: 'सर्वर से संपर्क नहीं हो सका।' });
    } finally {
      setSavingConfig(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप निश्चित रूप से इस वीडियो को वेबसाइट से हटाना चाहते हैं?')) {
      return;
    }

    try {
      const res = await fetch(`/api/youtube/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const json = await res.json();
      if (json.success) {
        setVideos(videos.filter((v) => v._id !== id && v.videoId !== id));
        setStatusMsg({ type: 'success', text: 'वीडियो हटा दिया गया।' });
      }
    } catch (err) {
      console.error('Delete error:', err);
      setStatusMsg({ type: 'error', text: 'वीडियो हटाने में त्रुटि हुई।' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-maroon-800 transition-colors font-devanagari"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>डैशबोर्ड पर वापस जाएं</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-devanagari">
                यूट्यूब वीडियो प्रबंधन (YouTube Integration)
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-devanagari">
                यूट्यूब पर वीडियो अपलोड होते ही वेबसाइट पर स्वतः दिखाने और लाइव सत्संग जोड़ने का केंद्र।
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'सिंक हो रहा है...' : 'यूट्यूब से अभी सिंक करें'}</span>
        </button>
      </div>

      {/* Status Alerts */}
      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 font-devanagari text-sm font-bold animate-fadeIn ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Grid: Left Add Manual Video + Right Channel Sync Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Add Direct YouTube Link (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#EBE3DA] shadow-card space-y-5">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <Plus className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-black text-gray-900 font-devanagari">
              नया वीडियो या लाइव लिंक जोड़ें (Add Video URL)
            </h2>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-4 font-devanagari">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                यूट्यूब वीडियो लिंक या Video ID *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... अथवा https://youtu.be/..."
                  required
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-gray-200 text-sm focus:border-red-600 focus:outline-none"
                />
                <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                यूट्यूब का कोई भी वीडियो, लाइव स्ट्रीम या शॉर्ट्स लिंक यहाँ पेस्ट करें।
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                वीडियो शीर्षक (वैकल्पिक - खाली छोड़ने पर यूट्यूब से स्वतः लिया जाएगा)
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="उदा. पूज्य गुरुदेव का पावन अमृत वचन..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={isLive}
                  onChange={(e) => setIsLive(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="flex items-center gap-1 text-red-600">
                  <Radio className="w-3.5 h-3.5" />
                  🔴 लाइव सत्संग प्रसारण
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
                <span className="flex items-center gap-1 text-amber-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  ⭐ सबसे ऊपर पिन करें
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={adding}
              className="inline-flex items-center justify-center gap-2 bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{adding ? 'जोड़ा जा रहा है...' : 'वेबसाइट पर जोड़ें'}</span>
            </button>
          </form>
        </div>

        {/* 2. YouTube Channel Auto-Sync Config (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF5ED] to-white rounded-3xl p-6 sm:p-7 border border-[#EBE3DA] shadow-card space-y-4">
          <div className="flex items-center gap-2.5 border-b border-gray-200 pb-3">
            <RefreshCw className="w-5 h-5 text-maroon-800" />
            <h2 className="text-lg font-black text-gray-900 font-devanagari">
              चैनल ऑटो-सिंक सेटिंग्स (Auto-Sync)
            </h2>
          </div>

          <p className="text-xs text-gray-600 font-devanagari leading-relaxed">
            यहाँ अपना आधिकारिक <strong>YouTube Channel ID</strong> दर्ज करें। जब भी चैनल पर नया वीडियो अपलोड होगा, बैकएंड स्वतः सिंक करके उसे वेबसाइट पर लाइव दिखाएगा।
          </p>

          <form onSubmit={handleSaveConfig} className="space-y-3.5 font-devanagari">
            <button
              type="button"
              onClick={() => {
                setChannelId('UCTP6TFqDUWMxobhpkFjgE0Q');
                setChannelUrl('https://www.youtube.com/@Jaigurudevukm');
              }}
              className="w-full text-xs font-bold text-maroon-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>⚡ आधिकारिक चैनल (@Jaigurudevukm) भरें</span>
            </button>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                YouTube Channel ID (e.g. UC...)
              </label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="UCTP6TFqDUWMxobhpkFjgE0Q"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:border-maroon-800 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                YouTube Channel URL / Handle
              </label>
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://www.youtube.com/@Jaigurudevukm"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-maroon-800 focus:outline-none bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={savingConfig}
              className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors disabled:opacity-50"
            >
              <span>{savingConfig ? 'सुरक्षित हो रहा है...' : '💾 सेटिंग्स सुरक्षित करें'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Current Videos List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE3DA] shadow-card space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-black text-gray-900 font-devanagari">
              वेबसाइट पर उपलब्ध वीडियो ({videos.length})
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-maroon-800 border-t-transparent animate-spin" />
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-devanagari">
            कोई वीडियो मौजूद नहीं है।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div
                key={v.videoId || v._id}
                className="rounded-2xl border border-gray-100 bg-[#FAF7F2]/40 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={v.thumbnailUrl || `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/hero_bg.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    {v.isLive && (
                      <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        🔴 LIVE
                      </span>
                    )}
                    {v.isPinned && (
                      <span className="bg-amber-500 text-maroon-950 text-[9px] font-black px-1.5 py-0.5 rounded">
                        ⭐ PINNED
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 font-devanagari">
                      {v.title}
                    </h3>
                    <div className="text-[11px] text-gray-500 font-mono mt-1">ID: {v.videoId}</div>
                  </div>

                  <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                    <a
                      href={`https://www.youtube.com/watch?v=${v.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline font-devanagari"
                    >
                      <span>यूट्यूब पर देखें</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleDelete(v._id || v.videoId)}
                      className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="वीडियो हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
