'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import HomeScreen from '@/components/HomeScreen'
import FestivalsListScreen from '@/components/FestivalsListScreen'
import SaiBabaScreen from '@/components/SaiBabaScreen'
import MoreScreen from '@/components/MoreScreen'
import { Home, Calendar, Heart, Info } from 'lucide-react'

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
    setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterApp = () => {
    setShowLanding(false)
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'festivals', label: 'Festivals', icon: Calendar },
    { id: 'sai-baba', label: 'Sai Baba', icon: Heart },
    { id: 'more', label: 'More', icon: Info },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'festivals':
        return <FestivalsListScreen />
      case 'sai-baba':
        return <SaiBabaScreen />
      case 'more':
        return <MoreScreen />
      default:
        return <HomeScreen />
    }
  }

  // Show landing page on first visit
  if (showLanding && isLoaded) {
    return <LandingPage onEnter={handleEnterApp} />
  }

  // Check if it's December (festive season)
  const isDecember = new Date().getMonth() === 11
  const isChristmasWeek = isDecember && new Date().getDate() >= 20

  return (
    <div className="min-h-screen bg-[#FFF8E7] app-container relative pb-20 md:pb-0 safe-area-inset overflow-hidden">
      {/* Festive Decorations - Floating Elements */}
      {isDecember && (
        <>
          {/* Floating Diyas and Stars */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`diya-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                <span className="text-xl">🪔</span>
              </motion.div>
            ))}
            {isChristmasWeek && [...Array(6)].map((_, i) => (
              <motion.div
                key={`snowflake-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 100],
                  rotate: [0, 360],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <span className="text-lg">❄️</span>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Mobile App Style Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm safe-top relative ${
          isDecember 
            ? 'bg-gradient-to-r from-[#FFF8E7] via-[#FFE5E5] to-[#FFF8E7] border-[#C8A15A]/30' 
            : 'bg-[#FFF8E7]/95 border-[#C8A15A]/20'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo/Brand - Mobile optimized */}
            <motion.button
              onClick={() => setActiveTab('home')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 md:gap-4 group touch-manipulation"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#E17735] to-[#842B2B] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                <span className="text-xl md:text-2xl">🙏</span>
              </div>
              <div className="text-left hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-[#1E2A38]">
                  Festival Calendar
                </h1>
                <p className="text-xs text-[#842B2B] font-medium">Cultural Heritage</p>
              </div>
            </motion.button>
            
            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-[#E17735] to-[#842B2B] shadow-lg' 
                        : 'text-gray-600 hover:text-[#E17735] hover:bg-[#FFF8E7]'
                    }`}
                >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#E17735] to-[#842B2B] rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Mobile App Style */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-12 lg:py-16 safe-area-inset-x">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-300px)] pb-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation - Always Visible */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF8E7]/98 backdrop-blur-xl border-t border-[#C8A15A]/20 shadow-2xl safe-bottom"
      >
        <div className="container mx-auto px-2 max-w-7xl">
          <div className="flex justify-around items-center h-20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex flex-col items-center justify-center py-2 px-3 flex-1 touch-manipulation min-h-[60px]"
                  aria-label={tab.label}
                >
                    {isActive && (
                      <motion.div
                      layoutId="activeMobileTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#E17735] to-[#842B2B] rounded-2xl mx-1"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <Icon className={`w-6 h-6 transition-all duration-200 ${
                      isActive ? 'text-white scale-110' : 'text-gray-400'
                    }`} />
                    <span className={`text-[10px] font-bold transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-gray-500'
                  }`}>
                    {tab.label}
                  </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="mobileIndicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.nav>

    </div>
  )
}
