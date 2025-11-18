# Indian Festivals API Integration Guide

This guide explains how to use the `indian_festivals` Python package API in your Next.js application.

## Overview

The integration consists of:
1. **Python Flask Backend** (`backend/`) - Provides REST API using `indian_festivals` package
2. **TypeScript Integration** (`lib/indian-festivals-api.ts`) - Client library for Next.js

## Quick Start

### 1. Start the Python Backend

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Configure Environment Variable

Create or update `.env.local` in your project root:

```env
NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL=http://localhost:5000
```

### 3. Use in Your Components

```typescript
import { 
  getFestivalsByYear, 
  getFestivalsByMonth,
  getFestivalsByDate,
  searchFestivals 
} from '@/lib/indian-festivals-api';

// Get all festivals for 2025
const festivals = await getFestivalsByYear(2025);

// Get festivals for January 2025
const janFestivals = await getFestivalsByMonth(2025, 1);

// Get festivals for a specific date
const dateFestivals = await getFestivalsByDate('2025-01-15');

// Search for festivals
const results = await searchFestivals('diwali', 2025);
```

## API Reference

### TypeScript Functions

#### `getFestivalsByYear(year: number): Promise<IndianFestival[]>`
Get all festivals for a specific year.

#### `getFestivalsByMonth(year: number, month: number): Promise<IndianFestival[]>`
Get festivals for a specific month (1-12).

#### `getFestivalsByDate(date: string): Promise<IndianFestival[]>`
Get festivals for a specific date (YYYY-MM-DD format).

#### `searchFestivals(query: string, year?: number): Promise<IndianFestival[]>`
Search festivals by name across a year.

#### `getReligiousFestivalsByYear(year: number): Promise<IndianFestival[]>`
Get all religious festivals for a year.

#### `getReligiousFestivalsByMonth(year: number, month: number): Promise<IndianFestival[]>`
Get religious festivals for a specific month.

#### `checkAPIHealth(): Promise<boolean>`
Check if the API backend is running.

### Data Structure

```typescript
interface IndianFestival {
  name: string;        // Festival name
  date: string;        // Day of month (1-31)
  day: string;         // Day of week (Monday, Tuesday, etc.)
  month?: string;       // Month name (January, February, etc.)
  full_date?: string;  // Full date in YYYY-MM-DD format
}
```

## Example: Integration with Calendar Component

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getFestivalsByMonth } from '@/lib/indian-festivals-api'

export default function CalendarWithAPI() {
  const [festivals, setFestivals] = useState([])
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(1)

  useEffect(() => {
    async function loadFestivals() {
      try {
        const data = await getFestivalsByMonth(year, month)
        setFestivals(data)
      } catch (error) {
        console.error('Failed to load festivals:', error)
      }
    }
    loadFestivals()
  }, [year, month])

  return (
    <div>
      {/* Your calendar UI */}
      {festivals.map((festival, idx) => (
        <div key={idx}>
          {festival.name} - {festival.full_date}
        </div>
      ))}
    </div>
  )
}
```

## Troubleshooting

### Backend won't start
- Make sure virtual environment is activated: `source venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Check if port 5000 is available

### API calls fail
- Verify backend is running: `curl http://localhost:5000/health`
- Check `.env.local` has correct `NEXT_PUBLIC_INDIAN_FESTIVALS_API_URL`
- Check browser console for CORS errors

### No festivals returned
- The `indian_festivals` package scrapes data from the web, so first request may take time
- Verify the year is valid (package supports recent years)
- Check backend logs for errors

## Notes

- The backend scrapes festival data from panchang.astrosage.com
- First request for a year may take 5-10 seconds
- Festival dates are based on the Indian calendar system
- The API is designed for development/testing; for production, consider caching responses

