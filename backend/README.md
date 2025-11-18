# Indian Festivals API Backend

Python Flask backend service that uses the `indian_festivals` package to provide festival data via REST API.

## Setup

1. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

```bash
source venv/bin/activate  # Activate virtual environment
python app.py
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Festivals
- `GET /api/festivals/year/<year>` - Get all festivals for a year
- `GET /api/festivals/month?year=<year>&month=<month>` - Get festivals for a specific month
- `GET /api/festivals/date/<date>` - Get festivals for a specific date (YYYY-MM-DD)
- `GET /api/festivals/search?year=<year>&q=<query>` - Search festivals by name

### Religious Festivals
- `GET /api/festivals/religious/year/<year>` - Get all religious festivals for a year
- `GET /api/festivals/religious/month?year=<year>&month=<month>` - Get religious festivals for a month

## Example Usage

```bash
# Get all festivals for 2025
curl http://localhost:5000/api/festivals/year/2025

# Get festivals for January 2025
curl http://localhost:5000/api/festivals/month?year=2025&month=1

# Search for Diwali
curl http://localhost:5000/api/festivals/search?year=2025&q=diwali
```

## Response Format

All endpoints return JSON with the following structure:

```json
{
  "success": true,
  "festivals": [
    {
      "name": "Festival Name",
      "date": "15",
      "day": "Monday",
      "month": "January",
      "full_date": "2025-01-15"
    }
  ],
  "count": 1
}
```

## Notes

- The `indian_festivals` package scrapes data from panchang.astrosage.com
- Festival dates are calculated based on the Indian calendar
- The API may take a few seconds to respond on first request as it fetches data from the web

