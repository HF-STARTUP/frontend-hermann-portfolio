import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {AddClientInputs, addClientSchema} from "@/schema/supplier.schema";
import Supplier from "@/model/supplier/Supplier";
import {
    SimpleSuccessDialog,
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {useCreateClient} from "@/hooks/client/useClient";
import {
    AddClientAddressDialog
} from "@/app/(protected)/dashboard/clients/actions/addClient/actions/addClientAddress/addClientAddress";
import {ChipRecette, LocationChip} from "@/components/box/Chip";
import useClientStore from "@/app/(protected)/dashboard/clients/store/useAddClientStore";
import {Client} from "undici-types";
import ClientModel from "@/model/client/ClientModel";

export const AddClientDialog: React.FC<{
    client?: ClientModel,
    isOpen: boolean,
    onClose: (value: boolean) => void,
    isMain?: boolean,
    isSubDialog?: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 isSubDialog = false,
                                                 client,
                                                 isMain = false,
                                                 onClose,
                                                 children,
                                                 ...props
                                             }) => {

    const [successDialogIsOpen, setSuccessDialogIsOpen] = React.useState<boolean>(false)


    const {
        handleCreateClient,
        isSuccess,
        loading: isLoading,
        data,
    } = useCreateClient()

    const isUpdate = !isMain


    const onSubmit: SubmitHandler<AddClientInputs> = (clientInputs, event) => {
        //TODO: add client
        handleCreateClient(client ? {id: client.id, ...clientInputs} : clientInputs)
    }

    const {
        activeAddress,
        removeAddressByName,
        setAddress,
        reset,
    } = useClientStore()



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddClientInputs>({
        resolver: joiResolver(addClientSchema)
    })

    React.useEffect(()=>{
        reset()
    }, [isOpen])

    React.useEffect(()=>{
        if(client){
            const {email, phone, username} = client
            setValue("email", email)
            setValue("phone", phone)
            setValue("name", username)

            if(client.rawAddressList){
                for (let adds of client.rawAddressList) {
                    setAddress(adds)
                }
            }
        }
    }, [client])

    const onCloseSuccessDialog = () => {
        setSuccessDialogIsOpen(false)
        onClose(true)
        resetForm()
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            setSuccessDialogIsOpen(true)
        }
    }, [isSuccess, data])

    return (
        <div {...props}>
            <DialogBase isSubDialog={isSubDialog} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={!isMain}
                        title={isMain ? 'Créer un client' : 'Modifier les informations du client'}
                        handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>

                        <FormGroup adminForm={true} groupTitle={'Informations générales'}>

                            <TextField
                                size={'md'}
                                label={'Nom du client'}
                                register={register("name")}
                                errors={errors}
                                required={true}
                            />

                            <TextField
                                size={'md'}
                                label={'Numéro de téléphone'}
                                register={register("phone")}
                                errors={errors}
                                required={true}
                                inputType={"tel"}
                                placeholder={"237657946392"}
                            />

                            <TextField
                                size={'md'}
                                label={'Email (facultatif)'}
                                register={register("email")}
                                errors={errors}
                                required={false}
                                inputType={"email"}
                                placeholder={"idriss@psatechnoligie.com"}
                            />


                            <div className={"flex items-center justify-between"}>
                                <div
                                    className="text-[#506D82] text-sm font-normal leading-normal">Adresse
                                </div>
                                <AddClientAddressDialog>
                                    <button type={"button"}
                                            className="text-[#506D82] text-sm font-bold leading-normal">+
                                        Ajouter une adresse
                                    </button>
                                </AddClientAddressDialog>
                            </div>

                            <div>
                                <div className="tags-recette flex flex-wrap gap-[8px]">
                                    {activeAddress.map((r, k) => (
                                        <LocationChip
                                            key={k}
                                            onClose={removeAddressByName}
                                            location={r.name}
                                            place={r.description}
                                        />
                                    ))}
                                </div>
                            </div>


                        </FormGroup>

                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        {!isMain && <>
                            <SimpleSuccessDialog
                                title={`Informations mises à jour avec succès!`}
                                fchild={<div className={`mb-10`}></div>}
                                image={`/assets/faker/default-brand.png`}>
                            </SimpleSuccessDialog>
                            <BtnBase
                                color={'blue'}
                                variant={'contained'}
                                type={'submit'}
                                fullwidth={true}
                                shape={'square'}
                                loading={isLoading}
                                disabled={isLoading}
                                to={''}>Confirmer</BtnBase>
                        </>}

                        <>
                            <SimpleSuccessDialogWithContent
                                fchild={<div>
                                    {!client?.id &&
                                        <div><b>{watch("name")}</b> fait désormais partie de vos client.</div>}
                                    {client?.id && <div>Informations mises à jour avec succès!</div>}
                                </div>}
                                title={client?.id ? "Mise à jour éffectué" :`Client enregistré avec succès!`}
                                handleToggleDialog={onCloseSuccessDialog}
                                isOpen={successDialogIsOpen}
                            />
                            {isMain && <BtnBase
                                color={'blue'}
                                variant={'contained'}
                                type={'submit'}
                                fullwidth={true}
                                shape={'square'}
                                loading={isLoading}
                                disabled={isLoading}
                                to={''}>Confirmer</BtnBase>}
                        </>

                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
