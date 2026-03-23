'use client'

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Calendar, Sparkles, Heart, BookOpen, ArrowRight, Globe, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import comprehensiveFestivalsData from '@/data/comprehensive-festivals.json'

interface LandingPageProps {
  onEnter: () => void
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Only render video on client side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
    // Try to play video after mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay prevented:', err)
        setVideoError(true)
      })
    }
  }, [])

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 800)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  // Get featured festivals for hero
  const featuredFestivals = comprehensiveFestivalsData.slice(0, 6)

  // Interactive card component with mouse tracking
  const InteractiveCard = ({ festival, index }: { festival: any; index: number }) => {
    const ref = useRef<HTMLDivElement>(null)
    cardRefs.current[index] = ref.current

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5
      x.set(xPct)
      y.set(yPct)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all overflow-hidden border border-gray-100 cursor-pointer"
        onClick={handleEnter}
      >
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={festival.heroImage}
            alt={festival.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6 }}
            crossOrigin="anonymous"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Floating badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
            className="absolute top-4 right-4"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white text-xs font-bold rounded-full shadow-xl backdrop-blur-sm border border-white/20">
              {festival.region || 'Pan-Indian'}
            </span>
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-2xl font-bold text-white drop-shadow-2xl mb-2"
            >
              {festival.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="text-sm text-rose-100 drop-shadow-lg"
            >
              {festival.nameDevanagari}
            </motion.p>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <div className="p-6 bg-gradient-to-br from-white via-saffron-50/20 to-rose-50/20">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-4">
            {festival.tagline || festival.overview?.shortDescription || ''}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-saffron-700 font-bold bg-gradient-to-r from-saffron-100 to-rose-100 px-3 py-1.5 rounded-full">
              {new Date(festival.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="text-rose-600 hover:text-rose-700 font-bold text-sm flex items-center gap-2"
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-white relative overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Video Background - Only render on client to avoid hydration errors */}
          {isMounted && !videoError && (
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  objectFit: 'cover',
                  minWidth: '100%',
                  minHeight: '100%',
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}
                onError={(e) => {
                  console.error('Video error:', e)
                  setVideoError(true)
                }}
                onLoadedData={() => {
                  console.log('Video loaded successfully!')
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error)
                  }
                }}
                onCanPlay={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.error)
                  }
                }}
              >
                {/* Puja video with candles and offerings (primary) - MP4 first for best browser support */}
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/puja-candles-offerings.mp4"
                  type="video/mp4"
                />
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/4391103-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
                {/* Fallback to .mov if MP4 not available */}
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/puja-candles-offerings.mov"
                  type="video/quicktime"
                />
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/4391103-hd_1920_1080_25fps.mov"
                  type="video/quicktime"
                />
                {/* Additional fallbacks */}
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/india-background.mp4"
                  type="video/mp4"
                />
                <source
                  src="/Hindu-Marati-Festivals-App-1/videos/india-background.mov"
                  type="video/quicktime"
                />
              </video>
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-900/20 via-transparent to-rose-900/20 z-10" />
              {/* Debug info in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-xs z-50">
                  Video: {videoRef.current?.readyState === 4 ? '✅ Ready' : '⏳ Loading...'} | Error: {videoError ? '❌' : '✅'}
                </div>
              )}
            </div>
          )}
          {videoError && isMounted && (
            <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/50 via-rose-50/40 via-blue-50/40 to-teal-50/50 z-0" />
          )}

          {/* Animated gradient background (as fallback - behind video) */}
          <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/50 via-rose-50/40 via-blue-50/40 to-teal-50/50 z-0" />
          
          {/* Floating gradient orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron-300/30 to-rose-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-teal-300/30 rounded-full blur-3xl"
          />

          {/* Header Navigation */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 z-50 px-6 lg:px-8 pt-8"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 cursor-pointer"
                onClick={handleEnter}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 bg-gradient-to-br from-saffron-400 via-rose-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl"
                >
                  <span className="text-3xl">📅</span>
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-saffron-600 to-rose-600 bg-clip-text text-transparent">Festival Calendar</h2>
                  <p className="text-xs text-gray-600 font-medium">Cultural Heritage</p>
                </div>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-8 py-3 bg-gradient-to-r from-saffron-500 via-rose-500 to-pink-500 hover:from-saffron-600 hover:via-rose-600 hover:to-pink-600 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl"
              >
                Explore Now
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.header>

          {/* Hero Section - Apple Style */}
          <section className="min-h-screen flex items-center pt-32 pb-20 px-6 lg:px-8 relative z-30">
            <div className="max-w-7xl mx-auto w-full">
              {/* Main Hero Content */}
              <div className="text-center mb-20 relative z-30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-pink-400/30 backdrop-blur-lg border border-yellow-300/50 rounded-full text-sm font-bold text-white mb-8 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-saffron-600" />
                  <span>Indian Cultural Heritage</span>
                  <Zap className="w-5 h-5 text-rose-600" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6 tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  <span className="block text-slate-900 drop-shadow-lg">Discover India's</span>
                  <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 via-pink-300 to-red-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-lg">
                    Festival Traditions
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl lg:text-4xl text-yellow-100 leading-relaxed mb-4 font-medium drop-shadow-lg"
                >
                  हिंदी और मराठी त्योहार
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl lg:text-2xl text-slate-800 leading-relaxed max-w-3xl mx-auto mb-12"
                >
                  Experience 47+ authentic festivals with traditional recipes, celebration guides, and rich cultural stories.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap justify-center gap-6 pt-4"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleEnter}
                      size="lg"
                      className="bg-gradient-to-r from-saffron-500 via-rose-500 to-pink-500 hover:from-saffron-600 hover:via-rose-600 hover:to-pink-600 text-white px-10 py-7 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-[0_20px_60px_rgba(251,113,133,0.4)] transition-all flex items-center gap-3"
                    >
                      View Calendar
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleEnter}
                      size="lg"
                      variant="outline"
                      className="border-3 border-saffron-400 hover:border-saffron-500 bg-white/80 hover:bg-saffron-50 backdrop-blur-sm text-saffron-700 hover:text-saffron-800 px-10 py-7 rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-xl"
                    >
                      Browse Festivals
                    </Button>
                  </motion.div>
                </motion.div>

              </div>

              {/* Interactive Festival Grid */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 relative z-30"
              >
                {featuredFestivals.map((festival: any, index: number) => (
                  <InteractiveCard key={festival.id} festival={festival} index={index} />
                ))}
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
