import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "**.themedia.moscow", pathname: "/**" },
      { protocol: "https", hostname: "framerusercontent.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
