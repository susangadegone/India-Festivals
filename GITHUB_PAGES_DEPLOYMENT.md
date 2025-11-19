# 🚀 GitHub Pages Deployment Guide

## Quick Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. Save the settings

### Step 2: Push Your Code

The GitHub Actions workflow will automatically deploy when you push to `main`:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Step 3: Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. Watch the workflow run (takes ~2-3 minutes)
3. Once complete, your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/Hindu-Marati-Festivals-App-1/
   ```

## Manual Deployment (Alternative)

If you prefer to deploy manually:

```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# You can commit and push the 'out' folder to the 'gh-pages' branch
```

## Current Configuration

- **Base Path**: `/Hindu-Marati-Festivals-App-1`
- **Output**: Static export (`out` folder)
- **Build Command**: `npm run build`
- **Deploy**: Automatic via GitHub Actions

## Troubleshooting

### Build Fails

1. Check the **Actions** tab for error messages
2. Make sure all dependencies are in `package.json`
3. Run `npm run build` locally to test

### Site Not Loading

1. Check the repository name matches the `basePath` in `next.config.js`
2. Make sure GitHub Pages is enabled in Settings
3. Wait a few minutes for DNS to propagate

### Images Not Showing

- Unsplash images should work (already configured)
- Make sure `crossOrigin="anonymous"` is on all image tags (already done)

## Environment Variables

If you need environment variables for the build:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets like `NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL`
3. They'll be available during the build

## Notes

- The site is a **static export** - no server-side features
- API routes won't work (they're excluded from static export)
- All pages are pre-rendered at build time
- Video files in `public/videos/` will be included

## Your Site URL

Once deployed, your site will be available at:
```
https://YOUR_USERNAME.github.io/Hindu-Marati-Festivals-App-1/
```

Replace `YOUR_USERNAME` with your GitHub username.

