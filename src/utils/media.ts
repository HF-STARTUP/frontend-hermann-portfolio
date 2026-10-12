/**
 * Utilitaires média (couvertures blog : image / vidéo / YouTube).
 */

/** Extrait l'ID d'une vidéo YouTube depuis les formats d'URL courants. */
export const getYoutubeVideoId = (url: string): string | null => {
    if (!url) return null;

    // ID brut déjà fourni
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();

    const patterns = [
        /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
        /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) return match[1];
    }

    return null;
};

/** URL d'embed youtube-nocookie pour un lien ou un ID YouTube. */
export const getYoutubeEmbedUrl = (url: string): string | null => {
    const id = getYoutubeVideoId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
};

export const isYoutubeUrl = (url: string): boolean =>
    Boolean(getYoutubeVideoId(url));
