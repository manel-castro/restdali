/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/backoffice",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/backoffice",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
