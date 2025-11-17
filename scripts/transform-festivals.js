// Script to transform festivals data with new structure
const fs = require('fs');
const path = require('path');

// Read existing festivals
const existingFestivals = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/comprehensive-festivals.json'), 'utf8')
);

// Festival date mappings for 2025-2026 (approximate - should be verified with Panchang)
const festivalDates = {
  // 2025 Dates
  'diwali-2025': '2025-10-20',
  'holi-2025': '2025-03-14',
  'ganesh-chaturthi-2025': '2025-08-27',
  'navratri-2025': '2025-09-22',
  'gudi-padwa-2025': '2025-03-30',
  'makar-sankranti-2025': '2025-01-14',
  'raksha-bandhan-2025': '2025-08-09',
  'janmashtami-2025': '2025-08-15',
  'ram-navami-2025': '2025-04-06',
  'maha-shivratri-2025': '2025-02-26',
  'karwa-chauth-2025': '2025-10-23',
  'bhai-dooj-2025': '2025-10-22',
  'lohri-2025': '2025-01-13',
  'vasant-panchami-2025': '2025-01-31',
  'chhath-puja-2025': '2025-11-04',
  
  // 2026 Dates
  'diwali-2026': '2026-11-08',
  'holi-2026': '2026-03-03',
  'ganesh-chaturthi-2026': '2026-09-16',
  'navratri-2026': '2026-10-12',
  'gudi-padwa-2026': '2026-03-19',
  'makar-sankranti-2026': '2026-01-14',
  'raksha-bandhan-2026': '2026-08-29',
  'janmashtami-2026': '2026-08-04',
  'ram-navami-2026': '2026-03-26',
  'maha-shivratri-2026': '2026-02-15',
  'karwa-chauth-2026': '2026-11-11',
  'bhai-dooj-2026': '2026-11-10',
  'lohri-2026': '2026-01-13',
  'vasant-panchami-2026': '2026-01-20',
  'chhath-puja-2026': '2026-10-25',
};

// Region mapping for existing festivals
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

// Transform existing festivals
const transformedFestivals = existingFestivals.map(festival => {
  const mapping = regionMapping[festival.id] || { 
    region: 'Pan-Indian', 
    primary_states: ['All States'], 
    date_type: 'Lunar', 
    importance: 'Medium' 
  };
  
  return {
    ...festival,
    region: mapping.region,
    primary_states: mapping.primary_states,
    date_type: mapping.date_type,
    importance: mapping.importance,
    date_2025: festivalDates[`${festival.id}-2025`] || festival.date,
    date_2026: festivalDates[`${festival.id}-2026`] || festival.date,
    // Update date to 2025 by default
    date: festivalDates[`${festival.id}-2025`] || festival.date,
  };
});

console.log(`Transformed ${transformedFestivals.length} existing festivals`);

// Export
fs.writeFileSync(
  path.join(__dirname, '../data/festivals-transformed.json'),
  JSON.stringify(transformedFestivals, null, 2)
);

console.log('Transformed festivals saved to data/festivals-transformed.json');

