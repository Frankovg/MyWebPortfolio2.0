export const HOME_CACHE_CONFIG = {
  // Static assets & images (served from CDN)
  STATIC_ASSETS_MAX_AGE: 31536000, // 1 year
  IMAGES_MAX_AGE: 86400, // 24 hours - Your CDN serves these
} as const;

