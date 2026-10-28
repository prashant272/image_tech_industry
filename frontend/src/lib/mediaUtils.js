/**
 * Media utility functions for detecting and handling images vs videos
 */

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.ogv', '.mkv'];

/**
 * Checks if a given URL is a video (file or embed like YouTube/Vimeo)
 */
export const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  if (clean.startsWith('data:video/')) return true;
  
  // Strip query strings and hashes for extension check
  const pathOnly = clean.split('?')[0].split('#')[0];
  if (VIDEO_EXTENSIONS.some(ext => pathOnly.endsWith(ext))) {
    return true;
  }

  // Check for common video hosts
  if (
    clean.includes('youtube.com/') || 
    clean.includes('youtu.be/') || 
    clean.includes('vimeo.com/') ||
    clean.includes('player.vimeo.com/')
  ) {
    return true;
  }

  return false;
};

/**
 * Checks if a given video URL is a YouTube/Vimeo embed
 */
export const isEmbedVideo = (url) => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.trim().toLowerCase();
  return (
    clean.includes('youtube.com') ||
    clean.includes('youtu.be') ||
    clean.includes('vimeo.com')
  );
};

/**
 * Converts YouTube/Vimeo link into an embeddable iframe URL
 */
export const getEmbedUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // YouTube match
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i
  );
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
    const id = vimeoMatch[3] || vimeoMatch[1];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }

  return trimmed;
};

/**
 * Finds the first valid non-video image URL from a list of media URLs
 */
export const getFirstImageUrl = (mediaList = [], fallback = '') => {
  if (!Array.isArray(mediaList) || mediaList.length === 0) return fallback;
  const img = mediaList.find(item => item && typeof item === 'string' && item.trim() !== '' && !isVideoUrl(item));
  return img || mediaList[0] || fallback;
};

/**
 * Checks if any item in the media array is a video
 */
export const hasVideoMedia = (mediaList = []) => {
  if (!Array.isArray(mediaList)) return false;
  return mediaList.some(item => isVideoUrl(item));
};
