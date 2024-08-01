import React from "react";
import ImageWithAvatar from "@/components/box/ImageWithAvatar";
import {
    CardItemContainer,
    CardItemMenu,
    CardItemMenuContainer,
    ItemContentBefore
} from "@/components/box/AdminListItemComponents";
import Entretien from "@/model/entretien/Entretien";
import {
    ItemBadge,
    ItemContainer,
    ItemLabel,
    SubTitle2,
    TitleItem
} from "@/app/(protected)/dashboard/races/components/racesList/racesList";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import Image from "next/image";
import {
    CancelEntretienDialog,
    MarkMaintenanceAsEndedDialog
} from "@/app/(protected)/dashboard/maintenance/actions/markMaintenanceAsEnded/markMaintenanceAsEnded.dialog";

const MaintenanceItem2: React.FC<{ entretien: Entretien }> = ({entretien}) => {
    const titles: string[] = [
        entretien.vehicleName,
        '',
        '',
        entretien.description
    ]

    return (
        <CardItemContainer
            before={<>
                <ImageWithAvatar bgImage={entretien.vehicleCover}/>
                <ItemContentBefore title={titles}
                />
            </>}
        >
            <CardItemMenuContainer>
                <CardItemMenu name={'Valider la tache'}/>
                <CardItemMenu variant={'red'} name={'Annuler la tache'}/>
            </CardItemMenuContainer>
        </CardItemContainer>
    )
}

const MaintenanceItem: React.FC<{ entretien: Entretien }> = ({entretien}) => {

    const [endedDialogIsOpen, setEndedDialogIsOpen] = React.useState(false)
    const [cancelDialogIsOpen, setCancelDialogIsOpen] = React.useState(false)

    const {currency} = useGetCurrency()

    const titles: string[] = [
        entretien.vehicleName,
        '',
        '',
        entretien.description
    ]

    return (
        <>
            <ItemContainer>
                <div className={"flex items-start gap-[23px] group"}>
                    <div className={"size-[94px] rounded-[14.69px] overflow-hidden"}>
                        <Image
                            src={entretien.vehicle.getCover}
                            alt={""}
                            width={110}
                            height={110}
                            className={"h-[94px] w-[94px] object-cover group-hover:scale-105 transition"}
                        />
                    </div>
                    <div className={"flex flex-col gap-[6px]"}>
                        <TitleItem>{entretien.vehicle.getFullName} -{entretien.vehicle.getRegistration}</TitleItem>
                        <SubTitle2>{entretien.entretienContent}</SubTitle2>
                        {/*<div className="text-[#506D82] text-sm font-medium flex items-center gap-2">*/}
                        {/*    <UserCircleIcon/>*/}
                        {/*    <div>Chauffeur : Tchematchoua Hervé</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={"flex items-start gap-4"}>
                    <div className={"flex flex-col items-end gap-2"}>
                        <ItemLabel>{entretien.startAt}</ItemLabel>
                        <ItemLabel>{entretien.startHour}</ItemLabel>
                        <ItemLabel>{entretien.amount} {currency}</ItemLabel>
                        <ItemBadge title={entretien.status}/>
                    </div>
                    <div className={"mt-1"}>
                        <CardItemMenuContainer>
                            <CardItemMenu
                                name={'Definir comme terminé'}
                                onClick={() => setEndedDialogIsOpen(true)}
                            />
                            <CardItemMenu
                                variant={'red'}
                                name={"Annuler l'entretien"}
                                onClick={() => setCancelDialogIsOpen(true)}
                            />
                        </CardItemMenuContainer>
                    </div>
                </div>
            </ItemContainer>

            <MarkMaintenanceAsEndedDialog
                entretien={entretien}
                isOpen={endedDialogIsOpen}
                closeDialog={() => setEndedDialogIsOpen(false)}
            />

            <CancelEntretienDialog
                isOpen={cancelDialogIsOpen}
                onClose={() => setCancelDialogIsOpen(false)}
                entretien={entretien}
            />
        </>
    )
}


export default MaintenanceItem
