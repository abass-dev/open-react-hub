import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@open-react-hub/button",
    "@open-react-hub/split-text",
    "@open-react-hub/code-block",
    "@open-react-hub/core",
    "@open-react-hub/cli"
  ]
};

export default nextConfig;
