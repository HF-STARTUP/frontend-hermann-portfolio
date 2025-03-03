"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import {Stack} from "@/components/box/Grid";
import TextField, {BtnField, FieldDate, ImageUploadFieldGroup} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {useAddDriver, useGetDaysOfTheWeeks, useGetDriverTypes, useGetGrades} from "@/hooks/driver/useDriver";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import Driver from "@/model/driver/Driver";
import DriverType from "@/model/driver/DriverType";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {AddDriverInputs, addDriverSchema} from "@/schema/driver.schema";
import notify from "@/utils/func/notification";
import {useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {imageBaseUrl} from "@/model/Model";
import {
    GradeSelectInput,
    VehiculeSelectInput
} from "@/app/(protected)/dashboard/vehicule-list/_components/vehiculSelectInput/VehiculeSelectInput";
import {SEXE} from "@/types/driver.type";
import {cn, formatDateToFormDate, parseDaysOff} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {DayOffChip} from "@/components/box/Chip";

export const EditDriverDialog: React.FC<{
    isOpen: boolean,
    driver?: Driver,
    driverInfos?: Driver,
    onClose: (value: boolean) => void,
    isMain?: boolean,
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 driver,
                                                 isMain = false,
                                                 onClose, children,
                                                 driverInfos,
                                                 ...props
                                             }) => {

    const isUpdate = !!driver
    const isStepper = !driver

    const [updateVehiculeDialogIsOpen, setUpdateVehiculeDialogIsOpen] = React.useState(isMain)
    const [successDialogIsOpen, setSuccessDialogIsOpen] = React.useState(false)

    const [grade_id, setGradeID] = React.useState<null | number>(null)
    const [driver_type_id, setDriverTypeID] = React.useState<null | number>(null)
    const [driver_licence_type, SetDriver_licence_type] = React.useState<string>('A')
    const [day_of, setDayOf] = React.useState<null | number>(null)
    const [vehicle_id, setActiveVehicleID] = React.useState<null | string>(null)
    const [group_id, setGroupID] = React.useState<null | string>(null)
    const [activeStep, setActiveStep] = React.useState<number>(1)
    const [withVehicle, setWithVehicle] = React.useState(true)

    const [reposDays, setReposDays] = React.useState<number[]>([])

    const {isLoading: loadingGrades, data: grades} = useGetGrades()

    const [image, setImage] = React.useState<File | undefined>()

    const {
        register,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: {errors},
        setValue,
    } = useForm<AddDriverInputs>({
        resolver: joiResolver(addDriverSchema)
    })

    React.useEffect(() => {
        setActiveStep(1)
        return (() => {
            setActiveStep(1)
        })
    }, [])

    React.useEffect(() => {
        if (driver) {
            setValue('last_name', driver._instance.last_name)
            setValue('first_name', driver._instance.first_name)
            setValue('email', driver._instance.email)
            setValue('cni_number', driver._instance.cni_number)
            setValue('driver_licence_number', driver._instance.driver_licence_number)
            setValue('phone', '' + driver._instance.phone)

            //setValue('driver_licence_type', driver.driver_licence_type)
            if (driverInfos) {

                const days_offs = driverInfos._instance.days_off ? parseDaysOff(driverInfos._instance.days_off as unknown as string) : [1]

                setValue('birthday', formatDateToFormDate(driverInfos._instance.birthday))
                setValue('place_Birth', driverInfos._instance.place_Birth)
                setValue("driver_type_id", '' + driverInfos._instance.driver_type_id)

                setReposDays(days_offs)

                setValue('driver_licence_number', driverInfos._instance.driver_licence_number)

                setValue('driver_licence_type', driverInfos._instance.driver_licence_type.toUpperCase())

                setValue("grade_id", '' + driverInfos._instance.grade_id)

                setValue('country_licence_delivery', driverInfos._instance.country_licence_delivery)

                setValue('issue_delivery_on', formatDateToFormDate(driverInfos._instance.issue_delivery_on))
                setValue('expire_delivery_at', formatDateToFormDate(driverInfos._instance.expire_delivery_at))


            }
        }
    }, [driver, driverInfos, setValue])

    const {
        mutate: addDriverMutation,
        isLoading: savingDriver,
        isSuccess,
        invalidDrivers,
        isError: addDriverError,
        error: driverError,
        data: driverAdded
    } = useAddDriver()

    const {dayOfTheWeeksProps, resolveDayOff} = useGetDaysOfTheWeeks()
    const {parkID} = useGetParkID()

    const {
        data: driverTypes,
        isLoading: loadingDriverTypes
    } = useGetDriverTypes()

    const {
        data: vehicules,
        isLoading: loadingVehicules,
        error,
        isError
    } = useGetVehicules()

    const {region_id} = useGetRegion()

    // const {
    //     data: driversGroup,
    //     isLoading: loadingDriversGroup,
    //     error: groupError,
    //     isError: groupIsError,
    // } = useGetDriversGroup()

    // React.useEffect(() => {
    //     console.log(error)
    // }, [groupIsError, groupError])

    const onSubmit: SubmitHandler<AddDriverInputs> = (addDriverInputs) => {

        console.log("Updating")

        addDriverMutation({
            ...addDriverInputs,
            id: isUpdate ? driver?.id : undefined,
            grade_id: '' + grade_id,
            image: image,
            city_id: '14',
            region_id: '' + region_id,
            vehicle_id: withVehicle ? (vehicle_id ?? '') : undefined,
            days_off: (reposDays.length ? JSON.stringify(reposDays) : undefined) as string,
            driver_licence_type,
            sex: SEXE.MEN,
            park_id: parkID,
        })

    }

    React.useEffect(() => {

        if (error) {
            console.log(error)
        }

    }, [error, isError])


    React.useEffect(() => {
        if (addDriverError) {
            notify(`${driverError?.message}`, 'error')
        }
    }, [driverError, addDriverError])

    React.useEffect(() => {
        if (isSuccess) {
            onClose(true)
            notify(isUpdate ? `Chauffeur mise à jour avec success` : `Chauffeur ajouté avec success`, 'success')
            invalidDrivers().then()
            setSuccessDialogIsOpen(true)
            resetForm()
            setActiveStep(1)
        }
    }, [isSuccess, driverAdded])

    React.useEffect(() => {

        const driver_type = watch("driver_type_id")

        if (driver_type) {
            setWithVehicle(true)
        }
    }, [watch("driver_type_id")])

    const onCloseSuccessDialog = () => {
        setSuccessDialogIsOpen(false)
    }

    const onAddReposDay = () => {
        const curdayoff = +watch("days_off")

        if (!curdayoff) return

        if (reposDays.find(rd => rd === curdayoff)) return

        console.log(curdayoff)
        setReposDays([curdayoff, ...reposDays])

    }

    return (
        <div {...props}>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={!isMain}
                        title={isMain ? 'Recruter un chauffeur' : 'Modifier les informations du chauffeur'}
                        handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>

                        <StepItem isStepper={isStepper} step={1} activeStep={activeStep} className={`step-1`}>
                            <ImageUploadFieldGroup
                                existingImages={driver?.getAvatar ? [driver?.getAvatar] : undefined}
                                label={'Photo du chauffeur'}
                                multiple={false}
                                handleChange={(files) => setImage(files[0])}
                            />

                            <FormGroup adminForm={true} groupTitle={'Informations générales'} className={`mt-5`}>
                                <Stack variant={'md'}>
                                    <TextField
                                        size={'md'}
                                        label={'Nom de famille'}
                                        errors={errors}
                                        register={register('last_name')}
                                    />
                                    <TextField
                                        size={'md'}
                                        label={'Prénom'}
                                        errors={errors}
                                        register={register('first_name')}
                                    />
                                </Stack>
                                <Stack variant={'md'}>
                                    <FieldDate
                                        size={'md'}
                                        label={'Date de naissance'}
                                        errors={errors}
                                        register={register('birthday')}
                                    />
                                    <TextField
                                        size={'md'}
                                        label={'Lieu'}
                                        errors={errors}
                                        register={register('place_Birth')}
                                    />
                                </Stack>

                                <Stack>
                                    <TextField
                                        size={'md'}
                                        label={'Email'}
                                        errors={errors}
                                        register={register('email')}
                                        placeholder={"arseneyouyem@gmail.com"}
                                    />

                                    <TextField
                                        size={'md'}
                                        label={'Numéro de téléphone'}
                                        errors={errors}
                                        register={register('phone')}
                                        placeholder={"237657946392"}
                                    />
                                </Stack>

                                <Stack>
                                    <TextField
                                        size={'md'}
                                        label={'Numéro de Carte Nationale d’Identité'}
                                        errors={errors}
                                        register={register('cni_number')}
                                    />

                                </Stack>


                                {/*<TextField size={'md'} label={'Ville'}/>*/}


                                {/*<Stack>*/}
                                {/*    <SelectField size={'md'}*/}
                                {/*                 label={'Marque du véhicule'}*/}
                                {/*                 loading={loadingVehiculeBrands}*/}
                                {/*                 items={VehiculeBrand.toVSelect(vehiculeBrands)}*/}
                                {/*                 handleSelect={(v)=>setActiveVehiculeBrand(+v)}*/}
                                {/*    />*/}

                                {/*    <SelectField*/}
                                {/*        size={'md'}*/}
                                {/*        label={'Model'}*/}
                                {/*        loading={loadingVehiculeModels}*/}
                                {/*        items={VehiculeModel.toVSelect(vehiculeModels)}*/}
                                {/*        handleSelect={(v)=>setActiveVehiculeModel(+v)}*/}
                                {/*    />*/}
                                {/*</Stack>*/}
                            </FormGroup>
                        </StepItem>

                        <StepItem isStepper={isStepper} step={2} activeStep={activeStep} className={`step-2`}>
                            <FormGroup groupTitle={`Informations techniques`} className={`mt-5`}>
                                <Stack>
                                    <Input
                                        as={"select"}
                                        label={'Type de chauffeur'}
                                        options={DriverType.toVSelect(driverTypes)}
                                        {...register("driver_type_id")}
                                        onChange={(v) => {
                                            setDriverTypeID(+v.currentTarget.value)
                                            setValue("driver_type_id", v.currentTarget.value)
                                        }}
                                    />

                                    <GradeSelectInput
                                        gradeID={driverInfos?._instance?.grade_id}
                                        onSelect={(g) => setGradeID(g.id)}
                                    />
                                </Stack>

                                <div>
                                    <div className={"flex gap-2 items-end"}>
                                        <Input
                                            as={"select"}
                                            label={'Jour de repos'}
                                            options={dayOfTheWeeksProps}
                                            {...register("days_off")}
                                            error={errors.days_off}
                                            onChange={(v) => {
                                                setDayOf(+v.currentTarget.value)
                                                setValue("days_off", v.currentTarget.value)
                                            }}
                                        />

                                        <BtnField
                                            onClick={onAddReposDay}
                                            variant={"icon"}
                                            label={'Ajouter un tag'}
                                        />
                                    </div>
                                    <div className={"flex flex-wrap gap-2 mt-4"}>
                                        {reposDays.map((r, i) => (
                                            <DayOffChip
                                                day={resolveDayOff(r).label}
                                                token={+resolveDayOff(r).value}
                                                key={i}
                                                onClose={(token) => {
                                                    setReposDays(reposDays.filter(rd => rd !== token))
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <Input
                                    label={"Date de debut du travail"}
                                    type={"date"}
                                />

                            </FormGroup>
                            {watch("driver_type_id") == "1" &&
                                <FormGroup adminForm={true} groupTitle={'Véhicule'} className={`mt-7`}>
                                    {/*TODO: implement city selection*/}
                                    {withVehicle && watch("driver_type_id") == "1" && <VehiculeSelectInput
                                        vehicleID={driverInfos?._instance?.vehicle_id as unknown as string}
                                        onSelect={(v) => {
                                            setValue("vehicle_id", v.id)
                                            setActiveVehicleID(v.id)
                                        }}
                                    />}
                                    {watch("driver_type_id") == "1" && <div className={cn(
                                        "flex items-center space-x-2 -mt-7",
                                        !withVehicle && "mt-2"
                                    )}>
                                        <Checkbox
                                            id="terms"
                                            onCheckedChange={(vehicleState) => {
                                                setWithVehicle(!vehicleState as boolean)
                                            }}/>
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium text-admin-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Ne pas affecter de véhicule pour l'instant
                                        </label>
                                    </div>}
                                </FormGroup>}
                        </StepItem>

                        <StepItem isStepper={isStepper} step={3} activeStep={activeStep} className={`step-3`}>
                            <FormGroup adminForm={true} groupTitle={'Permis de conduire'} className={`mt-5`}>

                                <TextField
                                    size={'md'}
                                    label={'Numéro de permis'}
                                    errors={errors}
                                    register={register('driver_licence_number')}
                                />

                                <Input
                                    as={"select"}
                                    label={'Type de permis'}
                                    {...register("driver_licence_type")}
                                    error={errors.driver_licence_type}
                                    options={[
                                        {value: 'A', label: 'A'},
                                        {value: 'B', label: 'B'},
                                        {value: 'C', label: 'C'},
                                        {value: 'D', label: 'D'},
                                    ]}
                                    onChange={(v) => {
                                        setValue("driver_licence_type", v.currentTarget.value)
                                        SetDriver_licence_type('' + v.currentTarget.value)
                                    }}
                                />

                                <TextField
                                    size={'md'}
                                    label={'Pays de delivrance'}
                                    errors={errors}
                                    register={register('country_licence_delivery')}
                                />

                                <FieldDate
                                    size={'md'}
                                    label={'Date de delivrance'}
                                    errors={errors}
                                    register={register('issue_delivery_on')}
                                />
                                <FieldDate
                                    size={'md'}
                                    label={'Date d’expiration'}
                                    errors={errors}
                                    register={register('expire_delivery_at')}
                                />
                            </FormGroup>
                        </StepItem>

                        {/*{false&&<FormGroup adminForm={true} groupTitle={'Groupe'} className={`mt-5`}>*/}

                        {/*    <SelectField*/}
                        {/*        size={'md'}*/}
                        {/*        label={'Ajoutez ce chauffeur à un groupe'}*/}
                        {/*        loading={loadingDriversGroup}*/}
                        {/*        items={DriverGroup.toVSelect(driversGroup)}*/}
                        {/*        handleSelect={(v) => setGroupID('' + v)}*/}
                        {/*    />*/}

                        {/*    <AddNewDriverGroup>*/}
                        {/*        <BtnField label={'Creer un nouveau groupe'}/>*/}
                        {/*    </AddNewDriverGroup>*/}
                        {/*</FormGroup>}*/}

                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[10px]`}>
                        {/*<SimpleSuccessDialog*/}
                        {/*    title={'Informations mises a joour avec succès!'}*/}
                        {/*    image={'/assets/faker/default-car-1.png'}*/}
                        {/*>*/}
                        {/*    */}
                        {/*</SimpleSuccessDialog>*/}
                        {!isStepper && <BtnBase
                            type={"button"}
                            color={'blue'}
                            variant={'contained'}
                            fullwidth={true}
                            shape={'square'}
                            loading={savingDriver}
                            disabled={savingDriver}
                            onClick={() => onSubmit(watch())}
                            to={''}>Confirmer</BtnBase>}
                        {isStepper && (
                            <div>
                                {activeStep == 3 && (
                                    <div className={`grid grid-cols-12 gap-[8px]`}>
                                        <div className={`col-span-6`}>
                                            <BtnBase
                                                type={"button"}
                                                color={'white'}
                                                variant={'contained'}
                                                fullwidth={true}
                                                shape={'square'}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    event.preventDefault()
                                                    setActiveStep(2)
                                                }}
                                                to={''}
                                            >Précédent</BtnBase>
                                        </div>
                                        <div className={`col-span-6`}>
                                            <BtnBase
                                                type={"button"}
                                                color={'blue'}
                                                variant={'contained'}
                                                fullwidth={true}
                                                shape={'square'}
                                                loading={savingDriver}
                                                disabled={savingDriver}
                                                onClick={() => onSubmit(watch())}
                                                to={''}
                                            >Créer le chauffeur</BtnBase>
                                        </div>
                                    </div>
                                )
                                }
                                {activeStep === 1 && <BtnBase
                                    type={"button"}
                                    color={'blue'}
                                    variant={'contained'}
                                    fullwidth={true}
                                    shape={'square'}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        event.preventDefault()
                                        setActiveStep(2)
                                    }}
                                    to={''}>Suivant</BtnBase>}
                                {activeStep == 2 && (
                                    <div className={`grid grid-cols-12 gap-[8px]`}>
                                        <div className={`col-span-6`}>
                                            <BtnBase
                                                type={"button"}
                                                color={'white'}
                                                variant={'contained'}
                                                fullwidth={true}
                                                shape={'square'}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    event.preventDefault()
                                                    setActiveStep(1)
                                                }}
                                                to={''}
                                            >Précédent</BtnBase>
                                        </div>
                                        <div className={`col-span-6`}>
                                            <BtnBase
                                                type={"button"}
                                                color={'blue'}
                                                variant={'contained'}
                                                fullwidth={true}
                                                shape={'square'}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    event.preventDefault()
                                                    setActiveStep(3)
                                                }}
                                                to={''}>Suivant</BtnBase>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        )
                        }
                    </DialogActions>
                </form>
            </DialogBase>
            <SimpleSuccessDialogWithContent
                handleToggleDialog={onCloseSuccessDialog}
                isOpen={successDialogIsOpen}
                isSubDialog={false}
                fchild={
                    <div>
                        {!isUpdate && <div>
                            <b>{`${driverAdded?.last_name} ${driverAdded?.first_name}`}</b> fait désormais
                            partie de votre flotte.
                        </div>}
                        {isUpdate && <div>
                            <b>les information
                                du {`${driverAdded?.last_name} ${driverAdded?.first_name}`}</b> été mise à
                            jour
                        </div>}
                    </div>
                }
                title={`${isUpdate ? 'Chauffeur Mise à jour avec succès!' : 'Chauffeur enregistré avec succès!'}`}
                image={isUpdate ? driver?.getAvatar : `${imageBaseUrl}/${driverAdded?.Image.path}`}>
            </SimpleSuccessDialogWithContent>
        </div>
    )
}


export const StepItem: React.FC<{
    step: number,
    activeStep: number,
    isStepper?: boolean,
    expandable?: boolean,
    label?: string
} & React.HTMLAttributes<HTMLDivElement>> = ({step, expandable, label, activeStep, children, isStepper = true}) => {

    const isActive = step === activeStep
    const [open, setOpen] = React.useState(false)

    if (expandable) {
        return (
            <div>
                {!open && <BtnField
                    label={label ?? 'Ajouter'}
                    className={""}
                    onClick={() => setOpen(!open)}
                />}
                <div className={cn(
                    !open && "size-0 overflow-hidden"
                )}>
                    <FormGroup>
                        {children}
                    </FormGroup>
                </div>
            </div>
        )
    }

    if (!isStepper) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }

    return (
        <div className={`${isActive ? '' : 'hidden'}`}>
            {children}
        </div>
    )
}
