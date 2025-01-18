import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@open-react-hub/button",
    "@open-react-hub/code-block",
  ]
};

export default nextConfig;
