export function getYoutubeThumbnail(url) {
  if (!url) return null;
  // Regex to extract video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    // return high quality thumbnail
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}
