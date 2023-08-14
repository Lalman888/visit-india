/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
    ],
    formats: ["image/avif", "image/webp"],
  }
}
