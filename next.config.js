/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: {
    //         allowedOrigins: ['*'],
    //     },
    // },
    /** @type {import('next').NextConfig} */

    output: "standalone",
    experimental: {
        turbo: {
            resolveExtensions: [
                '.mdx',
                '.tsx',
                '.ts',
                '.jsx',
                '.js',
                '.mjs',
                '.json',
            ],
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
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
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/app/dashboard',
    //             permanent: true,
    //         },
    //         {
    //             source: '/dashboard/schedule/schedule-settings/add-group',
    //             destination: '/dashboard/schedule/schedule-settings/add-group/planing',
    //             permanent: true,
    //         },
    //
    //         //ADMIN
    //         {
    //             source: '/app/settings',
    //             destination: '/app/settings/profile',
    //             permanent: true,
    //         },
    //         {
    //             source: '/app',
    //             destination: '/app/dashboard',
    //             permanent: true,
    //         },
    //     ]
    // }
}

module.exports = nextConfig
