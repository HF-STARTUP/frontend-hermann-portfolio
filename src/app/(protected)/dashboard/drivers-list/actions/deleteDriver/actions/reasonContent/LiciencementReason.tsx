"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {TextArea} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import Driver from "@/model/driver/Driver";
import {useDeactivateDriver} from "@/hooks/driver/useDriver";
import notify from "@/utils/func/notification";

export const LiciencementReason: React.FC<{driver: Driver, onCloaseParent: ()=>void}&React.HTMLAttributes<HTMLDivElement>> = ({children, onCloaseParent, driver}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [success, setSuccessIsOpen] = React.useState<boolean>(false)

    const {isLoading, refresh, isSuccess, isError, error, mutate} = useDeactivateDriver()

    React.useEffect(()=>{
        if(isSuccess && !isLoading){
            setIsOpen(false)
            refresh().then()
            setSuccessIsOpen(true)
            notify('Désactivation effectué avec success', 'success')
        }
        if(isError && !isLoading){
            notify('Une erreur est survenus lors de la désactivation du chauffeur', 'error')
        }
    }, [isSuccess, isError, error])

    const handlerDeactivateDriver = ()=> {
        mutate({id: driver.id, mode: 'deactivate'})
    }
    const handleToggleSuccess = () => {
        onCloaseParent()
        setSuccessIsOpen(false)
        setIsOpen(false)
    }

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={'Motif du licenciement'}
                                 handleToggle={handleToggleDialog}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true}>
                        <TextArea size={'md'} label={'Saisissez le motif du licenciement'}/>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase
                        onClick={handlerDeactivateDriver}
                        to={''}
                        color={'blue'}
                        variant={'contained'}
                        shape={'square'}
                        disabled={isLoading}
                        loading={isLoading}
                        fullwidth={true}
                    >
                        Licencier
                    </BtnBase>
                </DialogActions>
            </DialogBase>
            <>
                <SimpleSuccessDialogWithContent
                    isSubDialog={false}
                    fchild={<div>
                        <b>{driver.getUsername}</b>  a été supprimé définitivement de votre flotte.
                    </div>}
                    title={`Désactivation effectuée avec succès.`}
                    image={`${driver.getAvatar}`}
                    isOpen={success}
                    handleToggleDialog={handleToggleSuccess}
                >
                </SimpleSuccessDialogWithContent>
            </>
        </div>
    )
}
