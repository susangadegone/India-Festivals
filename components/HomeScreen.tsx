'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'
import saiBabaQuotes from '@/data/sai-baba-quotes.json'
import thursdayBlessings from '@/data/thursday-blessings.json'
import FestivalDetail from './FestivalDetail'

interface Festival {
  id: string
  name: string
  date: string
  heroImage: string
  tagline?: string
  [key: string]: any
}

export default function HomeScreen({ onFestivalClick }: { onFestivalClick?: (festival: Festival) => void }) {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [greeting, setGreeting] = useState('Good Morning')
  const today = new Date()
  const isThursday = today.getDay() === 4

  useEffect(() => {
    const hour = today.getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  // Get quote of the day (based on date)
  const quoteOfTheDay = useMemo(() => {
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return saiBabaQuotes[dayOfYear % saiBabaQuotes.length]
  }, [])

  // Get Thursday blessing
  const thursdayBlessing = useMemo(() => {
    if (!isThursday) return null
    const dayOfMonth = today.getDate()
    return thursdayBlessings[dayOfMonth % thursdayBlessings.length]
  }, [isThursday])

  // Get upcoming festivals (next 5)
  const upcomingFestivals = useMemo(() => {
    const festivals = comprehensiveFestivalsData as Festival[]
    const todayStr = today.toISOString().split('T')[0]
    
    return festivals
      .filter(festival => {
        const festivalDate = new Date(festival.date)
        return festivalDate >= today
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (selectedFestival) {
    return (
      <FestivalDetail 
        festival={selectedFestival as any} 
        onClose={() => setSelectedFestival(null)}
      />
    )
  }

  // Check if it's December (festive season)
  const isDecember = today.getMonth() === 11
  const isChristmasWeek = isDecember && today.getDate() >= 20
  const isNewYearWeek = today.getMonth() === 0 && today.getDate() <= 7

  return (
    <div className="space-y-6 pb-6 relative">
      {/* Festive Banner for December */}
      {isDecember && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 via-green-500 to-red-500 text-white p-4 rounded-2xl shadow-lg mb-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-3 relative z-10">
            <span className="text-2xl">🎄</span>
            <div className="text-center">
              <h3 className="font-bold text-lg">Festive Season Blessings!</h3>
              <p className="text-sm opacity-90">May this season bring you joy, peace, and prosperity 🙏</p>
            </div>
            <span className="text-2xl">🪔</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-3xl"
              >
                ✨
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Greeting and Date */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {greeting} 🙏 {isDecember && '🎄'} {isNewYearWeek && '🎉'}
        </h1>
        <p className="text-lg text-gray-600">
          Today is: {formatDate(today)}
        </p>
      </motion.div>

      {/* Thursday Blessing Card */}
      {isThursday && thursdayBlessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-[#E17735] to-[#842B2B] border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌞</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Thursday Blessing</h3>
                  <p className="text-white/95 text-base leading-relaxed">
                    {thursdayBlessing}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quote of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-[#FFF8E7] to-[#C8A15A]/30 border border-[#C8A15A]/30 shadow-lg rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-[#E17735] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1E2A38] mb-2">🔮 Quote of the Day</h3>
                <p className="text-[#1E2A38] text-base leading-relaxed italic">
                  "{quoteOfTheDay}"
                </p>
                <p className="text-sm text-[#842B2B]/70 mt-2 font-medium">— Sai Baba</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Festivals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-[#E17735]" />
          <h2 className="text-2xl font-bold text-gray-900">📅 Upcoming Festivals</h2>
        </div>

        <div className="space-y-4">
          {upcomingFestivals.map((festival, index) => (
            <motion.div
              key={festival.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-3xl overflow-hidden cursor-pointer touch-manipulation"
                onClick={() => setSelectedFestival(festival)}
              >
                <div className="flex">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <img
                      src={festival.heroImage}
                      alt={festival.name}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {festival.name}
                    </h3>
                    <p className="text-sm text-[#842B2B] font-semibold mb-2">
                      {new Date(festival.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    {festival.tagline && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {festival.tagline}
                      </p>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

