# 🎥 Video Background Troubleshooting

## Current Status

The video background has been implemented but may not be visible due to:
1. **Video URL issues** - External video sources may be blocked
2. **Browser autoplay restrictions** - Some browsers block autoplay
3. **Overlay opacity** - Overlays may be covering the video

## Quick Fixes

### Option 1: Use Your Own Video (Recommended)

1. **Download an India-themed video**:
   - Get a video from Pexels, Pixabay, or Unsplash
   - Format: MP4, 1920x1080 or higher
   - Duration: 10-30 seconds (will loop)

2. **Add to your project**:
   ```bash
   # Create videos directory
   mkdir -p public/videos
   
   # Add your video file
   # Name it: india-background.mp4
   ```

3. **Update the video source** in `components/LandingPage.tsx`:
   ```tsx
   <source
     src="/videos/india-background.mp4"
     type="video/mp4"
   />
   ```

### Option 2: Use YouTube Embed (Alternative)

If you want to use a YouTube video:

```tsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&loop=1&mute=1&controls=0&playlist=YOUR_VIDEO_ID"
  className="absolute inset-0 w-full h-full"
  style={{ pointerEvents: 'none' }}
  allow="autoplay; encrypted-media"
/>
```

### Option 3: Check Browser Console

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Look for video loading errors
4. Check Network tab to see if video is downloading

## Debug Mode

In development mode, you'll see a debug indicator showing:
- ✅ Video Loaded / ⏳ Loading...
- ✅ No Error / ❌ Error

This helps identify if the video is loading properly.

## Current Video Sources

The code tries these sources in order:
1. Google Cloud Storage sample video (test)
2. Sample Videos website
3. Learning Container sample

**These are test videos** - replace with your own India-themed video for best results!

## Making Video More Visible

If video loads but is hard to see:
- Overlay opacity is set to 20-25% (very light)
- You can reduce it further in the code
- Or increase it if text becomes hard to read

## Next Steps

1. **Test the current implementation** - Check browser console
2. **Add your own video** - Use Option 1 above
3. **Adjust overlay** - Make darker/lighter as needed

The video should now be more visible with the lighter overlays! 🎬

