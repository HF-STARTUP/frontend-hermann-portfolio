"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import Chip from "@/components/box/Chip";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog, SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {
    LiciencementReason
} from "@/app/(protected)/dashboard/drivers-list/actions/deleteDriver/actions/reasonContent/LiciencementReason";
import Driver from "@/model/driver/Driver";
import driver from "@/model/driver/Driver";
import {useDeactivateDriver, useSuspendDriver} from "@/hooks/driver/useDriver";
import notify from "@/utils/func/notification";


export const ReasonOfDeactivationDialog: React.FC<{
    isOpen: boolean,
    driver: Driver,
    handleToggleDialog: () => void,
} & React.HTMLAttributes<HTMLDivElement>> = ({children, handleToggleDialog, isOpen, driver}) => {

    const [success, setSuccessIsOpen] = React.useState<boolean>(false)
    const {isLoading, refresh, isSuccess, isError, error, mutate} = useDeactivateDriver()

    React.useEffect(()=>{
        if(isSuccess && !isLoading){
            refresh().then()
            setSuccessIsOpen(true)
            notify('Désactivation effectué avec success', 'success')
        }
        if(isError && !isLoading){
            notify('Une erreur est survenus lors de la désactivation du chauffeur', 'error')
        }
    }, [isSuccess, isError, error])

    const handleSuspendDriver = ()=> {
            mutate({id: driver.id, mode: 'deactivate'})
    }
    const handleToggleSuccess = () => {
        setSuccessIsOpen(!success)
    }

    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={'Motif de désactivation'} handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={driver.getAvatar} withSuccess={false}>
                    <Chip name={driver.getGrade}/>
                </DialogCoverImage>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase
                        onClick={handleSuspendDriver}
                        color={'blue'} variant={'contained'}
                        fullwidth={true} shape={'square'}
                        loading={isLoading}
                        disabled={isLoading}
                        to={''}
                    >
                        Démission
                    </BtnBase>
                    <BtnBase
                        onClick={handleSuspendDriver}
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        loading={isLoading}
                        disabled={isLoading}
                        to={''}
                    >
                        Fin de contrat
                    </BtnBase>
                    <LiciencementReason onCloaseParent={()=>handleToggleDialog()} driver={driver}>
                        <BtnBase
                            color={'blue'}
                            variant={'contained'}
                            fullwidth={true}
                            shape={'square'}
                            to={''}
                            disabled={isLoading}
                        >
                            Licenciement
                        </BtnBase>
                    </LiciencementReason>
                </DialogActions>
            </DialogBase>
            <>
                <SimpleSuccessDialogWithContent
                    fchild={<div>
                        <b>{driver.getUsername}</b>  a été supprimé définitivement de votre flotte.
                    </div>}
                    title={`Désactivation effectuée avec succès.`}
                    image={driver.getAvatar}
                    isOpen={success}
                    handleToggleDialog={handleToggleSuccess}
                >
                </SimpleSuccessDialogWithContent>
            </>
        </div>
    )
}


