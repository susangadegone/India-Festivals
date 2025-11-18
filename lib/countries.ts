// Country and tradition configurations
export type Country = 'india'

export interface CountryConfig {
  id: Country
  name: string
  nativeName: string
  flag: string
  festivalsDataPath: string
  color: string
  description: string
}

export const countries: CountryConfig[] = [
  {
    id: 'india',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    festivalsDataPath: '/data/comprehensive-festivals.json',
    color: '#10B981',
    description: 'Hindu and Marathi festivals celebrating India\'s rich cultural heritage'
  }
]

export function getCountryConfig(country: Country): CountryConfig {
  return countries.find(c => c.id === country) || countries[0]
}

