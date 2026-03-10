export interface CampagneCommentItem {
  userName: string;
  initials: string;
  commentDuration: string;
  contentText: string;
}

export const useCampagneComments = () => {
  const campagneComments: CampagneCommentItem[] = [
    {
      userName: "Alice Rousseau",
      initials: "AR",
      commentDuration: "il y a 15 min",
      contentText:
        "Le design de la page de destination est vraiment fluide, j'adore le mode sombre !",
    },
    {
      userName: "Benoît Legrand",
      initials: "BL",
      commentDuration: "il y a 3h",
      contentText:
        "Est-ce que cette campagne sera également diffusée sur les réseaux sociaux ?",
    },
    {
      userName: "Clara Mendes",
      initials: "CM",
      commentDuration: "il y a 1j",
      contentText:
        "Une approche très humaine, ça change des publicités génériques habituelles.",
    },
    {
      userName: "David Kasmi",
      initials: "DK",
      commentDuration: "il y a 2j",
      contentText:
        "Le message est clair et l'appel à l'action est bien positionné. Bravo à l'équipe.",
    },
    {
      userName: "Emma Watson",
      initials: "EW",
      commentDuration: "il y a 1 sem.",
      contentText:
        "J'ai partagé le lien avec mes collègues, le sujet est crucial pour notre secteur.",
    },
  ];

  return{
    campagneComments
  }
};
