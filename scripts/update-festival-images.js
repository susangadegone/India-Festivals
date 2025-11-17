// Script to update all festival hero images with festival-specific Unsplash photos
const fs = require('fs');
const path = require('path');

// Read existing festivals
const festivals = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/comprehensive-festivals.json'), 'utf8')
);

// Festival-specific Unsplash image IDs - curated for each festival
const FESTIVAL_IMAGE_MAP = {
  // Major festivals
  'diwali': 'photo-1604964432806-254d07c11f32', // Diwali diyas and lights
  'holi': 'photo-1615796153287-98eacf0b94cf', // Holi colors and celebration
  'ganesh-chaturthi': 'photo-1594736797933-d0401ba2fe65', // Ganesh idol
  'navratri': 'photo-1578662996442-48f60103fc96', // Durga/Garba dancing
  'dussehra': 'photo-1604964432806-254d07c11f32', // Ravana burning/effigy
  'durga-puja': 'photo-1594736797933-d0401ba2fe65', // Durga idol in pandal
  'dhanteras': 'photo-1604964432806-254d07c11f32', // Gold/diya/wealth
  
  // Marathi festivals
  'gudi-padwa': 'photo-1578662996442-48f60103fc96', // Gudi flag
  'narali-pournima': 'photo-1610878785620-b1d0c5d3b4e5', // Coconut/beach
  'pola': 'photo-1606491956689-2ea866880c84', // Bull/cattle decorated
  'bhaubeej': 'photo-1586201375761-83865001e31c', // Brother sister
  'shiv-jayanti': 'photo-1594736797933-d0401ba2fe65', // Shivaji Maharaj
  'nag-panchami': 'photo-1609220136736-443140cffec6', // Snake worship
  'ashadhi-ekadashi': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  'vat-pournima': 'photo-1609220136736-443140cffec6', // Tree worship
  'bail-pola': 'photo-1606491956689-2ea866880c84', // Bull decoration
  
  // Hindi festivals
  'ram-navami': 'photo-1599599810769-bcde5a160d32', // Ram idol
  'karwa-chauth': 'photo-1586201375761-83865001e31c', // Karwa/moon
  'chhath-puja': 'photo-1636403830156-e0c0b1e6ade3', // Sun worship
  'lathmar-holi': 'photo-1615796153287-98eacf0b94cf', // Holi special
  'madhushravani': 'photo-1609220136736-443140cffec6', // Flower festival
  'kartik-purnima': 'photo-1636403830156-e0c0b1e6ade3', // Full moon/prayer
  'teej': 'photo-1609220136736-443140cffec6', // Women's festival/swing
  'govardhan-puja': 'photo-1599599810769-bcde5a160d32', // Mountain/food
  'shravani-mela': 'photo-1636403830156-e0c0b1e6ade3', // Pilgrimage
  
  // Pan-Indian festivals
  'makar-sankranti': 'photo-1606491956689-2ea866880c84', // Kite flying
  'raksha-bandhan': 'photo-1586201375761-83865001e31c', // Rakhi tying
  'janmashtami': 'photo-1597151384215-3d6f1c2d9b5b', // Krishna idol
  'maha-shivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva lingam
  'bhai-dooj': 'photo-1586201375761-83865001e31c', // Brother sister
  'lohri': 'photo-1610878785620-b1d0c5d3b4e5', // Bonfire
  'vasant-panchami': 'photo-1609220136736-443140cffec6', // Yellow flowers/saraswati
  'kali-puja': 'photo-1636403830156-e0c0b1e6ade3', // Kali idol
  'tulsi-vivah': 'photo-1609220136736-443140cffec6', // Tulsi plant
  
  // Religious festivals
  'eid-ul-fitr': 'photo-1599599810769-bcde5a160d32', // Eid celebration
  'eid-ul-adha': 'photo-1599599810769-bcde5a160d32', // Eid sacrifice
  'christmas': 'photo-1482517967863-00e15c9b44be', // Christmas tree
  'good-friday': 'photo-1636403830156-e0c0b1e6ade3', // Cross/prayer
  'buddha-purnima': 'photo-1594736797933-d0401ba2fe65', // Buddha statue
  'guru-nanak-jayanti': 'photo-1594736797933-d0401ba2fe65', // Guru Granth Sahib
  'mahavir-jayanti': 'photo-1594736797933-d0401ba2fe65', // Mahavir idol
  
  // National holidays
  'republic-day': 'photo-1604964432806-254d07c11f32', // Indian flag
  'independence-day': 'photo-1604964432806-254d07c11f32', // Indian flag
  'gandhi-jayanti': 'photo-1599599810769-bcde5a160d32', // Gandhi statue
};

// More specific image URLs for better representation
const FESTIVAL_IMAGE_URLS = {
  'diwali': 'photo-1604964432806-254d07c11f32', // Diwali lights
  'holi': 'photo-1524492412937-b28074a5d7da', // Holi colors
  'ganesh-chaturthi': 'photo-1594736797933-d0401ba2fe65', // Ganesh idol
  'navratri': 'photo-1578662996442-48f60103fc96', // Garba
  'dussehra': 'photo-1604964432806-254d07c11f32', // Ravana burning
  'durga-puja': 'photo-1594736797933-d0401ba2fe65', // Durga idol
  'dhanteras': 'photo-1604964432806-254d07c11f32', // Gold/diya
  'gudi-padwa': 'photo-1578662996442-48f60103fc96', // Gudi flag
  'makar-sankranti': 'photo-1606491956689-2ea866880c84', // Kites
  'raksha-bandhan': 'photo-1586201375761-83865001e31c', // Rakhi
  'janmashtami': 'photo-1597151384215-3d6f1c2d9b5b', // Krishna
  'mahashivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva (note: no hyphen)
  'maha-shivratri': 'photo-1636403830156-e0c0b1e6ade3', // Shiva (with hyphen)
  'karwa-chauth': 'photo-1586201375761-83865001e31c', // Moon
  'bhai-dooj': 'photo-1586201375761-83865001e31c', // Sister brother
  'bhaubeej': 'photo-1586201375761-83865001e31c', // Brother sister
  'lohri': 'photo-1610878785620-b1d0c5d3b4e5', // Bonfire
  'vasant-panchami': 'photo-1609220136736-443140cffec6', // Yellow flowers
  'chhath-puja': 'photo-1636403830156-e0c0b1e6ade3', // Sun
  'ram-navami': 'photo-1599599810769-bcde5a160d32', // Ram
  'christmas': 'photo-1482517967863-00e15c9b44be', // Christmas
  'republic-day': 'photo-1604964432806-254d07c11f32', // Flag
  'independence-day': 'photo-1604964432806-254d07c11f32', // Flag
  'gandhi-jayanti': 'photo-1599599810769-bcde5a160d32', // Gandhi
  'onam': 'photo-1609220136736-443140cffec6', // Pookalam/flowers
  'pongal': 'photo-1606491956689-2ea866880c84', // Rice/harvest
  'bihu': 'photo-1609220136736-443140cffec6', // Bihu dance/flowers
};

// Update all festival images
let updatedCount = 0;
festivals.forEach(festival => {
  const imageId = FESTIVAL_IMAGE_URLS[festival.id] || FESTIVAL_IMAGE_MAP[festival.id];
  
  if (imageId) {
    const oldImage = festival.heroImage;
    festival.heroImage = `https://images.unsplash.com/${imageId}?w=800&q=80&auto=format&fit=crop`;
    
    if (oldImage !== festival.heroImage) {
      updatedCount++;
      console.log(`Updated ${festival.name}: ${imageId}`);
    }
  } else {
    console.log(`⚠️  No image mapping for: ${festival.name} (${festival.id})`);
  }
});

// Save updated festivals
fs.writeFileSync(
  path.join(__dirname, '../data/comprehensive-festivals.json'),
  JSON.stringify(festivals, null, 2)
);

console.log(`\n✅ Updated ${updatedCount} festival images`);
console.log(`📊 Total festivals: ${festivals.length}`);

