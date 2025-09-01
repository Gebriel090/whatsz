/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ibb.co",
      "cdn.jsdelivr.net",
      "upload.wikimedia.org",
      "https://goo.gl/xX8pDD",
    ],
  },
};
module.exports = nextConfig;
