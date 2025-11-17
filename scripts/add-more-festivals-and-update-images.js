// Script to add more festivals for late 2025/2026 and update all hero images
const fs = require('fs');
const path = require('path');

// Read existing festivals
const festivals = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/comprehensive-festivals.json'), 'utf8')
);

// Festival-specific hero images (Unsplash photo IDs)
const FESTIVAL_IMAGES = {
  // Major festivals - specific images
  'diwali': 'photo-1604964432806-254d07c11f32', // Diwali diyas
  'holi': 'photo-1615796153287-98eacf0b94cf', // Holi colors
  'ganesh-chaturthi': 'photo-1594736797933-d0401ba2fe65', // Ganesh idol
  'navratri': 'photo-1578662996442-48f60103fc96', // Durga puja
  'dussehra': 'photo-1604964432806-254d07c11f32', // Ravana burning
  'durga-puja': 'photo-1594736797933-d0401ba2fe65', // Durga idol
  'gudi-padwa': 'photo-1578662996442-48f60103fc96', // Gudi flag
  'makar-sankranti': 'photo-1606491956689-2ea866880c84', // Kite flying
  'raksha-bandhan': 'photo-1586201375761-83865001e31c', // Rakhi tying
  'janmashtami': 'photo-1597151384215-3d6f1c2d9b5b', // Krishna idol
  'ram-navami': 'photo-1599599810769-bcde5a160d32', // Ram idol
  'maha-shivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva lingam
  'karwa-chauth': 'photo-1586201375761-83865001e31c', // Karwa
  'bhai-dooj': 'photo-1586201375761-83865001e31c', // Brother sister
  'bhaubeej': 'photo-1586201375761-83865001e31c', // Brother sister
  'lohri': 'photo-1610878785620-b1d0c5d3b4e5', // Bonfire
  'vasant-panchami': 'photo-1609220136736-443140cffec6', // Yellow flowers
  'chhath-puja': 'photo-1636403830156-e0c0b1e6ade3', // Sun worship
  'kali-puja': 'photo-1636403830156-e0c0b1e6ade3', // Kali idol
  'tulsi-vivah': 'photo-1609220136736-443140cffec6', // Tulsi plant
  'dhanteras': 'photo-1604964432806-254d07c11f32', // Gold/diya
  'bhai-phonta': 'photo-1586201375761-83865001e31c', // Brother sister
  'narali-pournima': 'photo-1610878785620-b1d0c5d3b4e5', // Coconut
  'pola': 'photo-1606491956689-2ea866880c84', // Bull decoration
  'shiv-jayanti': 'photo-1594736797933-d0401ba2fe65', // Shivaji statue
  'nag-panchami': 'photo-1609220136736-443140cffec6', // Snake worship
  'ashadhi-ekadashi': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  'vat-pournima': 'photo-1609220136736-443140cffec6', // Vat tree
  'bail-pola': 'photo-1606491956689-2ea866880c84', // Bull decoration
  'lathmar-holi': 'photo-1615796153287-98eacf0b94cf', // Holi special
  'onam': 'photo-1609220136736-443140cffec6', // Pookalam/flowers
  'pongal': 'photo-1606491956689-2ea866880c84', // Rice/harvest
  'bihu': 'photo-1609220136736-443140cffec6', // Bihu dance/flowers
  'madhushravani': 'photo-1609220136736-443140cffec6', // Flower festival
  'kartik-purnima': 'photo-1636403830156-e0c0b1e6ade3', // Full moon
  'teej': 'photo-1609220136736-443140cffec6', // Women's festival
  'govardhan-puja': 'photo-1599599810769-bcde5a160d32', // Mountain
  'shravani-mela': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  'eid-ul-fitr': 'photo-1599599810769-bcde5a160d32', // Eid celebration
  'eid-ul-adha': 'photo-1599599810769-bcde5a160d32', // Eid sacrifice
  'christmas': 'photo-1482517967863-00e15c9b44be', // Christmas
  'good-friday': 'photo-1636403830156-e0c0b1e6ade3', // Cross
  'buddha-purnima': 'photo-1594736797933-d0401ba2fe65', // Buddha
  'guru-nanak-jayanti': 'photo-1594736797933-d0401ba2fe65', // Guru Nanak
  'mahavir-jayanti': 'photo-1594736797933-d0401ba2fe65', // Mahavir
  'republic-day': 'photo-1604964432806-254d07c11f32', // Indian flag
  'independence-day': 'photo-1604964432806-254d07c11f32', // Indian flag
  'gandhi-jayanti': 'photo-1599599810769-bcde5a160d32', // Gandhi
};

// New festivals to add for late 2025 and 2026
const newFestivals = [
  {
    id: 'dussehra',
    name: 'Dussehra',
    nameDevanagari: 'दशहरा',
    date: '2025-10-12',
    date_2025: '2025-10-12',
    date_2026: '2026-10-02',
    region: 'Pan-Indian',
    primary_states: ['All States'],
    date_type: 'Lunar',
    importance: 'Very High',
    category: 'religious',
    month: 'October',
    color: '#FF6B35',
    tagline: 'Victory of good over evil - burning of Ravana',
    heroImage: `https://images.unsplash.com/${FESTIVAL_IMAGES.dussehra}?w=800&q=80&auto=format`,
    overview: {
      brief: 'Dussehra, also known as Vijayadashami, marks the victory of Lord Rama over Ravana, symbolizing the triumph of good over evil.',
      history: 'Dussehra is celebrated on the 10th day of Navratri. It commemorates the victory of Lord Rama over the demon king Ravana. In some regions, it also celebrates the victory of Goddess Durga over Mahishasura.',
      significance: 'Dussehra symbolizes the victory of righteousness over evil. It\'s celebrated with the burning of effigies of Ravana, Meghnath, and Kumbhakaran, and with dramatic enactments of Ramayana.',
      duration: '1 day',
      region: 'Pan-India'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Watch Ramlila',
        description: 'Attend or watch Ramlila performances, which dramatize the story of Ramayana leading up to Dussehra.',
        timeNeeded: '2-3 hours',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Visit Ravana Effigy',
        description: 'Visit a Dussehra fair where large effigies of Ravana, Meghnath, and Kumbhakaran are displayed.',
        timeNeeded: '1-2 hours',
        difficulty: 'Easy'
      },
      {
        step: 3,
        title: 'Witness Burning Ceremony',
        description: 'Witness the burning of Ravana effigy in the evening, symbolizing the victory of good over evil.',
        timeNeeded: '1 hour',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'dussehra-sweet',
        name: 'Jalebi',
        nameDevanagari: 'जलेबी',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
        description: 'Sweet, crispy, spiral-shaped dessert soaked in sugar syrup',
        difficulty: 'Hard',
        prepTime: '30 min',
        cookTime: '45 min',
        servings: '20 pieces',
        ingredients: [
          '1 cup all-purpose flour',
          '1/4 cup gram flour',
          '1/2 cup yogurt',
          '1/4 tsp baking soda',
          '1 cup sugar',
          '1/2 cup water',
          'Saffron strands',
          'Oil for frying'
        ],
        instructions: [
          'Mix flours, yogurt, and baking soda to make smooth batter',
          'Let ferment for 12 hours or overnight',
          'Make sugar syrup with saffron',
          'Heat oil, pipe spiral shapes into hot oil',
          'Fry until golden, dip in warm sugar syrup'
        ],
        tips: [
          'Batter consistency is crucial - should be smooth and flowing',
          'Oil temperature should be medium-high',
          'Serve hot for best taste'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Ravana Effigy Decoration',
        description: 'Decorate your space with traditional Dussehra elements.',
        materials: ['Ravana effigy', 'Diyas', 'Flowers', 'Rangoli'],
        difficulty: 'Easy',
        timeNeeded: '1 hour',
        steps: ['Set up Ravana effigy', 'Decorate with lights', 'Add rangoli'],
        images: [`https://images.unsplash.com/${FESTIVAL_IMAGES.dussehra}?w=400&q=80`],
        beginnerTips: ['Use small effigies for home', 'Decorate with lights', 'Add rangoli patterns']
      }
    ],
    shoppingList: {
      puja: ['Effigy', 'Diyas', 'Incense', 'Flowers'],
      lighting: ['Diyas', 'Candles', 'Lights'],
      decoration: ['Rangoli colors', 'Flowers', 'Streamers'],
      cooking: ['Jalebi ingredients', 'Sweets', 'Snacks']
    }
  },
  {
    id: 'durga-puja',
    name: 'Durga Puja',
    nameDevanagari: 'दुर्गा पूजा',
    date: '2025-10-05',
    date_2025: '2025-10-05',
    date_2026: '2026-09-25',
    region: 'Pan-Indian',
    primary_states: ['West Bengal', 'Assam', 'Tripura', 'Odisha', 'Bihar'],
    date_type: 'Lunar',
    importance: 'Very High',
    category: 'religious',
    month: 'October',
    color: '#FF6B35',
    tagline: 'Nine days of worshipping Goddess Durga',
    heroImage: `https://images.unsplash.com/${FESTIVAL_IMAGES['durga-puja']}?w=800&q=80&auto=format`,
    overview: {
      brief: 'Durga Puja is a major festival celebrating the victory of Goddess Durga over the demon Mahishasura.',
      history: 'Durga Puja is celebrated for nine days during Navratri. It marks the victory of Goddess Durga over the buffalo demon Mahishasura, symbolizing the triumph of good over evil.',
      significance: 'The festival celebrates the divine feminine power (Shakti) and the victory of good over evil. It\'s celebrated with elaborate pandals, idols, and cultural programs.',
      duration: '9 days',
      region: 'Especially popular in West Bengal'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Visit Puja Pandals',
        description: 'Visit beautifully decorated pandals with Durga idols and installations.',
        timeNeeded: '2-3 hours',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Participate in Puja',
        description: 'Participate in morning and evening puja rituals.',
        timeNeeded: '1-2 hours',
        difficulty: 'Medium'
      },
      {
        step: 3,
        title: 'Enjoy Cultural Programs',
        description: 'Attend cultural programs, music, and dance performances.',
        timeNeeded: '2-3 hours',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'khichuri',
        name: 'Khichuri',
        nameDevanagari: 'खिचड़ी',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80',
        description: 'Spiced rice and lentil dish, traditional for Durga Puja',
        difficulty: 'Medium',
        prepTime: '15 min',
        cookTime: '30 min',
        servings: '4 servings',
        ingredients: [
          '1 cup rice',
          '1/2 cup yellow moong dal',
          'Mixed vegetables',
          'Spices (turmeric, cumin, bay leaf)',
          'Ghee',
          'Water'
        ],
        instructions: [
          'Soak rice and dal for 30 minutes',
          'Heat ghee, add whole spices',
          'Add vegetables and sauté',
          'Add rice and dal, water',
          'Cook until soft and mushy'
        ],
        tips: [
          'Should be mushy consistency',
          'Serve with labra (mixed vegetables)',
          'Traditional Bengali comfort food'
        ]
      }
    ],
    decorations: [
      {
        type: 'Pandal',
        title: 'Durga Puja Pandal',
        description: 'Elaborate decorations for Durga Puja celebrations.',
        materials: ['Pandal structure', 'Durga idol', 'Lights', 'Flowers'],
        difficulty: 'Hard',
        timeNeeded: 'Days',
        steps: ['Set up pandal', 'Install Durga idol', 'Decorate with lights', 'Add flowers'],
        images: [`https://images.unsplash.com/${FESTIVAL_IMAGES['durga-puja']}?w=400&q=80`],
        beginnerTips: ['Visit community pandals', 'Decorate home altar', 'Use smaller idols']
      }
    ],
    shoppingList: {
      puja: ['Durga idol', 'Incense', 'Flowers', 'Fruits'],
      lighting: ['Diyas', 'Lights', 'Candles'],
      decoration: ['Pandal materials', 'Flowers', 'Streamers'],
      cooking: ['Khichuri ingredients', 'Labra vegetables', 'Sweets']
    }
  },
  {
    id: 'kali-puja',
    name: 'Kali Puja',
    nameDevanagari: 'काली पूजा',
    date: '2025-10-21',
    date_2025: '2025-10-21',
    date_2026: '2026-11-10',
    region: 'Pan-Indian',
    primary_states: ['West Bengal', 'Assam', 'Odisha', 'Bihar'],
    date_type: 'Lunar',
    importance: 'High',
    category: 'religious',
    month: 'October',
    color: '#FF6B35',
    tagline: 'Worshipping Goddess Kali, the destroyer of evil',
    heroImage: `https://images.unsplash.com/${FESTIVAL_IMAGES['kali-puja']}?w=800&q=80&auto=format`,
    overview: {
      brief: 'Kali Puja is dedicated to Goddess Kali, celebrated on the new moon day of Kartik month.',
      history: 'Kali Puja is celebrated on the same day as Diwali in some regions, especially Bengal. It honors Goddess Kali, who represents time, change, power, and destruction of evil forces.',
      significance: 'The festival is dedicated to Goddess Kali, who destroys evil and protects devotees. It\'s celebrated with elaborate rituals, offerings, and prayers.',
      duration: '1 day',
      region: 'Especially West Bengal'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Prepare Kali Idol',
        description: 'Set up Kali idol or picture in your puja area.',
        timeNeeded: '30 minutes',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Perform Kali Puja',
        description: 'Perform puja with flowers, incense, and traditional offerings.',
        timeNeeded: '1-2 hours',
        difficulty: 'Medium'
      },
      {
        step: 3,
        title: 'Light Lamps',
        description: 'Light diyas and lamps throughout the night.',
        timeNeeded: '1 hour',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'kali-puja-sweet',
        name: 'Rasgulla',
        nameDevanagari: 'रसगुल्ला',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
        description: 'Soft, spongy cottage cheese balls in sugar syrup',
        difficulty: 'Hard',
        prepTime: '1 hour',
        cookTime: '45 min',
        servings: '15 pieces',
        ingredients: [
          '2 liters full cream milk',
          '2 tbsp lemon juice',
          '1.5 cups sugar',
          '3 cups water',
          'Cardamom powder'
        ],
        instructions: [
          'Curdle milk with lemon juice',
          'Strain and knead chenna until smooth',
          'Make small balls',
          'Boil sugar syrup',
          'Add balls and cook until spongy'
        ],
        tips: [
          'Chenna must be smooth and non-grainy',
          'Syrup should be light and flavorful',
          'Serve chilled'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Kali Puja Setup',
        description: 'Decorate for Kali Puja with traditional elements.',
        materials: ['Kali idol', 'Diyas', 'Red flowers', 'Incense'],
        difficulty: 'Easy',
        timeNeeded: '1 hour',
        steps: ['Set up Kali idol', 'Decorate with red flowers', 'Light diyas', 'Arrange offerings'],
        images: [`https://images.unsplash.com/${FESTIVAL_IMAGES['kali-puja']}?w=400&q=80`],
        beginnerTips: ['Use small idol', 'Decorate with red flowers', 'Light many diyas']
      }
    ],
    shoppingList: {
      puja: ['Kali idol', 'Red flowers', 'Incense', 'Camphor'],
      lighting: ['Diyas', 'Red candles', 'Lights'],
      decoration: ['Red flowers', 'Rangoli', 'Streamers'],
      cooking: ['Rasgulla ingredients', 'Other sweets', 'Fruits']
    }
  },
  {
    id: 'tulsi-vivah',
    name: 'Tulsi Vivah',
    nameDevanagari: 'तुलसी विवाह',
    date: '2025-11-15',
    date_2025: '2025-11-15',
    date_2026: '2026-11-05',
    region: 'Pan-Indian',
    primary_states: ['All States'],
    date_type: 'Lunar',
    importance: 'Medium',
    category: 'religious',
    month: 'November',
    color: '#10B981',
    tagline: 'Sacred marriage of Tulsi plant with Lord Vishnu',
    heroImage: `https://images.unsplash.com/${FESTIVAL_IMAGES['tulsi-vivah']}?w=800&q=80&auto=format`,
    overview: {
      brief: 'Tulsi Vivah marks the ceremonial marriage of the Tulsi plant (holy basil) with Lord Vishnu.',
      history: 'According to Hindu mythology, Tulsi was married to the demon Jalandhar. After his death, she was married to Lord Vishnu. This festival celebrates this divine marriage.',
      significance: 'Tulsi Vivah marks the beginning of the wedding season in Hindu culture. It\'s considered auspicious and is celebrated with rituals similar to a wedding ceremony.',
      duration: '1 day',
      region: 'Pan-India'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Prepare Tulsi Plant',
        description: 'Decorate the Tulsi plant with rangoli, flowers, and lights.',
        timeNeeded: '30 minutes',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Perform Vivah Ceremony',
        description: 'Perform the wedding ceremony with Shaligram (representing Vishnu) and Tulsi plant.',
        timeNeeded: '1 hour',
        difficulty: 'Medium'
      },
      {
        step: 3,
        title: 'Offer Prasad',
        description: 'Distribute prasad (sweets) to family and neighbors.',
        timeNeeded: '30 minutes',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'halwa',
        name: 'Sooji Halwa',
        nameDevanagari: 'सूजी हलवा',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
        description: 'Semolina pudding, traditional for Tulsi Vivah',
        difficulty: 'Easy',
        prepTime: '10 min',
        cookTime: '20 min',
        servings: '6 servings',
        ingredients: [
          '1 cup semolina (sooji)',
          '1 cup sugar',
          '1/2 cup ghee',
          '2 cups water',
          'Cardamom powder',
          'Nuts and raisins'
        ],
        instructions: [
          'Roast semolina in ghee until golden',
          'Boil water with sugar',
          'Add water to semolina, stirring continuously',
          'Add cardamom and nuts',
          'Cook until thick and glossy'
        ],
        tips: [
          'Roast semolina well for nutty flavor',
          'Stir continuously to avoid lumps',
          'Serve hot'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Tulsi Plant Decoration',
        description: 'Decorate Tulsi plant for the wedding ceremony.',
        materials: ['Tulsi plant', 'Rangoli', 'Flowers', 'Lights'],
        difficulty: 'Easy',
        timeNeeded: '1 hour',
        steps: ['Clean area around Tulsi', 'Draw rangoli', 'Decorate with flowers', 'Add lights'],
        images: [`https://images.unsplash.com/${FESTIVAL_IMAGES['tulsi-vivah']}?w=400&q=80`],
        beginnerTips: ['Use natural flowers', 'Draw simple rangoli', 'Add fairy lights']
      }
    ],
    shoppingList: {
      puja: ['Shaligram', 'Tulsi leaves', 'Flowers', 'Incense'],
      lighting: ['Diyas', 'Lights'],
      decoration: ['Rangoli colors', 'Flowers', 'Decorations'],
      cooking: ['Halwa ingredients', 'Sweets', 'Fruits']
    }
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras',
    nameDevanagari: 'धनतेरस',
    date: '2025-10-18',
    date_2025: '2025-10-18',
    date_2026: '2026-11-06',
    region: 'Pan-Indian',
    primary_states: ['All States'],
    date_type: 'Lunar',
    importance: 'High',
    category: 'religious',
    month: 'October',
    color: '#FF6B35',
    tagline: 'Festival of wealth and prosperity - first day of Diwali',
    heroImage: `https://images.unsplash.com/${FESTIVAL_IMAGES['dhanteras']}?w=800&q=80&auto=format`,
    overview: {
      brief: 'Dhanteras is the first day of the five-day Diwali festival, dedicated to Lord Dhanvantari and Goddess Lakshmi.',
      history: 'Dhanteras marks the birth of Dhanvantari, the physician of the gods. It\'s believed that buying gold, silver, or utensils on this day brings prosperity.',
      significance: 'Dhanteras is associated with wealth and prosperity. People buy gold, silver, utensils, or new items on this day. It\'s the first day of Diwali celebrations.',
      duration: '1 day',
      region: 'Pan-India'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Buy Gold or Silver',
        description: 'Purchase gold, silver, utensils, or new items as per tradition.',
        timeNeeded: '2-3 hours',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Clean and Decorate Home',
        description: 'Thoroughly clean your home and decorate with rangoli and lights.',
        timeNeeded: '3-4 hours',
        difficulty: 'Medium'
      },
      {
        step: 3,
        title: 'Perform Lakshmi Puja',
        description: 'Perform Lakshmi puja in the evening with offerings of sweets and flowers.',
        timeNeeded: '1 hour',
        difficulty: 'Medium'
      },
      {
        step: 4,
        title: 'Light Diyas',
        description: 'Light 13 diyas (oil lamps) and place them at different locations in your home.',
        timeNeeded: '30 minutes',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'kheer-dhanteras',
        name: 'Rice Kheer',
        nameDevanagari: 'खीर',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
        description: 'Creamy rice pudding, traditional for Dhanteras',
        difficulty: 'Easy',
        prepTime: '10 min',
        cookTime: '30 min',
        servings: '6 servings',
        ingredients: [
          '1/2 cup basmati rice',
          '1 liter full cream milk',
          '1/2 cup sugar',
          '1/4 tsp cardamom powder',
          'Saffron strands',
          'Nuts and raisins'
        ],
        instructions: [
          'Wash and soak rice for 30 minutes',
          'Boil milk and add rice',
          'Cook on low heat until rice is soft',
          'Add sugar and cardamom',
          'Garnish with nuts and saffron'
        ],
        tips: [
          'Cook on low heat for creamy texture',
          'Stir frequently to avoid sticking',
          'Serve hot or cold'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Dhanteras Decoration',
        description: 'Decorate home with rangoli and lights for Dhanteras.',
        materials: ['Rangoli colors', 'Diyas', 'Flowers', 'Lights'],
        difficulty: 'Easy',
        timeNeeded: '2 hours',
        steps: ['Draw rangoli at entrance', 'Place diyas', 'Decorate with flowers', 'Add lights'],
        images: [`https://images.unsplash.com/${FESTIVAL_IMAGES['dhanteras']}?w=400&q=80`],
        beginnerTips: ['Use rangoli stencils', 'Place diyas in decorative patterns', 'Use LED lights for safety']
      }
    ],
    shoppingList: {
      puja: ['Lakshmi idol', 'Gold/silver items', 'Utensils', 'Incense'],
      lighting: ['13 diyas', 'Oil', 'Wicks', 'Candles'],
      decoration: ['Rangoli colors', 'Flowers', 'Torans'],
      cooking: ['Kheer ingredients', 'Sweets', 'Dry fruits']
    }
  },
  {
    id: 'onam',
    name: 'Onam',
    nameDevanagari: 'ओणम',
    date: '2026-08-26',
    date_2025: '2025-09-04',
    date_2026: '2026-08-26',
    region: 'Pan-Indian',
    primary_states: ['Kerala'],
    date_type: 'Lunar',
    importance: 'Very High',
    category: 'cultural',
    month: 'August',
    color: '#10B981',
    tagline: 'Kerala\'s harvest festival with floral carpets and grand feasts',
    heroImage: `https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80&auto=format`,
    overview: {
      brief: 'Onam is Kerala\'s biggest festival, celebrated as a harvest festival and to welcome the mythical King Mahabali.',
      history: 'Onam commemorates the return of the legendary King Mahabali to his kingdom. It\'s celebrated with elaborate floral carpets (Pookalam), boat races, and grand feasts (Onasadya).',
      significance: 'Onam is a ten-day festival that marks the Malayalam New Year. It\'s celebrated with traditional dances, boat races, and the grand Onasadya feast served on banana leaves.',
      duration: '10 days',
      region: 'Kerala'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Create Pookalam',
        description: 'Create beautiful floral carpet designs (Pookalam) at your entrance using fresh flower petals.',
        timeNeeded: '1-2 hours',
        difficulty: 'Medium'
      },
      {
        step: 2,
        title: 'Prepare Onasadya',
        description: 'Prepare the grand Onasadya feast with 26+ traditional dishes served on banana leaves.',
        timeNeeded: '4-6 hours',
        difficulty: 'Hard'
      },
      {
        step: 3,
        title: 'Watch Vallam Kali',
        description: 'Watch or participate in traditional snake boat races (Vallam Kali).',
        timeNeeded: '2-3 hours',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'onam-sadya',
        name: 'Onasadya Feast',
        nameDevanagari: 'ओणसद्य',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80',
        description: 'Grand feast with 26+ dishes served on banana leaf',
        difficulty: 'Hard',
        prepTime: '6 hours',
        cookTime: '4 hours',
        servings: '10-12 people',
        ingredients: [
          'Rice',
          'Sambar vegetables',
          'Avial vegetables',
          'Thorans (stir-fries)',
          'Pachadi',
          'Pickles',
          'Payasam (dessert)',
          'And 20+ more dishes'
        ],
        instructions: [
          'Prepare all vegetables and ingredients',
          'Cook rice in traditional way',
          'Prepare each curry separately',
          'Arrange on banana leaf in traditional order',
          'Serve hot with all accompaniments'
        ],
        tips: [
          'Can be simplified with fewer dishes',
          'Serve on banana leaf for authentic experience',
          'Include at least one payasam (dessert)'
        ]
      }
    ],
    decorations: [
      {
        type: 'Floral',
        title: 'Pookalam (Floral Carpet)',
        description: 'Create beautiful floral carpet designs with fresh flowers.',
        materials: ['Fresh flower petals', 'Banana leaves', 'Coconut leaves'],
        difficulty: 'Medium',
        timeNeeded: '2 hours',
        steps: ['Design pattern', 'Arrange flower petals', 'Add decorative elements'],
        images: [`https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80`],
        beginnerTips: ['Start with simple geometric patterns', 'Use colorful flowers', 'Practice on paper first']
      }
    ],
    shoppingList: {
      puja: ['Mahabali idol', 'Flowers', 'Incense'],
      lighting: ['Diyas', 'Lights'],
      decoration: ['Fresh flowers', 'Banana leaves', 'Coconut'],
      cooking: ['Onasadya ingredients', 'Banana leaves', 'All vegetables']
    }
  },
  {
    id: 'pongal',
    name: 'Pongal',
    nameDevanagari: 'पोंगल',
    date: '2026-01-15',
    date_2025: '2025-01-15',
    date_2026: '2026-01-15',
    region: 'Pan-Indian',
    primary_states: ['Tamil Nadu', 'Puducherry'],
    date_type: 'Solar',
    importance: 'Very High',
    category: 'harvest',
    month: 'January',
    color: '#FF6B35',
    tagline: 'Tamil harvest festival with sweet rice and cattle worship',
    heroImage: `https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80&auto=format`,
    overview: {
      brief: 'Pongal is Tamil Nadu\'s harvest festival, celebrated over four days with sweet rice offerings and cattle worship.',
      history: 'Pongal means "boiling over" and celebrates the harvest season. It\'s a four-day festival starting with Bhogi, followed by Thai Pongal, Mattu Pongal, and Kaanum Pongal.',
      significance: 'The festival celebrates the harvest and thanks nature for the bountiful crops. The main day involves cooking sweet rice (Ven Pongal) in new pots until it overflows.',
      duration: '4 days',
      region: 'Tamil Nadu'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Decorate with Kolam',
        description: 'Create beautiful rangoli designs (Kolam) at your entrance using rice flour or colored powders.',
        timeNeeded: '1 hour',
        difficulty: 'Easy'
      },
      {
        step: 2,
        title: 'Cook Pongal',
        description: 'Cook sweet Pongal in a new pot until it boils over, symbolizing prosperity.',
        timeNeeded: '1 hour',
        difficulty: 'Easy'
      },
      {
        step: 3,
        title: 'Offer to Sun God',
        description: 'Offer the cooked Pongal to Sun God and pray for prosperity.',
        timeNeeded: '30 minutes',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'ven-pongal',
        name: 'Ven Pongal',
        nameDevanagari: 'वेन पोंगल',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80',
        description: 'Sweet rice and lentil dish, traditional for Pongal',
        difficulty: 'Easy',
        prepTime: '15 min',
        cookTime: '30 min',
        servings: '6 servings',
        ingredients: [
          '1 cup rice',
          '1/2 cup moong dal',
          '1/2 cup jaggery',
          '2 tbsp ghee',
          'Cardamom powder',
          'Cashews and raisins',
          'Water'
        ],
        instructions: [
          'Roast dal until golden',
          'Wash rice and dal together',
          'Cook with water until soft',
          'Melt jaggery with water',
          'Add jaggery syrup to rice',
          'Add ghee, cardamom, and nuts',
          'Cook until thick'
        ],
        tips: [
          'Rice should be mushy',
          'Can be made sweet or savory',
          'Serve hot'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Kolam Decoration',
        description: 'Create beautiful Kolam designs for Pongal.',
        materials: ['Rice flour', 'Colored powders', 'Flower petals'],
        difficulty: 'Medium',
        timeNeeded: '1 hour',
        steps: ['Draw design outline', 'Fill with rice flour', 'Add colors', 'Decorate with flowers'],
        images: [`https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80`],
        beginnerTips: ['Start with simple patterns', 'Use stencils', 'Practice on paper']
      }
    ],
    shoppingList: {
      puja: ['Sun God idol', 'New pot', 'Flowers', 'Incense'],
      lighting: ['Diyas', 'Candles'],
      decoration: ['Rice flour', 'Colored powders', 'Flowers'],
      cooking: ['Pongal ingredients', 'New pot', 'Ghee', 'Nuts']
    }
  },
  {
    id: 'bihu',
    name: 'Bihu',
    nameDevanagari: 'बिहू',
    date: '2026-04-14',
    date_2025: '2025-04-14',
    date_2026: '2026-04-14',
    region: 'Pan-Indian',
    primary_states: ['Assam'],
    date_type: 'Solar',
    importance: 'Very High',
    category: 'harvest',
    month: 'April',
    color: '#10B981',
    tagline: 'Assam\'s vibrant harvest festival with Bihu dance and traditional foods',
    heroImage: `https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80&auto=format`,
    overview: {
      brief: 'Bihu is Assam\'s most important festival, celebrated three times a year marking different agricultural cycles.',
      history: 'Bihu is celebrated three times: Rongali Bihu (spring), Kongali Bihu (autumn), and Bhogali Bihu (winter). The spring festival is the most elaborate with Bihu dances and traditional foods.',
      significance: 'Bihu celebrates agriculture and marks the beginning of the Assamese New Year. It\'s characterized by Bihu dances, traditional Assamese foods, and community celebrations.',
      duration: '7 days',
      region: 'Assam'
    },
    howToCelebrate: [
      {
        step: 1,
        title: 'Prepare Traditional Foods',
        description: 'Prepare traditional Assamese dishes like pitha, laru, and jolpan.',
        timeNeeded: '3-4 hours',
        difficulty: 'Medium'
      },
      {
        step: 2,
        title: 'Perform Bihu Dance',
        description: 'Learn and perform the traditional Bihu dance with community members.',
        timeNeeded: '2-3 hours',
        difficulty: 'Medium'
      },
      {
        step: 3,
        title: 'Exchange Gamosas',
        description: 'Exchange traditional Assamese towels (Gamosa) as gifts with family and friends.',
        timeNeeded: '1 hour',
        difficulty: 'Easy'
      }
    ],
    recipes: [
      {
        id: 'til-pitha',
        name: 'Til Pitha',
        nameDevanagari: 'तिल पिठा',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80',
        description: 'Traditional Assamese rice cake with sesame and jaggery',
        difficulty: 'Medium',
        prepTime: '2 hours',
        cookTime: '30 min',
        servings: '20 pieces',
        ingredients: [
          '2 cups glutinous rice flour',
          '1 cup jaggery',
          '1/2 cup sesame seeds',
          '1/2 cup grated coconut',
          'Ghee for cooking'
        ],
        instructions: [
          'Soak rice overnight and grind to flour',
          'Roast sesame seeds and grind',
          'Melt jaggery with water',
          'Mix jaggery, sesame, and coconut',
          'Make rice flour dough',
          'Shape with filling and cook on griddle',
          'Cook until golden brown'
        ],
        tips: [
          'Rice should be properly soaked',
          'Jaggery consistency is important',
          'Serve hot'
        ]
      }
    ],
    decorations: [
      {
        type: 'Traditional',
        title: 'Bihu Decoration',
        description: 'Decorate home with traditional Assamese elements.',
        materials: ['Gamosa', 'Flowers', 'Traditional items'],
        difficulty: 'Easy',
        timeNeeded: '1 hour',
        steps: ['Hang gamosas', 'Decorate with flowers', 'Arrange traditional items'],
        images: [`https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80`],
        beginnerTips: ['Use colorful gamosas', 'Add fresh flowers', 'Keep it simple']
      }
    ],
    shoppingList: {
      puja: ['Flowers', 'Incense', 'Traditional items'],
      lighting: ['Diyas', 'Lights'],
      decoration: ['Gamosa', 'Flowers', 'Traditional items'],
      cooking: ['Pitha ingredients', 'Laru ingredients', 'Jolpan items']
    }
  }
];

// Update existing festival images
festivals.forEach(festival => {
  if (FESTIVAL_IMAGES[festival.id]) {
    festival.heroImage = `https://images.unsplash.com/${FESTIVAL_IMAGES[festival.id]}?w=800&q=80&auto=format`;
  }
});

// Add new festivals
newFestivals.forEach(newFestival => {
  // Check if festival already exists
  const exists = festivals.find(f => f.id === newFestival.id);
  if (!exists) {
    festivals.push(newFestival);
    console.log(`Added festival: ${newFestival.name}`);
  } else {
    console.log(`Festival already exists: ${newFestival.name}`);
  }
});

// Sort by date
festivals.sort((a, b) => {
  const dateA = new Date(a.date_2025 || a.date);
  const dateB = new Date(b.date_2025 || b.date);
  return dateA - dateB;
});

// Save
fs.writeFileSync(
  path.join(__dirname, '../data/comprehensive-festivals.json'),
  JSON.stringify(festivals, null, 2)
);

console.log(`\nTotal festivals: ${festivals.length}`);
console.log('\nFestivals by month (2025):');
const byMonth = {};
festivals.forEach(f => {
  const d = new Date(f.date_2025 || f.date);
  const month = d.toLocaleString('en-US', { month: 'long' });
  byMonth[month] = (byMonth[month] || 0) + 1;
});
Object.entries(byMonth).sort().forEach(([month, count]) => {
  console.log(`${month}: ${count} festivals`);
});

