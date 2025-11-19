# 📥 How to Download Pexels Video

## Your Video
**Video:** Women Holding Lighted Candles by Yan Krukau  
**Link:** https://www.pexels.com/video/women-holding-lighted-candles-8811204/

## Download Steps

### Option 1: Direct Download (Easiest)

1. **Visit the video page:**
   https://www.pexels.com/video/women-holding-lighted-candles-8811204/

2. **Click the "Free Download" button** (usually in the top right or below the video)

3. **Choose quality:**
   - HD (1920x1080) - Recommended
   - Or Full HD if available

4. **Save the file** to: `public/videos/india-background.mp4`

### Option 2: Using Browser Developer Tools

1. Open the Pexels video page
2. Open browser DevTools (F12)
3. Go to Network tab
4. Play the video
5. Look for `.mp4` file in the network requests
6. Right-click → "Open in new tab"
7. Save the video file

### Option 3: Command Line (if you have the direct URL)

```bash
cd public/videos
curl -L "PEXELS_VIDEO_URL" -o india-background.mp4
```

## After Downloading

1. **Place the file here:**
   ```
   public/videos/india-background.mp4
   ```

2. **Restart your dev server:**
   ```bash
   npm run dev
   ```

3. **The video should play automatically!** 🎬

## File Location

Your video should be at:
```
/Users/iamcoolsuz/Desktop/Apps Cursor/Hindu Marati Festivals App 1/public/videos/india-background.mp4
```

## Note

The code is already set up to:
- ✅ Try the Pexels URL first (may not work due to CORS)
- ✅ Fall back to your local file: `/videos/india-background.mp4`
- ✅ Support `.mov` format if you prefer

**Best approach:** Download the video and save it locally for reliable playback!

