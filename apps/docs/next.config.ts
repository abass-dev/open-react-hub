import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@open-react-hub/button',
    '@open-react-hub/cli',
    '@open-react-hub/split-text',
    '@open-react-hub/code-block',
    '@open-react-hub/urnotm',
    '@open-react-hub/core',
    '@open-react-hub/react-icons'
  ],
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
