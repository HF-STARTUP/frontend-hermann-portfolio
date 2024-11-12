"use client"

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import * as React from "react";
import BtnBase from "@/components/elements/BtnBase";

export default function AdminsPage() {

    return (
        <div className={"px-[23.70px] py-[22.57px] bg-white rounded-[22.57px]"}>
            <div className={"mt-[24px] flex items-center  justify-between gap-[26px]"}>
                <div className={"mb-[43px]"}>
                    <ABlockTitle>Parametre avancé</ABlockTitle>
                </div>
            </div>
            <div>
                <div className={"mb-4 text-vaTextPrimary leading-snug text-xl font-medium"}>
                    <p className={"max-w-[700px]"}>
                        Attention : La suppression de votre flotte est une action irréversible. Une fois supprimée,
                        toutes les données associées, y compris les véhicules, chauffeurs et historiques de courses,
                        seront définitivement perdues. Assurez-vous de bien vouloir procéder avant de confirmer cette
                        action.
                    </p>
                </div>
                <BtnBase
                    w={"270px"}
                    to={''}
                    color={'red'}
                    variant={'contained'}
                    shape={'square'}
                    type={"submit"}
                >Suprimer la flotte</BtnBase>
            </div>
        </div>
    )
}