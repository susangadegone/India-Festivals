'use client'

import { motion } from 'framer-motion'
import { Info, Heart, Calendar, Sparkles, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function MoreScreen() {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          More
        </h1>
      </motion.div>

      {/* About App */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-[#FFF8E7] to-white border border-[#C8A15A]/30 shadow-lg rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-[#E17735] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1E2A38] mb-3">About This App</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  India Festival Calendar is a comprehensive guide to authentic Hindu and Marathi festivals. 
                  Discover traditional recipes, celebration guides, cultural significance, and Sai Baba's blessings.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#E17735]" />
                    <span>47+ authentic festivals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E17735]" />
                    <span>Daily Sai Baba quotes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#E17735]" />
                    <span>Regional traditions & celebrations</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Version Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-white border border-gray-200 shadow-md rounded-3xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">App Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-semibold text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Festivals</span>
                <span className="font-semibold text-gray-900">47+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Regions</span>
                <span className="font-semibold text-gray-900">Hindi & Marathi</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Credits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center pt-4"
      >
        <Card className="bg-gradient-to-br from-[#E17735]/10 to-[#842B2B]/10 border border-[#E17735]/20 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-[#E17735]" />
              <p className="text-gray-700 font-medium">
                Made with devotion
              </p>
            </div>
            <p className="text-sm text-gray-600">
              May Sai Baba bless all who use this app 🙏
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

