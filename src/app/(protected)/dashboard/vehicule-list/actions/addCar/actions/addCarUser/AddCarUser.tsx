"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {AddVehiculeOwnerInputs, addVehiculeOwnerSchema} from "@/schema/vehicule.schema";
import {useSetVehiculeOwner} from "@/hooks/vehicule/useVehicule";
import notify from "@/utils/func/notification";

export const AddCarUser: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)

    const $addVehiculeOwner = useSetVehiculeOwner()

    const {
        register,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddVehiculeOwnerInputs>({
        resolver: joiResolver(addVehiculeOwnerSchema)
    })


    React.useEffect(() => {
        if ($addVehiculeOwner.isSuccess && !$addVehiculeOwner.isLoading) {
            resetForm()
            $addVehiculeOwner.invalidData().then(r => notify(`Propriétaire ajouté avec success !`))
            setIsOpen(false)
        }
        if($addVehiculeOwner.isError  && !$addVehiculeOwner.isLoading) {
            notify($addVehiculeOwner.error?.message ?? "Erreur lors de l'ajout de ce propriétaire", 'error')
        }
    }, [$addVehiculeOwner.data])

    const onSubmit: SubmitHandler<AddVehiculeOwnerInputs> = (vehiculeOwnerInputs) => {
        $addVehiculeOwner.mutate(vehiculeOwnerInputs)
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
                <form>

                    <AdminDialogHead withBack={true} title={'Ajouter un nouveau propriétaire'}
                                     handleToggle={handleToggleDialog}/>
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                            <TextField
                                required={true}
                                size={'md'}
                                label={'Nom du propriétaire'}
                                register={register("last_name")}
                                errors={errors}
                            />
                            <TextField
                                required={true}
                                size={'md'}
                                label={'Prénom'}
                                register={register("first_name")}
                                errors={errors}
                            />
                            <TextField
                                required={true}
                                size={'md'}
                                label={'Numéro de CNI'}
                                register={register("cni_number")}
                                errors={errors}
                            />
                            <TextField
                                size={'md'}
                                label={'Numéro de permis de conduire'}
                                register={register("driver_licence_number")}
                                errors={errors}
                            />
                        </FormGroup>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            onClick={handleSubmit(onSubmit)}
                            loading={$addVehiculeOwner.isLoading}
                            disabled={$addVehiculeOwner.isLoading}
                            type={'button'}
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            fullwidth={true}>Ajouter le propriétaire</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
