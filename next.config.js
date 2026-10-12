/** @type {import('next').NextConfig} */
const nextConfig = {
    // Export statique (dossier out/) déployé sur Hostinger — Apache sert
    // chaque dossier via son index.html grâce à trailingSlash.
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true, // requis par l'export : pas d'optimiseur serveur
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
}

module.exports = nextConfig
