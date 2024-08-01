/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: {
    //         allowedOrigins: ['*'],
    //     },
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
        minimumCacheTTL: 15000000,
    },
    async redirects(){
        return [
            {
                source: '/',
                destination: '/app/dashboard',
                permanent: true,
            },
            {
                source: '/dashboard/schedule/schedule-settings/add-group',
                destination: '/dashboard/schedule/schedule-settings/add-group/planing',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
