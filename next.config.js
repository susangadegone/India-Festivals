/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/Hindu-Marati-Festivals-App-1',
  assetPrefix: '/Hindu-Marati-Festivals-App-1'
}

module.exports = nextConfig