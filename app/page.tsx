'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import EnhancedCalendarView from '@/components/EnhancedCalendarView'
import FavoritesView from '@/components/FavoritesView'
import HindiFestivals from '@/components/HindiFestivals'
import MarathiFestivals from '@/components/MarathiFestivals'
import Profile from '@/components/Profile'
import { Calendar, Heart, Home, User, Sparkles, Globe, ChevronDown } from 'lucide-react'
import { countries, type Country, getCountryConfig } from '@/lib/countries'

export default function HomePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [activeTab, setActiveTab] = useState('calendar')
  const [isLoaded, setIsLoaded] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedCountry, setSelectedCountry] = useState<Country>('india')
  const [showCountryMenu, setShowCountryMenu] = useState(false)

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
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'hindi', label: 'Hindi', icon: Sparkles },
    { id: 'marathi', label: 'Marathi', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const toggleFavorite = (festivalId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(festivalId)) {
      newFavorites.delete(festivalId)
    } else {
      newFavorites.add(festivalId)
    }
    setFavorites(newFavorites)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <EnhancedCalendarView country={selectedCountry} />
      case 'favorites':
        return <FavoritesView favorites={favorites} onToggleFavorite={toggleFavorite} country={selectedCountry} />
      case 'hindi':
        return <HindiFestivals />
      case 'marathi':
        return <MarathiFestivals />
      case 'profile':
        return <Profile />
      default:
        return <EnhancedCalendarView country={selectedCountry} />
    }
  }

  const currentCountry = getCountryConfig(selectedCountry)

  // Show landing page on first visit
  if (showLanding && isLoaded) {
    return <LandingPage onEnter={handleEnterApp} />
  }

  return (
    <div className="min-h-screen bg-white app-container relative">
      {/* Modern Blog-Style Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-sm"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <motion.button
              onClick={() => setActiveTab('calendar')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sage-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">Festival Calendar</h1>
                <p className="text-xs text-gray-500">Cultural Heritage</p>
              </div>
            </motion.button>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                      isActive 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-emerald-50 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-emerald-600' : 'text-gray-500'}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
            
            {/* Country Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setShowCountryMenu(!showCountryMenu)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">{currentCountry.flag}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showCountryMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Country Dropdown */}
              <AnimatePresence>
                {showCountryMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {countries.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          setSelectedCountry(country.id)
                          setShowCountryMenu(false)
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                          selectedCountry === country.id ? 'bg-emerald-50 border-l-2 border-emerald-500' : ''
                        }`}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{country.name}</div>
                          <div className="text-xs text-gray-500">{country.nativeName}</div>
                        </div>
                        {selectedCountry === country.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 bg-emerald-500 rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Blog Style Layout */}
      <main className="container mx-auto px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedCountry}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[calc(100vh-300px)]"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-around items-center h-20">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTab"
                      className="absolute inset-0 bg-emerald-50 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <Icon className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <span className={`text-xs font-semibold ${
                      isActive ? 'text-emerald-700' : 'text-gray-500'
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Click outside to close country menu */}
      {showCountryMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowCountryMenu(false)}
        />
      )}
    </div>
  )
}
