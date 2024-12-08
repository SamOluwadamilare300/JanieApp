/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.pexels.com',
          },
          {
            hostname: "res.cloudinary.com",
            protocol: "https",
          },
        ],
      },
};

export default nextConfig;
