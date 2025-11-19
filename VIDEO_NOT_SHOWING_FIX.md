# 🎥 Video Not Showing - Troubleshooting

## Quick Checks

### 1. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab**: Look for video errors
- **Network tab**: Check if `/Hindu-Marati-Festivals-App-1/videos/puja-candles-offerings.mov` is loading (status 200 = good, 404 = file missing)

### 2. Check Video File
The video file should be at:
```
https://jaxxat1300.github.io/Hindu-Marati-Festivals-App-1/videos/puja-candles-offerings.mov
```

Try opening this URL directly in your browser. If it downloads or plays, the file is there!

### 3. Browser Compatibility
**.mov files may not work in:**
- Chrome (sometimes)
- Firefox (sometimes)
- Edge (sometimes)

**They work better in:**
- Safari (Mac/iOS)
- Some mobile browsers

## Solution: Convert to MP4

The best fix is to convert the video to MP4 format:

### Option 1: Online Converter
1. Go to: https://www.freeconvert.com/mov-to-mp4
2. Upload: `public/videos/puja-candles-offerings.mov`
3. Download as MP4
4. Save as: `public/videos/puja-candles-offerings.mp4`
5. Commit and push

### Option 2: QuickTime (Mac)
1. Open `puja-candles-offerings.mov` in QuickTime
2. File → Export As → Video
3. Choose "1080p"
4. Save as: `puja-candles-offerings.mp4` in `public/videos/`

### Option 3: Command Line (if you have ffmpeg)
```bash
cd public/videos
ffmpeg -i puja-candles-offerings.mov -c:v libx264 -c:a aac -b:a 192k puja-candles-offerings.mp4
```

## After Converting

1. The code will automatically use the MP4 file (it tries MP4 first)
2. MP4 works in ALL browsers
3. Better performance and compatibility

## Current Status

- ✅ Video file exists: `puja-candles-offerings.mov` (3.1MB)
- ✅ Code is configured correctly
- ⚠️ `.mov` format may not work in all browsers
- 💡 **Solution**: Convert to MP4 for universal browser support

## Test the Video URL

Try this URL directly in your browser:
```
https://jaxxat1300.github.io/Hindu-Marati-Festivals-App-1/videos/puja-candles-offerings.mov
```

If it doesn't play, the file might not be deployed yet, or `.mov` isn't supported in your browser.

---

**Best solution: Convert to MP4!** 🎬

