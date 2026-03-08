import { CampagneStatus } from "./useCampagnesHook";

export interface ChecklistItem{
    taskDescription: string;
    collaborators: {name: string, image?: string, id: string}[];
    taskType: string;
    limiteDate: string;
    limiteTime: string;
    status: CampagneStatus;
}

export const useChecklistSection = ()=>{

    const checkList: ChecklistItem[] = [
        {
            taskDescription: "Validation des visuels (A/B Testing) et des formats (Story, Feed, Reel)",
            collaborators: [
                { id: "COL001", name: "Alice Nono", image: "https://i.pravatar.cc/150?u=alice" },
                { id: "COL002", name: "Cédric Fossuo", image: "https://i.pravatar.cc/150?u=cedric" }
            ],
            taskType: "Design & Créa",
            limiteDate: "12/03/2026",
            limiteTime: "14:00",
            status: "finished"
        },
        {
            taskDescription: "Configuration du Pixel Meta et vérification des événements de conversion",
            collaborators: [
                { id: "COL003", name: "Jean-Paul Nono", image: "https://i.pravatar.cc/150?u=jp" }
            ],
            taskType: "Technique",
            limiteDate: "13/03/2026",
            limiteTime: "10:00",
            status: "processing"
        },
        {
            taskDescription: "Rédaction et validation des variantes de Copywriting (Titres et Descriptions)",
            collaborators: [
                { id: "COL004", name: "Marie-Louise Eyenga", image: "https://i.pravatar.cc/150?u=marie" },
                { id: "COL001", name: "Alice Nono", image: "https://i.pravatar.cc/150?u=alice" }
            ],
            taskType: "Contenu",
            limiteDate: "14/03/2026",
            limiteTime: "17:30",
            status: "finished"            
        },
        {
            taskDescription: "Paramétrage des audiences personnalisées (Lookalike 1% et Retargeting)",
            collaborators: [
                { id: "COL005", name: "Takam Djeutcha", image: "https://i.pravatar.cc/150?u=takam" }
            ],
            taskType: "Média Buying",
            limiteDate: "15/03/2026",
            limiteTime: "09:00",
            status: "todo"
        },
        {
            taskDescription: "Test de l'entonnoir de vente : Vérification du lien de la Landing Page",
            collaborators: [
                { id: "COL002", name: "Cédric Fossuo", image: "https://i.pravatar.cc/150?u=cedric" },
                { id: "COL005", name: "Takam Djeutcha", image: "https://i.pravatar.cc/150?u=takam" }
            ],
            taskType: "QA / Test",
            limiteDate: "15/03/2026",
            limiteTime: "16:00",
            status: "processing"
        }
    ];

    return{
        checkList
    }
}