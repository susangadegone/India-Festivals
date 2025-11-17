/**
 * Panchang API Integration Service
 * 
 * Supports multiple Panchang API providers:
 * 1. Drik Panchang (free, web scraping fallback)
 * 2. Divine API (paid, reliable)
 * 3. Vedic Rishi API (paid, reliable)
 * 
 * Usage:
 * - For production: Use paid API (Divine API or Vedic Rishi)
 * - For development: Use Drik Panchang web scraping
 * - Fallback: Use static dates from JSON file
 */

// Festival ID to Panchang name mapping
const FESTIVAL_PANCHANG_MAP: Record<string, string> = {
  'diwali': 'Diwali',
  'holi': 'Holi',
  'ganesh-chaturthi': 'Ganesh Chaturthi',
  'navratri': 'Navratri',
  'gudi-padwa': 'Gudi Padwa',
  'makar-sankranti': 'Makar Sankranti',
  'raksha-bandhan': 'Raksha Bandhan',
  'janmashtami': 'Janmashtami',
  'ram-navami': 'Ram Navami',
  'maha-shivratri': 'Maha Shivratri',
  'karwa-chauth': 'Karwa Chauth',
  'bhai-dooj': 'Bhai Dooj',
  'lohri': 'Lohri',
  'vasant-panchami': 'Vasant Panchami',
  'chhath-puja': 'Chhath Puja',
  'narali-pournima': 'Narali Pournima',
  'pola': 'Pola',
  'bhaubeej': 'Bhaubeej',
  'shiv-jayanti': 'Shiv Jayanti',
  'nag-panchami': 'Nag Panchami',
  'ashadhi-ekadashi': 'Ashadhi Ekadashi',
  'vat-pournima': 'Vat Pournima',
  'bail-pola': 'Bail Pola',
  'lathmar-holi': 'Lathmar Holi',
  'madhushravani': 'Madhushravani',
  'kartik-purnima': 'Kartik Purnima',
  'teej': 'Teej',
  'govardhan-puja': 'Govardhan Puja',
  'shravani-mela': 'Shravani Mela',
};

// API Configuration
interface PanchangAPIConfig {
  provider: 'divine' | 'vedic-rishi' | 'drik-panchang' | 'static';
  apiKey?: string;
  baseUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

// Default location (Mumbai, India)
const DEFAULT_LOCATION = {
  latitude: 19.0760,
  longitude: 72.8777,
  timezone: 'Asia/Kolkata'
};

// API Response Interface
export interface PanchangDateResponse {
  date: string; // YYYY-MM-DD
  festival?: string;
  tithi?: string;
  nakshatra?: string;
  yoga?: string;
  karana?: string;
  paksha?: string;
  month?: string;
  year?: number;
  error?: string;
}

// Cache for API responses (store in localStorage)
const CACHE_KEY = 'panchang_dates_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedDate {
  date: string;
  timestamp: number;
}

/**
 * Get cached dates from localStorage
 */
function getCachedDates(): Record<string, CachedDate> {
  if (typeof window === 'undefined') return {};
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached);
      // Filter out expired cache entries
      const now = Date.now();
      const valid: Record<string, CachedDate> = {};
      for (const [key, value] of Object.entries(data)) {
        const cachedDate = value as CachedDate;
        if (now - cachedDate.timestamp < CACHE_DURATION) {
          valid[key] = cachedDate;
        }
      }
      return valid;
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return {};
}

/**
 * Cache dates in localStorage
 */
function cacheDates(festivalId: string, date: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cached = getCachedDates();
    cached[festivalId] = {
      date,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch (error) {
    console.error('Error caching dates:', error);
  }
}

/**
 * Divine API Integration
 * API: https://divineapi.com/indian-astrology/panchang-api
 */
async function fetchFromDivineAPI(
  festivalName: string,
  year: number,
  config: PanchangAPIConfig
): Promise<PanchangDateResponse | null> {
  if (!config.apiKey) {
    console.warn('Divine API key not provided');
    return null;
  }

  try {
    // Divine API endpoint for finding festivals
    const url = config.baseUrl || 'https://astroapi-1.divineapi.com/indian-api/v1/find-panchang';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        day: 1,
        month: 1,
        year: year,
        hour: 12,
        minute: 0,
        latitude: config.location?.latitude || DEFAULT_LOCATION.latitude,
        longitude: config.location?.longitude || DEFAULT_LOCATION.longitude,
        timezone: config.location?.timezone || DEFAULT_LOCATION.timezone
      })
    });

    if (!response.ok) {
      throw new Error(`Divine API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse response to find festival date
    // Note: Actual response structure depends on Divine API documentation
    if (data.festivals && Array.isArray(data.festivals)) {
      const festival = data.festivals.find((f: any) => 
        f.name.toLowerCase().includes(festivalName.toLowerCase())
      );
      if (festival) {
        return {
          date: festival.date,
          festival: festival.name,
          tithi: festival.tithi,
          nakshatra: festival.nakshatra
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Divine API error:', error);
    return null;
  }
}

/**
 * Vedic Rishi API Integration
 * API: https://www.vedicrishiapi.com/features/panchang-api
 */
async function fetchFromVedicRishiAPI(
  festivalName: string,
  year: number,
  config: PanchangAPIConfig
): Promise<PanchangDateResponse | null> {
  if (!config.apiKey) {
    console.warn('Vedic Rishi API key not provided');
    return null;
  }

  try {
    const url = config.baseUrl || 'https://api.vedicrishiastro.com/v1/panchang';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(config.apiKey + ':')}`
      },
      body: JSON.stringify({
        day: 1,
        month: 1,
        year: year,
        hour: 12,
        minute: 0,
        latitude: config.location?.latitude || DEFAULT_LOCATION.latitude,
        longitude: config.location?.longitude || DEFAULT_LOCATION.longitude,
        timezone: config.location?.timezone || DEFAULT_LOCATION.timezone
      })
    });

    if (!response.ok) {
      throw new Error(`Vedic Rishi API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse response (structure depends on Vedic Rishi API documentation)
    if (data.festivals) {
      const festival = data.festivals.find((f: any) => 
        f.name.toLowerCase().includes(festivalName.toLowerCase())
      );
      if (festival) {
        return {
          date: festival.date,
          festival: festival.name
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Vedic Rishi API error:', error);
    return null;
  }
}

/**
 * Drik Panchang Integration (Web Scraping Fallback)
 * Note: This is a fallback method and may not be reliable for production
 */
async function fetchFromDrikPanchang(
  festivalName: string,
  year: number
): Promise<PanchangDateResponse | null> {
  try {
    // Drik Panchang URL structure
    // This is a simplified example - actual implementation would need to scrape the website
    const url = `https://www.drikpanchang.com/festivals/festivals-${year}.html`;
    
    // Note: Web scraping requires a backend proxy due to CORS restrictions
    // For client-side, we'll use a fallback API endpoint
    const proxyUrl = `/api/panchang-proxy?festival=${encodeURIComponent(festivalName)}&year=${year}`;
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Drik Panchang proxy error');
    }

    const data = await response.json();
    
    if (data.date) {
      return {
        date: data.date,
        festival: data.festival || festivalName
      };
    }

    return null;
  } catch (error) {
    console.error('Drik Panchang error:', error);
    return null;
  }
}

/**
 * Main function to fetch festival date from Panchang API
 */
export async function fetchFestivalDate(
  festivalId: string,
  year: number = new Date().getFullYear(),
  config?: PanchangAPIConfig
): Promise<PanchangDateResponse | null> {
  const festivalName = FESTIVAL_PANCHANG_MAP[festivalId];
  if (!festivalName) {
    console.warn(`Festival ${festivalId} not found in mapping`);
    return null;
  }

  // Check cache first
  const cached = getCachedDates();
  if (cached[festivalId] && cached[festivalId].date) {
    return {
      date: cached[festivalId].date,
      festival: festivalName
    };
  }

  // Default config
  const apiConfig: PanchangAPIConfig = config || {
    provider: process.env.NEXT_PUBLIC_PANCHANG_PROVIDER as any || 'static',
    apiKey: process.env.NEXT_PUBLIC_PANCHANG_API_KEY,
    baseUrl: process.env.NEXT_PUBLIC_PANCHANG_API_URL,
    location: DEFAULT_LOCATION
  };

  let result: PanchangDateResponse | null = null;

  // Try API providers in order
  switch (apiConfig.provider) {
    case 'divine':
      result = await fetchFromDivineAPI(festivalName, year, apiConfig);
      break;
    case 'vedic-rishi':
      result = await fetchFromVedicRishiAPI(festivalName, year, apiConfig);
      break;
    case 'drik-panchang':
      result = await fetchFromDrikPanchang(festivalName, year);
      break;
    case 'static':
    default:
      // Use static dates from JSON (fallback)
      console.log(`Using static date for ${festivalId}`);
      return null;
  }

  // Cache the result
  if (result && result.date) {
    cacheDates(festivalId, result.date);
  }

  return result;
}

/**
 * Fetch multiple festival dates
 */
export async function fetchMultipleFestivalDates(
  festivalIds: string[],
  year: number = new Date().getFullYear(),
  config?: PanchangAPIConfig
): Promise<Record<string, PanchangDateResponse>> {
  const results: Record<string, PanchangDateResponse> = {};
  
  // Fetch dates in parallel (with rate limiting)
  const batchSize = 5;
  for (let i = 0; i < festivalIds.length; i += batchSize) {
    const batch = festivalIds.slice(i, i + batchSize);
    const promises = batch.map(id => 
      fetchFestivalDate(id, year, config).then(result => ({ id, result }))
    );
    
    const batchResults = await Promise.all(promises);
    batchResults.forEach(({ id, result }) => {
      if (result) {
        results[id] = result;
      }
    });
    
    // Rate limiting: wait 1 second between batches
    if (i + batchSize < festivalIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

/**
 * Clear cache
 */
export function clearPanchangCache(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CACHE_KEY);
  }
}

/**
 * Get cache status
 */
export function getCacheStatus(): {
  cachedCount: number;
  cacheSize: number;
  oldestCache: number | null;
} {
  const cached = getCachedDates();
  const timestamps = Object.values(cached).map(c => c.timestamp);
  
  return {
    cachedCount: Object.keys(cached).length,
    cacheSize: JSON.stringify(cached).length,
    oldestCache: timestamps.length > 0 ? Math.min(...timestamps) : null
  };
}

