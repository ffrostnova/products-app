/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/products-app',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

