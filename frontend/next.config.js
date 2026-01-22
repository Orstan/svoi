/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-backend-domain.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  i18n: {
    locales: ['uk', 'pl', 'en'],
    defaultLocale: 'uk',
    localeDetection: true,
  },
}

module.exports = nextConfig
