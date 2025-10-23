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
import {AddNewDriverGroupInputs, addNewDriverGroupSchema} from "@/schema/driver.schema";
import {useAddDriverGroup} from "@/hooks/driver/useDriver";

export const AddNewDriverGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {
        mutate,
        isSuccess,
        isLoading,
        isError,
        error,
        refresh,
        data
    } = useAddDriverGroup()

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const onSubmit: SubmitHandler<AddNewDriverGroupInputs> = (newDriverGroupInputs) => {
        mutate(newDriverGroupInputs)
    }

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddNewDriverGroupInputs>({
        resolver: joiResolver(addNewDriverGroupSchema)
    })

    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
        }
    }, [isError, error])

    React.useEffect(() => {
        if (isSuccess) {
            handleToggleDialog()
            refresh().then(()=>notify('Groupe de chauffeur ajouté avec success', 'success'))
            resetForm()
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
                        title={'Ajouter un groupe de chauffeur'}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <TextField
                                size={'md'}
                                label={'Nom du group'}
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
                            fullwidth={true}>Ajouter le groupe</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
