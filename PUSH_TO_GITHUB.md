# 🔐 Push to GitHub - Authentication Fix

## The Issue

GitHub is blocking the push because the workflow file needs special permissions. Here's how to fix it:

## Option 1: Use GitHub CLI (Easiest) ⭐

```bash
# Install GitHub CLI if you don't have it
brew install gh

# Authenticate
gh auth login

# Then push
git push origin main
```

## Option 2: Use Personal Access Token

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click **Generate new token** → **Generate new token (classic)**
   - Name it: `GitHub Pages Deploy`
   - Select scopes:
     - ✅ `repo` (full control)
     - ✅ `workflow` (update GitHub Action workflows)
   - Click **Generate token**
   - **Copy the token** (you won't see it again!)

2. **Use the token to push:**
   ```bash
   # Replace YOUR_TOKEN with your actual token
   git push https://YOUR_TOKEN@github.com/jaxxat1300/Hindu-Marati-Festivals-App-1.git main
   ```

   Or update your remote:
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/jaxxat1300/Hindu-Marati-Festivals-App-1.git
   git push origin main
   ```

## Option 3: Push Without Workflow First

If you want to push everything except the workflow file first:

```bash
# Remove workflow from staging
git reset HEAD .github/workflows/deploy.yml

# Push everything else
git push origin main

# Then manually add the workflow file via GitHub web interface
# Or use GitHub CLI/Personal Access Token to push it later
```

## Option 4: Manual Workflow Setup

1. Push everything except the workflow:
   ```bash
   git reset HEAD .github/workflows/deploy.yml
   git push origin main
   ```

2. Create the workflow file manually on GitHub:
   - Go to: https://github.com/jaxxat1300/Hindu-Marati-Festivals-App-1
   - Click **Add file** → **Create new file**
   - Path: `.github/workflows/deploy.yml`
   - Copy the contents from `.github/workflows/deploy.yml` in your project
   - Click **Commit new file**

## Recommended: Use GitHub CLI

The easiest way is to use GitHub CLI:

```bash
# Install (if needed)
brew install gh

# Login
gh auth login

# Push
git push origin main
```

This will handle authentication automatically with the right permissions!

