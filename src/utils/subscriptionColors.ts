/**
 * Système de couleurs centralisé pour les abonnements
 * Optimisé pour les nouveaux noms d'abonnement
 */

export interface SubscriptionColors {
    textColor: string;
    bgColor: string;
    tagBgColor: string;
}

export const getSubscriptionColors = (subscriptionName: string): SubscriptionColors => {
    const name = subscriptionName.toLowerCase();
    
    // Système de couleurs optimisé pour l'UI/UX
    switch (name) {
        case "starter entrepreneur":
            return {
                textColor: "text-[#1a365d]",
                bgColor: "bg-gradient-to-r from-[#2d3748] via-[#4a5568] to-[#2d3748]",
                tagBgColor: "bg-[#e2e8f0]"
            };
            
        case "essentiel entrepreneur":
            return {
                textColor: "text-[#2b6cb0]",
                bgColor: "bg-gradient-to-r from-[#3182ce] via-[#4299e1] to-[#3182ce]",
                tagBgColor: "bg-[#bee3f8]"
            };
            
        case "premium entrepreneur":
            return {
                textColor: "text-[#553c9a]",
                bgColor: "bg-gradient-to-r from-[#6b46c1] via-[#805ad5] to-[#6b46c1]",
                tagBgColor: "bg-[#e9d8fd]"
            };
            
        case "essentiel entreprise":
            return {
                textColor: "text-[#d69e2e]",
                bgColor: "bg-gradient-to-r from-[#ed8936] via-[#f6ad55] to-[#ed8936]",
                tagBgColor: "bg-[#fef5e7]"
            };
            
        case "premium entreprise":
            return {
                textColor: "text-[#ffcd6f]",
                bgColor: "bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900]",
                tagBgColor: "bg-[#fff8de]"
            };
            
        default:
            // Couleur par défaut pour les autres types
            return {
                textColor: "text-[#E51D13]",
                bgColor: "bg-gradient-to-r from-[#A70000] via-[#ff0000] to-[#A70000]",
                tagBgColor: "bg-[#FFEBEA]"
            };
    }
};

/**
 * Détermine si un abonnement est de type premium, essentiel, starter ou gratuit
 */
export const getSubscriptionType = (subscriptionName: string): 'starter' | 'essential' | 'premium' | 'free' => {
    const name = subscriptionName.toLowerCase();
    
    if (name.includes("starter")) return 'starter';
    if (name.includes("essentiel")) return 'essential';
    if (name.includes("premium")) return 'premium';
    if (name.includes("essaie") || name.includes("gratuit")) return 'free';
    
    return 'essential'; // Par défaut
};

/**
 * Vérifie si un abonnement doit afficher l'icône de couronne
 */
export const shouldShowCrown = (subscriptionName: string): boolean => {
    const type = getSubscriptionType(subscriptionName);
    return type === 'essential' || type === 'premium' || type === 'starter';
}; 