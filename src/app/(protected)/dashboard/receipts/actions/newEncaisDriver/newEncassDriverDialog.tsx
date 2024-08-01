"use client"

import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import React, {MouseEventHandler} from "react";
import BtnBase from "@/components/elements/BtnBase";
import FormGroup from "@/components/box/FormGroup";
import {
    SimpleSuccessDialog
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import TextField, {FieldDate} from "@/components/form/TextField";
import {INCOME_TYPE} from "@/types/collection.type";
import {
    DriverSelectInput,
    VehiculeSelectInput
} from "@/app/(protected)/dashboard/vehicule-list/_components/vehiculSelectInput/VehiculeSelectInput";
import {cn, parsedDate} from "@/lib/utils";
import {useGetCurrency, useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {useCreateEntryOrDepense} from "@/hooks/acounting/useAcounting";
import Vehicle from "@/model/vehicule/Vehicule";
import Driver from "@/model/driver/Driver";
import {Input} from "@/components/ui/input";
import {CreateEntryOrDenpenseInput} from "@/types/Accounting.types";
import DriverService from "@/services/DriverService";
import {useGetVehicle} from "@/hooks/vehicule/useVehicule";
import {LoadingBar} from "@/components/ui/Loader";

const NewEncaisDriverDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children, ...props}) => {

    const [revenusType, setRevnusType] = React.useState<INCOME_TYPE>()
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle>()
    const [selectedDriver, setSelectedDriver] = React.useState<Driver>()
    const [operationDate, setOperationDate] = React.useState<string>()
    const [recette, setRecette] = React.useState<string>()
    const [selected, setSelected] = React.useState('1')
    const {currency} = useGetCurrency()
    const {onCreateEntry, loading, isSuccess, data} = useCreateEntryOrDepense()
    const {parkID} = useGetParkID()
    const [vehicleID, setVehicleID] = React.useState<string>()

    const {isLoading, vehicle: vcle} = useGetVehicle(vehicleID as string)

    const onEncaiss = () => {


        const inputs: CreateEntryOrDenpenseInput = {
            park_id: parkID,
            entry_data: {
                operation_date: parsedDate(operationDate),
                data: [{
                    type: revenusType,
                    amount_collected: +(recette ?? 0),
                    vehicle_id: selectedVehicle?.id,
                    driver_id: selectedDriver?.id,

                }]
            }
        }

        console.table(inputs.entry_data)

        onCreateEntry(
            inputs
        )
    }

    React.useEffect(() => {
        if (!loading && isSuccess) {
            onClose(true)
            console.log("close dialog...")
            void DriverService.invalidUnencassedDrivers()
        }
    }, [loading, isSuccess])

    React.useEffect(() => {
        if (isOpen && selectedVehicle) {
            setVehicleID(selectedVehicle.id)
            console.log("Requesting vehicle info")
        }
    }, [isOpen, selectedVehicle])

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead title={'Enregistrer une entrée'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <FormGroup adminForm={true}>

                        <Input
                            as={"select"}
                            label={"Type de revenus"}
                            required={true}
                            options={[
                                {
                                    label: "Revenu VTC",
                                    value: INCOME_TYPE.vtc_recipe
                                },
                                {
                                    label: "Revenu Course",
                                    value: INCOME_TYPE.course_recipe
                                },
                                // {
                                //     label: "Autres",
                                //     value: INCOME_TYPE.other_revenu
                                // },
                            ]}
                            onChange={(e) => {
                                console.log(e)
                                setRevnusType(e.currentTarget.value as INCOME_TYPE)
                            }}
                        />

                        <VehiculeSelectInput
                            label={"Véhicule concerné"}
                            onSelect={setSelectedVehicle}
                        />

                        <div className={"flex items-start flex-col gap-2"}>
                            <div className={"text-[14px] tracking-[-2%] font-medium text-admin-primary"}>
                                Sélectionnez le chauffeur
                            </div>
                            <DriverSelectInput
                                label={"Sélectionnez le chauffeur"}
                                onSelect={setSelectedDriver}
                            />
                        </div>

                        <div className={"grid grid-cols-12 gap-4"}>
                            <div className={"col-span-12"}>
                                <FieldDate
                                    required={true}
                                    label={"Date de l’opération"}
                                    size={"md"}
                                    onChange={(e) => {
                                        console.log(e.currentTarget.value)
                                        setOperationDate(e.currentTarget.value)
                                    }}
                                />
                            </div>
                            <div className={"col-span-7"}>
                                <TextField
                                    required={true}
                                    label={"Montant réel perçu"}
                                    size={"md"}
                                    onChange={(e) => setRecette(e.currentTarget.value)}
                                />
                            </div>
                            {isLoading && <LoadingBar/>}
                            {vcle && vcle.firstRecipe && <div className={"col-span-5 "}>
                                <div className={"flex flex-col gap-2"}>
                                    <label
                                        htmlFor=""
                                        className={"text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary"}
                                    >
                                        Objectif de recette
                                    </label>
                                    <div className={cn(
                                        "w-full h-full p-2 flex items-center justify-center bg-gray-200 rounded-[10px]",
                                        "border border-gray-500 text-black text-xs font-normal font-vInter leading-none text-[16px]",
                                        "hover:bg-gray-100"
                                    )}>
                                        {!isLoading &&
                                            <span>{vcle.firstRecipe} {currency}</span>}
                                    </div>
                                </div>
                            </div>}
                        </div>

                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>

                    <BtnBase
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        to={''}
                        onClick={onEncaiss}
                        loading={loading}
                        disabled={loading}
                    >
                        Encaisser
                    </BtnBase>

                    <SimpleSuccessDialog
                        title={`Chauffeur encaissé.`}
                        image={`/assets/faker/default-car-1.png`}
                        fchild={<p>La recette du chauffeur a été encaissée avec succès!</p>}>
                    </SimpleSuccessDialog>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

export default NewEncaisDriverDialog
