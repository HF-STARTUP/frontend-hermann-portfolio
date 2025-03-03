"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddNewSupplierCtgInputs, addNewSupplierCtgSchema} from "@/schema/supplier.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useSetNewSupplierCtg} from "@/hooks/supplier/useSupplier";
import notify from "@/utils/func/notification";
import {AddNewContraTypeInputs, addNewContraTypeInputsSchema} from "@/schema/vehicule.schema";
import {useAddVehiculeContratType} from "@/hooks/vehicule/useVehicule";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

export const AddNewContractType: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {
        mutate,
        isSuccess,
        isLoading,
        isError,
        error,
        refresh,
        data
    } = useAddVehiculeContratType()

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const onSubmit: SubmitHandler<AddNewContraTypeInputs> = (contractTypesInputs) => {
        mutate(contractTypesInputs)
    }

    const {
        register,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddNewContraTypeInputs>({
        resolver: joiResolver(addNewContraTypeInputsSchema)
    })

    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
        }
    }, [isError, error])

    React.useEffect(() => {
        if (isSuccess) {
            handleToggleDialog()
            resetForm()
            refresh().then()
            notify('Type de contract ajouté avec success', 'success')
        }
    }, [isSuccess, data])


    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase
                isSubDialog={true}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={handleToggleDialog}
                bgType={'whited'}>
                <form>
                    <AdminDialogHead
                        withBack={true}
                        title={'Créer un type de contrat'}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <TextField
                                size={'md'}
                                label={'Saisis le nom de contrat'}
                                required={true}
                                register={register('name')}
                                errors={errors}
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
                            loading={isLoading}
                            disabled={isLoading}
                            fullwidth={true}>Ajouter le type de contract</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
