'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Share2, Calendar, MapPin, Clock, ChefHat, Sparkles, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Recipe {
  id: string
  name: string
  nameDevanagari: string
  image: string
  description: string
  difficulty: string
  prepTime: string
  cookTime: string
  servings: string
  ingredients: string[]
  instructions: string[]
  tips: string[]
}

interface HowToStep {
  step: number
  title: string
  description: string
  timeNeeded: string
  difficulty: string
}

interface Decoration {
  type: string
  title: string
  description: string
  materials: string[]
  difficulty: string
  timeNeeded: string
  steps: string[]
  images: string[]
  beginnerTips: string[]
}

interface Festival {
  id: string
  name: string
  nameDevanagari: string
  date: string
  category: string
  color: string
  tagline: string
  heroImage: string
  overview: {
    brief: string
    history: string
    significance: string
    duration: string
    region: string
  }
  howToCelebrate: HowToStep[]
  recipes: Recipe[]
  decorations: Decoration[]
  shoppingList: {
    [key: string]: string[]
  }
}

interface FestivalDetailProps {
  festival: Festival
  onClose: () => void
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export default function FestivalDetail({ festival, onClose, isFavorite = false, onToggleFavorite }: FestivalDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'celebrate', label: 'How to Celebrate', icon: Calendar },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'decorations', label: 'Decorations', icon: Sparkles },
    { id: 'shopping', label: 'Shopping List', icon: ShoppingBag },
  ]

  const toggleShoppingItem = (item: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(item)) {
      newChecked.delete(item)
    } else {
      newChecked.add(item)
    }
    setCheckedItems(newChecked)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen py-4 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Section */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={festival.heroImage} 
              alt={festival.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Header Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleFavorite}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
              >
                <X className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  {festival.name}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 mb-3 font-marathi drop-shadow">
                  {festival.nameDevanagari}
                </p>
                <p className="text-white/90 text-lg mb-3 drop-shadow">
                  {festival.tagline}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-white/90">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {new Date(festival.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {festival.overview.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" />
                    {festival.overview.region}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="sticky top-0 z-40 bg-white border-b border-gray-200 overflow-x-auto">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] px-4 py-4 flex items-center justify-center gap-2 transition-all duration-200 ${
                      isActive
                        ? 'text-saffron-600 border-b-2 border-saffron-600 bg-saffron-50'
                        : 'text-gray-600 hover:text-saffron-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden md:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="border-saffron-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-saffron-800 mb-3">About {festival.name}</h3>
                      <p className="text-gray-700 leading-relaxed">{festival.overview.brief}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-saffron-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-saffron-800 mb-3">History & Origins</h3>
                      <p className="text-gray-700 leading-relaxed">{festival.overview.history}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-saffron-100">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-saffron-800 mb-3">Significance</h3>
                      <p className="text-gray-700 leading-relaxed">{festival.overview.significance}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* How to Celebrate Tab */}
              {activeTab === 'celebrate' && (
                <motion.div
                  key="celebrate"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-semibold text-saffron-800 mb-4">
                    Step-by-Step Celebration Guide
                  </h3>
                  {festival.howToCelebrate.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-saffron-100 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg">
                                {step.step}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                              <p className="text-gray-700 leading-relaxed mb-3">{step.description}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {step.timeNeeded}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(step.difficulty)}`}>
                                  {step.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Recipes Tab */}
              {activeTab === 'recipes' && (
                <motion.div
                  key="recipes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-semibold text-saffron-800 mb-4">
                    Traditional Recipes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {festival.recipes.map((recipe, index) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedRecipe(recipe)}
                        className="cursor-pointer"
                      >
                        <Card className="overflow-hidden border-saffron-100 hover:shadow-xl transition-all">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={recipe.image} 
                              alt={recipe.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                                {recipe.difficulty}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{recipe.name}</h4>
                            <p className="text-sm text-saffron-600 mb-2 font-marathi">{recipe.nameDevanagari}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{recipe.description}</p>
                            <div className="flex gap-2 text-xs text-gray-500">
                              <span>⏱️ {recipe.prepTime}</span>
                              <span>👨‍🍳 {recipe.cookTime}</span>
                              <span>🍽️ {recipe.servings}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Decorations Tab */}
              {activeTab === 'decorations' && (
                <motion.div
                  key="decorations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-semibold text-saffron-800 mb-4">
                    Decoration Ideas
                  </h3>
                  {festival.decorations.map((decoration, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-saffron-100">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-saffron-400 to-rose-400 rounded-lg">
                              <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-semibold text-gray-900 mb-2">{decoration.title}</h4>
                              <p className="text-gray-700 leading-relaxed">{decoration.description}</p>
                            </div>
                          </div>

                          {decoration.images && decoration.images.length > 0 && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <img 
                                src={decoration.images[0]} 
                                alt={decoration.title}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Materials Needed:</h5>
                              <ul className="space-y-1">
                                {decoration.materials.map((material, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-saffron-500 mt-1">•</span>
                                    <span>{material}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Beginner Tips:</h5>
                              <ul className="space-y-1">
                                {decoration.beginnerTips?.map((tip, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span>{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-semibold text-gray-900 mb-3">Steps:</h5>
                            <ol className="space-y-2">
                              {decoration.steps.map((step, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-saffron-500 text-white flex items-center justify-center text-xs">
                                    {idx + 1}
                                  </span>
                                  <span className="flex-1 pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(decoration.difficulty)}`}>
                              {decoration.difficulty}
                            </span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {decoration.timeNeeded}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Shopping List Tab */}
              {activeTab === 'shopping' && (
                <motion.div
                  key="shopping"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-saffron-800">
                      Shopping Checklist
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCheckedItems(new Set())}
                      className="text-sm"
                    >
                      Clear All
                    </Button>
                  </div>
                  {Object.entries(festival.shoppingList).map(([category, items], catIndex) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: catIndex * 0.1 }}
                    >
                      <Card className="border-saffron-100">
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 capitalize flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-saffron-600" />
                            {category}
                          </h4>
                          <ul className="space-y-2">
                            {items.map((item, idx) => {
                              const itemKey = `${category}-${item}`
                              const isChecked = checkedItems.has(itemKey)
                              return (
                                <li key={idx}>
                                  <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleShoppingItem(itemKey)}
                                      className="w-5 h-5 text-saffron-600 rounded border-gray-300 focus:ring-saffron-500"
                                    />
                                    <span className={`flex-1 ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                      {item}
                                    </span>
                                    {isChecked && (
                                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    )}
                                  </label>
                                </li>
                              )
                            })}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedRecipe.name}</h3>
              <p className="text-xl text-saffron-600 mb-3 font-marathi">{selectedRecipe.nameDevanagari}</p>
              <p className="text-gray-700 mb-4">{selectedRecipe.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedRecipe.difficulty)}`}>
                  {selectedRecipe.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  Prep: {selectedRecipe.prepTime}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                  Cook: {selectedRecipe.cookTime}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  Serves: {selectedRecipe.servings}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Ingredients</h4>
                <ul className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start gap-2">
                      <span className="text-saffron-500 mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-saffron-400 to-rose-400 text-white flex items-center justify-center font-semibold">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-gray-700 pt-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {selectedRecipe.tips.map((tip, idx) => (
                      <li key={idx} className="text-yellow-900 text-sm flex items-start gap-2">
                        <span className="mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

