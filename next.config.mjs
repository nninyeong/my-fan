/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    domains: ['localhost', '*'],
  },
  reactStrictMode: true,
=======
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
    ],
    domains: ['zjzxtdplbzlpmnvdrlbu.supabase.co'],
  },
>>>>>>> 715a1001a41f99425649a260b9ae9674e3f6334b
};

export default nextConfig;
