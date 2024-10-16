/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
    ],
    domains: ['zjzxtdplbzlpmnvdrlbu.supabase.co'],
    typescript: {
      ignoreBuildErrors: true,
    },
  },
};

export default nextConfig;
