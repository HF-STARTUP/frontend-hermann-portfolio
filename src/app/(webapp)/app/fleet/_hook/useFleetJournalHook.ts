import { JournalItem } from "../components/detailSections/Journal";

export default function fleetJournalHook (){

  const  journals: JournalItem[] = [
        {
            label: "Compte créé par le propriétaire Amadou Diallo",
            date: "15 Jan. 2024 à 15h30"
        },
        {
            label: "Utilisation de code démo DEMO-AB-VTC fournit par le commercial Jean Daniel",
            date: "15 Jan. 2024 à 15h30"
        },
        {
            label: "Premier véhicule ajouté (AD-234 - Suzuki Dziré Noire)",
            date: "15 Jan. 2024 à 15h30"
        },
        {
            label: "Premier chauffeur ajouté (Takam Jean Paul)",
            date: "15 Jan. 2024 à 15h30"
        },
        {
            label: "Premier encaissement effectué (Takam Jean Paul - 24 000 XOF)",
            date: "15 Jan. 2024 à 15h30"            
        },
        {
            label: "Premier entretien ajouté (Vidange - AD234 - Suzuki Dziré Noire)",
            date: "15 Jan. 2024 à 15h30"
        }
    ]

    return{
        journals
    }
}