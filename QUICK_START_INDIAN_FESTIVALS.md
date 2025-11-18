# 🚀 Quick Start: Indian Festivals API

## Step-by-Step Setup (3 Steps)

### Step 1: Start the Python Backend

Open a terminal and run:

```bash
cd backend
source venv/bin/activate
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
```

**Keep this terminal open!** The backend needs to stay running.

---

### Step 2: Add Environment Variable

Create or edit `.env.local` in your project root:

```bash
# Add this line to .env.local
NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL=http://localhost:5000
```

**Note:** If you already have `.env.local`, just add this line to it.

---

### Step 3: Test It Works

Open another terminal and test:

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test getting festivals for 2025
curl http://localhost:5000/api/festivals/year/2025
```

Or use it in your Next.js app:

```typescript
import { getFestivalsByYear } from '@/lib/indian-festivals-api'

// In your component
const festivals = await getFestivalsByYear(2025)
console.log(festivals)
```

---

## ✅ That's It!

Now you can use the API in your components. See `INDIAN_FESTIVALS_API_SETUP.md` for full documentation.

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure you're in the `backend` directory
- Activate venv: `source venv/bin/activate`
- Install deps: `pip install -r requirements.txt`

**API calls fail?**
- Check backend is running: `curl http://localhost:5000/health`
- Verify `.env.local` has the correct URL
- Check browser console for errors

**Port 5000 already in use?**
- Change port in `backend/app.py`: `app.run(port=5001)`
- Update `.env.local` to match: `NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL=http://localhost:5001`

