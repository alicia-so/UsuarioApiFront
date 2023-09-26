/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  images: {
    domains: [
      // confiable domains for images
      "res.cloudinary.com",
      "res-1.cloudinary.com",
      "res-2.cloudinary.com",
      "res-3.cloudinary.com",
      "res-4.cloudinary.com",
      "res-5.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
