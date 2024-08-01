import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import Chip from "@/components/box/Chip";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {
    ReasonOfDeactivationDialog
} from "@/app/(protected)/dashboard/drivers-list/actions/deleteDriver/actions/reasonForDeactivation/ReasonOfDeactivation";
import Driver from "@/model/driver/Driver";
import driver from "@/model/driver/Driver";


export const DeleteDriverDialog: React.FC<{
    isOpen: boolean,
    driver: Driver,
    handleToggleDialog: () => void,
} & React.HTMLAttributes<HTMLDivElement>> = ({children, handleToggleDialog, isOpen, driver}) => {

    const [deleteReasonDialog, setDeleteReasonDialog] = React.useState<boolean>(false)

    const handleToggleDeleteReasonDialog = () => {
        setDeleteReasonDialog(!deleteReasonDialog)
    }


    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={'Désactiver chauffeur'} handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={driver.getAvatar} withSuccess={false}>
                    <Chip name={driver.getGrade}/>
                </DialogCoverImage>
                <div className={`flex flex-col gap-[5px] py-[40px]`}>
                    <h4 className={`font-medium text-admin-primary text-[24.64px] leading-[32.82px] tracking-[-1.07px] text-center`}>
                        {driver.getUsername}
                    </h4>
                    <p className={`font-normal text-admin-primary text-[16px] leading-[28px] tracking-[-1.07px] text-center`}>
                        Vous êtes sur le point de désactiver ce chauffeur de votre flotte. Confirmez-vous cette opération ?
                    </p>
                </div>
                <DialogActions className={`pt-[10px]`}>
                    <SimpleSuccessDialog
                        fchild={<div>
                            <b>{driver.getUsername}</b> a été suspendu pour une durée de <b>14 Jours.</b>
                        </div>}
                        title={`Suspension effectuée avec succès.`}
                        image={driver.getAvatar}>
                        <BtnBase
                            onClick={handleToggleDeleteReasonDialog}
                            color={'blue'}
                            variant={'contained'}
                            fullwidth={true}
                            shape={'square'}
                            to={''}
                        >
                            Désactiver le chauffeur
                        </BtnBase>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
            <>
                <ReasonOfDeactivationDialog
                    driver={driver}
                    isOpen={deleteReasonDialog}
                    handleToggleDialog={handleToggleDeleteReasonDialog}
                />
            </>
        </div>
    )
}


