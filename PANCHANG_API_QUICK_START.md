# 🚀 Panchang API Integration - Quick Start

## ✅ What's Been Implemented

### 1. **Panchang API Service** (`lib/panchang-api.ts`)
- ✅ Support for multiple API providers (Divine API, Vedic Rishi, Drik Panchang)
- ✅ Automatic caching (24-hour cache in localStorage)
- ✅ Batch date fetching for multiple festivals
- ✅ Error handling with fallback to static dates
- ✅ Cache management utilities

### 2. **API Proxy Route** (`app/api/panchang-proxy/route.ts`)
- ✅ Server-side API proxy to hide API keys
- ✅ CORS handling
- ✅ Support for GET and POST requests
- ✅ Error handling

### 3. **Date Sync Component** (`components/PanchangDateSync.tsx`)
- ✅ UI for syncing festival dates from API
- ✅ Year selection (2025, 2026, 2027)
- ✅ Real-time sync status
- ✅ Cache status display
- ✅ Results display (success/error/unchanged)

### 4. **Integration**
- ✅ Added to Profile page
- ✅ Environment variable configuration
- ✅ Documentation

---

## 🎯 Quick Setup (3 Steps)

### Step 1: Choose API Provider

**Option A: Divine API (Recommended)**
1. Sign up at https://divineapi.com
2. Get API key from dashboard
3. Choose subscription plan

**Option B: Use Static Dates (Default)**
- No setup needed
- Uses pre-calculated dates from JSON
- Works out of the box

### Step 2: Configure Environment Variables

Create `.env.local` file:

```bash
# For Divine API
NEXT_PUBLIC_PANCHANG_PROVIDER=divine
NEXT_PUBLIC_PANCHANG_API_KEY=your_api_key_here
PANCHANG_API_KEY=your_api_key_here

# For Static Dates (Default)
NEXT_PUBLIC_PANCHANG_PROVIDER=static
```

### Step 3: Use the Date Sync Component

1. Go to **Profile** tab
2. Scroll to **Panchang API Date Sync** section
3. Select year (2025, 2026, or 2027)
4. Click **Sync Dates**
5. Review results and update festival data

---

## 📝 Usage Examples

### Fetch Single Festival Date

```typescript
import { fetchFestivalDate } from '@/lib/panchang-api'

const result = await fetchFestivalDate('diwali', 2025)
console.log(result.date) // "2025-10-20"
```

### Fetch Multiple Festival Dates

```typescript
import { fetchMultipleFestivalDates } from '@/lib/panchang-api'

const festivalIds = ['diwali', 'holi', 'ganesh-chaturthi']
const dates = await fetchMultipleFestivalDates(festivalIds, 2025)
console.log(dates.diwali.date) // "2025-10-20"
```

### Clear Cache

```typescript
import { clearPanchangCache } from '@/lib/panchang-api'

clearPanchangCache()
```

### Get Cache Status

```typescript
import { getCacheStatus } from '@/lib/panchang-api'

const status = getCacheStatus()
console.log(`Cached: ${status.cachedCount} festivals`)
```

---

## 🔧 API Providers

### 1. Divine API
- **URL**: https://divineapi.com
- **Pricing**: 14-day free trial, then paid
- **Pros**: Reliable, good documentation
- **Setup**: Get API key from dashboard

### 2. Vedic Rishi API
- **URL**: https://www.vedicrishiapi.com
- **Pricing**: Paid plans starting at ₹249/month
- **Pros**: Multi-language support
- **Setup**: Get API key from dashboard

### 3. Drik Panchang (Free)
- **URL**: https://www.drikpanchang.com
- **Pricing**: Free
- **Pros**: Free
- **Cons**: Requires web scraping (backend needed)

### 4. Static Dates (Default)
- **Pricing**: Free
- **Pros**: No API needed, fast
- **Cons**: Dates may not be 100% accurate

---

## 🎨 UI Components

### PanchangDateSync Component

Located in **Profile** page:

- **Year Selector**: Choose 2025, 2026, or 2027
- **Sync Button**: Fetch dates from API
- **Cache Status**: Shows cached festivals count
- **Results Display**: Shows success/error/unchanged status
- **Clear Cache**: Button to clear cache

### Features:
- ✅ Real-time sync status
- ✅ Batch date fetching
- ✅ Error handling
- ✅ Cache management
- ✅ Results display

---

## 🔒 Security

### Best Practices:
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

---

## 📊 Cache System

### Cache Duration
- **24 hours** - Dates are cached for 24 hours
- **localStorage** - Cached in browser localStorage
- **Automatic** - Cache is automatically cleared when expired

### Cache Management
- **Clear Cache**: Use "Clear Cache" button or `clearPanchangCache()`
- **Cache Status**: View in Date Sync component
- **Auto-Refresh**: Cache expires after 24 hours

---

## 🐛 Troubleshooting

### API Not Working?
1. Check API key is correct
2. Verify API provider is set correctly
3. Check API quota/limits
4. Review browser console for errors

### Dates Not Updating?
1. Clear cache: Click "Clear Cache" button
2. Check API response in browser console
3. Verify festival ID is in mapping
4. Check API provider documentation

### CORS Error?
1. Use API proxy route (`/api/panchang-proxy`)
2. Ensure API key is in server-side env variable
3. Check Next.js API route is working

---

## 📚 Documentation

- **Full Guide**: See `PANCHANG_API_SETUP.md`
- **API Service**: See `lib/panchang-api.ts`
- **API Proxy**: See `app/api/panchang-proxy/route.ts`
- **Date Sync Component**: See `components/PanchangDateSync.tsx`

---

## 🎉 Next Steps

1. **Choose API provider** (Divine API recommended)
2. **Get API key** and configure environment variables
3. **Test integration** using Date Sync component
4. **Update festival dates** in JSON file
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

## 🎊 Summary

✅ **Panchang API integration is complete!**
✅ **Multiple API providers supported**
✅ **Automatic caching implemented**
✅ **UI component for date syncing**
✅ **Error handling with fallback**
✅ **Documentation provided**

**Your app is ready to use accurate Panchang dates!** 🪔✨

---

## 📞 Support

For issues or questions:
1. Check `PANCHANG_API_SETUP.md` for detailed guide
2. Review API provider documentation
3. Check browser console for errors
4. Verify environment variables are set correctly

**Happy coding!** 🚀

