import { YouTubeVideo } from '../models/YouTubeVideo.js';
import { YouTubeConfig } from '../models/YouTubeConfig.js';

const DEFAULT_CHANNEL_ID = 'UCTP6TFqDUWMxobhpkFjgE0Q';
const DEFAULT_CHANNEL_URL = 'https://www.youtube.com/@Jaigurudevukm';

// Initial curated spiritual videos from official @Jaigurudevukm channel
const initialSpiritualVideos = [
  {
    videoId: '28vLcx7C1aM',
    title: 'जो सतसंगी रिटायर्ड हैं, वे अपने पड़ोस के लड़कों को इकट्ठा करके थोड़ी देर बताओ-समझाओ। #jaigurudev',
    description: 'परम पूज्य परम संत बाबा उमाकान्त जी महाराज का पावन संदेश। सत्संग, शाकाहार और नशामुक्ति का पावन आह्वान।',
    thumbnailUrl: 'https://img.youtube.com/vi/28vLcx7C1aM/hqdefault.jpg',
    channelTitle: 'Jaigurudevukm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isLive: false,
    isPinned: true,
    source: 'rss',
  },
  {
    videoId: 'l8Wk6-VImQk',
    title: 'जो गुरु बुराइयों को नहीं छुड़ाते हैं वे सच्चे गुरु नहीं होते हैं। #babaumakantjimaharaj #jaigurudev',
    description: 'पूज्य बाबा उमाकान्त जी महाराज द्वारा दिया गया पावन सत्संग संदेश।',
    thumbnailUrl: 'https://img.youtube.com/vi/l8Wk6-VImQk/hqdefault.jpg',
    channelTitle: 'Jaigurudevukm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
    isLive: false,
    isPinned: true,
    source: 'rss',
  },
  {
    videoId: '949xtPSMpI4',
    title: 'कलयुग जैसे मलीन युग में सन्तों ने साधना का सबसे आसान उपाय निकाला है। #babaumakantjimaharaj',
    description: 'कलियुग में नाम की महिमा और आत्म-कल्याणकारी साधना का सरल मार्ग।',
    thumbnailUrl: 'https://img.youtube.com/vi/949xtPSMpI4/hqdefault.jpg',
    channelTitle: 'Jaigurudevukm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isLive: false,
    isPinned: false,
    source: 'rss',
  },
  {
    videoId: '3wmIgIxH1-4',
    title: 'जब तक भक्ति नहीं आती है तब तक गुरु (प्रभु) रीझते नहीं हैं। #babaumakantjimaharaj #jaigurudev',
    description: 'भक्ति और प्रेम का सच्चा स्वरूप। गुरु कृपा और आत्म समर्पण।',
    thumbnailUrl: 'https://img.youtube.com/vi/3wmIgIxH1-4/hqdefault.jpg',
    channelTitle: 'Jaigurudevukm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    isLive: false,
    isPinned: false,
    source: 'rss',
  },
  {
    videoId: '_caH5H4FATQ',
    title: 'Satsang | Baba Umakant Ji Maharaj Ashram, Jaigurudev Nagar, Rewari, HR',
    description: 'बाबा उमाकान्त जी महाराज का पावन सत्संग कार्यक्रम एवं दर्शन।',
    thumbnailUrl: 'https://img.youtube.com/vi/_caH5H4FATQ/hqdefault.jpg',
    channelTitle: 'Jaigurudevukm',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isLive: false,
    isPinned: false,
    source: 'rss',
  },
];

// Helper to extract video ID from YouTube URL
export const extractVideoId = (input) => {
  if (!input) return null;
  const str = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
};

// Helper to resolve channel ID from UC ID, @handle, or channel URL
export const resolveChannelId = async (input) => {
  if (!input) return DEFAULT_CHANNEL_ID;
  const str = input.trim();

  // If already a standard YouTube UC ID (24 chars)
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(str)) {
    return str;
  }

  // If handle or URL matching Jaigurudevukm
  if (
    str.toLowerCase().includes('jaigurudevukm') ||
    str === '@Jaigurudevukm' ||
    str === 'Jaigurudevukm'
  ) {
    return DEFAULT_CHANNEL_ID;
  }

  // Attempt resolving from YouTube web page
  try {
    let targetUrl = str;
    if (str.startsWith('@')) {
      targetUrl = `https://www.youtube.com/${str}`;
    } else if (!str.startsWith('http')) {
      targetUrl = `https://www.youtube.com/@${str}`;
    }

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (res.ok) {
      const text = await res.text();
      const m =
        text.match(/<meta itemprop="identifier" content="([^"]+)">/) ||
        text.match(/"channelId":"([^"]+)"/) ||
        text.match(/"externalId":"([^"]+)"/) ||
        text.match(/(UC[a-zA-Z0-9_-]{22})/);
      if (m && m[1]) return m[1];
    }
  } catch (err) {
    console.error('Error auto-resolving channel ID:', err.message);
  }

  return DEFAULT_CHANNEL_ID;
};

// Helper to parse YouTube Atom RSS feed
const parseRSS = (xmlText) => {
  const videos = [];
  const entries = xmlText.split('<entry>');
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i];
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
    const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const authorMatch = entry.match(/<author>[\s\S]*?<name>([^<]+)<\/name>/);

    if (videoIdMatch && titleMatch) {
      const vid = videoIdMatch[1].trim();
      videos.push({
        videoId: vid,
        title: titleMatch[1].trim().replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
        publishedAt: publishedMatch ? new Date(publishedMatch[1]) : new Date(),
        description: descMatch ? descMatch[1].trim() : '',
        thumbnailUrl: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
        channelTitle: authorMatch ? authorMatch[1].trim() : 'Jaigurudevukm',
        source: 'rss',
      });
    }
  }
  return videos;
};

// @desc    Get all latest YouTube videos
// @route   GET /api/youtube/videos
// @access  Public
export const getVideos = async (req, res) => {
  try {
    let videos = await YouTubeVideo.find().sort({ isPinned: -1, isLive: -1, publishedAt: -1 });

    // Seed if empty
    if (videos.length === 0) {
      await YouTubeVideo.insertMany(initialSpiritualVideos);
      videos = await YouTubeVideo.find().sort({ isPinned: -1, isLive: -1, publishedAt: -1 });
    }

    let config = await YouTubeConfig.findOne();
    if (!config) {
      config = await YouTubeConfig.create({
        channelId: DEFAULT_CHANNEL_ID,
        channelUrl: DEFAULT_CHANNEL_URL,
        autoSync: true,
      });
    }

    // Auto-sync from YouTube RSS if configured and last sync was > 15 minutes ago
    const activeChannelId = config.channelId || DEFAULT_CHANNEL_ID;
    if (config.autoSync) {
      const shouldSync = !config.lastSyncAt || Date.now() - new Date(config.lastSyncAt).getTime() > 15 * 60 * 1000;
      if (shouldSync) {
        syncChannelFeed(activeChannelId).catch((err) => console.error('Background YouTube sync error:', err));
      }
    }

    res.json({
      success: true,
      data: videos,
      config: {
        channelId: config.channelId || DEFAULT_CHANNEL_ID,
        channelUrl: config.channelUrl || DEFAULT_CHANNEL_URL,
        lastSyncAt: config.lastSyncAt,
      },
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    res.status(500).json({ success: false, message: 'वीडियो लोड करने में त्रुटि हुई' });
  }
};

// Helper function to sync feed from YouTube
const syncChannelFeed = async (channelId) => {
  const targetChannelId = (channelId || DEFAULT_CHANNEL_ID).trim();
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${targetChannelId}`;
  const response = await fetch(feedUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  if (!response.ok) {
    throw new Error(`YouTube RSS returned status: ${response.status}`);
  }
  const xmlText = await response.text();
  const parsedVideos = parseRSS(xmlText);

  for (const v of parsedVideos) {
    await YouTubeVideo.findOneAndUpdate(
      { videoId: v.videoId },
      {
        $set: {
          title: v.title,
          description: v.description,
          thumbnailUrl: v.thumbnailUrl,
          channelTitle: v.channelTitle,
          publishedAt: v.publishedAt,
          source: 'rss',
        },
      },
      { upsert: true, new: true }
    );
  }

  await YouTubeConfig.findOneAndUpdate(
    {},
    {
      channelId: targetChannelId,
      channelUrl: DEFAULT_CHANNEL_URL,
      lastSyncAt: new Date(),
    },
    { upsert: true }
  );
  console.log(`Synced ${parsedVideos.length} videos from YouTube channel: ${targetChannelId}`);
  return parsedVideos;
};

// @desc    Manually sync videos from YouTube Channel RSS
// @route   POST /api/youtube/sync
// @access  Private (Admin)
export const syncVideos = async (req, res) => {
  try {
    const config = await YouTubeConfig.findOne();
    const rawInput = req.body.channelId || req.body.channelUrl || (config && config.channelId) || DEFAULT_CHANNEL_ID;
    const channelId = await resolveChannelId(rawInput);

    await syncChannelFeed(channelId);
    const updatedVideos = await YouTubeVideo.find().sort({ isPinned: -1, isLive: -1, publishedAt: -1 });

    res.json({
      success: true,
      message: 'YouTube (@Jaigurudevukm) से वीडियो सफलतापूर्वक सिंक हो गए हैं!',
      data: updatedVideos,
    });
  } catch (error) {
    console.error('Manual YouTube sync failed:', error);
    res.status(500).json({
      success: false,
      message: `सिंक करने में त्रुटि: ${error.message || 'चैनल ID की जाँच करें'}`,
    });
  }
};

// @desc    Add manual video (YouTube link or ID)
// @route   POST /api/youtube/add
// @access  Private (Admin)
export const addVideo = async (req, res) => {
  try {
    const { url, title, isLive, isPinned, description } = req.body;
    const videoId = extractVideoId(url);

    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: 'अमान्य YouTube लिंक या Video ID। कृपया वैध लिंक प्रदान करें।',
      });
    }

    let finalTitle = title ? title.trim() : '';

    // Fetch video title via oEmbed if not provided
    if (!finalTitle) {
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          finalTitle = oembedData.title || `सत्संग वीडियो (${videoId})`;
        }
      } catch (e) {
        finalTitle = `सत्संग वीडियो (${videoId})`;
      }
    }

    const video = await YouTubeVideo.findOneAndUpdate(
      { videoId },
      {
        videoId,
        title: finalTitle,
        description: description || 'जय गुरु देव पावन सत्संग एवं प्रवचन',
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        isLive: Boolean(isLive),
        isPinned: Boolean(isPinned),
        source: 'manual',
        publishedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: 'वीडियो सफलतापूर्वक जोड़ दिया गया है!',
      data: video,
    });
  } catch (error) {
    console.error('Add video error:', error);
    res.status(500).json({ success: false, message: 'वीडियो जोड़ने में त्रुटि हुई' });
  }
};

// @desc    Delete a video
// @route   DELETE /api/youtube/:id
// @access  Private (Admin)
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await YouTubeVideo.findOneAndDelete({
      $or: [{ _id: id }, { videoId: id }],
    });
    res.json({ success: true, message: 'वीडियो हटा दिया गया है।' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ success: false, message: 'वीडियो हटाने में त्रुटि हुई' });
  }
};

// @desc    Update YouTube Configuration (Channel ID & URL)
// @route   PUT /api/youtube/config
// @access  Private (Admin)
export const updateConfig = async (req, res) => {
  try {
    let { channelId, channelUrl, autoSync } = req.body;

    if (channelUrl && !channelId) {
      channelId = await resolveChannelId(channelUrl);
    } else if (channelId) {
      channelId = await resolveChannelId(channelId);
    }

    const finalChannelId = (channelId || DEFAULT_CHANNEL_ID).trim();
    const finalChannelUrl = (channelUrl || DEFAULT_CHANNEL_URL).trim();

    const config = await YouTubeConfig.findOneAndUpdate(
      {},
      {
        channelId: finalChannelId,
        channelUrl: finalChannelUrl,
        autoSync: autoSync !== undefined ? Boolean(autoSync) : true,
      },
      { upsert: true, new: true }
    );

    // Auto-trigger background sync upon updating config
    syncChannelFeed(config.channelId).catch((err) =>
      console.error('Background YouTube sync after config update error:', err)
    );

    res.json({
      success: true,
      message: 'YouTube सेटिंग्स सफलतापूर्वक अपडेट हो गई हैं!',
      data: config,
    });
  } catch (error) {
    console.error('Update config error:', error);
    res.status(500).json({ success: false, message: 'सेटिंग्स अपडेट करने में त्रुटि' });
  }
};
