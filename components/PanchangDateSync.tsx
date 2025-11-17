'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react'
import { fetchMultipleFestivalDates, clearPanchangCache, getCacheStatus } from '@/lib/panchang-api'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'

interface Festival {
  id: string
  name: string
  date: string
  date_2025?: string
  date_2026?: string
  date_type?: 'Lunar' | 'Solar' | 'Fixed'
}

interface SyncResult {
  festivalId: string
  festivalName: string
  oldDate: string
  newDate: string | null
  status: 'success' | 'error' | 'unchanged'
  error?: string
}

export default function PanchangDateSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncResults, setSyncResults] = useState<SyncResult[]>([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [cacheStatus, setCacheStatus] = useState(getCacheStatus())

  const festivals = comprehensiveFestivalsData as Festival[]

  // Filter festivals that use Lunar calendar (these need API updates)
  const lunarFestivals = festivals.filter(f => f.date_type === 'Lunar')

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncResults([])

    try {
      const festivalIds = lunarFestivals.map(f => f.id)
      const results = await fetchMultipleFestivalDates(festivalIds, year)

      const syncResults: SyncResult[] = lunarFestivals.map(festival => {
        const apiResult = results[festival.id]
        const oldDate = year === 2025 ? (festival.date_2025 || festival.date) : 
                       year === 2026 ? (festival.date_2026 || festival.date) : 
                       festival.date

        if (apiResult && apiResult.date) {
          return {
            festivalId: festival.id,
            festivalName: festival.name,
            oldDate,
            newDate: apiResult.date,
            status: apiResult.date !== oldDate ? 'success' : 'unchanged'
          }
        } else {
          return {
            festivalId: festival.id,
            festivalName: festival.name,
            oldDate,
            newDate: null,
            status: 'error',
            error: 'No date found from API'
          }
        }
      })

      setSyncResults(syncResults)
      setCacheStatus(getCacheStatus())
    } catch (error) {
      console.error('Sync error:', error)
      setSyncResults([{
        festivalId: 'error',
        festivalName: 'Sync Error',
        oldDate: '',
        newDate: null,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }])
    } finally {
      setIsSyncing(false)
    }
  }

  const handleClearCache = () => {
    clearPanchangCache()
    setCacheStatus(getCacheStatus())
  }

  const successCount = syncResults.filter(r => r.status === 'success').length
  const errorCount = syncResults.filter(r => r.status === 'error').length
  const unchangedCount = syncResults.filter(r => r.status === 'unchanged').length

  return (
    <Card className="border-2 border-orange-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-orange-600" />
          <span>Panchang API Date Sync</span>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Sync festival dates from Panchang API for accurate lunar calendar dates
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration */}
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="px-4 py-2 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              API Provider
            </label>
            <div className="text-sm text-gray-600">
              {process.env.NEXT_PUBLIC_PANCHANG_PROVIDER || 'static'} 
              {process.env.NEXT_PUBLIC_PANCHANG_PROVIDER === 'static' && (
                <span className="text-orange-600 ml-2">(Using static dates)</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Dates
                </>
              )}
            </Button>

            <Button
              onClick={handleClearCache}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Clear Cache
            </Button>
          </div>
        </div>

        {/* Cache Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Cache Status</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Cached:</span>
              <span className="ml-2 font-semibold text-orange-600">{cacheStatus.cachedCount}</span>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <span className="ml-2 font-semibold text-orange-600">
                {(cacheStatus.cacheSize / 1024).toFixed(2)} KB
              </span>
            </div>
            <div>
              <span className="text-gray-600">Festivals:</span>
              <span className="ml-2 font-semibold text-orange-600">{lunarFestivals.length}</span>
            </div>
          </div>
        </div>

        {/* API Configuration Notice */}
        {process.env.NEXT_PUBLIC_PANCHANG_PROVIDER === 'static' && (
          <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">
                  API Not Configured
                </h4>
                <p className="text-sm text-yellow-700 mb-2">
                  To use Panchang API, configure environment variables:
                </p>
                <code className="text-xs bg-yellow-100 p-2 rounded block">
                  NEXT_PUBLIC_PANCHANG_PROVIDER=divine<br />
                  NEXT_PUBLIC_PANCHANG_API_KEY=your_api_key<br />
                  PANCHANG_API_KEY=your_api_key (server-side)
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Sync Results */}
        <AnimatePresence>
          {syncResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    {successCount} Updated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-semibold text-red-700">
                    {errorCount} Errors
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    {unchangedCount} Unchanged
                  </span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {syncResults.map((result, index) => (
                  <motion.div
                    key={result.festivalId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border-2 ${
                      result.status === 'success' ? 'bg-green-50 border-green-200' :
                      result.status === 'error' ? 'bg-red-50 border-red-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{result.festivalName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {result.status === 'success' && (
                            <>
                              <span className="line-through text-gray-400">{result.oldDate}</span>
                              <span className="ml-2 text-green-700 font-semibold">
                                → {result.newDate}
                              </span>
                            </>
                          )}
                          {result.status === 'error' && (
                            <span className="text-red-700">{result.error}</span>
                          )}
                          {result.status === 'unchanged' && (
                            <span className="text-gray-600">{result.oldDate} (unchanged)</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        {result.status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {result.status === 'error' && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        {result.status === 'unchanged' && (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">How to Use:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Configure API provider in environment variables</li>
            <li>Select the year you want to sync</li>
            <li>Click "Sync Dates" to fetch dates from API</li>
            <li>Review the results and update your festival data</li>
            <li>Dates are cached for 24 hours to reduce API calls</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}

