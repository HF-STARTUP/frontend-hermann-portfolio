export interface HistoryItem {
    title: string,
    desc: string,
    userName: string,
    dateTime: string,
}

export const useHistoryHook = () => {
    const historyData: HistoryItem[] = [
        {
            title: "Création du projet",
            desc: "Initialisation du repository",
            userName: "Jean Dupont",
            dateTime: "2025-03-01T09:00:00"
        },
        {
            title: "Ajout authentification",
            desc: "Mise en place du login JWT",
            userName: "Sophie Martin",
            dateTime: "2025-03-02T14:30:00"
        },
        {
            title: "Déploiement staging",
            desc: "Premier déploiement test",
            userName: "Lucas Bernard",
            dateTime: "2025-03-03T11:15:00"
        },
        {
            title: "Correction bug",
            desc: "Fix affichage mobile",
            userName: "Emma Richard",
            dateTime: "2025-03-04T16:45:00"
        },
        {
            title: "Intégration API",
            desc: "Connexion API paiement",
            userName: "Thomas Lefevre",
            dateTime: "2025-03-05T10:20:00"
        },
        {
            title: "Mise à jour doc",
            desc: "Ajout guides utilisateur",
            userName: "Marie Curie",
            dateTime: "2025-03-06T13:40:00"
        },
        {
            title: "Tests de charge",
            desc: "Test 1000 utilisateurs",
            userName: "Nicolas Dubois",
            dateTime: "2025-03-07T09:30:00"
        },
        {
            title: "Audit sécurité",
            desc: "Correction vulnérabilités",
            userName: "Camille Petit",
            dateTime: "2025-03-08T15:10:00"
        },
        {
            title: "Déploiement prod",
            desc: "Mise en ligne v1.0.0",
            userName: "Antoine Girard",
            dateTime: "2025-03-09T12:00:00"
        },
        {
            title: "Campagne marketing",
            desc: "Lancement newsletter",
            userName: "Julie Moreau",
            dateTime: "2025-03-10T08:30:00"
        }
    ];

    return {
        historyData
    };
}