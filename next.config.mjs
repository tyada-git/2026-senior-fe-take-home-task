/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/booking",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
