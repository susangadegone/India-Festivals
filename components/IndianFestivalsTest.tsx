'use client'

import { useState, useEffect } from 'react'
import { 
  getFestivalsByYear, 
  getFestivalsByMonth,
  getFestivalsByDate,
  searchFestivals,
  checkAPIHealth,
  type IndianFestival 
} from '@/lib/indian-festivals-api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function IndianFestivalsTest() {
  const [festivals, setFestivals] = useState<IndianFestival[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiHealth, setApiHealth] = useState<boolean | null>(null)
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Check API health on mount
  useEffect(() => {
    async function checkHealth() {
      const isHealthy = await checkAPIHealth()
      setApiHealth(isHealthy)
    }
    checkHealth()
  }, [])

  const handleGetByYear = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getFestivalsByYear(year)
      setFestivals(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch festivals')
    } finally {
      setLoading(false)
    }
  }

  const handleGetByMonth = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getFestivalsByMonth(year, month)
      setFestivals(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch festivals')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await searchFestivals(searchQuery, year)
      setFestivals(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search festivals')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Indian Festivals API Test</h2>
          
          {/* API Health Status */}
          <div className="mb-4 p-3 rounded-lg bg-gray-100">
            <p className="text-sm">
              API Status: {' '}
              {apiHealth === null ? (
                <span className="text-gray-500">Checking...</span>
              ) : apiHealth ? (
                <span className="text-green-600 font-semibold">✅ Connected</span>
              ) : (
                <span className="text-red-600 font-semibold">❌ Not Connected</span>
              )}
            </p>
            {!apiHealth && (
              <p className="text-xs text-red-600 mt-1">
                Make sure the Python backend is running on port 5000
              </p>
            )}
          </div>

          {/* Get by Year */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium">Get Festivals by Year</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || 2025)}
                className="px-3 py-2 border rounded-md w-32"
                min="2020"
                max="2030"
              />
              <Button onClick={handleGetByYear} disabled={loading || !apiHealth}>
                {loading ? 'Loading...' : 'Get Festivals'}
              </Button>
            </div>
          </div>

          {/* Get by Month */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium">Get Festivals by Month</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || 2025)}
                className="px-3 py-2 border rounded-md w-32"
                min="2020"
                max="2030"
              />
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                className="px-3 py-2 border rounded-md"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2025, m - 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
              <Button onClick={handleGetByMonth} disabled={loading || !apiHealth}>
                {loading ? 'Loading...' : 'Get Month'}
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium">Search Festivals</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Diwali, Holi..."
                className="px-3 py-2 border rounded-md flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={loading || !apiHealth || !searchQuery.trim()}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Results */}
          {festivals.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Results ({festivals.length} festivals)
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {festivals.map((festival, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="font-semibold">{festival.name}</div>
                    <div className="text-sm text-gray-600">
                      {festival.full_date || `${festival.month || ''} ${festival.date}`} - {festival.day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

