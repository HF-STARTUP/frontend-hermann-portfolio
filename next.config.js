/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: {
    //         allowedOrigins: ['*'],
    //     },
    // },
    /** @type {import('next').NextConfig} */

    experimental: {
        disableOptimizedLoading: true, // Désactive les optimisations du chargement
    },
    logging: {
        fetches: {
            fullUrl: false,
        },
    },
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
    webpack(config, { isServer }) {
        // Ignore tous les warnings
        config.ignoreWarnings = [/./];
        
        // Configuration pour afficher uniquement les erreurs
        config.stats = 'errors-only';
        
        // Minimiser les logs pendant le build
        config.infrastructureLogging = {
            level: 'error',
        };
        
        return config;
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
    async redirects() {
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

            //ADMIN
            {
                source: '/app/settings',
                destination: '/app/settings/profile',
                permanent: true,
            },
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true,
            },
        ]
    }
}

module.exports = nextConfig
