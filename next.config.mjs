/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/chat',
          permanent: true, // Use false for temporary redirect (302)
        },
      ];
    },
  };
  
  export default nextConfig;
  