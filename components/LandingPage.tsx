'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Sparkles, Heart, BookOpen, ArrowRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'

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

  // Get featured festivals for hero
  const featuredFestivals = comprehensiveFestivalsData.slice(0, 3)

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-white relative overflow-hidden"
        >
          {/* Vibrant Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/40 via-rose-50/30 via-blue-50/30 to-teal-50/40" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5 0-10 5-10 10s5 10 10 10c3 0 5-1 7-3 2-2 3-4 3-7 0-5-5-10-10-10zm0 2c4 0 8 4 8 8 0 2-1 4-2 5-2 2-3 3-6 3-4 0-8-4-8-8s4-8 8-8z' fill='%2310b981'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />

          {/* Modern Blog-Style Hero Section */}
          <div className="relative z-10">
            {/* Header Navigation */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-8 pt-6"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-400 via-rose-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Festival Calendar</h2>
                    <p className="text-xs text-gray-500">Cultural Heritage</p>
                  </div>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleEnter}
                  className="px-6 py-2.5 bg-gradient-to-r from-saffron-500 to-rose-500 hover:from-saffron-600 hover:to-rose-600 text-white rounded-full font-semibold text-sm transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.header>

            {/* Hero Section - Blog Style */}
            <section className="min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-8">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {/* Left: Hero Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-saffron-400 via-rose-400 to-blue-400 text-white rounded-full text-sm font-semibold shadow-lg"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Indian Cultural Heritage</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Discover India's{' '}
                      <span className="bg-gradient-to-r from-saffron-500 via-rose-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                        Rich Festival
                      </span>{' '}
                      Traditions
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
                    >
                      हिंदी और मराठी त्योहार
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-gray-500 leading-relaxed max-w-2xl"
                    >
                      Explore authentic festivals, traditional recipes, celebration guides, and the cultural significance of India's most cherished holidays.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap gap-4 pt-4"
                    >
                      <Button
                        onClick={handleEnter}
                        size="lg"
                        className="bg-gradient-to-r from-saffron-500 via-rose-500 to-pink-500 hover:from-saffron-600 hover:via-rose-600 hover:to-pink-600 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                      >
                        View Calendar
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={handleEnter}
                        size="lg"
                        variant="outline"
                        className="border-2 border-saffron-400 hover:border-saffron-500 bg-saffron-50/50 hover:bg-saffron-100 text-saffron-700 hover:text-saffron-800 px-8 py-6 rounded-xl text-lg font-semibold transition-all"
                      >
                        Browse Festivals
                      </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-8 pt-8 border-t border-gray-200"
                    >
                      {[
                        { number: '47+', label: 'Festivals' },
                        { number: '2', label: 'Countries' },
                        { number: '100%', label: 'Authentic' }
                      ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-3xl font-bold text-gray-900">{stat.number}</span>
                          <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Right: Featured Festival Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-6"
                  >
                    {featuredFestivals.map((festival: any, index: number) => (
                      <motion.div
                        key={festival.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={festival.heroImage}
                            alt={festival.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-saffron-400 to-rose-400 text-white text-xs font-bold rounded-full mb-2 shadow-lg">
                              {festival.region || 'Pan-Indian'}
                            </span>
                            <h3 className="text-xl font-bold text-white drop-shadow-lg">{festival.name}</h3>
                          </div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-white to-saffron-50/30">
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                            {festival.tagline || festival.overview?.shortDescription || ''}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-saffron-700 font-semibold bg-saffron-100 px-2 py-1 rounded-full">
                              {new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <button
                              onClick={handleEnter}
                              className="text-rose-600 hover:text-rose-700 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                            >
                              Read more
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


