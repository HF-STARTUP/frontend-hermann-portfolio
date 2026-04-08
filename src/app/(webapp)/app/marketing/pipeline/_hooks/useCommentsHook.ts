export interface CommentItem{
    name: string,
    dateTime: string,
    content: string,
    answers: {
        name: string,
        dateTime: string,
        adminRole: string,
        constent: string,
    }[]
}

export const useCommentsHook = ()=>{
    const comments: CommentItem[] = [
        {
          name: "Sophie Martin",
          dateTime: "2025-03-15T10:30:00",
          content: "Super article, très instructif ! Merci pour ce partage.",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-15T14:20:00",
              adminRole: "Modérateur",
              constent: "Merci Sophie, ravi que cela vous plaise !"
            }
          ]
        },
        {
          name: "Jean Dupont",
          dateTime: "2025-03-14T08:45:00",
          content: "J'aurais aimé plus d'exemples concrets, mais le contenu est de qualité.",
          answers: []
        },
        {
          name: "Marie Curie",
          dateTime: "2025-03-13T19:15:00",
          content: "Très utile pour mon projet professionnel. Bravo !",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-14T09:00:00",
              adminRole: "Superviseur",
              constent: "Merci Marie, n'hésitez pas à partager votre projet !"
            },
            {
              name: "Modérateur",
              dateTime: "2025-03-14T10:30:00",
              adminRole: "Modérateur",
              constent: "Nous sommes curieux d'en savoir plus !"
            }
          ]
        },
        {
          name: "Lucas Bernard",
          dateTime: "2025-03-12T22:00:00",
          content: "Quelqu'un peut-il m'expliquer le point 3 ? Je n'ai pas tout saisi.",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-13T08:15:00",
              adminRole: "Support",
              constent: "Bien sûr, je t'explique en message privé."
            }
          ]
        },
        {
          name: "Emma Richard",
          dateTime: "2025-03-12T14:30:00",
          content: "Enfin un article clair sur ce sujet ! Je partage autour de moi.",
          answers: []
        },
        {
          name: "Thomas Lefevre",
          dateTime: "2025-03-11T11:20:00",
          content: "Je ne suis pas d'accord avec la conclusion, mais le reste est bon.",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-11T17:45:00",
              adminRole: "Modérateur",
              constent: "Merci pour ton retour, nous respectons ton opinion."
            }
          ]
        },
        {
          name: "Julie Moreau",
          dateTime: "2025-03-10T09:10:00",
          content: "Très pratique, j'ai pu appliquer directement les conseils.",
          answers: []
        },
        {
          name: "Nicolas Dubois",
          dateTime: "2025-03-09T16:40:00",
          content: "Le lien vers la documentation ne fonctionne pas, pouvez-vous le corriger ?",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-09T18:20:00",
              adminRole: "Support",
              constent: "Merci de signaler, c'est corrigé !"
            }
          ]
        },
        {
          name: "Camille Petit",
          dateTime: "2025-03-08T20:00:00",
          content: "Super travail, j'attends la suite avec impatience !",
          answers: []
        },
        {
          name: "Antoine Girard",
          dateTime: "2025-03-07T07:55:00",
          content: "Pour les débutants, c'est parfait. Clair et structuré.",
          answers: [
            {
              name: "Admin",
              dateTime: "2025-03-07T12:30:00",
              adminRole: "Modérateur",
              constent: "C'était notre objectif, merci Antoine !"
            },
            {
              name: "Modérateur",
              dateTime: "2025-03-07T14:00:00",
              adminRole: "Modérateur",
              constent: "N'hésitez pas à poser des questions."
            }
          ]
        }
      ];
    return{
        comments
    }
}