"use client"

import React from "react";
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentText
} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {TextArea} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {FinishEntretienInterface, finishEntretienSchema} from "@/schema/vehicule.schema";
import Entretien from "@/model/entretien/Entretien";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {useCancelEntretien, useFinishEntretien} from "@/hooks/entretien/useEntretien";
import {useRouter} from "next/navigation";

export const MarkMaintenanceAsEndedDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean,
    closeDialog: () => void,
    entretien: Entretien
}> = ({children, isOpen, closeDialog, entretien}) => {


    const {
        handleCreateEntretien,
        loading,
        data,
        isSuccess
    } = useFinishEntretien()

    const handleToggleDialog = () => {
        closeDialog()
    }

    const onSubmit: SubmitHandler<FinishEntretienInterface> = (contractTypesInputs) => {
        handleCreateEntretien({id: '' + entretien.id, ...contractTypesInputs})
    }

    const {currency} = useGetCurrency()

    const {
        register,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<FinishEntretienInterface>({
        resolver: joiResolver(finishEntretienSchema)
    })


    React.useEffect(() => {
        if (data && isSuccess) {
            closeDialog()
        }
    }, [data, isSuccess])

    return (
        <div>
            <DialogBase
                isSubDialog={false}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={handleToggleDialog}
                bgType={'whited'}>
                <form>
                    <AdminDialogHead
                        title={'Entretien effectué'}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>

                            <div className={"flex justify-end items-end flex-col gap-2"}>
                                <TextField
                                    size={'md'}
                                    label={"Cout reel de l'operation"}
                                    placeholder={"17,000"}
                                    required={true}
                                    register={register('amount')}
                                    errors={errors}
                                />
                                <div className={"text-blue-800 text-[16px] font-semibold"}>*Coût
                                    estimé: {entretien.amount} {currency}</div>
                            </div>

                            <TextArea
                                register={register('description')}
                                label={"Informations complémentaires"}
                                required={false}
                            />
                        </FormGroup>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            onClick={handleSubmit(onSubmit)}
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'button'}
                            loading={loading}
                            disabled={loading}
                            fullwidth={true}>Valider</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}


export const CancelEntretienDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean,
    onClose: () => void,
    entretien: Entretien
}> = ({children, isOpen, entretien, onClose, ...props}) => {

    const {isSuccess, handleCancelEntretien, loading} = useCancelEntretien()

    const $router = useRouter()

    function toggleModal() {
        onClose()
    }

    React.useEffect(() => {
        if (isSuccess && !loading) {
            onClose()
        }
    }, [isSuccess, loading])

    const onCancelEntretien = async () => {
        handleCancelEntretien(entretien.id)
    }


    return (
        <div {...props}>
            <div onClick={toggleModal}>{children}</div>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={toggleModal} bgType={'whited'}>
                <DialogContentText>
                    Etes vous sure de vouloir annuler cet entretien ?
                </DialogContentText>
                <DialogActions className={``}>

                    <BtnBase loading={loading} disabled={loading} onClick={(onCancelEntretien)} shape={'square'} to={''}
                             variant={'contained'} color={'red'}
                             fullwidth={true}>Annuler l'entretien</BtnBase>

                    <BtnBase loading={loading} disabled={loading} onClick={() => toggleModal()} shape={'square'} to={''}
                             variant={'contained'}
                             fontWeight={'bold'} color={'white'}
                             fullwidth={true}>Ne pas annuler</BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}