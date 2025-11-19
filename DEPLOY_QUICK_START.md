# ⚡ Quick Deploy to GitHub Pages

## 3 Simple Steps

### 1️⃣ Enable GitHub Pages

1. Go to: `https://github.com/YOUR_USERNAME/Hindu-Marati-Festivals-App-1/settings/pages`
2. Under **Source**, select: **GitHub Actions**
3. Click **Save**

### 2️⃣ Push to GitHub

```bash
git add .
git commit -m "Ready for GitHub Pages"
git push origin main
```

### 3️⃣ Wait & Done! 🎉

1. Go to **Actions** tab in your repo
2. Watch the deployment (takes 2-3 minutes)
3. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/Hindu-Marati-Festivals-App-1/
   ```

## ✅ What's Already Set Up

- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Next.js static export configuration
- ✅ Base path configured for GitHub Pages
- ✅ Build tested and working
- ✅ All images configured with CORS

## 🔧 If Something Goes Wrong

**Build fails?**
- Check the **Actions** tab for errors
- Run `npm run build` locally to test

**Site not loading?**
- Make sure repository name is exactly: `Hindu-Marati-Festivals-App-1`
- Check that GitHub Pages is enabled
- Wait a few minutes for deployment

**Need to test locally?**
```bash
npm run build
npx serve out
# Then visit http://localhost:3000/Hindu-Marati-Festivals-App-1/
```

## 📝 Notes

- The workflow automatically deploys on every push to `main`
- Your video file in `public/videos/` will be included
- All Unsplash images are configured and will work
- The site is fully static (no server needed)

---

**That's it! Just push and your site will be live! 🚀**

