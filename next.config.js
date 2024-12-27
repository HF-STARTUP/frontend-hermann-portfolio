/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        disableOptimizedLoading: true, // Désactive les optimisations du chargement
    },
    webpack(config) {
        // Ignore tous les warnings (y compris les erreurs)
        config.ignoreWarnings = [/./]; // Ignore absolument tous les avertissements
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,  // Ignore les erreurs ESLint pendant le build
    },
    typescript: {
        ignoreBuildErrors: true, // Ignore les erreurs TypeScript pendant le build
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
    },
    // Ajoutez ici d'autres configurations si nécessaire
};

module.exports = nextConfig;
