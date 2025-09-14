export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error('Error validating URL:', error);
    return false;
  }
};

export const generateAvatarPlaceholder = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=80&background=3B82F6&color=FFFFFF&bold=true`;
};

export const generateAvatarSVG = (name: string): string => {
  const initial = name.charAt(0).toUpperCase();
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" fill="#7345fc"/>
      <text x="40" y="50" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">${initial}</text>
    </svg>
  `)}`;
};

export const formatDate = (dateString: string, locale: string = 'en-US'): string => {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getAvatarUrl = (avatar: string | Record<string, never>, name: string): string => {
  if (typeof avatar === 'string' && avatar.trim() !== '') {
    return avatar;
  }
  return generateAvatarSVG(name);
};
