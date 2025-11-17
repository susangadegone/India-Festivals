'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Calendar as CalendarIcon } from 'lucide-react'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import FestivalDetail from './FestivalDetail'

interface Festival {
  id: string
  name: string
  nameDevanagari: string
  date: string
  date_2025?: string
  date_2026?: string
  region?: 'Marathi' | 'Hindi' | 'Pan-Indian'
  primary_states?: string[]
  date_type?: 'Lunar' | 'Solar' | 'Fixed'
  importance?: 'Very High' | 'High' | 'Medium'
  category: string
  color: string
  tagline: string
  heroImage: string
  overview: any
  howToCelebrate: any[]
  recipes: any[]
  decorations: any[]
  shoppingList: any
  month?: string
}

export default function MarathiFestivals() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  const allFestivals = comprehensiveFestivalsData as Festival[]
  
  // Filter Marathi festivals
  const marathiFestivals = allFestivals.filter(festival => festival.region === 'Marathi')
  
  const toggleFavorite = (festivalId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(festivalId)) {
      newFavorites.delete(festivalId)
    } else {
      newFavorites.add(festivalId)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">🪔</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Marathi Festivals
          </h2>
        </div>
        <p className="text-lg text-orange-700 font-semibold">
          मराठी त्योहार - Celebrate Maharashtra traditions
        </p>
      </motion.div>

      {/* Festivals Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marathiFestivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="cursor-pointer group"
            onClick={() => setSelectedFestival(festival)}
          >
            <Card className="overflow-hidden border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={festival.heroImage} 
                  alt={festival.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/70 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(festival.id)
                    }}
                    className="p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.has(festival.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-700'
                      }`} 
                    />
                  </motion.button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-bold text-white text-xl drop-shadow-lg mb-1">
                    {festival.name}
                  </h4>
                  <p className="text-sm text-yellow-100 drop-shadow font-marathi">
                    {festival.nameDevanagari}
                  </p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-700 font-bold">
                      {new Date(festival.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {festival.date_type && (
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {festival.date_type}
                    </span>
                  )}
                  {festival.importance && (
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      festival.importance === 'Very High' ? 'bg-red-100 text-red-700' :
                      festival.importance === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {festival.importance}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-4 leading-relaxed">{festival.tagline}</p>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {festival.region && (
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-orange-100 text-orange-700 border-orange-300">
                      🪔 {festival.region}
                    </span>
                  )}
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold border-2 bg-yellow-50 text-yellow-700 border-yellow-300">
                    {festival.category}
                  </span>
                </div>
                {festival.primary_states && festival.primary_states.length > 0 && (
                  <div className="flex items-center gap-1 mb-3 flex-wrap">
                    <span className="text-xs text-gray-600">📍 </span>
                    <span className="text-xs text-gray-600">
                      {festival.primary_states.slice(0, 3).join(', ')}
                      {festival.primary_states.length > 3 && ` +${festival.primary_states.length - 3}`}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-orange-600 font-semibold flex items-center gap-1">
                    🍽️ {festival.recipes.length} recipes
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <FestivalDetail
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
          isFavorite={favorites.has(selectedFestival.id)}
          onToggleFavorite={() => toggleFavorite(selectedFestival.id)}
        />
      )}
    </div>
  )
}
