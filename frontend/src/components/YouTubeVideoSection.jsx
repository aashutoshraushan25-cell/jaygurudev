import React, { useState, useEffect } from 'react';
import { Play, Youtube, ExternalLink, X, Radio, Clock, Sparkles, RefreshCw } from 'lucide-react';

export const YouTubeVideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [channelUrl, setChannelUrl] = useState('https://www.youtube.com/@Jaigurudevukm');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/youtube/videos');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setVideos(json.data);
          if (json.config?.channelUrl) {
            setChannelUrl(json.config.channelUrl);
          }
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'हाल ही में';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'हाल ही में';
    }
  };

  return (
    <section id="youtube-videos" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5 shadow-xs">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-maroon-900 font-devanagari leading-tight">
                नवीनतम वीडियो एवं लाइव सत्संग
              </h2>
              <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider animate-pulse uppercase">
                <Radio className="w-3 h-3" />
                Live & Videos
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                @Jaigurudevukm
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-medium font-devanagari mt-0.5">
              आधिकारिक यूट्यूब चैनल <strong>@Jaigurudevukm</strong> से स्वतः सिंक किए गए पावन सत्संग एवं संदेश।
            </p>
          </div>
        </div>

        <a
          href={channelUrl || 'https://www.youtube.com/@Jaigurudevukm'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all self-start sm:self-auto font-devanagari flex-shrink-0"
        >
          <Youtube className="w-4 h-4" />
          <span>यूट्यूब चैनल (@Jaigurudevukm)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Video Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-500 font-devanagari border border-gray-100">
          कोई वीडियो उपलब्ध नहीं है।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {videos.slice(0, 4).map((video) => (
            <div
              key={video.videoId || video._id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-2xl overflow-hidden border border-[#EBE3DA] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.src = '/hero_bg.jpg';
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Center YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-700 transition-all duration-300">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  {video.isLive && (
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      Live
                    </span>
                  )}
                  {video.isPinned && (
                    <span className="bg-amber-500 text-maroon-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      प्रमुख
                    </span>
                  )}
                </div>

                {/* Bottom Date Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-300" />
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="text-sm sm:text-[15px] font-black text-gray-900 leading-snug line-clamp-2 font-devanagari group-hover:text-red-700 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 font-devanagari mt-1">
                    {video.channelTitle || 'जय गुरु देव आश्रम'}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-red-600 font-devanagari">
                  <span className="flex items-center gap-1">
                    <Play className="w-3.5 h-3.5 fill-red-600" />
                    यहाँ चलाएं
                  </span>
                  <span className="text-gray-400 group-hover:text-red-600 transition-colors">
                    देखें →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#181818] text-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-800 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <Youtube className="w-4 h-4" />
                </div>
                <h4 className="text-sm sm:text-base font-bold line-clamp-1 font-devanagari text-gray-100">
                  {selectedVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 sm:px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-devanagari">
              <div className="text-xs text-gray-400">
                {selectedVideo.channelTitle || 'जय गुरु देव आश्रम'} • {formatDate(selectedVideo.publishedAt)}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  <span>यूट्यूब ऐप / ब्राउज़र में खोलें</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-xs font-bold bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full transition-colors"
                >
                  बंद करें
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
