// Comprehensive script to create full festival dataset with all required fields
const fs = require('fs');
const path = require('path');

// Read existing festivals
const existingFestivals = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/comprehensive-festivals.json'), 'utf8')
);

// Template for creating new festivals (simplified structure)
const createFestivalTemplate = (id, name, nameDevanagari, date2025, date2026, region, primaryStates, dateType, importance, category, month) => {
  return {
    id,
    name,
    nameDevanagari,
    date: date2025,
    date_2025: date2025,
    date_2026: date2026,
    region,
    primary_states: primaryStates,
    date_type: dateType,
    importance,
    category,
    month,
    color: getColorForRegion(region),
    tagline: `Celebrating ${name}`,
    heroImage: `https://images.unsplash.com/photo-${getRandomImageId()}?w=800&q=80`,
    overview: {
      brief: `${name} is an important festival celebrated across ${primaryStates.join(', ')}.`,
      history: `The festival of ${name} has deep cultural and religious significance.`,
      significance: `${name} represents important values and traditions.`,
      duration: "1 day",
      region: region === 'Marathi' ? 'Maharashtra' : region === 'Hindi' ? 'Hindi Belt' : 'Pan-India'
    },
    howToCelebrate: [
      {
        step: 1,
        title: "Prepare for the Festival",
        description: `Begin preparations a few days before ${name}. Clean your home and gather necessary items.`,
        timeNeeded: "2-3 hours",
        difficulty: "Easy"
      },
      {
        step: 2,
        title: "Perform Puja/Rituals",
        description: `On the day of ${name}, perform the traditional puja and rituals as per your region's customs.`,
        timeNeeded: "1-2 hours",
        difficulty: "Medium"
      },
      {
        step: 3,
        title: "Celebrate with Family",
        description: `Spend time with family, share traditional foods, and participate in community celebrations.`,
        timeNeeded: "All day",
        difficulty: "Easy"
      }
    ],
    recipes: [
      {
        id: `${id}-recipe-1`,
        name: "Traditional Sweet",
        nameDevanagari: "मिठाई",
        image: `https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80`,
        description: "Traditional festival sweet",
        difficulty: "Medium",
        prepTime: "30 min",
        cookTime: "1 hour",
        servings: "10-12 pieces",
        ingredients: ["2 cups flour", "1 cup sugar", "1/2 cup ghee", "Spices"],
        instructions: ["Mix ingredients", "Cook on medium heat", "Shape and serve"],
        tips: ["Use fresh ingredients", "Cook on low-medium heat"]
      }
    ],
    decorations: [
      {
        type: "Traditional",
        title: "Festival Decorations",
        description: `Decorate your home for ${name} with traditional items.`,
        materials: ["Flowers", "Diyas", "Rangoli colors"],
        difficulty: "Easy",
        timeNeeded: "1 hour",
        steps: ["Clean entrance", "Create rangoli", "Place decorations"],
        images: [`https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80`],
        beginnerTips: ["Start simple", "Use templates"]
      }
    ],
    shoppingList: {
      puja: ["Idols", "Incense", "Flowers", "Camphor"],
      lighting: ["Diyas", "Oil", "Wicks"],
      decoration: ["Rangoli colors", "Flowers", "Garlands"],
      cooking: ["Ingredients", "Sweets", "Dry fruits"]
    }
  };
};

const getColorForRegion = (region) => {
  if (region === 'Marathi') return '#FF6B35'; // Orange
  if (region === 'Hindi') return '#10B981'; // Green
  return '#3B82F6'; // Blue for Pan-Indian
};

const getRandomImageId = () => {
  const ids = [
    '1609267684823-5c4c6f82a2b3',
    '1615796153287-98eacf0b94cf',
    '1599599810769-bcde5a160d32',
    '1606491956689-2ea866880c84',
    '1636403830156-e0c0b1e6ade3'
  ];
  return ids[Math.floor(Math.random() * ids.length)];
};

// Update existing festivals with new fields
const regionMapping = {
  'diwali': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Very High' },
  'holi': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Very High' },
  'ganesh-chaturthi': { region: 'Marathi', primary_states: ['Maharashtra', 'Goa', 'Karnataka', 'Telangana', 'Andhra Pradesh'], date_type: 'Lunar', importance: 'Very High' },
  'navratri': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Very High' },
  'gudi-padwa': { region: 'Marathi', primary_states: ['Maharashtra', 'Goa', 'Karnataka'], date_type: 'Lunar', importance: 'Very High' },
  'makar-sankranti': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Solar', importance: 'Very High' },
  'raksha-bandhan': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'High' },
  'janmashtami': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Very High' },
  'ram-navami': { region: 'Hindi', primary_states: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan'], date_type: 'Lunar', importance: 'High' },
  'maha-shivratri': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Very High' },
  'karwa-chauth': { region: 'Hindi', primary_states: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Rajasthan', 'Madhya Pradesh'], date_type: 'Lunar', importance: 'High' },
  'bhai-dooj': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'High' },
  'lohri': { region: 'Pan-Indian', primary_states: ['Punjab', 'Haryana', 'Delhi', 'Himachal Pradesh'], date_type: 'Solar', importance: 'High' },
  'vasant-panchami': { region: 'Pan-Indian', primary_states: ['All States'], date_type: 'Lunar', importance: 'Medium' },
  'chhath-puja': { region: 'Hindi', primary_states: ['Bihar', 'Jharkhand', 'Eastern Uttar Pradesh', 'Nepal'], date_type: 'Lunar', importance: 'Very High' },
};

// Date mappings (approximate - should be verified)
const dateMappings = {
  // 2025
  'diwali': { '2025': '2025-10-20', '2026': '2026-11-08' },
  'holi': { '2025': '2025-03-14', '2026': '2026-03-03' },
  'ganesh-chaturthi': { '2025': '2025-08-27', '2026': '2026-09-16' },
  'navratri': { '2025': '2025-09-22', '2026': '2026-10-12' },
  'gudi-padwa': { '2025': '2025-03-30', '2026': '2026-03-19' },
  'makar-sankranti': { '2025': '2025-01-14', '2026': '2026-01-14' },
  'raksha-bandhan': { '2025': '2025-08-09', '2026': '2026-08-29' },
  'janmashtami': { '2025': '2025-08-15', '2026': '2026-08-04' },
  'ram-navami': { '2025': '2025-04-06', '2026': '2026-03-26' },
  'maha-shivratri': { '2025': '2025-02-26', '2026': '2026-02-15' },
  'karwa-chauth': { '2025': '2025-10-23', '2026': '2026-11-11' },
  'bhai-dooj': { '2025': '2025-10-22', '2026': '2026-11-10' },
  'lohri': { '2025': '2025-01-13', '2026': '2026-01-13' },
  'vasant-panchami': { '2025': '2025-01-31', '2026': '2026-01-20' },
  'chhath-puja': { '2025': '2025-11-04', '2026': '2026-10-25' },
};

// Transform existing festivals
const transformedFestivals = existingFestivals.map(festival => {
  const mapping = regionMapping[festival.id] || { 
    region: 'Pan-Indian', 
    primary_states: ['All States'], 
    date_type: 'Lunar', 
    importance: 'Medium' 
  };
  
  const dates = dateMappings[festival.id] || { '2025': festival.date, '2026': festival.date };
  
  return {
    ...festival,
    region: mapping.region,
    primary_states: mapping.primary_states,
    date_type: mapping.date_type,
    importance: mapping.importance,
    date_2025: dates['2025'],
    date_2026: dates['2026'],
    date: dates['2025'],
    month: new Date(dates['2025']).toLocaleString('en-US', { month: 'long' })
  };
});

// Add new Marathi festivals
const newMarathiFestivals = [
  createFestivalTemplate('narali-pournima', 'Narali Pournima', 'नारळी पौर्णिमा', '2025-08-09', '2026-08-29', 'Marathi', ['Maharashtra', 'Goa'], 'Lunar', 'High', 'cultural', 'August'),
  createFestivalTemplate('pola', 'Pola', 'पोला', '2025-08-24', '2026-09-13', 'Marathi', ['Maharashtra'], 'Lunar', 'High', 'cultural', 'August'),
  createFestivalTemplate('bhaubeej', 'Bhaubeej', 'भाऊबीज', '2025-10-22', '2026-11-10', 'Marathi', ['Maharashtra', 'Goa', 'Karnataka'], 'Lunar', 'High', 'family', 'October'),
  createFestivalTemplate('shiv-jayanti', 'Shiv Jayanti', 'शिव जयंती', '2025-02-19', '2026-02-19', 'Marathi', ['Maharashtra'], 'Fixed', 'Very High', 'cultural', 'February'),
  createFestivalTemplate('nag-panchami', 'Nag Panchami', 'नाग पंचमी', '2025-07-29', '2026-08-18', 'Marathi', ['Maharashtra', 'Goa', 'Karnataka'], 'Lunar', 'Medium', 'religious', 'July'),
  createFestivalTemplate('ashadhi-ekadashi', 'Ashadhi Ekadashi', 'आषाढी एकादशी', '2025-07-06', '2026-06-26', 'Marathi', ['Maharashtra'], 'Lunar', 'Very High', 'religious', 'July'),
  createFestivalTemplate('vat-pournima', 'Vat Pournima', 'वट पौर्णिमा', '2025-06-10', '2026-05-30', 'Marathi', ['Maharashtra', 'Goa'], 'Lunar', 'High', 'family', 'June'),
  createFestivalTemplate('bail-pola', 'Bail Pola', 'बैल पोला', '2025-08-24', '2026-09-13', 'Marathi', ['Maharashtra'], 'Lunar', 'Medium', 'cultural', 'August'),
];

// Add new Hindi Belt festivals
const newHindiFestivals = [
  createFestivalTemplate('lathmar-holi', 'Lathmar Holi', 'लट्ठमार होली', '2025-03-14', '2026-03-03', 'Hindi', ['Uttar Pradesh'], 'Lunar', 'High', 'cultural', 'March'),
  createFestivalTemplate('madhushravani', 'Madhushravani', 'मधुश्रावणी', '2025-07-25', '2026-08-13', 'Hindi', ['Bihar', 'Jharkhand'], 'Lunar', 'High', 'family', 'July'),
  createFestivalTemplate('kartik-purnima', 'Kartik Purnima', 'कार्तिक पूर्णिमा', '2025-11-05', '2026-11-24', 'Hindi', ['Uttar Pradesh', 'Bihar', 'Uttarakhand'], 'Lunar', 'High', 'religious', 'November'),
  createFestivalTemplate('teej', 'Teej', 'तीज', '2025-08-18', '2026-09-07', 'Hindi', ['Rajasthan', 'Uttar Pradesh', 'Haryana'], 'Lunar', 'High', 'family', 'August'),
  createFestivalTemplate('govardhan-puja', 'Govardhan Puja', 'गोवर्धन पूजा', '2025-10-21', '2026-11-09', 'Hindi', ['Uttar Pradesh', 'Bihar', 'Rajasthan'], 'Lunar', 'High', 'religious', 'October'),
  createFestivalTemplate('shravani-mela', 'Shravani Mela', 'श्रावणी मेला', '2025-07-10', '2026-07-30', 'Hindi', ['Bihar', 'Jharkhand'], 'Lunar', 'Very High', 'religious', 'July'),
];

// Add new Pan-Indian festivals
const newPanIndianFestivals = [
  createFestivalTemplate('eid-ul-fitr', 'Eid ul-Fitr', 'ईद उल-फ़ित्र', '2025-03-31', '2026-03-20', 'Pan-Indian', ['All States'], 'Lunar', 'Very High', 'religious', 'March'),
  createFestivalTemplate('eid-ul-adha', 'Eid ul-Adha', 'ईद उल-अज़हा', '2025-06-07', '2026-05-27', 'Pan-Indian', ['All States'], 'Lunar', 'Very High', 'religious', 'June'),
  createFestivalTemplate('christmas', 'Christmas', 'क्रिसमस', '2025-12-25', '2026-12-25', 'Pan-Indian', ['All States'], 'Fixed', 'Very High', 'religious', 'December'),
  createFestivalTemplate('good-friday', 'Good Friday', 'गुड फ्राइडे', '2025-04-18', '2026-04-03', 'Pan-Indian', ['All States'], 'Fixed', 'High', 'religious', 'April'),
  createFestivalTemplate('buddha-purnima', 'Buddha Purnima', 'बुद्ध पूर्णिमा', '2025-05-12', '2026-05-01', 'Pan-Indian', ['All States'], 'Lunar', 'High', 'religious', 'May'),
  createFestivalTemplate('guru-nanak-jayanti', 'Guru Nanak Jayanti', 'गुरु नानक जयंती', '2025-11-15', '2026-11-05', 'Pan-Indian', ['Punjab', 'Haryana', 'Delhi'], 'Lunar', 'Very High', 'religious', 'November'),
  createFestivalTemplate('mahavir-jayanti', 'Mahavir Jayanti', 'महावीर जयंती', '2025-04-10', '2026-03-29', 'Pan-Indian', ['All States'], 'Lunar', 'High', 'religious', 'April'),
  createFestivalTemplate('republic-day', 'Republic Day', 'गणतंत्र दिवस', '2025-01-26', '2026-01-26', 'Pan-Indian', ['All States'], 'Fixed', 'Very High', 'national', 'January'),
  createFestivalTemplate('independence-day', 'Independence Day', 'स्वतंत्रता दिवस', '2025-08-15', '2026-08-15', 'Pan-Indian', ['All States'], 'Fixed', 'Very High', 'national', 'August'),
  createFestivalTemplate('gandhi-jayanti', 'Gandhi Jayanti', 'गांधी जयंती', '2025-10-02', '2026-10-02', 'Pan-Indian', ['All States'], 'Fixed', 'Very High', 'national', 'October'),
];

// Combine all festivals
const allFestivals = [
  ...transformedFestivals,
  ...newMarathiFestivals,
  ...newHindiFestivals,
  ...newPanIndianFestivals
];

// Sort by date
allFestivals.sort((a, b) => new Date(a.date) - new Date(b.date));

// Save
fs.writeFileSync(
  path.join(__dirname, '../data/comprehensive-festivals.json'),
  JSON.stringify(allFestivals, null, 2)
);

console.log(`Created comprehensive dataset with ${allFestivals.length} festivals`);
console.log(`- Existing: ${transformedFestivals.length}`);
console.log(`- New Marathi: ${newMarathiFestivals.length}`);
console.log(`- New Hindi: ${newHindiFestivals.length}`);
console.log(`- New Pan-Indian: ${newPanIndianFestivals.length}`);
console.log('\nFestivals by region:');
console.log(`- Marathi: ${allFestivals.filter(f => f.region === 'Marathi').length}`);
console.log(`- Hindi: ${allFestivals.filter(f => f.region === 'Hindi').length}`);
console.log(`- Pan-Indian: ${allFestivals.filter(f => f.region === 'Pan-Indian').length}`);

