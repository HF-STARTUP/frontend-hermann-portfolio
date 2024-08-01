"use client"

import React from "react";
import {CardItemMenu, CardItemMenuContainer} from "@/components/box/AdminListItemComponents";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {
    ItemContainer,
    ItemLabel,
    SubTitle2,
    TitleItem
} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import ClientModel from "@/model/client/ClientModel";
import {ClientCar, LocationIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {ClientInfosDialog} from "@/app/(protected)/dashboard/clients/actions/clientInfos/clientInfos";
import {AddClientDialog} from "@/app/(protected)/dashboard/clients/actions/addClient/addClientDialog";

const ClientItem: React.FC<{ client: ClientModel }> = ({client}) => {

    const [endedDialogIsOpen, setEndedDialogIsOpen] = React.useState(false)
    const [updateIsOpen, setUpdateIsOpen] = React.useState(false)
    const [infoDialogIsOpen, setInfoDialogIsOpen] = React.useState(false)

    const {currency} = useGetCurrency()


    return (
        <div onClick={() => setInfoDialogIsOpen(true)}>
            <ItemContainer>
                <div className={"flex items-start gap-[23px] group"}>
                    <div className={"flex flex-col gap-[6px]"}>
                        <TitleItem>{client.username}</TitleItem>
                        <SubTitle2>{client.phoneWithEmail}</SubTitle2>
                        {/*<div className="text-[#506D82] text-sm font-medium flex items-center gap-2">*/}
                        {/*    <div>acutus sur : Honda Tucson 2021 - CE 920 BF</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={"flex items-start gap-4"}>
                    <div className={"flex flex-col items-end gap-2"}>
                        {client.address.length ? <div className={"flex gap-2 items-center"}>
                            <LocationIcon/>
                            <ItemLabel>{client.address}</ItemLabel>
                        </div> : ''}
                        {client.courseCount ? <div className={"flex items-center gap-[6px]"}>
                            <ClientCar/>
                            <div
                                className="h-[29.84px] text-white text-base font-bold  px-[5.92px] py-1 bg-emerald-600 rounded-2xl flex-col justify-center items-center gap-[19.73px] inline-flex">
                                {client.courseCount}
                            </div>
                        </div> : <span></span>}
                    </div>
                    <div className={"mt-1"}>
                        <CardItemMenuContainer>
                            <CardItemMenu
                                name={'Voir les infos du client'}
                                onClick={() => setInfoDialogIsOpen(true)}
                            />
                            <CardItemMenu
                                name={'Mettre à jour les infos du client'}
                                onClick={() => setUpdateIsOpen(true)}
                            />
                            {/*<CardItemMenu*/}
                            {/*    variant={'red'}*/}
                            {/*    name={"Desactiver le client"}*/}
                            {/*    onClick={() => setCancelDialogIsOpen(true)}*/}
                            {/*/>*/}
                        </CardItemMenuContainer>
                    </div>
                </div>
            </ItemContainer>
            <ClientInfosDialog
                client={client}
                isOpen={infoDialogIsOpen}
                onClose={() => setInfoDialogIsOpen(false)}
            />
            <AddClientDialog
                client={client}
                isOpen={updateIsOpen}
                onClose={() => setUpdateIsOpen(false)}
            />

            {/*<MarkMaintenanceAsEndedDialog*/}
            {/*    entretien={entretien}*/}
            {/*    isOpen={endedDialogIsOpen}*/}
            {/*    closeDialog={() => setEndedDialogIsOpen(false)}*/}
            {/*/>*/}

            {/*<CancelEntretienDialog*/}
            {/*    isOpen={cancelDialogIsOpen}*/}
            {/*    onClose={() => setCancelDialogIsOpen(false)}*/}
            {/*    entretien={entretien}*/}
            {/*/>*/}
        </div>
    )
}


export default ClientItem
