"use client";

import {cn} from "@/utils/ui/cn";
import {ChevronBackIcon, CloseIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import React from "react";
import Vehicule from "@/model/vehicule/Vehicule";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import VImageProvider from "@/components/helpers/VImageProvider";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import {DialogCarItem, DialogClientItem, DialogDriverItem} from "@/components/dialog/Dialog";
import Grade from "@/model/driver/Grade";
import {useGetDrivers, useGetGrades} from "@/hooks/driver/useDriver";
import Chip from "@/components/box/Chip";
import Driver from "@/model/driver/Driver";
import ClientModel from "@/model/client/ClientModel";
import {useGetClients} from "@/hooks/client/useClient";

export const VehiculeSelectInput: React.FC<{
    onSelect: (vehicule: Vehicule) => void,
    label?: string,
    vehicleID?: string
}> = ({
          onSelect,
          vehicleID,
          label = "Sélectionnez le véhicule à attribuer à ce chauffeur"
      }) => {

    const [selectedVehicule, setSelecteVehicule] = React.useState<Vehicule>()
    const [selectVehiculeIsOpen, setSelectVehiculeIsOpen] = React.useState(false)
    const {data: vehicules, isLoading} = useGetVehicules()

    React.useEffect(() => {
        if (vehicules && vehicules.length && !isLoading) {

            let existingVehicle: Vehicule | undefined;

            if (vehicleID) {
                existingVehicle = vehicules.find((v) => v.id === vehicleID)
            }

            setSelecteVehicule(existingVehicle ?? vehicules[0])
            onSelect(existingVehicle ?? vehicules[0])
        }
    }, [vehicules, isLoading])

    return (
        <React.Fragment>
            <label
                className={`text-[14px] mb-[-10px] tracking-[-2%] font-medium text-admin-primary`}
            >{label}</label>
            <div className={cn(
                `h-[45px] pl-5 cursor-pointer pr-1  bg-white rounded-[10px] border border-neutral-300 
                justify-center items-center gap-[157px] inline-flex border-opacity-60`,
                `text-text-body text-sm font-normal leading-tight`
            )}>
                {!isLoading && selectedVehicule && (
                    <div className={`flex w-full gap-3 group`} onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setSelectVehiculeIsOpen(true)
                    }}>
                        <VImageProvider src={selectedVehicule.getCover} alt={``} width={50} height={50}
                                        className={`rounded-lg size-[35px] border-2 border-blue-200 group-hover:size-[35px]`}/>
                        <div className={`flex justify-between items-center gap-2 grow`}>
                            <div
                                className={`grow`}>{selectedVehicule.getBrandWithColor} - {selectedVehicule.getRegistration}</div>
                            <button className={`rotate-180 group-hover:scale-125`}>
                                <ChevronBackIcon width={15} height={15}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <EntitySelectDialog<Vehicule, typeof DialogCarItem>
                    title={"Selectionner un véhicule"}
                    emptyMessage={"Aucun vehicule créé pour l’instant"}
                    DisplayItem={DialogCarItem}
                    isSelect={true}
                    selectMultiple={false}
                    getData={() => vehicules}
                    isOpen={selectVehiculeIsOpen}
                    onClose={() => setSelectVehiculeIsOpen(false)}
                    onValidate={() => {
                        setSelectVehiculeIsOpen(false)
                    }}
                    handleSelectItems={(items) => {
                        if (items.length > 0) {
                            setSelecteVehicule(items[0])
                            onSelect(items[0])
                        }
                    }}
                />
            </div>
        </React.Fragment>
    )
}


export const DriverSelectInput: React.FC<{ onSelect: (driver: Driver) => void, label?: string, driverId?: string }> = ({
                                                                                                                           onSelect,
                                                                                                                           driverId,
                                                                                                                           label = "Sélectionnez le véhicule à attribuer à ce chauffeur"
                                                                                                                       }) => {

    const [selectedVehicule, setSelecteDriver] = React.useState<Driver>()
    const [selectVehiculeIsOpen, setSelectVehiculeIsOpen] = React.useState(false)
    const {data: drivers, isLoading} = useGetDrivers()

    React.useEffect(() => {

        if (drivers && drivers.length && !isLoading) {

            let existingDriver: Driver | undefined;

            if (driverId) {
                existingDriver = drivers.find((d) => d.id === driverId)
            }

            setSelecteDriver(existingDriver ?? drivers[0])

            onSelect(drivers[0])
        }
    }, [drivers, isLoading])

    return (
        <React.Fragment>
            <div className={cn(
                `h-[45px] pl-5 cursor-pointer pr-1  bg-white rounded-[10px] border border-neutral-300 
                justify-center items-center gap-[157px] inline-flex border-opacity-60`,
                `text-text-body text-sm font-normal leading-tight w-full`
            )}>
                {!isLoading && selectedVehicule && (
                    <div className={`flex w-full gap-3 group`} onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setSelectVehiculeIsOpen(true)
                    }}>
                        <VImageProvider src={selectedVehicule.getAvatar} alt={``} width={50} height={50}
                                        className={`rounded-lg size-[35px] border-2 border-blue-200 group-hover:size-[35px]`}/>
                        <div className={`flex justify-between items-center gap-2 grow`}>
                            <div
                                className={`grow`}>{selectedVehicule.getUsername}</div>
                            <button className={`rotate-180 group-hover:scale-125`}>
                                <ChevronBackIcon width={15} height={15}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <EntitySelectDialog<Driver, typeof DialogDriverItem>
                    title={"Selectionner un chauffeur"}
                    emptyMessage={"Aucun chauffeur créé pour l’instant"}
                    DisplayItem={DialogDriverItem}
                    isSelect={true}
                    selectMultiple={false}
                    getData={() => drivers}
                    isOpen={selectVehiculeIsOpen}
                    onClose={() => setSelectVehiculeIsOpen(false)}
                    onValidate={() => {
                        setSelectVehiculeIsOpen(false)
                    }}
                    handleSelectItems={(items) => {
                        if (items.length > 0) {
                            setSelecteDriver(items[0])
                            onSelect(items[0])
                        }
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export const GradeSelectInput: React.FC<{ onSelect: (grade: Grade) => void, gradeID: number | undefined }> = ({
                                                                                                                  onSelect,
                                                                                                                  gradeID
                                                                                                              }) => {
    const [activeGrade, setActiveGrade] = React.useState<Grade>()
    const [listIsOpen, setListOpen] = React.useState(false)
    const {data: grades, isLoading} = useGetGrades()

    React.useEffect(() => {
        if (grades) {
            let existingGrade: Grade | undefined;
            existingGrade = grades.find(g => g.id === gradeID)

            onSelect(existingGrade ?? grades[0])
        }
    }, [grades, isLoading])

    if (isLoading || !grades) {
        return (
            <div className={`bg-slate-200 rounded-lg h-8 animate-pulse w-full`}></div>
        )
    }

    return (
        <div className={``}>
            <label
                className={`text-[14px] leading-[24px] tracking-[-2%] font-medium text-admin-primary`}
            > Grade </label>
            <div className={`relative w-fit mt-[10px]`}>
                <div onClick={() => setListOpen(!listIsOpen)} className={cn(
                    `w-fit h-[45px] px-2 cursor-pointer pr-1  bg-white rounded-[10px] border border-neutral-300 
                justify-center items-center gap-[5px] inline-flex border-opacity-60`,
                    `text-text-body text-sm font-normal leading-tight z-30`
                )}>
                    {activeGrade
                        ? (<div>{activeGrade && <Chip className={`cursor-pointer`} name={activeGrade.name}/>}</div>)
                        : (<div>{grades.length && <Chip className={`cursor-pointer`} name={grades[0].name}/>}</div>)

                    }
                    <button className={`rotate-[-90deg] group-hover:scale-125`}>
                        <ChevronBackIcon width={15} height={15}/>
                    </button>
                </div>
                <div
                    className={`bg-white w-full rounded-lg border  flex gap-2 z-40 flex-col p-2 ${listIsOpen ? 'absolute' : 'hidden'}`}>
                    {grades.map((g, k) => (
                        <div key={k} className={`cursor-pointer hover:opacity-80 transition duration-200`}
                             onClick={() => {
                                 setActiveGrade(g)
                                 onSelect(g)
                                 setListOpen(false)
                             }}>
                            <Chip className={`cursor-pointer`} name={g.name}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export const ClientSelectInput: React.FC<{ onSelect: (client: ClientModel) => void, label?: string }> = ({
                                                                                                             onSelect,
                                                                                                             label = "Sélectionnez le véhicule à attribuer à ce chauffeur"
                                                                                                         }) => {

    const [selectedClient, setSelectedClient] = React.useState<ClientModel>()
    const [selectVehiculeIsOpen, setSelectVehiculeIsOpen] = React.useState(false)
    const {data: clients, isLoading} = useGetClients()

    React.useEffect(() => {
        if (clients && clients.length && !isLoading) {
            setSelectedClient(clients[0])
            onSelect(clients[0])
        }
    }, [clients, isLoading])

    return (
        <React.Fragment>
            <label
                className={`text-[14px] mb-[-10px] tracking-[-2%] font-medium text-admin-primary`}
            >{label}</label>
            <div className={cn(
                `h-[45px] pl-5 cursor-pointer pr-1  bg-white rounded-[10px] border border-neutral-300 
                justify-center items-center gap-[157px] inline-flex border-opacity-60`,
                `text-text-body text-sm font-normal leading-tight`
            )}>
                {!isLoading && selectedClient && (
                    <div className={`flex w-full gap-3 group`} onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        setSelectVehiculeIsOpen(true)
                    }}>
                        <div className={`flex justify-between items-center gap-2 grow`}>
                            <div
                                className={`grow`}>{selectedClient.username}</div>
                            <button className={`rotate-180 group-hover:scale-125`}>
                                <ChevronBackIcon width={15} height={15}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <EntitySelectDialog<ClientModel, typeof DialogClientItem>
                    title={"Selectionner un client"}
                    emptyMessage={"Vous n'avez pas encore de client"}
                    DisplayItem={DialogClientItem}
                    isSelect={true}
                    selectMultiple={false}
                    getData={() => clients}
                    isOpen={selectVehiculeIsOpen}
                    onClose={() => setSelectVehiculeIsOpen(false)}
                    onValidate={() => {
                        setSelectVehiculeIsOpen(false)
                    }}
                    handleSelectItems={(items) => {
                        if (items.length > 0) {
                            setSelectedClient(items[0])
                            onSelect(items[0])
                        }
                    }}
                />
            </div>
        </React.Fragment>
    )
}

