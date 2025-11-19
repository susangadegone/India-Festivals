# 🎥 How to Find a Working India Video for Your Landing Page

## Best Options (Free & Reliable)

### Option 1: Pexels Videos (Recommended) ⭐

**Step 1: Find a Video**
1. Go to https://www.pexels.com/videos/
2. Search for: "India", "Indian culture", "festival", "temple", "diwali", "holi"
3. Filter by: Free, HD quality

**Step 2: Download the Video**
1. Click on a video you like
2. Click "Download" button
3. Choose "HD" or "Full HD" quality
4. Save as `india-background.mp4`

**Step 3: Add to Your Project**
```bash
# Create videos folder
mkdir -p public/videos

# Move your downloaded video there
# Rename it to: india-background.mp4
```

**Step 4: Update Code**
In `components/LandingPage.tsx`, replace the video sources with:
```tsx
<source
  src="/videos/india-background.mp4"
  type="video/mp4"
/>
```

---

### Option 2: Pixabay Videos (Free)

1. Go to https://pixabay.com/videos/
2. Search: "India", "Indian festival", "temple"
3. Download the video
4. Add to `public/videos/` folder
5. Update code as above

---

### Option 3: Unsplash Videos (Free)

1. Go to https://unsplash.com/videos
2. Search for India-related videos
3. Download and add to your project

---

### Option 4: Use YouTube Video (No Download Needed)

**Find a YouTube Video:**
1. Search YouTube for: "India cultural video", "Indian festivals", "India travel"
2. Find a video you like (make sure it's not copyrighted)
3. Get the video ID from the URL (e.g., `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`)

**Update Code:**
Replace the video element with:
```tsx
<iframe
  src={`https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&loop=1&mute=1&controls=0&playlist=YOUR_VIDEO_ID&start=0&end=30`}
  className="absolute inset-0 w-full h-full"
  style={{ 
    pointerEvents: 'none',
    objectFit: 'cover'
  }}
  allow="autoplay; encrypted-media"
  frameBorder="0"
/>
```

**Note:** Replace `YOUR_VIDEO_ID` with the actual video ID.

---

### Option 5: Create Your Own Video

If you have video editing skills:
1. Use free tools like DaVinci Resolve or Shotcut
2. Combine India-themed clips
3. Export as MP4 (H.264 codec)
4. Keep it under 10MB for fast loading
5. Add to `public/videos/`

---

## Quick Setup Script

I can create a script to help you set this up. Here's what you need to do:

### Manual Steps:

1. **Download a video** from one of the sites above
2. **Create the folder:**
   ```bash
   mkdir -p public/videos
   ```
3. **Move your video file:**
   ```bash
   # Move your downloaded video to:
   public/videos/india-background.mp4
   ```
4. **The code is already set up** - just needs the file!

---

## Recommended Video Specs

For best performance:
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration:** 10-30 seconds (will loop)
- **File Size:** Under 10MB (for fast loading)
- **Frame Rate:** 24-30 fps

---

## Test Your Video

After adding your video:

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open the landing page** - video should play automatically

3. **Check browser console** (F12) for any errors

4. **Look for debug indicator** (top-left) showing video status

---

## Troubleshooting

**Video not playing?**
- Check file path: Should be `/videos/india-background.mp4`
- Check file format: Must be MP4
- Check browser console for errors
- Try a different video file

**Video too large?**
- Compress it using: https://www.freeconvert.com/video-compressor
- Or use HandBrake (free video converter)

**Want to test first?**
- The current test videos should work
- Once you see them playing, replace with your India video

---

## My Recommendation

**Best approach:**
1. Go to **Pexels.com/videos**
2. Search "India culture" or "Indian festival"
3. Download a 10-20 second clip
4. Add to `public/videos/india-background.mp4`
5. Done! ✅

The code is already set up - you just need to add the video file!

