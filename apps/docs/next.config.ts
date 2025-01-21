import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@open-react-hub/button',
    '@open-react-hub/cli',
    '@open-react-hub/split-text',
    '@open-react-hub/code-block',
    '@open-react-hub/core'
  ],
};

export default nextConfig;
