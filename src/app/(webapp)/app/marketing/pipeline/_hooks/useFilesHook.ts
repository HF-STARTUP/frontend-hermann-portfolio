import { useMemo } from 'react';

export interface FileItem {
  name: string;
  url: string;
  type: string;
  size?: number;
  duration?: string;
  uploadedBy?: string;
  uploadedAt?: string;
}

export const useFilesHook = () => {
  const files: FileItem[] = useMemo(() => [
    {
      name: "Capture_conversation_client.png",
      url: "/assets/default-fleet-logo.png",
      type: "image/png",
      size: 1.2 * 1024 * 1024,
      uploadedBy: "Marie Dupont",
      uploadedAt: "2025-01-20T18:45:00"
    },
    {
      name: "Appel_negociation_tarif.mp3",
      url: "/uploads/appel-negociation-tarif.mp3",
      type: "audio/mpeg",
      size: 3.5 * 1024 * 1024,
      duration: "0:01",
      uploadedBy: "Marie Dupont",
      uploadedAt: "2025-01-19T11:20:00"
    },
    {
      name: "Contrat_signé.docx",
      url: "/uploads/contrat-signe.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 245 * 1024,
      uploadedBy: "Jean Kameni",
      uploadedAt: "2025-01-18T09:30:00"
    },
    {
      name: "Tableau_bord_ventes.xlsx",
      url: "/uploads/tableau-bord-ventes.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 512 * 1024,
      uploadedBy: "Sophie Martin",
      uploadedAt: "2025-01-17T14:15:00"
    },
    {
      name: "Devis_2025.pdf",
      url: "/uploads/devis-2025.pdf",
      type: "application/pdf",
      size: 1.8 * 1024 * 1024,
      uploadedBy: "Thomas Bernard",
      uploadedAt: "2025-01-16T11:00:00"
    },
    {
      name: "Presentation_produit.mp4",
      url: "/uploads/presentation-produit.mp4",
      type: "video/mp4",
      size: 25.5 * 1024 * 1024,
      duration: "3:45",
      uploadedBy: "Marie Dupont",
      uploadedAt: "2025-01-15T16:20:00"
    },
    {
      name: "Notes_reunion.txt",
      url: "/uploads/notes-reunion.txt",
      type: "text/plain",
      size: 12 * 1024,
      uploadedBy: "Alice Nono",
      uploadedAt: "2025-01-14T10:45:00"
    },
    {
      name: "Logo_entreprise.jpg",
      url: "/uploads/logo-entreprise.jpg",
      type: "image/jpeg",
      size: 89 * 1024,
      uploadedBy: "Cédric Fossuo",
      uploadedAt: "2025-01-13T08:30:00"
    },
    {
      name: "Fiche_technique.pdf",
      url: "/uploads/fiche-technique.pdf",
      type: "application/pdf",
      size: 456 * 1024,
      uploadedBy: "Jean Kameni",
      uploadedAt: "2025-01-12T13:00:00"
    },
    {
      name: "Animation_equipe.gif",
      url: "/uploads/animation-equipe.gif",
      type: "image/gif",
      size: 2.3 * 1024 * 1024,
      uploadedBy: "Sophie Martin",
      uploadedAt: "2025-01-11T15:45:00"
    },
    {
      name: "Rapport_trimestriel.xlsx",
      url: "/uploads/rapport-trimestriel.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 789 * 1024,
      uploadedBy: "Thomas Bernard",
      uploadedAt: "2025-01-10T09:00:00"
    },
    {
      name: "Mail_confirmation.pdf",
      url: "/uploads/mail-confirmation.pdf",
      type: "application/pdf",
      size: 234 * 1024,
      uploadedBy: "Marie Dupont",
      uploadedAt: "2025-01-09T17:30:00"
    },
    {
      name: "Temoignage_client.mp3",
      url: "/uploads/temoignage-client.mp3",
      type: "audio/mpeg",
      size: 4.2 * 1024 * 1024,
      duration: "2:30",
      uploadedBy: "Alice Nono",
      uploadedAt: "2025-01-08T14:00:00"
    },
    {
      name: "Modele_contrat.docx",
      url: "/uploads/modele-contrat.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 178 * 1024,
      uploadedBy: "Jean Kameni",
      uploadedAt: "2025-01-07T11:15:00"
    },
    {
      name: "Infographie_stats.png",
      url: "/uploads/infographie-stats.png",
      type: "image/png",
      size: 1.5 * 1024 * 1024,
      uploadedBy: "Sophie Martin",
      uploadedAt: "2025-01-06T10:00:00"
    }
  ], []);

  return { 
    files,
 };
};