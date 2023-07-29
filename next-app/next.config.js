/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl(nextConfig);
