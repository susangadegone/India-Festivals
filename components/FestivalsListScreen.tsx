'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import FestivalDetail from './FestivalDetail'

interface Festival {
  id: string
  name: string
  date: string
  heroImage: string
  tagline?: string
  region?: string
  category?: string
  [key: string]: any
}

export default function FestivalsListScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)

  const festivals = comprehensiveFestivalsData as Festival[]

  const filteredFestivals = useMemo(() => {
    return festivals.filter(festival => 
      festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      festival.nameDevanagari?.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [searchQuery])

  const getFestivalIcon = (category?: string, region?: string) => {
    if (region === 'Marathi') return '🪔'
    if (region === 'Hindi') return '🕉️'
    if (category === 'national') return '🇮🇳'
    if (category === 'religious') return '🙏'
    if (category === 'cultural') return '🎭'
    if (category === 'harvest') return '🌾'
    return '🎉'
  }

  if (selectedFestival) {
    return (
      <FestivalDetail 
        festival={selectedFestival as any} 
        onClose={() => setSelectedFestival(null)}
      />
    )
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-saffron-600" />
        <input
          type="text"
          placeholder="Search festivals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-white border-2 border-rose-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 transition-all shadow-sm touch-manipulation"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-saffron-600 rounded-lg touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </motion.div>

      {/* Festivals List */}
      <div className="space-y-3">
        {filteredFestivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden cursor-pointer touch-manipulation transition-all"
              onClick={() => setSelectedFestival(festival)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {getFestivalIcon(festival.category, festival.region)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {festival.name}
                    </h3>
                    <p className="text-sm text-rose-600 font-semibold">
                      {new Date(festival.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    {festival.tagline && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {festival.tagline}
                      </p>
                    )}
                  </div>
                  <div className="text-gray-400 flex-shrink-0">
                    →
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredFestivals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500">No festivals found</p>
        </motion.div>
      )}
    </div>
  )
}

