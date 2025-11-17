# 📝 How to Add More Festivals

This guide will help you add more Hindi and Marathi festivals to your India Festival Calendar app.

## 🎯 Quick Overview

All festival data is stored in JSON files. You just need to add new festival objects to these files!

---

## 📁 Files to Edit

### For Comprehensive Festivals (with full details):
**File**: `data/comprehensive-festivals.json`

This file contains detailed festivals with:
- Recipes (3-5 per festival)
- Decoration guides
- Step-by-step celebration instructions
- Shopping lists
- Overview and history

### For Simple Festivals:
**File**: `data/festivals.json`

This file contains basic festival information for the calendar view.

---

## 🆕 Adding a New Festival

### Step 1: Add to `comprehensive-festivals.json`

Copy this template and fill in the details:

```json
{
  "id": "unique-festival-id",
  "name": "Festival Name in English",
  "nameDevanagari": "हिंदी/मराठी नाम",
  "date": "2025-MM-DD",
  "category": "religious",
  "color": "#FF6B35",
  "tagline": "Short inspiring tagline about the festival",
  "heroImage": "https://images.unsplash.com/photo-xxxxx?w=800&q=80",
  "overview": {
    "brief": "Brief description of the festival",
    "history": "Historical background and origins",
    "significance": "Spiritual and cultural significance",
    "duration": "1 day / 5 days / etc",
    "region": "Pan-India / North India / Maharashtra"
  },
  "howToCelebrate": [
    {
      "step": 1,
      "title": "First Step Name",
      "description": "Detailed description of what to do",
      "timeNeeded": "2 hours",
      "difficulty": "Easy"
    }
  ],
  "recipes": [
    {
      "id": "recipe-unique-id",
      "name": "Recipe Name",
      "nameDevanagari": "हिंदी/मराठी नाम",
      "image": "https://images.unsplash.com/photo-xxxxx?w=400&q=80",
      "description": "Brief description of the dish",
      "difficulty": "Easy",
      "prepTime": "15 min",
      "cookTime": "30 min",
      "servings": "4 servings",
      "ingredients": [
        "2 cups flour",
        "1 cup sugar"
      ],
      "instructions": [
        "First step",
        "Second step"
      ],
      "tips": [
        "Helpful tip 1",
        "Helpful tip 2"
      ]
    }
  ],
  "decorations": [
    {
      "type": "Decoration Type",
      "title": "Decoration Name",
      "description": "What this decoration represents",
      "materials": [
        "Material 1",
        "Material 2"
      ],
      "difficulty": "Easy",
      "timeNeeded": "1 hour",
      "steps": [
        "Step 1",
        "Step 2"
      ],
      "images": [
        "https://images.unsplash.com/photo-xxxxx?w=400&q=80"
      ],
      "beginnerTips": [
        "Tip 1",
        "Tip 2"
      ]
    }
  ],
  "shoppingList": {
    "puja": ["Item 1", "Item 2"],
    "food": ["Item 1", "Item 2"],
    "decoration": ["Item 1", "Item 2"]
  }
}
```

### Step 2: Get Accurate Dates

Visit [Drik Panchang](https://www.drikpanchang.com/) to get accurate festival dates:

1. Go to https://www.drikpanchang.com/
2. Click on "Festivals" in the menu
3. Find your festival
4. Use the date in format: `2025-MM-DD`

### Step 3: Find Good Images

**For Hero Images** (800x800):
- Visit [Unsplash](https://unsplash.com)
- Search for: "diwali festival", "holi celebration", etc.
- Copy the image URL in format: `https://images.unsplash.com/photo-xxxxx?w=800&q=80`

**For Recipe Images** (400x400):
- Search for: "indian sweets", "ladoo", "modak", etc.
- Use format: `https://images.unsplash.com/photo-xxxxx?w=400&q=80`

---

## 📋 Categories

Choose one for your festival:
- `"religious"` - Spiritual/religious festivals (orange color)
- `"cultural"` - Cultural celebrations (yellow color)
- `"harvest"` - Harvest festivals (amber color)

---

## 🎨 Example: Adding "Ugadi" Festival

Here's a complete example:

```json
{
  "id": "ugadi",
  "name": "Ugadi",
  "nameDevanagari": "युगादि",
  "date": "2025-03-30",
  "category": "cultural",
  "color": "#FFC107",
  "tagline": "Celebrating the Telugu New Year with new beginnings",
  "heroImage": "https://images.unsplash.com/photo-1580495277611-fea67ea7a1e6?w=800&q=80",
  "overview": {
    "brief": "Ugadi marks the Telugu New Year and is celebrated with great enthusiasm in Andhra Pradesh, Telangana, and Karnataka.",
    "history": "The word Ugadi comes from 'Yuga' (era) and 'Adi' (beginning), marking the beginning of a new Hindu lunar calendar year.",
    "significance": "It symbolizes new beginnings, prosperity, and the cyclical nature of time in Hindu philosophy.",
    "duration": "1 day",
    "region": "South India (Andhra Pradesh, Telangana, Karnataka)"
  },
  "howToCelebrate": [
    {
      "step": 1,
      "title": "Clean and Decorate Home",
      "description": "Start with cleaning your home and decorating with mango leaves (torans) at the entrance.",
      "timeNeeded": "2 hours",
      "difficulty": "Easy"
    },
    {
      "step": 2,
      "title": "Prepare Ugadi Pachadi",
      "description": "Make the special dish combining six tastes representing life's experiences.",
      "timeNeeded": "30 minutes",
      "difficulty": "Medium"
    }
  ],
  "recipes": [
    {
      "id": "ugadi-pachadi",
      "name": "Ugadi Pachadi",
      "nameDevanagari": "युगादि पचडी",
      "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
      "description": "Special dish combining six tastes representing life",
      "difficulty": "Easy",
      "prepTime": "15 min",
      "cookTime": "15 min",
      "servings": "6 servings",
      "ingredients": [
        "1 raw mango (sour)",
        "2 tbsp jaggery (sweet)",
        "2 tbsp tamarind (tangy)",
        "1 tsp neem flowers (bitter)",
        "2 green chilies (spicy)",
        "Salt to taste"
      ],
      "instructions": [
        "Grate raw mango into small pieces",
        "Mix all ingredients together",
        "Add water to desired consistency",
        "Serve as prasad"
      ],
      "tips": [
        "Each taste represents a different emotion in life",
        "Eat it first thing in the morning for blessings"
      ]
    }
  ],
  "decorations": [
    {
      "type": "Door Decoration",
      "title": "Mango Leaf Toran",
      "description": "Traditional door decoration using fresh mango leaves",
      "materials": [
        "Fresh mango leaves",
        "Thread or string",
        "Marigold flowers"
      ],
      "difficulty": "Easy",
      "timeNeeded": "30 minutes",
      "steps": [
        "Collect fresh mango leaves",
        "Thread them onto a string",
        "Add marigold flowers between leaves",
        "Hang at the entrance door"
      ],
      "images": [
        "https://images.unsplash.com/photo-1597433336446-57c5c2ceb42c?w=400&q=80"
      ],
      "beginnerTips": [
        "Use artificial leaves if fresh ones aren't available",
        "Can be reused for multiple occasions"
      ]
    }
  ],
  "shoppingList": {
    "puja": ["Mango leaves", "Flowers", "Incense", "Camphor"],
    "food": ["Raw mango", "Jaggery", "Tamarind", "Neem flowers"],
    "decoration": ["Marigold flowers", "Rangoli colors"]
  }
}
```

---

## 🔍 Where to Place It

**In `comprehensive-festivals.json`:**
- Add your new festival object inside the main array `[...]`
- Place a comma after the previous festival object
- Paste your new festival object
- Make sure the JSON is valid (use a JSON validator)

**Example:**
```json
[
  {
    "id": "existing-festival",
    ...existing data...
  },
  {
    "id": "your-new-festival",
    ...your new data...
  }
]
```

---

## ✅ Testing Your Addition

After adding a festival:

1. Save the file
2. Run: `npm run dev`
3. Check the calendar - your festival should appear on its date
4. Click on it to see the full details
5. Check the Hindi/Marathi tab to see if it appears there

---

## 🎯 Popular Hindi Festivals to Add

Use [Drik Panchang](https://www.drikpanchang.com/) for accurate dates:

### Already Included:
- ✅ Diwali
- ✅ Holi
- ✅ Raksha Bandhan
- ✅ Janmashtami
- ✅ Ram Navami
- ✅ Maha Shivratri
- ✅ Navratri
- ✅ Ganesh Chaturthi

### Popular Ones to Add:
- 🆕 Karwa Chauth
- 🆕 Bhai Dooj
- 🆕 Teej
- 🆕 Lohri
- 🆕 Vasant Panchami
- 🆕 Hanuman Jayanti
- 🆕 Guru Purnima
- 🆕 Chhath Puja

### Marathi Festivals to Add:
- 🆕 Bail Pola
- 🆕 Narali Purnima
- 🆕 Vat Purnima
- 🆕 Bendur
- 🆕 Champa Shashthi

---

## 💡 Pro Tips

1. **Dates**: Always use YYYY-MM-DD format
2. **Images**: Use high-quality images from Unsplash
3. **Devanagari**: Use Google Translate for accurate Hindi/Marathi names
4. **Recipes**: Include at least 2-3 recipes per festival
5. **Testing**: Always test after adding to ensure no JSON errors
6. **Categories**: Keep it simple - religious, cultural, or harvest
7. **Shopping Lists**: Group items logically (puja, food, decoration)

---

## 🔧 Troubleshooting

**App doesn't show new festival?**
- Check JSON syntax (use jsonlint.com)
- Make sure date format is correct
- Verify the file is saved

**Festival appears but details are broken?**
- Check image URLs are valid
- Ensure all required fields are filled
- Verify array syntax for recipes/decorations

---

## 🌟 Need Help?

- Check existing festivals in the file for reference
- Use a JSON validator to check syntax
- Follow the exact structure shown in examples
- Test one festival at a time

Happy Festival Adding! 🎉


