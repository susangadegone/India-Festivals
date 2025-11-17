'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar, ChefHat } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FestivalDetail from './FestivalDetail'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import japaneseFestivalsData from '@/data/japanese-festivals.json'

interface Festival {
  id: string
  name: string
  nameDevanagari: string
  date: string
  category: string
  color: string
  tagline: string
  heroImage: string
  overview: any
  howToCelebrate: any[]
  recipes: any[]
  decorations: any[]
  shoppingList: any
}

interface FavoritesViewProps {
  favorites: Set<string>
  onToggleFavorite: (festivalId: string) => void
  country?: 'india' | 'japan'
}

export default function FavoritesView({ favorites, onToggleFavorite, country = 'india' }: FavoritesViewProps) {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  
  // Load festivals based on selected country
  const festivals = (country === 'japan' 
    ? japaneseFestivalsData
    : comprehensiveFestivalsData) as Festival[]
  const favoriteFestivals = festivals.filter(f => favorites.has(f.id))

  if (favoriteFestivals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          ❤️
        </motion.div>
        <h2 className="text-3xl font-bold text-emerald-800 mb-4 font-marathi">
          No Favorites Yet
        </h2>
        <p className="text-gray-600 mb-2 max-w-md">
          Tap the heart icon on any festival to add it to your favorites and easily access it later.
        </p>
        <p className="text-sm text-gray-500">
          Start exploring festivals and build your personalized collection! 🪔
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-emerald-800 mb-2 font-marathi">
          Your Favorite Festivals
        </h2>
        <p className="text-gray-600">
          {favoriteFestivals.length} festival{favoriteFestivals.length !== 1 ? 's' : ''} saved
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {favoriteFestivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setSelectedFestival(festival)}
          >
            <Card className="overflow-hidden border-sage-200 hover:shadow-xl transition-all hover:border-emerald-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={festival.heroImage} 
                  alt={festival.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(festival.id)
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </motion.button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-xl drop-shadow-lg mb-1">
                    {festival.name}
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow font-marathi">
                    {festival.nameDevanagari}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{festival.tagline}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(festival.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    {festival.recipes.length} recipes
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium capitalize"
                    style={{ backgroundColor: festival.color + '20', color: festival.color }}
                  >
                    {festival.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedFestival && (
        <FestivalDetail
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
          isFavorite={favorites.has(selectedFestival.id)}
          onToggleFavorite={() => onToggleFavorite(selectedFestival.id)}
        />
      )}
    </div>
  )
}

