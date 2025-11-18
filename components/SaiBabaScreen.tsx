'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Sun, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import saiBabaQuotes from '@/data/sai-baba-quotes.json'
import thursdayBlessings from '@/data/thursday-blessings.json'

export default function SaiBabaScreen() {
  const today = new Date()
  const isThursday = today.getDay() === 4

  // Get quote of the day
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

  const [showAllQuotes, setShowAllQuotes] = useState(false)

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="text-6xl mb-4">🙏</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Sai Baba Blessings
        </h1>
        <p className="text-lg text-gray-600">
          Divine guidance and wisdom
        </p>
      </motion.div>

      {/* Thursday Blessing (if Thursday) */}
      {isThursday && thursdayBlessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-saffron-500 via-rose-500 to-teal-600 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">🌞</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="w-6 h-6 text-yellow-300" />
                    <h3 className="text-2xl font-bold text-white">Thursday Blessing</h3>
                  </div>
                  <p className="text-white/95 text-lg leading-relaxed">
                    {thursdayBlessing}
                  </p>
                  <p className="text-yellow-300/80 text-sm mt-4 font-medium">
                    🙏 Sai Baba's special blessing for this Thursday
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
        <Card className="bg-gradient-to-br from-rose-50 via-white to-teal-50 border-2 border-rose-200 shadow-xl rounded-3xl">
          <CardContent className="p-6 md:p-8">
            <div className="text-center space-y-4">
              <Sparkles className="w-8 h-8 text-saffron-600 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">
                Quote of the Day
              </h3>
              <p className="text-2xl md:text-3xl text-rose-600 leading-relaxed italic font-medium">
                "{quoteOfTheDay}"
              </p>
              <p className="text-sm text-saffron-700 font-semibold">— Sai Baba</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* All Quotes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-saffron-600" />
            All Blessings
          </h2>
          <button
            onClick={() => setShowAllQuotes(!showAllQuotes)}
            className="text-saffron-600 font-semibold text-sm px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 transition-colors touch-manipulation"
          >
            {showAllQuotes ? 'Show Less' : 'Show All'}
          </button>
        </div>

        {showAllQuotes && (
          <div className="grid gap-4 md:grid-cols-2">
            {saiBabaQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-2xl transition-all">
                  <CardContent className="p-5">
                    <p className="text-gray-800 leading-relaxed italic">
                      "{quote}"
                    </p>
                    <p className="text-xs text-[#842B2B]/70 mt-3 font-medium">— Sai Baba</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

