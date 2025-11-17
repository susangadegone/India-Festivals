# 🕉️ Panchang API Integration Guide

## Overview

This guide explains how to integrate Panchang API for accurate Hindu festival dates in your India Festival Calendar app.

---

## 📋 Table of Contents

1. [What is Panchang API?](#what-is-panchang-api)
2. [API Providers](#api-providers)
3. [Setup Instructions](#setup-instructions)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Troubleshooting](#troubleshooting)

---

## 🔍 What is Panchang API?

Panchang API provides accurate Hindu calendar dates based on:
- **Tithi** (lunar day)
- **Nakshatra** (lunar mansion)
- **Yoga** (auspicious time)
- **Karana** (half of tithi)
- **Paksha** (fortnight - Shukla or Krishna)

This ensures festival dates are calculated accurately according to the Hindu lunar calendar.

---

## 🌐 API Providers

### 1. **Divine API** (Recommended)
- **URL**: https://divineapi.com/indian-astrology/panchang-api
- **Pricing**: 14-day free trial, then paid plans
- **Features**: Comprehensive Panchang data, festival dates
- **Pros**: Reliable, good documentation
- **Cons**: Paid service after trial

### 2. **Vedic Rishi API**
- **URL**: https://www.vedicrishiapi.com/features/panchang-api
- **Pricing**: Paid plans starting at ₹249/month
- **Features**: Multi-language support, regional settings
- **Pros**: Good regional support
- **Cons**: Paid service

### 3. **Drik Panchang** (Free, Fallback)
- **URL**: https://www.drikpanchang.com
- **Pricing**: Free
- **Features**: Web scraping (requires backend)
- **Pros**: Free
- **Cons**: Requires web scraping, may break with site changes

### 4. **Static Dates** (Default)
- **Pricing**: Free
- **Features**: Pre-calculated dates in JSON
- **Pros**: No API needed, fast
- **Cons**: Dates may not be 100% accurate for future years

---

## 🚀 Setup Instructions

### Step 1: Choose an API Provider

1. **For Production (Recommended)**: Use Divine API or Vedic Rishi API
2. **For Development**: Use static dates (default)
3. **For Free Option**: Use Drik Panchang (requires backend scraping)

### Step 2: Get API Key

#### Divine API:
1. Visit https://divineapi.com
2. Sign up for an account
3. Get your API key from the dashboard
4. Choose a subscription plan

#### Vedic Rishi API:
1. Visit https://www.vedicrishiapi.com
2. Sign up for an account
3. Get your API key from the dashboard
4. Choose a subscription plan

### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Panchang API Configuration
NEXT_PUBLIC_PANCHANG_PROVIDER=divine
NEXT_PUBLIC_PANCHANG_API_KEY=your_api_key_here
NEXT_PUBLIC_PANCHANG_API_URL=https://astroapi-1.divineapi.com/indian-api/v1

# Server-side API key (for API routes)
PANCHANG_API_KEY=your_api_key_here

# Location settings (optional, defaults to Mumbai)
NEXT_PUBLIC_PANCHANG_LATITUDE=19.0760
NEXT_PUBLIC_PANCHANG_LONGITUDE=72.8777
NEXT_PUBLIC_PANCHANG_TIMEZONE=Asia/Kolkata
```

### Step 4: Install Dependencies

No additional dependencies needed! The integration uses:
- `fetch` API (built-in)
- `localStorage` (for caching)
- Next.js API routes (for proxy)

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_PANCHANG_PROVIDER` | API provider: `divine`, `vedic-rishi`, `drik-panchang`, or `static` | `static` | No |
| `NEXT_PUBLIC_PANCHANG_API_KEY` | API key (client-side) | - | Yes (if using API) |
| `PANCHANG_API_KEY` | API key (server-side, for API routes) | - | Yes (if using API) |
| `NEXT_PUBLIC_PANCHANG_API_URL` | API base URL | - | No |
| `NEXT_PUBLIC_PANCHANG_LATITUDE` | Location latitude | `19.0760` (Mumbai) | No |
| `NEXT_PUBLIC_PANCHANG_LONGITUDE` | Location longitude | `72.8777` (Mumbai) | No |
| `NEXT_PUBLIC_PANCHANG_TIMEZONE` | Timezone | `Asia/Kolkata` | No |

### Location Settings

Festival dates can vary by location. Configure your location:

```bash
# Mumbai, India
NEXT_PUBLIC_PANCHANG_LATITUDE=19.0760
NEXT_PUBLIC_PANCHANG_LONGITUDE=72.8777
NEXT_PUBLIC_PANCHANG_TIMEZONE=Asia/Kolkata

# Delhi, India
NEXT_PUBLIC_PANCHANG_LATITUDE=28.6139
NEXT_PUBLIC_PANCHANG_LONGITUDE=77.2090
NEXT_PUBLIC_PANCHANG_TIMEZONE=Asia/Kolkata

# New York, USA
NEXT_PUBLIC_PANCHANG_LATITUDE=40.7128
NEXT_PUBLIC_PANCHANG_LONGITUDE=-74.0060
NEXT_PUBLIC_PANCHANG_TIMEZONE=America/New_York
```

---

## 💻 Usage

### 1. Using the Date Sync Component

The `PanchangDateSync` component is available in the Profile page:

1. Go to **Profile** tab
2. Scroll to **Panchang API Date Sync** section
3. Select the year (2025, 2026, or 2027)
4. Click **Sync Dates** to fetch dates from API
5. Review the results and update your festival data

### 2. Programmatic Usage

```typescript
import { fetchFestivalDate, fetchMultipleFestivalDates } from '@/lib/panchang-api'

// Fetch single festival date
const diwaliDate = await fetchFestivalDate('diwali', 2025)

// Fetch multiple festival dates
const festivalIds = ['diwali', 'holi', 'ganesh-chaturthi']
const dates = await fetchMultipleFestivalDates(festivalIds, 2025)
```

### 3. Cache Management

Dates are cached for 24 hours to reduce API calls:

```typescript
import { clearPanchangCache, getCacheStatus } from '@/lib/panchang-api'

// Clear cache
clearPanchangCache()

// Get cache status
const status = getCacheStatus()
console.log(`Cached: ${status.cachedCount} festivals`)
```

---

## 🔧 API Proxy Route

The app includes an API proxy route at `/api/panchang-proxy` to:
1. Hide API keys from client-side code
2. Handle CORS restrictions
3. Implement rate limiting
4. Cache responses

### Usage

```typescript
// GET request
const response = await fetch('/api/panchang-proxy?festival=Diwali&year=2025')

// POST request (for Divine API)
const response = await fetch('/api/panchang-proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    festival: 'Diwali',
    year: 2025,
    provider: 'divine'
  })
})
```

---

## 🎯 Festival Mapping

The app maps festival IDs to Panchang names:

| Festival ID | Panchang Name |
|-------------|---------------|
| `diwali` | Diwali |
| `holi` | Holi |
| `ganesh-chaturthi` | Ganesh Chaturthi |
| `navratri` | Navratri |
| `gudi-padwa` | Gudi Padwa |
| ... | ... |

See `lib/panchang-api.ts` for complete mapping.

---

## 📊 Cache System

### Cache Duration
- **24 hours** - Dates are cached for 24 hours
- **localStorage** - Cached in browser localStorage
- **Automatic** - Cache is automatically cleared when expired

### Cache Keys
- Format: `panchang_dates_cache`
- Structure: `{ festivalId: { date: string, timestamp: number } }`

### Clearing Cache
1. Use the **Clear Cache** button in Profile page
2. Or programmatically: `clearPanchangCache()`

---

## 🐛 Troubleshooting

### Issue: API Not Working

**Solution:**
1. Check API key is correct
2. Verify API provider is set correctly
3. Check API quota/limits
4. Review browser console for errors

### Issue: Dates Not Updating

**Solution:**
1. Clear cache: Click **Clear Cache** button
2. Check API response in browser console
3. Verify festival ID is in mapping
4. Check API provider documentation

### Issue: CORS Error

**Solution:**
1. Use API proxy route (`/api/panchang-proxy`)
2. Ensure API key is in server-side env variable
3. Check Next.js API route is working

### Issue: Rate Limiting

**Solution:**
1. Reduce API calls (use cache)
2. Implement rate limiting in API proxy
3. Use batch requests for multiple festivals
4. Consider upgrading API plan

---

## 📝 Example: Divine API Integration

### 1. Get API Key
- Sign up at https://divineapi.com
- Get API key from dashboard

### 2. Configure Environment
```bash
NEXT_PUBLIC_PANCHANG_PROVIDER=divine
NEXT_PUBLIC_PANCHANG_API_KEY=your_divine_api_key
PANCHANG_API_KEY=your_divine_api_key
```

### 3. Test API
```typescript
import { fetchFestivalDate } from '@/lib/panchang-api'

const result = await fetchFestivalDate('diwali', 2025)
console.log(result.date) // 2025-10-20
```

### 4. Update Festival Data
Use the `PanchangDateSync` component to update festival dates in your JSON file.

---

## 🔒 Security Best Practices

1. **Never expose API keys in client-side code**
   - Use `PANCHANG_API_KEY` (server-side) for API routes
   - Use `NEXT_PUBLIC_PANCHANG_API_KEY` only if necessary

2. **Use API proxy route**
   - Hide API keys from browser
   - Implement rate limiting
   - Cache responses

3. **Validate API responses**
   - Check for errors
   - Validate date formats
   - Handle API failures gracefully

4. **Monitor API usage**
   - Track API calls
   - Set up alerts for quota limits
   - Implement caching to reduce calls

---

## 📚 Additional Resources

- **Divine API Docs**: https://support.divineapi.com
- **Vedic Rishi API Docs**: https://www.vedicrishiapi.com/docs
- **Drik Panchang**: https://www.drikpanchang.com
- **Hindu Calendar**: https://www.drikpanchang.com/calendar

---

## 🎉 Next Steps

1. **Choose an API provider** (Divine API recommended)
2. **Get API key** and configure environment variables
3. **Test the integration** using the Date Sync component
4. **Update festival dates** in your JSON file
5. **Monitor API usage** and implement caching

---

## 💡 Tips

- **Use caching** to reduce API calls and costs
- **Batch requests** for multiple festivals
- **Handle errors gracefully** with fallback to static dates
- **Monitor API usage** to avoid quota limits
- **Update dates annually** for accuracy

---

## ❓ FAQ

### Q: Do I need an API key?
**A:** Yes, for production use. For development, you can use static dates.

### Q: Which API provider is best?
**A:** Divine API is recommended for reliability and features.

### Q: How often should I sync dates?
**A:** Once a year, or when festival dates change.

### Q: Can I use this for free?
**A:** Drik Panchang is free but requires web scraping. Paid APIs offer better reliability.

### Q: What happens if API fails?
**A:** The app falls back to static dates from JSON file.

---

## 🎊 Conclusion

Panchang API integration ensures accurate festival dates based on the Hindu lunar calendar. Follow this guide to set up and use the integration in your app.

**Happy coding!** 🪔✨

