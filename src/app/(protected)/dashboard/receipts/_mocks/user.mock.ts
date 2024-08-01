import {ReceiptUserProps} from "@/app/(protected)/dashboard/receipts/_components/receiptsUsers/ReceiptsUsers";

export const RECEIPTS_USERS = [
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Becker Kadji",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: false
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: false
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
    {
        avatar: "assets/faker/receips/default-user-recipts.png",
        role: "Titulaire",
        name: "Takam Djeutcha Hervé",
        active: true
    },
] satisfies ReceiptUserProps[]

export const PLANING_USERS = RECEIPTS_USERS.map((_,i)=>({id: i+1, ..._}))
