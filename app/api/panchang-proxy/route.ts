/**
 * Panchang API Proxy Route
 * 
 * This is a Next.js API route that acts as a proxy for Panchang APIs.
 * It's needed because:
 * 1. CORS restrictions prevent direct API calls from browser
 * 2. API keys should be kept secret on the server
 * 3. Rate limiting can be handled server-side
 * 
 * Usage:
 * GET /api/panchang-proxy?festival=Diwali&year=2025
 */

import { NextRequest, NextResponse } from 'next/server';

// Festival name to Drik Panchang mapping
const FESTIVAL_DRIK_MAP: Record<string, string> = {
  'Diwali': 'diwali',
  'Holi': 'holi',
  'Ganesh Chaturthi': 'ganesh-chaturthi',
  'Navratri': 'navratri',
  'Gudi Padwa': 'gudi-padwa',
  'Makar Sankranti': 'makar-sankranti',
  'Raksha Bandhan': 'raksha-bandhan',
  'Janmashtami': 'janmashtami',
  'Ram Navami': 'ram-navami',
  'Maha Shivratri': 'maha-shivratri',
  'Karwa Chauth': 'karva-chauth',
  'Bhai Dooj': 'bhai-dooj',
  'Lohri': 'lohri',
  'Vasant Panchami': 'vasant-panchami',
  'Chhath Puja': 'chhath',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const festival = searchParams.get('festival');
  const year = searchParams.get('year') || new Date().getFullYear().toString();

  if (!festival) {
    return NextResponse.json(
      { error: 'Festival name is required' },
      { status: 400 }
    );
  }

  try {
    // Option 1: Use Drik Panchang (free, but requires web scraping)
    // Note: This is a simplified example. In production, you'd need to:
    // 1. Scrape Drik Panchang website
    // 2. Or use their API if available
    // 3. Or use a paid API service
    
    // For now, return a fallback response
    // In production, implement actual scraping or API call here
    
    const drikName = FESTIVAL_DRIK_MAP[festival] || festival.toLowerCase().replace(/\s+/g, '-');
    const drikUrl = `https://www.drikpanchang.com/festivals/${drikName}/${drikName}-date-time-${year}.html`;
    
    // Attempt to fetch from Drik Panchang
    // Note: This will fail due to CORS, so you'd need a server-side scraper
    // For now, return a mock response
    return NextResponse.json({
      festival: festival,
      year: parseInt(year),
      date: null, // Would be populated by actual scraping
      source: 'drik-panchang',
      note: 'This is a placeholder. Implement actual scraping or use a paid API.'
    });

  } catch (error) {
    console.error('Panchang proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Panchang data' },
      { status: 500 }
    );
  }
}

// Alternative: Use Divine API or Vedic Rishi API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { festival, year, provider = 'divine' } = body;

    if (!festival || !year) {
      return NextResponse.json(
        { error: 'Festival and year are required' },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.PANCHANG_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Call the appropriate API
    if (provider === 'divine') {
      const response = await fetch('https://astroapi-1.divineapi.com/indian-api/v1/find-panchang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          day: 1,
          month: 1,
          year: parseInt(year),
          hour: 12,
          minute: 0,
          latitude: 19.0760, // Mumbai
          longitude: 72.8777,
          timezone: 'Asia/Kolkata'
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Add other providers here (Vedic Rishi, etc.)

    return NextResponse.json(
      { error: 'Unsupported provider' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Panchang API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Panchang data' },
      { status: 500 }
    );
  }
}

