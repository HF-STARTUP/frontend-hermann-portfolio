"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {BtnField, FieldDate, ImageUploadFieldGroup, SelectField} from "@/components/form/TextField";
import {Stack} from "@/components/box/Grid";
import BtnBase from "@/components/elements/BtnBase";
import {AddCarUser} from "@/app/(protected)/dashboard/vehicule-list/actions/addCar/actions/addCarUser/AddCarUser";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {
    useGetVehiculeColors,
    useGetVehiculeContratsType,
    useGetVehiculeOwner,
    useGetVehiculeTypes,
    useSetVehicule,
    useVehiculeSelection
} from "@/hooks/vehicule/useVehicule";
import VehiculeType from "@/model/vehicule/VehiculeType";
import VehiculeBrand from "@/model/vehicule/VehiculeBrand";
import VehiculeModel from "@/model/vehicule/VehiculeModel";
import VehiculeColors from "@/model/vehicule/VehiculeColors";
import VehiculeContratsType from "@/model/vehicule/VehiculeContratsType";
import VehiculeOwner from "@/model/vehicule/VehiculeOwner";
import {FieldError, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {
    AddVehiculeInputs,
    addVehiculeSchema,
    COLLECTION_METHOD,
    COLLECTION_TYPE,
    PASSATION_CADENCE,
    RECIPE_TYPE,
    TARIF_CADENCE
} from "@/schema/vehicule.schema";
import notify from "@/utils/func/notification";
import {useGetCurrency, useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {
    AddNewContractType
} from "@/app/(protected)/dashboard/vehicule-list/actions/addCar/actions/addContratType/addNewContractType";
import Vehicule from "@/model/vehicule/Vehicule";
import {ChipRecette, DriverChip} from "@/components/box/Chip";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
    DriverSelectInput
} from "@/app/(protected)/dashboard/vehicule-list/_components/vehiculSelectInput/VehiculeSelectInput";
import Driver from "@/model/driver/Driver";
import {StepItem} from "@/app/(protected)/dashboard/drivers-list/actions/editDriver/editDriverDialog";
import {cn, formatDateToFormDate} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {TimePeriod} from "@/types/vehicule.type";
import {Checkbox} from "@/components/ui/checkbox";


type RecipeType = {
    amount: string,
    recipe_type: string
}

type TarifType = {
    tarif: string,
    cadence: string
}

export const AddCarDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
    vehicule?: Vehicule,
    vehiculeAllData?: Vehicule,
    isUpdate?: boolean,
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 vehicule,
                                                 vehiculeAllData,
                                                 isOpen,
                                                 onClose,
                                                 children,
                                                 isUpdate,
                                                 ...props
                                             }) => {
    const [selectImages, setSelectImages] = React.useState<File[] | undefined>(undefined)
    const [successDialogIsOpen, setSuccessDialogIsOpen] = React.useState<boolean>(false)
    const [curency_id, setCurency_id] = React.useState<string>('')
    const [color_id, setColor_id] = React.useState<string>('')
    const [vehicle_owner_id, setVehicle_owner_id] = React.useState<string>('')
    const [contract_type_id, setContract_type_id] = React.useState<string>('')
    const [vehicle_type_id, setVehicle_type_id] = React.useState<string>('')
    const [collection_type, setCollectionType] = React.useState<string>('')
    const [nbDriversAuthorized, setNbDriversAuthorized] = React.useState<number>(1)

    const [manageRecipeInVtcDefault, setManageRecipeInVtcDefault] = React.useState('1')
    const [encaissementTypeDefault, setEncaissementTypeDefault] = React.useState(COLLECTION_METHOD.CASH)

    const [manageRecipeInVtc, setManageRecipeInVtc] = React.useState<boolean>(true)
    const [collectionMethod, setCollectionMethod] = React.useState<COLLECTION_METHOD>(COLLECTION_METHOD.CASH)

    const [activeRecipe, setActiveRecipe] = React.useState<RecipeType>({amount: '', recipe_type: ''})
    const [activeTarif, setActiveTarif] = React.useState<TarifType>({tarif: '', cadence: ''})


    const [activeRecipes, setActiveRecipes] = React.useState<RecipeType[]>([])
    const [activeTafis, setActiveTarifs] = React.useState<TarifType[]>([])
    const [selectedDrivers, setSelectedDrivers] = React.useState<Driver[]>([])
    const [selectedDriver, setSelectedDriver] = React.useState<Driver>()

    const [withDriver, setWithDriver] = React.useState<boolean>(true)

    const [activeStep, setActiveStep] = React.useState<number>(1)
    const isStepper = false

    const {region_id} = useGetRegion()
    const [vehiculeWath, setVehiculeWath] = React.useState<Vehicule | null>(null)
    const {parkID} = useGetParkID()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: {errors,},
    } = useForm<AddVehiculeInputs>({
        resolver: joiResolver(addVehiculeSchema),
        defaultValues: isUpdate ? {id: vehicule?.id} : {}
    })


    React.useEffect(() => {

        return () => {
            if (isOpen) {
                reset()
                setActiveStep(1)
            }
        }
    }, [isOpen])


    React.useEffect(() => {
        if (vehicule) {
            console.table(vehicule)
            setValue('chassis_number', vehicule.getChasisNumber)
            // setValue('tags', vehicule.tags)
            setValue('gps_number', vehicule.getGpsNumber)
            setValue('registration_number', vehicule._instance?.registration_number)
            setValue('mileage', '' + vehicule.mileage)
            setValue('number_driver', vehicule._instance.vehicle_config?.driver_number_authorized)
        }

        if (vehiculeAllData) {
            setValue('insurance_subscription_at', formatDateToFormDate(vehiculeAllData._instance?.insurance_subscription_at))
            setValue('circulation_at', formatDateToFormDate(vehiculeAllData._instance?.circulation_at))
            setValue('entry_fleet_at', formatDateToFormDate(vehiculeAllData._instance?.entry_fleet_at))

            setValue('vehicle_type_id', vehiculeAllData._instance?.vehicle_type_id)
            setValue('color_id', '' + vehiculeAllData._instance?.color_id)
            setValue('brand_id', '' + vehiculeAllData._instance?.brand_id)
            setValue("model_id", '' + vehiculeAllData._instance?.model_id)
            setValue("vehicle_owner_id", '' + vehiculeAllData._instance?.owner_id)

            if (vehiculeAllData._instance?.recipes?.length) {
                setValue("cadence", vehiculeAllData._instance?.recipes[0].collection_type as PASSATION_CADENCE)
                setValue("recipes.0.collection_method", vehiculeAllData._instance?.recipes[0].collection_method as COLLECTION_METHOD)
                setEncaissementTypeDefault(vehiculeAllData._instance?.recipes[0].collection_method as COLLECTION_METHOD)


                setActiveRecipes(vehiculeAllData?._instance?.recipes.map((v, i) => ({
                    amount: '' + v.amount,
                    recipe_type: v.collection_type
                })))

            }

            if (vehiculeAllData._instance.vehicleCourseConfig.length) {

                const existingTarifs: TarifType[] = vehiculeAllData._instance.vehicleCourseConfig.map(t => ({
                            tarif: +t.tarif,
                            cadence: t.cadence as TimePeriod
                        } as unknown as TarifType
                    )
                )

                setActiveTarifs(existingTarifs)
            }

            setActiveVehiculeBrand(vehiculeAllData._instance?.brand_id)
            setActiveVehiculeModel(vehiculeAllData._instance?.model_id)

            setValue("manage_recipe_in_vtc", vehiculeAllData._instance?.manage_recipe_in_vtc)
            setManageRecipeInVtcDefault(vehiculeAllData?._instance?.manage_recipe_in_vtc ? "1" : "0")

            if (vehiculeAllData._instance?.vehicleConfig?.profiles) {
                vehiculeAllData.enableProfile && setValue("drivers_id.0", '' + vehiculeAllData.enableProfile)
            }
        }

    }, [vehicule, setValue])

    const {
        isLoading: savingVehicule,
        invalidData: invalidOldVehicules,
        isSuccess,
        mutate: saveVehiculeMutation,
        isError,
        error,
        reset: resetForm,
        data: vehiculeData,
    } = useSetVehicule()

    const {
        vehiculeBrands,
        vehiculeModels,
        loadingVehiculeBrands,
        loadingVehiculeModels,
        setActiveVehiculeBrand,
        setActiveVehiculeModel,
        activeVehiculeBrand,
        activeVehiculeModel
    } = useVehiculeSelection()


    const onSubmit: SubmitHandler<AddVehiculeInputs> = ({number_driver, cadence, drivers_id, ...addVehiculeInput}) => {

        console.log('submit form...')

        // if (!selectImages && !isUpdate) {
        //     notify(`Veuillez selectionner les images du véhicules`, 'error')
        //     return
        // }

        const tags = addVehiculeInput?.tags ?? ''


        saveVehiculeMutation({
            ...addVehiculeInput,
            recipes: !manageRecipeInVtc ? undefined : activeRecipes.map(r => ({
                freequency: r.recipe_type as RECIPE_TYPE,
                amount: +r.amount,
                manage_in_vtc: manageRecipeInVtc,
                collection_type: collection_type as COLLECTION_TYPE,
                collection_method: collectionMethod
            })),
            id: isUpdate ? '' + vehicule?.id : undefined,
            images: selectImages?.length ? selectImages : undefined,
            drivers_id: withDriver ? watch("drivers_id") : undefined,
            //region_id: isUpdate ? undefined : region_id + '',
            gps_number: addVehiculeInput.gps_number && addVehiculeInput.gps_number.length ? addVehiculeInput.gps_number : undefined,
            tags: isUpdate ? undefined : (tags.length ? JSON.stringify([...tags.split(',').map((name) => ({name}))]) : undefined),
            park_id: parkID,
            manage_recipe_in_vtc: manageRecipeInVtc,
            config: {
                number_driver: number_driver ? +number_driver : 1,
                drivers_id: withDriver ? (selectedDrivers.length ? selectedDrivers.map(d => d.id) : [selectedDriver?.id as string]) : undefined,
            },
            tarif: activeTafis.length ? activeTafis.map(v => (
                {
                    tarif: +v.tarif,
                    cadence: v.cadence as TARIF_CADENCE
                }
            )) : [{
                tarif: +activeTarif.tarif,
                cadence: activeTarif.cadence as TARIF_CADENCE
            }]
        })
    }

    const {
        data: vehiculeTypeData,
        isLoading: loadingVehiculeType,
    } = useGetVehiculeTypes()

    const {
        data: vehiculeColorsData,
        isLoading: loadingVehiculeColors,
    } = useGetVehiculeColors()

    const {
        data: vehiculeContratTypeData,
        isLoading: loadingVehiculeContratType,
    } = useGetVehiculeContratsType()


    const {
        data: ownersData,
        isLoading: loadingOwners,
    } = useGetVehiculeOwner()


    const {
        currencyObj
    } = useGetCurrency()

    React.useEffect(() => {

        if (isSuccess && !savingVehicule && vehiculeData) {

            onClose(true)
            reset()
            resetForm()
            setActiveStep(1)


            console.log(`Before`)
            console.log(vehiculeData)
            setVehiculeWath(vehiculeData)

            if (isUpdate) {
                notify(`Véhicule mis à jour avec succès`)
            } else {
                notify(`Vehicule ajouter avec success !`)
            }
            resetForm()
            setSuccessDialogIsOpen(true)
            invalidOldVehicules().then()
        }
        if (isError) {
            notify(error?.message ?? (isUpdate ? "Erreur lors de la mise à jour du véhicule" : "Erreur lors de l'ajout du véhicule"), 'error')
        }
    }, [savingVehicule, isSuccess, isError, vehiculeData])


    const addRecipeField = () => {
        if (activeRecipes.find(r => r.recipe_type === activeRecipe.recipe_type)) {
            notify('Cette recette à déjà été configuré', 'warning')
            return
        }
        if (activeRecipe.amount.length && activeRecipe.recipe_type.length) {
            setActiveRecipes([...activeRecipes, activeRecipe])
            setActiveRecipe({amount: '', recipe_type: ''})
        }
    };

    const addTarifField = () => {
        if (activeTafis.find(r => r.cadence === activeTarif.cadence)) {
            notify('Ce tarif à déjà été configuré', 'warning')
            return
        }
        if (activeTarif.tarif.length && activeTarif.cadence.length) {
            setActiveTarifs([...activeTafis, activeTarif])
            setActiveTarif({cadence: '', tarif: ''})
        }
    };

    const removeRecipeField = (recipe_type: string) => {
        setActiveRecipes(activeRecipes.filter(r => r.recipe_type !== recipe_type))
    }

    const removeTarifField = (tarif_cadence: string) => {
        setActiveTarifs(activeTafis.filter(r => r.cadence !== tarif_cadence))
    }


    const onAddDriver = () => {
        console.log(JSON.stringify(selectedDriver))

        if (selectedDrivers.length >= 2) {
            notify('Chauffeur maximale atteint', 'info')
            return;
        }

        if (selectedDrivers.find(d => d.id === selectedDriver?.id)) {
            notify('Déjà configuré', 'info')
            return
        }
        if (selectedDriver) {
            setSelectedDrivers([...selectedDrivers, selectedDriver])
        }
    };

    React.useEffect(() => {
        setSelectedDrivers([])
    }, [nbDriversAuthorized])

    const onRemoveDriver = (driver: Driver) => {
        setSelectedDrivers(selectedDrivers.filter(d => d.id !== driver.id))
    }

    //TODO: Fix text error

    return (
        <div {...props}>
            {/*<DevTool control={control}/>*/}

            {
                successDialogIsOpen && (
                    <SimpleSuccessDialogWithContent
                        isSubDialog={false}
                        fchild={isUpdate ? 'Les informations du vehicule ont été correctement modifiées' : <div>
                            Le véhicule <b>{vehiculeWath?.getFullName}</b> fait désormais partie de votre flotte.
                        </div>}
                        title={isUpdate ? 'Modification réussie' : 'Véhicule ajouté avec succès!'}
                        image={`${vehiculeWath?.getCover}`}
                        handleToggleDialog={() => {
                            setSuccessDialogIsOpen(false);
                        }}
                        isOpen={successDialogIsOpen}
                    />
                )
            }

            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead withBack={false} title={
                        isUpdate ? 'Mondifier les infos du véhicule' : 'Ajouter un véhicule'
                    }
                                     handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>

                        <StepItem isStepper={isStepper} step={1} activeStep={activeStep} className={`step-1`}>
                            <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                                <Input
                                    as={"select"}
                                    autoFocus={false}
                                    label={'Type de véhicule'}
                                    options={VehiculeType.toVSelect(vehiculeTypeData)}
                                    {...register("vehicle_type_id")}
                                    error={errors.vehicle_type_id}
                                />

                                <div className={`flex flex-col gap-[10px]`}>
                                    <Stack variant={'md'}>

                                        <Input
                                            as={"select"}
                                            label={'Marque du véhicule'}
                                            {...register("brand_id")}
                                            error={errors.brand_id}
                                            options={VehiculeBrand.toVSelect(vehiculeBrands)}
                                            onChange={(v) => {
                                                setActiveVehiculeBrand(+v.currentTarget.value)
                                            }}
                                        />

                                        <Input
                                            as={"select"}
                                            label={'Model'}
                                            options={VehiculeModel.toVSelect(vehiculeModels)}
                                            onSelect={(v) => setActiveVehiculeModel(+v)}
                                            {...register("model_id")}
                                            error={errors.model_id}
                                        />

                                    </Stack>
                                </div>
                                <div className={`grid grid-cols-12 gap-2`}>
                                    <div className={cn(
                                        `col-span-8`,
                                    )}>
                                        <Input
                                            label={'Numéro de chasis'}
                                            {...register("chassis_number")}
                                            error={errors.chassis_number}
                                        />
                                    </div>
                                    <div className={`col-span-4`}>
                                        <Input
                                            label={'Couleur'}
                                            as={"select"}
                                            options={VehiculeColors.toVSelect(vehiculeColorsData)}
                                            {...register("color_id")}
                                            error={errors.color_id}
                                        />
                                    </div>
                                </div>
                                {/*<Input*/}
                                {/*    label={'Tags'}*/}
                                {/*    placeholder={'Ex: tag1, tag2'}*/}
                                {/*    error={errors.tags}*/}
                                {/*    {...register('tags')}*/}
                                {/*/>*/}
                                <Stack>
                                    <Input
                                        label={'Numéro d\'immatriculation'}
                                        error={errors.registration_number}
                                        {...register('registration_number')}
                                    />
                                    <Input
                                        label={'Numéro de GPS (si GPS intégré)'}
                                        error={errors.gps_number}
                                        {...register('gps_number')}
                                    />
                                </Stack>
                                <Input
                                    label={'Killometrage'}
                                    type={'number'}
                                    error={errors.mileage}
                                    {...register('mileage')}
                                />
                                <ImageUploadFieldGroup
                                    label={'Ajouter une photo'}
                                    handleChange={(files) => setSelectImages(files)}
                                />
                            </FormGroup>
                        </StepItem>

                        <StepItem isStepper={isStepper} step={2} activeStep={activeStep} className={`step-2`}>
                            <FormGroup groupTitle={'Configuration véhicule'} className={`mt-7`}>
                                <div className={"flex flex-col gap-[24px]"}>
                                    <Input
                                        as={"select"}
                                        label={'Nombre de chauffeurs titulaires autorisés sur ce véhicule'}
                                        defaultValue={1}
                                        {...register("number_driver")}
                                        error={errors.number_driver}
                                        options={[
                                            {
                                                value: "1",
                                                label: "1 chauffeur"
                                            },
                                            {
                                                value: "2",
                                                label: "2 chauffeurs"
                                            }
                                        ]}
                                        onChange={(v) => setNbDriversAuthorized(+v.currentTarget.value)}
                                    />
                                    <div>
                                        <div className={"flex flex-col gap-2"}>
                                            {withDriver && <label
                                                className={`text-[14px] tracking-[-2%] font-medium text-admin-primary`}>Sélectionnez
                                                les chauffeurs à affecter sur ce véhicule</label>}
                                            {withDriver && <div className={"flex items-center gap-2"}>
                                                <DriverSelectInput
                                                    label={"Sélectionnez les chauffeurs à affecter sur ce véhicule"}
                                                    driverId={watch("drivers_id.0")}
                                                    onSelect={(driver) => {
                                                        const drivers = watch('drivers_id'); // Récupère le tableau actuel des drivers_id

                                                        setSelectedDriver(driver)

                                                        if (!drivers?.length) {
                                                            setValue("drivers_id.0", driver.id)
                                                            return
                                                        }

                                                        // Vérifie si l'ID du conducteur est déjà dans le tableau
                                                        const index = drivers.findIndex(id => id === driver.id);

                                                        if (index !== -1) {
                                                            // Si l'ID est déjà présent, remplace-le (ce cas pourrait être utile si vous voulez mettre à jour la valeur pour une raison quelconque)
                                                            setValue(`drivers_id.${index}`, driver.id);
                                                        } else {
                                                            // Sinon, trouve le premier index null (ou undefined) et insère le nouvel ID
                                                            const firstEmptyIndex = drivers.findIndex(id => id == null);
                                                            if (firstEmptyIndex !== -1) {
                                                                setValue(`drivers_id.${firstEmptyIndex}`, driver.id);
                                                            }
                                                        }
                                                    }}
                                                />
                                                {(nbDriversAuthorized > 1) &&
                                                    <BtnField onClick={() => onAddDriver()} variant={"icon"}
                                                              label={'Ajouter un nouveau chauffeur'}/>}
                                            </div>}
                                            <div className="flex items-center space-x-2 mt-2">
                                                <Checkbox
                                                    id="terms"
                                                    onCheckedChange={(driverState) => {
                                                        setSelectedDrivers([])
                                                        setWithDriver(!driverState as boolean)
                                                    }}/>
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium text-admin-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Ne pas affecter de chauffeur pour l'instant
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tags-recette flex flex-wrap gap-[8px] mt-4">
                                            {selectedDrivers.map((d, k) => (
                                                <DriverChip
                                                    key={k}
                                                    onClose={onRemoveDriver}
                                                    driver={d}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                        </StepItem>

                        <FormGroup adminForm={true} className={`mt-7`} groupTitle={`Contrat de propriété`}>
                            <StepItem
                                expandable={true}
                                isStepper={isStepper}
                                step={3}
                                activeStep={activeStep}
                                label={"Ajouter un contrat sur ce véhicule"}
                                className={`step-2`}>
                                <>

                                    <div className={`flex items-end gap-2`}>
                                        <Input
                                            as={"select"}
                                            label={'Type de contrat'}
                                            options={VehiculeContratsType.toVSelect(vehiculeContratTypeData)}
                                            {...register("contract_type_id")}
                                            error={errors.contract_type_id}
                                        />
                                        <AddNewContractType>
                                            <BtnField variant={"icon"} label={'Ajouter un type de contrat'}/>
                                        </AddNewContractType>
                                    </div>

                                    <div className={`flex items-end gap-2`}>
                                        <Input
                                            as={"select"}
                                            label={'Nom du propriétaire'}
                                            options={VehiculeOwner.toVSelect(ownersData)}
                                            {...register("vehicle_owner_id")}
                                            error={errors.vehicle_owner_id}
                                        />
                                        <AddCarUser>
                                            <BtnField variant={"icon"} label={'Ajouter un nouveau propriétaire'}/>
                                        </AddCarUser>
                                    </div>

                                    <Stack>
                                        <FieldDate
                                            label={"Date de début"}
                                            size={'md'}
                                        />
                                        <FieldDate
                                            label={"Date de fin"}
                                            size={'md'}
                                        />
                                    </Stack>

                                    <Stack>
                                        <TextField
                                            inputType={"number"}
                                            label={"Montant à payer au proprietaire"}
                                            size={'md'}
                                        />

                                        <SelectField
                                            size={'md'}
                                            label={'Fréquence de paiement'}
                                            //loading={loadingOwners}
                                            items={[{label: "Journalier", value: "Jour"}, {
                                                label: "Hebdomadaire",
                                                value: "hed"
                                            }, {label: "Mensuel", value: "men"}]}
                                            //handleSelect={(v) => setVehicle_owner_id(`${v}`)}
                                        />
                                    </Stack>
                                </>
                            </StepItem>
                        </FormGroup>

                        <FormGroup groupTitle={'Validité d’assurance'} className={`mt-7`}>
                            <StepItem
                                expandable={true}
                                isStepper={isStepper}
                                step={4}
                                activeStep={activeStep}
                                label={"Ajouter des informations d’assurance"}
                                className={`step-2`}>
                                <>
                                    <Stack variant={'md'}>

                                        <Input
                                            type={"date"}
                                            label={'Date de souscription assurance'}
                                            error={errors.insurance_subscription_at}
                                            {...register('insurance_subscription_at')}
                                        />
                                    </Stack>
                                    <Stack variant={'md'}>
                                        <Input
                                            type={"date"}
                                            label={'Date de mise en circulation'}
                                            error={errors.circulation_at as FieldError}
                                            {...register('circulation_at')}
                                        />
                                        <Input
                                            type={"date"}
                                            label={'Date d\'entré en flotte'}
                                            error={errors.entry_fleet_at}
                                            {...register('entry_fleet_at')}
                                        />
                                    </Stack>
                                </>
                            </StepItem>
                        </FormGroup>


                        <FormGroup groupTitle={'Recette'} className={`mt-7`}>
                            <StepItem
                                expandable={true}
                                isStepper={isStepper}
                                step={5}
                                activeStep={activeStep}
                                className={`step-2`}
                                label={"Ajouter des objectifs de recette sur ce véhicule"}
                            >
                                <>
                                    <div className={`flex flex-col gap-[22px] mb-2 w-full`}>

                                        <RadioGroup
                                            onValueChange={(v) => {
                                                setManageRecipeInVtc(v === "1")
                                            }}
                                            defaultValue={manageRecipeInVtcDefault}
                                            className="flex flex-col space-y-1"
                                        >
                                            <RadioGroupTitleWrapper title={"Gérer les recettes sur VTC Control"}>
                                                <RadioLabel label={"Activer"} id={"option1"}>
                                                    <RadioGroupItem value="1" id={"option1"}/>
                                                </RadioLabel>
                                                <RadioLabel label={"Désactiver"} id={"option2"}>
                                                    <RadioGroupItem value="0" id={"option2"}/>
                                                </RadioLabel>
                                            </RadioGroupTitleWrapper>
                                        </RadioGroup>

                                        <>
                                            {manageRecipeInVtc && (
                                                <>
                                                    <RadioGroup
                                                        onValueChange={(v: COLLECTION_METHOD) => {
                                                            setCollectionMethod(v)
                                                        }}
                                                        defaultValue={encaissementTypeDefault}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <RadioGroupTitleWrapper
                                                            title={"Définir le moyen d’encaissement de recette"}>
                                                            <RadioLabel label={"En espèces"} id={"cash"}>
                                                                <RadioGroupItem value={COLLECTION_METHOD.CASH}
                                                                                id={"cash"}/>
                                                            </RadioLabel>
                                                            <RadioLabel label={"Mobile Money"} id={"momo"}>
                                                                <RadioGroupItem value={COLLECTION_METHOD.MOMO}
                                                                                id={"momo"}/>
                                                            </RadioLabel>
                                                            <RadioLabel label={"Les deux"} id={"both"}>
                                                                <RadioGroupItem value={COLLECTION_METHOD.BOTH}
                                                                                id={"both"}/>
                                                            </RadioLabel>
                                                        </RadioGroupTitleWrapper>
                                                    </RadioGroup>

                                                    <Input
                                                        as={"select"}
                                                        label={'Définir le type d’encaissement'}
                                                        {...register("cadence")}
                                                        error={errors.cadence}
                                                        options={[
                                                            {
                                                                value: COLLECTION_TYPE.RECIPE_OBJECTIVE,
                                                                label: "Par objectif de recette"
                                                            },
                                                            {
                                                                value: COLLECTION_TYPE.without_recipe_objective,
                                                                label: "Sans objectif de recette"
                                                            }
                                                        ]}
                                                        onChange={(v) => setCollectionType(`${v.currentTarget.value}`)}
                                                    />

                                                    {collection_type !== COLLECTION_TYPE.without_recipe_objective &&
                                                        <div className={`flex items-end justify-end w-full`}>
                                                            <Stack className={`items-end justify-end`}>
                                                                <TextField
                                                                    fit={false}
                                                                    value={activeRecipe.amount}
                                                                    size={'md'}
                                                                    label={'Recette à verser'}
                                                                    inputType={`number`}
                                                                    placeholder={"10,000"}
                                                                    onChange={(e) => {
                                                                        setActiveRecipe({
                                                                            amount: e.target.value,
                                                                            recipe_type: activeRecipe.recipe_type
                                                                        })
                                                                    }}
                                                                />
                                                                <SelectField
                                                                    size={'md'}
                                                                    label={'Fréquence de versement'}
                                                                    loading={loadingOwners}
                                                                    items={[
                                                                        {label: 'Journalier', value: 'daily'},
                                                                        {label: 'Hebdomadaire', value: 'weekly'},
                                                                        {label: 'Mensuel', value: 'monthly'},
                                                                    ]}
                                                                    handleSelect={(v) => {
                                                                        setActiveRecipe({
                                                                            amount: activeRecipe.amount,
                                                                            recipe_type: '' + v
                                                                        })
                                                                    }}
                                                                />
                                                                <BtnField variant={'icon'} label={'Ajouter une recette'}
                                                                          onClick={addRecipeField}/>
                                                            </Stack>

                                                        </div>}
                                                </>
                                            )
                                            }
                                        </>

                                    </div>
                                    {collection_type !== COLLECTION_TYPE.without_recipe_objective &&
                                        <div className="tags-recette flex flex-wrap gap-[8px]">
                                            {activeRecipes.map((r, k) => (
                                                <ChipRecette
                                                    key={k}
                                                    price={`${r.amount}`}
                                                    frequency={`${r.recipe_type}`}
                                                    onCloseChip={() => removeRecipeField(r.recipe_type)}
                                                />
                                            ))}
                                        </div>}
                                </>
                            </StepItem>
                        </FormGroup>

                        <FormGroup groupTitle={'Tarifs de courses'} className={`mt-7`}>
                            <StepItem
                                label={"Ajouter des objectifs de course sur ce véhicule"}
                                expandable={true}
                                isStepper={isStepper}
                                step={6}
                                activeStep={activeStep}
                                className={`step-2`}>
                                <>
                                    <div className={`flex flex-col gap-[22px] mb-2 w-full`}>
                                        <div className={`flex items-end justify-end w-full`}>
                                            <Stack className={`items-end justify-end`}>
                                                <TextField
                                                    fit={false}
                                                    value={activeTarif.tarif}
                                                    size={'md'}
                                                    label={'Tarif'}
                                                    inputType={`number`}
                                                    placeholder={"10,000"}
                                                    onChange={(e) => {
                                                        setActiveTarif({
                                                            tarif: e.target.value,
                                                            cadence: activeTarif.cadence
                                                        })
                                                    }}
                                                />
                                                <SelectField
                                                    size={'md'}
                                                    label={'Cadence'}
                                                    items={[
                                                        {label: 'Journalier', value: TARIF_CADENCE.DAY},
                                                        {label: 'Par heure', value: TARIF_CADENCE.HOUR},
                                                    ]}
                                                    handleSelect={(v) => {
                                                        setActiveTarif({tarif: activeTarif.tarif, cadence: '' + v})
                                                    }}
                                                />
                                                <BtnField variant={'icon'} label={'Ajouter un tarif'}
                                                          onClick={addTarifField}/>
                                            </Stack>


                                        </div>
                                    </div>
                                    <div className="tags-recette flex flex-wrap gap-[8px]">
                                        {activeTafis.map((r, k) => (
                                            <ChipRecette
                                                key={k}
                                                price={`${r.tarif}`}
                                                frequency={`${r.cadence}`}
                                                onCloseChip={() => removeTarifField(r.cadence)}
                                            />
                                        ))}
                                    </div>
                                </>
                            </StepItem>
                        </FormGroup>
                    </DefaultDialogMainBody>

                    <DialogActions className={`pt-[10px]`}>
                        {/*<SimpleSuccessDialog*/}
                        {/*    title={'Informations mises a joour avec succès!'}*/}
                        {/*    image={'/assets/faker/default-car-1.png'}*/}
                        {/*>*/}
                        {/*    */}
                        {/*</SimpleSuccessDialog>*/}
                        {!isStepper && <BtnBase
                            type={"submit"}
                            color={'blue'}
                            variant={'contained'}
                            fullwidth={true}
                            shape={'square'}
                            loading={savingVehicule}
                            disabled={savingVehicule}
                            to={''}>Confirmer</BtnBase>}
                        {isStepper && (
                            <div>
                                {activeStep == 6 && (
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
                                                    setActiveStep(activeStep - 1)
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
                                                loading={savingVehicule}
                                                disabled={savingVehicule}
                                                onClick={() => onSubmit(watch())}
                                                to={''}
                                            >{isUpdate ? "Mettre à jour" : "Ajouter le véhicule"}</BtnBase>
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
                                {activeStep > 1 && (activeStep < 6) && (
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
                                                    setActiveStep(activeStep - 1)
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
                                                    setActiveStep(activeStep + 1)
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
        </div>
    )
}


const RadioGroupTitleWrapper: React.FC<React.HTMLAttributes<HTMLDivElement> & { title: string }> = ({
                                                                                                        children,
                                                                                                        title
                                                                                                    }) => {
    return (
        <div className={"flex flex-col gap-[10px]"}>
            <div className="text-[#506D82] text-sm font-bold leading-normal">{title}</div>
            <div className={"flex items-center gap-4"}>
                {children}
            </div>
        </div>
    )
}

const RadioLabel: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string }> = ({children, label, id}) => {
    return (
        <div className={"flex items-center gap-1"}>
            {children}
            <label className="text-[#405768] text-sm font-normal leading-[17.52px]" htmlFor={id}>{label}</label>
        </div>
    )
}