/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cataas.com",
        port: "",
        pathname: "/cat/**",
      },
    ],
  },
  images: {
    domains: ["i.redd.it"], // Add i.redd.it here
  },
};

export default nextConfig;
