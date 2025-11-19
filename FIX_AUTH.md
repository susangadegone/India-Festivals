# 🔧 Fix GitHub Authentication

## Quick Fix - Run These Commands

### Option 1: Refresh GitHub CLI Auth (Recommended)

Run this in your terminal:

```bash
gh auth refresh -h github.com -s workflow
```

This will open a browser window. Follow the prompts to authorize the `workflow` scope.

Then push:
```bash
git push origin main
```

### Option 2: Re-authenticate with Full Permissions

```bash
gh auth login --hostname github.com --scopes repo,workflow
```

Then push:
```bash
git push origin main
```

### Option 3: Push Without Workflow First

If the above doesn't work, we can push everything else first:

```bash
# Temporarily remove workflow from git
git rm --cached .github/workflows/deploy.yml

# Push everything else
git commit -m "Push changes (workflow will be added separately)"
git push origin main

# Then manually create the workflow file on GitHub web interface
```

---

**Try Option 1 first - it's the easiest!**

Run: `gh auth refresh -h github.com -s workflow`

