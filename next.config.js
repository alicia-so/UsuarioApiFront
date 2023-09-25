/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
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
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};

module.exports = nextConfig;
