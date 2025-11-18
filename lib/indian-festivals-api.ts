/**
 * Indian Festivals API Integration
 * Connects to Python backend service using indian_festivals package
 */

const INDIAN_FESTIVALS_API_URL = 
  process.env.NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL || 
  'http://localhost:5000';

export interface IndianFestival {
  name: string;
  date: string; // Day of month (1-31)
  day: string; // Day of week (Monday, Tuesday, etc.)
  month?: string; // Month name (January, February, etc.)
  full_date?: string; // Full date in YYYY-MM-DD format
  [key: string]: any; // For additional fields from the API
}

export interface FestivalResponse {
  success: boolean;
  festivals?: IndianFestival[];
  festival?: IndianFestival;
  year?: string;
  month?: string;
  date?: string;
  query?: string;
  count?: number;
  error?: string;
}

/**
 * Get all festivals for a specific year
 */
export async function getFestivalsByYear(year: number): Promise<IndianFestival[]> {
  try {
    const response = await fetch(`${INDIAN_FESTIVALS_API_URL}/api/festivals/year/${year}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to fetch festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error fetching festivals by year:', error);
    throw error;
  }
}

/**
 * Get festivals for a specific month and year
 */
export async function getFestivalsByMonth(
  year: number, 
  month: number
): Promise<IndianFestival[]> {
  try {
    const response = await fetch(
      `${INDIAN_FESTIVALS_API_URL}/api/festivals/month?year=${year}&month=${month}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to fetch festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error fetching festivals by month:', error);
    throw error;
  }
}

/**
 * Get festivals for a specific date
 */
export async function getFestivalsByDate(date: string): Promise<IndianFestival[]> {
  try {
    const response = await fetch(
      `${INDIAN_FESTIVALS_API_URL}/api/festivals/date/${date}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to fetch festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error fetching festivals by date:', error);
    throw error;
  }
}

/**
 * Search festivals by name
 */
export async function searchFestivals(
  query: string, 
  year: number = new Date().getFullYear()
): Promise<IndianFestival[]> {
  try {
    const response = await fetch(
      `${INDIAN_FESTIVALS_API_URL}/api/festivals/search?year=${year}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to search festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error searching festivals:', error);
    throw error;
  }
}

/**
 * Get all religious festivals for a specific year
 */
export async function getReligiousFestivalsByYear(year: number): Promise<IndianFestival[]> {
  try {
    const response = await fetch(`${INDIAN_FESTIVALS_API_URL}/api/festivals/religious/year/${year}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to fetch religious festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error fetching religious festivals by year:', error);
    throw error;
  }
}

/**
 * Get religious festivals for a specific month and year
 */
export async function getReligiousFestivalsByMonth(
  year: number, 
  month: number
): Promise<IndianFestival[]> {
  try {
    const response = await fetch(
      `${INDIAN_FESTIVALS_API_URL}/api/festivals/religious/month?year=${year}&month=${month}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data: FestivalResponse = await response.json();
    
    if (!data.success || !data.festivals) {
      throw new Error(data.error || 'Failed to fetch religious festivals');
    }
    
    return data.festivals;
  } catch (error) {
    console.error('Error fetching religious festivals by month:', error);
    throw error;
  }
}

/**
 * Health check for the API
 */
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${INDIAN_FESTIVALS_API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}

