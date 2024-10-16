/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: 'sqeuibzetolbikvgjolr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/avatars/**',
      },
    ],
    domains: ['sqeuibzetolbikvgjolr.supabase.co'],
  },
};

export default nextConfig;
