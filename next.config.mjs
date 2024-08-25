/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"], // Указываем поддерживаемые языки
    defaultLocale: "en", // Язык по умолчанию
  },
};

export default nextConfig;
