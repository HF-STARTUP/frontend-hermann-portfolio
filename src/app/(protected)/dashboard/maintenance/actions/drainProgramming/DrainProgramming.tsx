import React from "react";
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogSupplierItem
} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {BtnField, FieldDate, ImageUploadFieldGroup, TextArea} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {RepairType} from "@/model/entretien/Entretien";
import {useGetHours} from "@/hooks/shedule/useSchedule";
import useEntretienStore from "@/stores/protected/dashboard/entretien/useEntretienStore";
import {
    ElementConcernedDialog
} from "@/app/(protected)/dashboard/maintenance/actions/drainProgramming/actions/elementsConcerneds/elementConcernedDialog";
import {ClientMaintenanceCar, MaintenanceCar} from "@/types/entretien.types";
import {useGetCarComponent} from "@/hooks/entretien/useCarComponent";
import {AiOutlineClose} from "react-icons/ai";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import {useGetSuppliers} from "@/hooks/supplier/useSupplier";
import Supplier from "@/model/supplier/Supplier";
import {useCreateEntretien} from "@/hooks/entretien/useEntretien";
import {useGetCurrency, useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {
    VehiculeSelectInput
} from "@/app/(protected)/dashboard/vehicule-list/_components/vehiculSelectInput/VehiculeSelectInput";

export const DrainProgramming: React.FC<React.HTMLAttributes<HTMLDivElement> & { repairType: RepairType }> = ({
                                                                                                                  children,
                                                                                                                  repairType
                                                                                                              }) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {data: hous} = useGetHours()
    const {data: suppliers, isLoading: dloading, isError: derrors} = useGetSuppliers()
    const [selectSuplierIsOpen, setSelectSuplierIsOpen] = React.useState(false)
    const [selectImages, setSelectImages] = React.useState<File[] | undefined>(undefined)
    const [vehicle_id, setActiveVehicleID] = React.useState<null | string>(null)

    const {updateEntretien, entretien} = useEntretienStore()

    const {activeSupplier, updateSelectedSupplier, maintencesCar} = useEntretienStore()

    const {parkID} = useGetParkID()
    const {loading, handleCreateEntretien, data} = useCreateEntretien()


    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }


    const onSelectProvider = () => {
        setSelectSuplierIsOpen(true)
    }

    React.useEffect(() => {
        if (!loading && data) {
            setSelectSuplierIsOpen(false)
        }
    }, [loading, data])

    const onCreateEntretien = () => {
        handleCreateEntretien({
            start_date: entretien.start_date,
            end_date: entretien.end_date,
            supplier_id: '' + activeSupplier?.id,
            description: entretien.description,
            park_id: parkID,
            images: selectImages?.length ? selectImages : [new File([], '', {})],
            vehicle_id: '' + vehicle_id,
            maintenances: [
                {
                    repair_type_id: repairType.id,
                    maintenanceCarComponent: maintencesCar.map((m): MaintenanceCar => ({
                        component_id: +m.component_id,
                        amount: m.amount
                    }))
                }
            ]
        })
    }

    const isAvailableForNextAction = vehicle_id != null && entretien.end_date != null && entretien.start_date != null && maintencesCar.length != 0
    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={repairType.name}
                                 handleToggle={handleToggleDialog}/>
                <DefaultDialogMainBody ctx={'dialogMin'} className={`mt-[20px]`}>
                    <FormGroup adminForm={true}>

                        {/*<Input*/}
                        {/*    as={"select"}*/}
                        {/*    label={"Durée prévu pour l'entretien"}*/}
                        {/*    options={[*/}
                        {/*        {value: "1", label: "Une journée"},*/}
                        {/*        {value: "2", label: "Plusieurs jours"},*/}
                        {/*    ]}*/}
                        {/*    onChange={(v) => {*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <div className={`grid gap-[10px] grid-cols-12`}>
                            <div className={`col-span-7`}>
                                <FieldDate
                                    size={'md'}
                                    label={"Date du début de l'opération"}
                                    onChange={e => {
                                        updateEntretien({
                                            ...entretien,
                                            start_date: new Date(e.currentTarget.value)
                                        })
                                    }}
                                />
                            </div>
                            <div className={`col-span-5`}>
                                <div className={`flex gap-[5px]`}>
                                    <TextField
                                        size={'md'}
                                        label={'heure'}
                                        inputType={"time"}
                                        onChange={e => {
                                            // Obtenir la valeur de l'heure du champ input (format HH:mm)
                                            const time = e.target.value;

                                            // Extraire les heures et les minutes
                                            const [hours, minutes] = time.split(':').map(Number);

                                            // Créer une nouvelle date à partir de entretien.end_date
                                            const updatedDate = new Date(entretien.start_date);

                                            // Mettre à jour les heures et les minutes
                                            updatedDate.setHours(hours, minutes, 0); // Ici, les secondes sont réglées à 0

                                            // Mettre à jour l'état de entretien avec la nouvelle date
                                            updateEntretien({
                                                ...entretien,
                                                start_date: updatedDate
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`grid gap-[10px] grid-cols-12`}>
                            <div className={`col-span-7`}>
                                <FieldDate
                                    size={'md'}
                                    label={"Date de fin de l'oréparation"}
                                    onChange={e => {
                                        updateEntretien({
                                            ...entretien,
                                            end_date: new Date(e.currentTarget.value)
                                        })
                                    }}
                                />
                            </div>
                            <div className={`col-span-5`}>
                                <div className={`flex gap-[5px]`}>
                                    <TextField
                                        label={"heure"}
                                        size={'md'}
                                        inputType={"time"}
                                        onChange={e => {
                                            // Obtenir la valeur de l'heure du champ input (format HH:mm)
                                            const time = e.target.value;

                                            // Extraire les heures et les minutes
                                            const [hours, minutes] = time.split(':').map(Number);

                                            // Créer une nouvelle date à partir de entretien.end_date
                                            const updatedDate = new Date(entretien.end_date);

                                            // Mettre à jour les heures et les minutes
                                            updatedDate.setHours(hours, minutes, 0); // Ici, les secondes sont réglées à 0

                                            // Mettre à jour l'état de entretien avec la nouvelle date
                                            updateEntretien({
                                                ...entretien,
                                                end_date: updatedDate
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>


                        <VehiculeSelectInput
                            onSelect={(v) => setActiveVehicleID(v.id)}
                            label={"Selectionne le véhicule concerné"}
                        />

                        {/*<Input*/}
                        {/*    label={"Montant estimé"}*/}
                        {/*    disabled={true}*/}
                        {/*/>*/}

                        <ElementConcernedDialog>
                            <BtnField iconType={"chevron"} label={"Sélectionnez les éléments concernés"}/>
                        </ElementConcernedDialog>
                        <CarComponentsSelected/>


                        <TextArea
                            label={'Informations sur la panne constatée'}
                            size={'md'}
                            onChange={e => {
                                updateEntretien({
                                    ...entretien,
                                    description: e.currentTarget.value
                                })
                            }}
                        />
                        <ImageUploadFieldGroup
                            label={'Ajouter une ou plusieurs photos'}
                            handleChange={(files) => setSelectImages(files)}
                        />
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[50px]`}>
                    <BtnBase
                        to={''}
                        color={'blue'}
                        variant={'contained'}
                        shape={'square'}
                        fullwidth={true}
                        disabled={!isAvailableForNextAction}
                        onClick={onSelectProvider}
                    >
                        Suivant
                    </BtnBase>
                </DialogActions>
            </DialogBase>
            <EntitySelectDialog<Supplier, typeof DialogSupplierItem>
                title={"Sélectionnez un prestataire pour l’opération"}
                emptyMessage={"Aucun chauffer fournisseur creer pour l’instant"}
                DisplayItem={DialogSupplierItem}
                isSelect={true}
                selectMultiple={false}
                getData={() => suppliers}
                isOpen={selectSuplierIsOpen}
                closeAfterSelectOne={false}
                isValid={!activeSupplier}
                loading={loading}
                onClose={() => setSelectSuplierIsOpen(false)}
                onValidate={() => {
                    onCreateEntretien()
                }}
                handleSelectItems={(items) => {
                    updateSelectedSupplier({supplier: items[0]})
                }}
            />
        </div>
    )
}


const CarComponentsSelected = () => {

    const {maintencesCar, removeMaintenceCar} = useEntretienStore()
    const {currency} = useGetCurrency()

    if (maintencesCar.length) {
        return (
            <div
                className={"px-[16.81px] py-[11.20px] bg-sky-50 rounded-[14.01px] border flex flex-col items-end justify-end gap-2"}>
                {maintencesCar.map((maintennance, i) => (
                    <OneCarComponentSelected key={i} carComp={maintennance}/>
                ))}
                <div
                    className="text-blue-800 text-[16.81px] font-semibold leading-[33.61px] border-t  border-blue-400  w-full text-right pt-2">TOTAL
                    : {maintencesCar.reduce((acc, r) => acc + r.amount, 0)} {currency}
                </div>
            </div>
        )
    }
}

const OneCarComponentSelected: React.FC<{ carComp: ClientMaintenanceCar }> = ({carComp}) => {

    const {data: carComponents} = useGetCarComponent()
    const {removeMaintenceCar} = useEntretienStore()
    const {currency} = useGetCurrency()


    if (carComponents) {

        const comp = carComponents.find((c) => c.id === +carComp.component_id)

        return (
            <div className={"flex items-center gap-[12px]"}>
                <div className={"text-right"}>
                    {comp &&
                        <span className="text-blue-800 text-sm font-semibold  leading-[33.61px]">{comp?.name} : </span>}
                    <span
                        className="text-blue-800 text-sm font-normal leading-[33.61px]">{carComp.amount} {currency}</span>
                </div>
                <button
                    className={"bg-[#FFEBEA] rounded-full size-[19px] flex items-center justify-center text-[#E51D13] hover:opacity-75 transition hover:scale-105"}
                    onClick={() => removeMaintenceCar('' + comp?.id)}
                >
                    <AiOutlineClose/>
                </button>
            </div>
        )
    }
}
