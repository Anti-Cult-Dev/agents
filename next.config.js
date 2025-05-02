/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !! This expedites builds by ignoring type errors.
    // Remove this after cleaning up TS errors.
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
