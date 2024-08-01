import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import {Stack} from "@/components/box/Grid";
import TextField, {BtnField, ImageUploadFieldGroup, SelectField} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {
    AddNewSupplierCtgDialog
} from "@/app/(protected)/dashboard/suppliers-list/actions/addSupplier/actions/addNewSupplierCtg/AddNewSupplierCtgDialog";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {AddSupplierInputs, addSupplierSchema} from "@/schema/supplier.schema";
import {useGetSupplierCtg, useSetSupplier} from "@/hooks/supplier/useSupplier";
import notify from "@/utils/func/notification";
import Supplier, {SupplierCtg} from "@/model/supplier/Supplier";
import {
    SimpleSuccessDialog,
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {imageBaseUrl} from "@/model/Model";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";

export const AddSupplierDialog: React.FC<{
    supplier?: Supplier,
    isOpen: boolean,
    onClose: (value: boolean) => void,
    client?: Supplier,
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

    const [selectImages, setSelectImages] = React.useState<File[] | undefined>(undefined)
    const [supplierCtg, setSupplierCtg] = React.useState<string | null>(null)
    const [successDialogIsOpen, setSuccessDialogIsOpen] = React.useState<boolean>(false)

    const {parkID} = useGetParkID()

    const {
        mutate: addSupplierMutation,
        isLoading,
        isError,
        isSuccess,
        data,
        error,
        invalidSuppliers,
    } = useSetSupplier()

    const isUpdate = !isMain


    const {data: suppliersCtg, isLoading: loadingSuppliersCtg} = useGetSupplierCtg()

    const onSubmit: SubmitHandler<AddSupplierInputs> = (supplierInputs, event) => {
        if (!selectImages && !isUpdate) {
            notify("Veuillez selectionner le logo de l'entreprise", 'error')
            return
        }
        addSupplierMutation({
            ...supplierInputs,
            id: isUpdate ? '' + client?.id : undefined,
            logo: selectImages?.length ? selectImages![0] : undefined,
            category_id: supplierCtg ? '' + supplierCtg : undefined,
            park_id: parkID
        })
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddSupplierInputs>({
        resolver: joiResolver(addSupplierSchema)
    })

    React.useEffect(() => {
        if (client) {
            setValue('name', client['name'])
            setValue('business_name', client['business_name'])
            setValue('niu', client['niu'])
            setValue('social_reason', client['social_reason'])
            setValue('rccm', client['rccm'])
            setValue('phone', client['phone'])
            setValue('email', client['email'])
            setValue('city', client['city'])
            setValue('street', client['street'])
        }
    }, [client, setValue])


    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
        }
    }, [isError, error])

    React.useEffect(() => {
        if (isSuccess) {
            invalidSuppliers().then()
            resetForm()
            setSuccessDialogIsOpen(true)
            notify(isUpdate ? 'Fournisseur mise à jour avec success' : 'Fournisseur ajouté avec success', 'success')
        }
    }, [isSuccess, data])

    const onCloseSuccessDialog = () => {
        setSuccessDialogIsOpen(false)
        onClose(true)
    }


    return (
        <div {...props}>
            <DialogBase isSubDialog={isSubDialog} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={!isMain}
                        title={isMain ? 'Ajouter un fournisseur' : 'Modifier les informations du fournisseur'}
                        handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>

                        <FormGroup adminForm={true} groupTitle={'Informations générales'}>

                            <ImageUploadFieldGroup
                                existingImages={client?.getLogo ? [client?.getLogo] : undefined}
                                multiple={false}
                                className={`mb-5`}
                                label={`${isUpdate ? "Changer le logo" : "Ajouter le logo de l'entreprise"}`}
                                handleChange={(files) => setSelectImages(files)}
                            />

                            <Stack variant={'md'}>
                                <TextField
                                    size={'md'}
                                    label={'Nom de l’entreprise'}
                                    register={register("name")}
                                    errors={errors}
                                    required={true}
                                />
                                <TextField
                                    size={'md'}
                                    label={'Nom commercial'}
                                    register={register("business_name")}
                                    errors={errors}
                                    required={true}
                                />
                            </Stack>

                            <TextField
                                size={'md'}
                                label={'Numero d’identifiant unique (NIU)'}
                                register={register("niu")}
                                errors={errors}
                                required={true}
                            />

                            {/*<TextField*/}
                            {/*    size={'md'}*/}
                            {/*    label={'Raison sociale'}*/}
                            {/*    register={register("social_reason")}*/}
                            {/*    errors={errors}*/}
                            {/*    required={true}*/}
                            {/*/>*/}

                            <TextField
                                size={'md'}
                                label={'RCCM'}
                                register={register("rccm")}
                                errors={errors}
                                required={true}
                            />

                            <TextField
                                size={'md'}
                                label={'Numéro de téléphone'}
                                register={register("phone")}
                                errors={errors}
                            />

                            <TextField
                                size={'md'}
                                label={'Email'}
                                register={register('email')}
                            />
                            {/******/}

                            <div className={"flex items-end justify-end gap-2"}>
                                <SelectField
                                    size={'md'}
                                    label={'Catégorie du fournisseur'}
                                    items={SupplierCtg.toVSelect(suppliersCtg)}
                                    loading={loadingSuppliersCtg}
                                    handleSelect={(v) => setSupplierCtg('' + v)}
                                />
                                <AddNewSupplierCtgDialog>
                                    <BtnField
                                        variant={"icon"}
                                        label={""}
                                    />
                                </AddNewSupplierCtgDialog>

                            </div>
                            <TextField
                                size={'md'}
                                label={'Ville'}
                                register={register("city")}
                                errors={errors}
                            />
                            <TextField
                                size={'md'}
                                label={'Quartier'}
                                register={register("street")}
                                errors={errors}
                            />

                            {/*<TextField size={'md'} label={'Nom du correspondant 1'}/>*/}
                            {/*<TextField size={'md'} label={'Numéro du correspondant 1'}/>*/}
                            {/*<TextField size={'md'} label={'Email du correspondant 1'}/>*/}

                            {/*<AddNewSupplierCtgDialog>*/}
                            {/*    <BtnField label={'Ajouter un correspondant'}/>*/}
                            {/*</AddNewSupplierCtgDialog>*/}

                        </FormGroup>

                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        {/*<SimpleSuccessDialog*/}
                        {/*    title={'Informations mises a joour avec succès!'}*/}
                        {/*    image={'/assets/faker/default-car-1.png'}*/}
                        {/*>*/}
                        {/*    */}
                        {/*</SimpleSuccessDialog>*/}
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
                                    {!isUpdate &&
                                        <div><b>{data?.name}</b> fait désormais partie de vos fournisseurs.</div>}
                                    {isUpdate && <div>Informations mises à jour avec succès!</div>}
                                </div>}
                                title={`Fournisseur enregistré avec succès!`}
                                image={`${imageBaseUrl}/${data?.logo}`}
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
