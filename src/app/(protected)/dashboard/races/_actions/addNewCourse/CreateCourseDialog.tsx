"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {FieldDate} from "@/components/form/TextField";
import BtnBase, {GafaAppLoader} from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import Supplier from "@/model/supplier/Supplier";
import {
    SimpleSuccessDialog,
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {Stack} from "@/components/box/Grid";
import {
    ClientSelectInput,
    VehiculeSelectInput
} from "@/app/(protected)/dashboard/vehicule-list/_components/vehiculSelectInput/VehiculeSelectInput";
import {useCreateCourse} from "@/hooks/course/useCourse";
import {CreateCourseInputs, createCourseSchema} from "@/schema/course.schema";
import ClientModel from "@/model/client/ClientModel";
import Vehicle from "@/model/vehicule/Vehicule";
import vehicule from "@/model/vehicule/Vehicule";
import notify from "@/utils/func/notification";
import {PlaceFieldInput} from "@/components/form/PlacField";
import useCourseStore from "@/app/(protected)/dashboard/races/_store/useCourseStore";
import {ScrollArea} from "@/components/ui/scroll-area";
import MapRouteComponent from "@/app/(protected)/dashboard/geolocation/_components/map/MapRouteComponent";
import {MapLoad} from "@/app/(protected)/dashboard/geolocation/_components/mapCarStat/_utils/mapLoad";
import {cn} from "@/lib/utils";


export const CreateCourseDialog: React.FC<{
    client?: Supplier,
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
    const [selectedClient, setSelectedClient] = React.useState<ClientModel>()
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle>()


    const {
        setStartLocation,
        setEndLocation,
        endLocation,
        startLocation
    } = useCourseStore()

    const {
        handleCreateCourse,
        isSuccess,
        loading: isLoading,
        data,
    } = useCreateCourse()

    const isUpdate = !isMain


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<CreateCourseInputs>({
        resolver: joiResolver(createCourseSchema)
    })

    const onResetData = ()=> {

        resetForm()
        setSelectedVehicle(undefined)
        setSelectedClient(undefined)
        setStartLocation(undefined)
        setEndLocation(undefined)
    }

    const onSubmit: SubmitHandler<CreateCourseInputs> = (inputs, event) => {
        if (!vehicule) {
            notify("Vous devez specifier un véhicule pour votre course", "error")
            return

        }
        if (!selectedClient) {
            notify('Vous devez spécifier un client pour votre course', "error")
            return;

        }
        if (!startLocation || !endLocation) {
            notify("Vous devez specifier l'addresse de départ et de destination de votre course", "error")
            return;

        }
        console.log(inputs)
        //TODO: add course and other func to verify
        handleCreateCourse({...inputs, vehicle_id: `${selectedVehicle?.id}`, client_id: `${selectedClient.id}`})

    }

    const onCloseSuccessDialog = () => {
        setSuccessDialogIsOpen(false)
        onClose(true)
        resetForm()
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            setSuccessDialogIsOpen(true)
            onResetData()
        }
    }, [isSuccess, data])

    return (
        <div {...props}>
            <DialogBase
                isSubDialog={isSubDialog}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={onClose}
                bgType={'whited'}
                className={"max-w-[1172px] max-h-full"}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={!isMain}
                        title={isMain ? "Créer une course" : "Modifier les informations d'une course"}
                        handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>
                        <div className={"grid grid-cols-12 gap-8"}>
                            <div className={"col-span-6"}>
                                <ScrollArea className="h-[415px] rounded-md px-3">
                                    <FormGroup adminForm={true} groupTitle={'Informations générales'}>

                                        <Stack>
                                            <FieldDate
                                                size={'md'}
                                                label={'Date de départ'}
                                                register={register("start_date")}
                                                errors={errors}
                                                required={true}
                                            />
                                            <TextField
                                                size={'md'}
                                                label={'Heure de départ'}
                                                inputType={"time"}
                                                register={register("start_hour")}
                                                errors={errors}
                                                required={true}
                                            />
                                        </Stack>

                                        <Stack>
                                            <FieldDate
                                                size={'md'}
                                                label={"Date d'arrivé"}
                                                register={register("end_date")}
                                                errors={errors}
                                                required={true}
                                            />
                                            <TextField
                                                size={'md'}
                                                label={"Heure d'arrivé"}
                                                inputType={"time"}
                                                register={register("end_hour")}
                                                errors={errors}
                                                required={true}
                                                onChange={v => console.log(v.currentTarget.value)}
                                            />
                                        </Stack>

                                        <div className={"grid grid-cols-12 gap-4"}>
                                            <div className={"col-span-9"}>
                                                <div className={"flex flex-col gap-5"}>
                                                    <VehiculeSelectInput
                                                        label={"Sélectionnez le véhicule"}
                                                        onSelect={setSelectedVehicle}
                                                    />
                                                </div>
                                            </div>
                                            <div className={"col-span-3"}>
                                                <TextField
                                                    size={'md'}
                                                    label={'Montant estimé'}
                                                    inputType={"number"}
                                                    register={register("amount")}
                                                    errors={errors}
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div className={"flex flex-col gap-5"}>
                                            <ClientSelectInput
                                                label={"Sélectionnez le client"}
                                                onSelect={setSelectedClient}
                                            />
                                        </div>

                                        <PlaceFieldInput
                                            label={'Lieu de départ'}
                                            onSelectLocation={setStartLocation}
                                        />

                                        <PlaceFieldInput
                                            label={'Lieu d’arrivée'}
                                            onSelectLocation={setEndLocation}
                                        />

                                        <br/>
                                        <br/>
                                    </FormGroup>
                                </ScrollArea>
                            </div>
                            <div className={"col-span-6"}>
                                <div
                                    className={"w-full bg-slate-100 rounded-lg h-[415px] overflow-hidden"}>
                                    {startLocation && endLocation && (<MapRouteComponent
                                        endAddress={endLocation}
                                        startAddress={startLocation}
                                    />)}
                                    <div className={"h-full w-full flex items-center justify-center"}>
                                        {(!startLocation || !endLocation) && (
                                            <MapLoad/>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DefaultDialogMainBody>
                    <DialogActions className={``}>
                        {!isMain && <>
                            <SimpleSuccessDialog
                                title={`Informations mises à jour avec succès!`}
                                fchild={<div className={`mb-10`}></div>}
                                image={`/assets/faker/mapIllus.png`}
                            >
                            </SimpleSuccessDialog>
                            <BtnBase
                                color={'blue'}
                                variant={'contained'}
                                type={'submit'}
                                fullwidth={true}
                                shape={'square'}
                                loading={isLoading}
                                disabled={isLoading}
                                to={''}>Modifier la course</BtnBase>
                        </>}

                        <>
                            <SimpleSuccessDialogWithContent
                                isSubDialog={false}
                                title={`Course programmé !`}
                                image={`/assets/faker/mapIllus.png`}
                                fchild={<div>
                                    {!isUpdate &&
                                        <div>Votre course à été programmé avec success</div>}
                                    {isUpdate && <div>Course mises à jour avec succès!</div>}
                                </div>}
                                handleToggleDialog={onCloseSuccessDialog}
                                isOpen={successDialogIsOpen}
                            />
                            {isMain && <button
                                type={"submit"}
                                className={cn(
                                    "text-white  bg-[#2554AE] py-[11px] text-sm font-semibold leading-[17.07px] hover:opacity-85 rounded-[10px]",
                                    "flex items-center justify-center"
                                )}
                                disabled={!(startLocation && endLocation) || isLoading}
                            >
                                {isLoading&&<GafaAppLoader/>}
                                {!isLoading&&<span>Creer la course</span>}
                            </button>}
                        </>

                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
