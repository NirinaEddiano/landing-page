/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kxxgrdsmzffhjereclad.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/blog-images/**',
      },
    ],
  },
};

// On utilise "export default" au lieu de "module.exports"
export default nextConfig;