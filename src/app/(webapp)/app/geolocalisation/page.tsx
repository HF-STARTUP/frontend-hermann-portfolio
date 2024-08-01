"use client"
import {Crumb} from "@/components/ui/custom/crumb";
import {PageTitle} from "@/components/ui/custom/PageTitle";
import {ABtnAction} from "@/components/ui/custom/actions";
import {UserAccountSection} from "@/components/layout/admin/SubNav/AdminSubNav";
import {FournisseurList} from "@/app/(webapp)/app/geolocalisation/sections/fournisseurList/FournisseurList";
import BtnBase from "@/components/elements/BtnBase";
import {GeolocationIcon} from "@/components/ui/__icons";
import Link from "next/link";

export default function GeolocalisationPage() {

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Géolocalisation",
                        url: "/geolocalisation",
                    }
                ]}
            />
            <div className={"flex items-center justify-between"}>
                <PageTitle
                    page_title={"Géolocalisation"}
                    items={["Toutes les flottes", "Flottes de Christian"]}
                />
                <UserAccountSection/>
            </div>
            <div className={"flex justify-between items-center mt-[15px]"}>
                <div className={"mt-[24px] flex items-center  justify-start gap-[26px]"}>
                    <Link href={"/app/geolocalisation/map"}>
                        <BtnBase
                            size={"sm"}
                            color={"blue"}
                            variant={"contained"}
                            shape={"square"}
                            icon={
                                <GeolocationIcon/>
                            }
                        >
                            Voir la carte complète
                        </BtnBase>
                    </Link>
                </div>
                <div className={"flex justify-between gap-[25px]"}>
                    <ABtnAction>Ajouter un traceur GPS</ABtnAction>
                    <ABtnAction>Ajouter un fournisseur</ABtnAction>
                </div>
            </div>

            <div className={"mt-[32px]"}>
                <FournisseurList/>
            </div>
        </div>
    )
}

