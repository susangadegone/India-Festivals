'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Camera, Palette, Share2, Heart, Download } from 'lucide-react'
import { getRandomSaiBabaQuote } from '@/lib/utils'
import saiBabaQuotes from '@/data/sai-baba-quotes.json'
import thursdayBlessings from '@/data/thursday-blessings.json'
import PanchangDateSync from './PanchangDateSync'

export default function Profile() {
  const [selectedTheme, setSelectedTheme] = useState('saffron')
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.jpg')
  const [currentQuote, setCurrentQuote] = useState<string>(typeof saiBabaQuotes[0] === 'string' ? saiBabaQuotes[0] : 'Have faith and patience.')
  const [isThursday, setIsThursday] = useState(false)
  const [thursdayBlessing, setThursdayBlessing] = useState<string>('')

  const themes = [
    { id: 'saffron', name: 'Saffron', color: 'bg-saffron-500', text: 'text-saffron-800' },
    { id: 'rose', name: 'Rose', color: 'bg-rose-500', text: 'text-rose-800' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500', text: 'text-teal-800' },
    { id: 'gold', name: 'Gold', color: 'bg-gold-500', text: 'text-gold-800' },
  ]

  useEffect(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    setIsThursday(dayOfWeek === 4) // Thursday is day 4

    if (dayOfWeek === 4) {
      const dayOfMonth = today.getDate()
      const blessing = Array.isArray(thursdayBlessings) ? thursdayBlessings[dayOfMonth % thursdayBlessings.length] : ''
      setThursdayBlessing(blessing)
      setCurrentQuote(getRandomSaiBabaQuote(saiBabaQuotes))
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sai Baba Thursday Blessing',
        text: currentQuote,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(currentQuote)
      alert('Quote copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-saffron-800 mb-2">
          Profile & Settings
        </h2>
        <p className="text-saffron-600">
          Personalize your festival experience
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="spiritual-gradient border-gold-200">
          <CardHeader>
            <CardTitle className="text-gold-800 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gold-200 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gold-600" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-gold-500 text-white rounded-full p-1 cursor-pointer hover:bg-gold-600 transition-colors">
                  <Camera className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gold-800">Festival Enthusiast</h3>
                <p className="text-gold-600">Celebrating traditions worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Theme Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-saffron-800 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Choose Your Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTheme === theme.id
                      ? 'border-saffron-500 bg-saffron-50'
                      : 'border-gray-200 hover:border-saffron-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${theme.color} mx-auto mb-2`}></div>
                  <p className={`text-sm font-medium ${theme.text}`}>{theme.name}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sai Baba Thursday Feature */}
      {isThursday && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="spiritual-gradient border-gold-200">
            <CardHeader>
              <CardTitle className="text-gold-800 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Sai Baba Thursday Blessing
              </CardTitle>
              <p className="text-gold-600 text-sm">
                Special blessing for this Thursday
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/80 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🕉️</div>
                  <h4 className="text-lg font-semibold text-gold-800 mb-2">
                    Jai Sai Ram!
                  </h4>
                </div>
                
                <blockquote className="text-gold-700 italic text-center mb-4">
                  "{currentQuote}"
                </blockquote>
                
                {isThursday && thursdayBlessing && (
                  <p className="text-gold-600 text-sm text-center mb-4">
                    {thursdayBlessing}
                  </p>
                )}
                
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentQuote(getRandomSaiBabaQuote(saiBabaQuotes))}
                    className="border-gold-300 text-gold-700 hover:bg-gold-50"
                  >
                    New Blessing
                  </Button>
                  <Button
                    variant="saffron"
                    size="sm"
                    onClick={shareQuote}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* App Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-saffron-800">About This App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                This app is designed to help you stay connected with Hindu and Marathi festivals, 
                no matter where you are in the world.
              </p>
              <p>
                Features include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Festival calendar with upcoming dates</li>
                <li>Traditional foods and recipes</li>
                <li>Chants and mantras</li>
                <li>Celebration guides for living abroad</li>
                <li>Sai Baba Thursday blessings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Panchang API Date Sync */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <PanchangDateSync />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-saffron-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="text-sm">Export Calendar</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Share App</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
