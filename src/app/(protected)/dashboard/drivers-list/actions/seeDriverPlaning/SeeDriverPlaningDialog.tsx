"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import BtnBase from "@/components/elements/BtnBase";
import {
    EditScheduleBtn,
    ScheduleEditItem,
    ScheduleEditItemsGroup
} from "@/app/(protected)/dashboard/drivers-list/_components/__utils/ScheduleEditItem";
import Chip from "@/components/box/Chip";
import {
    EditDriverPlaningDialog
} from "@/app/(protected)/dashboard/drivers-list/actions/seeDriverPlaning/actions/editDriverPlaning/EditDriverPlaningDialog";
import Driver from "@/model/driver/Driver";
import {SimpleEmptyElement} from "@/components/box/PageNetworkState";
import {LockIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

export const SeeDriverPlaningDialog: React.FC<{
    image: string,
    isOpen: boolean,
    driver: Driver,
    handleToggleDialog: () => void
} & React.HTMLAttributes<HTMLDivElement>> = ({image, isOpen, driver, handleToggleDialog}) => {

    const [editPlaningDialogIsOpen, setEditPlaningDialogIsOpen] = React.useState<boolean>(false)

    const handleToggleEditDriverPlaningDialog = () => {
        setEditPlaningDialogIsOpen(!editPlaningDialogIsOpen)
    }

    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={driver.getUsername} subTitle={driver.getExperience}
                                 handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={image} withSuccess={false}>
                    <Chip name={driver.getGrade}/>
                </DialogCoverImage>
                {/*<ScheduleEditItemsGroup>*/}
                {/*    <>*/}
                {/*        <ScheduleEditItem*/}
                {/*            image={`/assets/faker/default-car-1.png`}*/}
                {/*            date={`Aujourd’hui - De 12h à 18h`}*/}
                {/*            title={`Mitsubishi Lancer 2009 Rouge`}*/}
                {/*            subtitle={`CE 987 BF`}>*/}
                {/*            <EditScheduleBtn onClick={handleToggleEditDriverPlaningDialog}/>*/}
                {/*        </ScheduleEditItem>*/}
                {/*        <ScheduleEditItem*/}
                {/*            image={`/assets/faker/default-car-1.png`}*/}
                {/*            date={`Aujourd’hui - De 12h à 18h`}*/}
                {/*            title={`Mitsubishi Lancer 2009 Rouge`}*/}
                {/*            subtitle={`CE 987 BF`}>*/}
                {/*            <EditScheduleBtn onClick={handleToggleEditDriverPlaningDialog}/>*/}
                {/*        </ScheduleEditItem>*/}
                {/*    </>*/}
                {/*</ScheduleEditItemsGroup>*/}
                <SimpleEmptyElement message={`Pas de planing disponible pour le monent`} />

                <DialogActions className={`pt-[20px]`}>
                    <BtnBase
                        fullwidth={true}
                        to={''}
                        shape={'square'}
                        variant={'contained'}
                        color={'blue'}
                        icon={<LockIcon />}
                    >
                        Voir le planning complet
                    </BtnBase>
                </DialogActions>
            </DialogBase>
            <>
                <EditDriverPlaningDialog
                    image={`/assets/faker/default-car-1.png`}
                    isOpen={editPlaningDialogIsOpen}
                    handleToggleDialog={handleToggleEditDriverPlaningDialog}
                />
            </>
        </div>
    )
}
