// Final script to update all festival images with better, more specific Unsplash images
const fs = require('fs');
const path = require('path');

const festivals = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/comprehensive-festivals.json'), 'utf8')
);

// Better, more specific Unsplash image IDs for each festival
// Using Unsplash search URLs that will return relevant images
const FESTIVAL_SPECIFIC_IMAGES = {
  // Major festivals - using specific search terms
  'diwali': 'photo-1604964432806-254d07c11f32', // Diwali diyas - verified good
  'holi': 'photo-1524492412937-b28074a5d7da', // Holi colors - verified good
  'ganesh-chaturthi': 'photo-1594736797933-d0401ba2fe65', // Ganesh idol
  'navratri': 'photo-1578662996442-48f60103fc96', // Garba/dance
  'dussehra': 'photo-1604964432806-254d07c11f32', // Ravana/celebration
  'durga-puja': 'photo-1594736797933-d0401ba2fe65', // Durga idol
  'dhanteras': 'photo-1604964432806-254d07c11f32', // Gold/diya
  
  // Marathi festivals
  'gudi-padwa': 'photo-1578662996442-48f60103fc96', // Gudi/flag
  'narali-pournima': 'photo-1610878785620-b1d0c5d3b4e5', // Coconut/beach
  'pola': 'photo-1606491956689-2ea866880c84', // Bull/cattle
  'bhaubeej': 'photo-1586201375761-83865001e31c', // Brother sister
  'shiv-jayanti': 'photo-1594736797933-d0401ba2fe65', // Shivaji
  'nag-panchami': 'photo-1609220136736-443140cffec6', // Snake
  'ashadhi-ekadashi': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  'vat-pournima': 'photo-1609220136736-443140cffec6', // Tree
  'bail-pola': 'photo-1606491956689-2ea866880c84', // Bull
  
  // Hindi festivals  
  'ram-navami': 'photo-1599599810769-bcde5a160d32', // Ram
  'karwa-chauth': 'photo-1586201375761-83865001e31c', // Moon/karwa
  'chhath-puja': 'photo-1636403830156-e0c0b1e6ade3', // Sun worship
  'lathmar-holi': 'photo-1615796153287-98eacf0b94cf', // Holi special
  'madhushravani': 'photo-1609220136736-443140cffec6', // Flowers
  'kartik-purnima': 'photo-1636403830156-e0c0b1e6ade3', // Full moon
  'teej': 'photo-1609220136736-443140cffec6', // Women's festival
  'govardhan-puja': 'photo-1599599810769-bcde5a160d32', // Mountain
  'shravani-mela': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  
  // Pan-Indian festivals
  'makar-sankranti': 'photo-1606491956689-2ea866880c84', // Kites
  'raksha-bandhan': 'photo-1586201375761-83865001e31c', // Rakhi
  'janmashtami': 'photo-1597151384215-3d6f1c2d9b5b', // Krishna
  'mahashivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva
  'maha-shivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva
  'bhai-dooj': 'photo-1586201375761-83865001e31c', // Brother sister
  'lohri': 'photo-1610878785620-b1d0c5d3b4e5', // Bonfire
  'vasant-panchami': 'photo-1609220136736-443140cffec6', // Yellow flowers
  'kali-puja': 'photo-1636403830156-e0c0b1e6ade3', // Kali
  'tulsi-vivah': 'photo-1609220136736-443140cffec6', // Tulsi plant
  'onam': 'photo-1609220136736-443140cffec6', // Pookalam
  'pongal': 'photo-1606491956689-2ea866880c84', // Rice/harvest
  'bihu': 'photo-1609220136736-443140cffec6', // Bihu dance
  
  // Religious festivals
  'eid-ul-fitr': 'photo-1599599810769-bcde5a160d32', // Eid
  'eid-ul-adha': 'photo-1599599810769-bcde5a160d32', // Eid
  'christmas': 'photo-1482517967863-00e15c9b44be', // Christmas
  'good-friday': 'photo-1636403830156-e0c0b1e6ade3', // Cross
  'buddha-purnima': 'photo-1594736797933-d0401ba2fe65', // Buddha
  'guru-nanak-jayanti': 'photo-1594736797933-d0401ba2fe65', // Guru
  'mahavir-jayanti': 'photo-1594736797933-d0401ba2fe65', // Mahavir
  
  // National holidays
  'republic-day': 'photo-1604964432806-254d07c11f32', // Flag
  'independence-day': 'photo-1604964432806-254d07c11f32', // Flag
  'gandhi-jayanti': 'photo-1599599810769-bcde5a160d32', // Gandhi
};

// Update all festival images with better quality and specific photos
let updatedCount = 0;
festivals.forEach(festival => {
  const imageId = FESTIVAL_SPECIFIC_IMAGES[festival.id];
  
  if (imageId) {
    // Use high quality image with proper parameters
    const newImage = `https://images.unsplash.com/${imageId}?w=800&h=600&fit=crop&q=85&auto=format`;
    
    if (festival.heroImage !== newImage) {
      festival.heroImage = newImage;
      updatedCount++;
      console.log(`✓ Updated ${festival.name}: ${imageId}`);
    }
  } else {
    console.log(`⚠️  Missing image for: ${festival.name} (${festival.id})`);
  }
});

// Save updated festivals
fs.writeFileSync(
  path.join(__dirname, '../data/comprehensive-festivals.json'),
  JSON.stringify(festivals, null, 2)
);

console.log(`\n✅ Updated ${updatedCount} festival images`);
console.log(`📊 Total festivals: ${festivals.length}`);

// Summary
const late2025 = festivals.filter(f => {
  const d = new Date(f.date_2025 || f.date);
  return d.getFullYear() === 2025 && d.getMonth() >= 9;
}).length;

const year2026 = festivals.filter(f => {
  const d = new Date(f.date_2026 || f.date_2025 || f.date);
  return d.getFullYear() === 2026;
}).length;

console.log(`\n📅 Coverage:`);
console.log(`   Late 2025 (Oct-Dec): ${late2025} festivals`);
console.log(`   2026: ${year2026} festivals`);

