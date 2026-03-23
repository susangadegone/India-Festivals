/** @type {import('next').NextConfig} */
// GitHub Pages: https://<user>.github.io/<repo>/ → basePath = /repo-name
// Empty basePath in dev so http://localhost:3000/ works without a subpath.
const basePath =
  process.env.NODE_ENV === 'development' ? '' : '/India-Festivals'

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
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

module.exports = nextConfig