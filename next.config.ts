import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ftp.goit.study/**'),
      new URL('https://res.cloudinary.com/**'),
      { protocol: 'https', hostname: '*.googleusercontent.com' },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
