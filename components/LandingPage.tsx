'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Sparkles, Heart, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LandingPageProps {
  onEnter: () => void
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 800)
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 via-red-50 to-pink-50 relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Diyas */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 20, 0],
                  rotate: [0, 5, -5, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className="absolute text-6xl"
                style={{
                  left: `${(i * 15) + 5}%`,
                  top: `${(i % 3) * 30 + 10}%`
                }}
              >
                🪔
              </motion.div>
            ))}

            {/* Animated Mandalas */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-64 h-64 border-8 border-orange-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-20 w-48 h-48 border-8 border-red-200 rounded-full opacity-20"
            />

            {/* Floating Flowers */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`flower-${i}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
                className="absolute text-3xl opacity-40"
                style={{
                  left: `${(i * 8) + 2}%`,
                  bottom: `${(i % 4) * 20}%`
                }}
              >
                {i % 3 === 0 ? '🌺' : i % 3 === 1 ? '🌼' : '🏵️'}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.2 
              }}
              className="mb-8"
            >
              <div className="relative">
                {/* Glowing Background */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full blur-3xl"
                />
                
                {/* Main Logo */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative w-40 h-40 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <span className="text-7xl drop-shadow-2xl">🪔</span>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">✨</span>
                    <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-2xl">🌺</span>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">✨</span>
                    <span className="absolute top-1/2 -left-2 -translate-y-1/2 text-2xl">🌼</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-6 max-w-4xl"
            >
              <motion.h1
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 via-pink-600 to-orange-600 bg-[length:200%_auto] bg-clip-text text-transparent"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                India Festival Calendar
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl md:text-3xl text-orange-800 font-semibold mb-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                हिंदी और मराठी त्योहार
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg md:text-xl text-gray-700 italic"
              >
                Celebrating India's Rich Cultural Heritage
              </motion.p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12 max-w-3xl"
            >
              {[
                { icon: Calendar, text: '15+ Festivals', color: 'from-orange-500 to-red-500' },
                { icon: BookOpen, text: 'Complete Guides', color: 'from-red-500 to-pink-500' },
                { icon: Heart, text: 'Traditional Recipes', color: 'from-pink-500 to-orange-500' },
                { icon: Sparkles, text: 'Beautiful Design', color: 'from-yellow-500 to-orange-500' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2`}
                >
                  <feature.icon className="w-5 h-5" />
                  <span className="font-semibold">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleEnter}
                  className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-12 py-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3"
                >
                  <span>Explore Festivals</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Bottom Decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 flex gap-8 text-5xl"
            >
              {['🕉️', '🙏', '🪔', '🌺', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="drop-shadow-lg"
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Credits */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="mt-8 text-sm text-gray-600 text-center"
            >
              Based on authentic dates from <span className="font-semibold text-orange-700">Drik Panchang</span>
            </motion.p>
          </div>

          {/* Bottom Gradient Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-100 to-transparent pointer-events-none" />
          
          {/* Top Gradient Decoration */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-100 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}


