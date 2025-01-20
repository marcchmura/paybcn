/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/terms',
        destination: '/terms-of-service.pdf', // Path to your PDF file
      },
    ];
  },
};

module.exports = nextConfig;
