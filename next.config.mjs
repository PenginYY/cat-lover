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
    domains: ["i.redd.it"],
  },
};

export default nextConfig;
