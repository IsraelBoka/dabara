// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.discordapp.com',
      'api.dicebear.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
  },
  swcMinify: true,

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default config;
