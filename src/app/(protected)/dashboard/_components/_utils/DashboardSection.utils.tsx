"use client"

import React, {useState} from "react";
import {PanInfo} from "framer-motion";
import {ArrowDropDownIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/utils/ui/cn";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import Vehicule from "@/model/vehicule/Vehicule";
import {DialogCarItem, DialogDriverItem} from "@/components/dialog/Dialog";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import useDahsboardAppStore from "@/stores/protected/dashboard/app/useDahsboardApp.store";
import VImageProvider from "@/components/helpers/VImageProvider";
import Driver from "@/model/driver/Driver";
import {useGetDrivers} from "@/hooks/driver/useDriver";

export const SectionTitleWithDropdownMenu: React.FC<{ name: string } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                                    name,
                                                                                                                    children,
                                                                                                                    ...props
                                                                                                                }) => {

    return (
        <div {...props}>
            <div className={`flex justify-between items-center`}>
                <div
                    className="text-center text-slate-500 text-xl font-bold font-['DM Sans'] leading-[33.56px] flex justify-start gap-[15.38] items-center py-[6px]">
                    <div>{name}</div>
                    {/*<button className={`p-3 text-text-body hover:opacity-75`}>
                        <ArrowDropDownIcon/>
                    </button>*/}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export const SectionDate: React.FC<{ name: string } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                   name,
                                                                                                   children,
                                                                                                   ...props
                                                                                               }) => {

    return (
        <div {...props}>
            <div className="text-[#506D82] text-[15px] font-bold leading-7">{name}</div>
        </div>
    )
}

export const SectionPrice: React.FC<{ name: string } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                    name,
                                                                                                    children,
                                                                                                    ...props
                                                                                                }) => {

    return (
        <div {...props}>
            <div className="text-admin-primary text-[34px] font-bold font-['DM Sans'] leading-[42px]">{name}</div>
        </div>
    )
}

export const SectionAverage: React.FC<{
    title: string,
    value: string
} & React.HTMLAttributes<HTMLDivElement>> = ({title, value, children, ...props}) => {

    return (
        <div {...props}>
            <div className={`flex items-center justify-start flex-nowrap`}>
                <div className="text-slate-400 text-sm font-medium leading-normal text-nowrap">{title}</div>
                <ArrowDropDownIcon className={"text-teal-500 rotate-180"}/>
                <div className="text-teal-500 text-xs font-bold leading-tight">{value}</div>
            </div>
        </div>
    )
}


export const SectionChartLabel: React.FC<{
    title: string,
    color: "primary" | "secondary"
} & React.HTMLAttributes<HTMLDivElement>> = ({title, color, children, ...props}) => {

    const isPrimary = color === "primary"

    return (
        <div {...props}>
            <div className={`flex gap-[17px] items-center justify-start cursor-pointer`}>
                <div className={`w-2 h-2 relative ${isPrimary ? "bg-blue-700" : "bg-vyellow"}`}/>
                <div className="text-slate-400 text-xs font-bold font-['DM Sans'] leading-tight">{title}</div>
            </div>
        </div>
    )
}


export const DashBoardSectionContainer: React.FC<{
    children: React.ReactNode,
    head: React.ReactNode,
    beforeHead: React.ReactNode,
} & React.HTMLAttributes<HTMLDivElement>> = ({children, head, beforeHead, className, ...props}) => {

    const [initialY, setInitialY] = useState(0);
    const [y, setY] = useState(0);

    const handleDragStart = (event: MouseEvent, info: PanInfo) => {
        // Définissez la position initiale au début du glissement
        setInitialY(y);
    };

    const handleDrag = (event: MouseEvent, info: PanInfo) => {
        const newY = initialY + info.offset.y; // Calculez la nouvelle position Y basée sur le déplacement
        // Limitez le mouvement à 50px vers le haut ou vers le bas à partir de la position initiale
        if (newY > initialY + 50) {
            setY(initialY + 50);
        } else if (newY < initialY - 50) {
            setY(initialY - 50);
        } else {
            setY(newY);
        }
    };


    return (
        // <div className={cn('' ,className)}  {...props}>
        //     <motion.div
        //         className={`py-[22px] px-[30px] bg-white rounded-[20px] z-20`}
        //         whileTap={{ cursor: 'grabbing' }}
        //         drag="y"
        //         style={{ y }} // Appliquez dynamiquement la position Y
        //         onDragStart={handleDragStart}
        //         onDrag={handleDrag}
        //         dragConstraints={{ top: 0, bottom: 0 }} // Cette ligne n'est plus nécessaire mais laissée pour référence
        //         dragElastic={0.5}
        //     >
        <div className={cn('', className)}  {...props}>
            <div className={`py-[22px] px-[30px] bg-white rounded-[20px] z-20`}>
                {beforeHead}
                <div className={`flex justify-between`}>
                    <div className={`mr-[50px] md:mr-[70px] lg:mr-[140px] xl:mr-[240px]`}>
                        {head}
                    </div>
                    <div className={`w-full h-full`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
        //     </motion.div>
        // </div>
    )
}

export type DropdownSelectItemsProps = {
    id: number | string,
    value: string
}
export const DropDownSelect: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    label?: string,
    variant?: "filled" | "text",
    items?: DropdownSelectItemsProps[],
    handlerSelect: (selected: DropdownSelectItemsProps) => void,
    activeItem?: DropdownSelectItemsProps,
}> = ({
          label,
          variant = "filled",
          items = [],
          handlerSelect,
          className,
          activeItem
      }) => {
    const [isActive, setIsActive] = React.useState(false)

    const isFilled = variant == "filled"

    const handleSelectItem = (item: DropdownSelectItemsProps) => {
        handlerSelect(item)
        setIsActive(!isActive)
    }

    return (
        <div
            className={cn(
                `z-10 text-center text-slate-400 text-sm font-medium leading-normal bg-white w-fit relative`,
                className
            )}>
            <div className={`relative px-3 py-1 h-8 ${isFilled && "bg-[#f7f5ff]"} justify-center rounded items-center gap-[11px] 
                 inline-flex cursor-pointer hover:opacity-75 transition ease-in duration-200 w-full`}
                 onClick={() => setIsActive(!isActive)}>
                <div className="pr-5">{`${activeItem?.value}`}</div>
                <div className={`absolute right-[5.5px]`}>
                    <ArrowDropDownIcon/>
                </div>
            </div>
            <div className={`${isActive ? '' : 'h-0 overflow-hidden'} flex flex-col gap-[4px]  bg-white rounded absolute 
            w-full transition ease-in duration-1000 max-h-[200px] overflow-y-scroll
            
            `}>
                {
                    items.map((item, index) => (
                        <DropdownButton key={index} name={item.value} onClick={() => handleSelectItem(item)}/>
                    ))
                }
            </div>
        </div>
    )
}

const DropdownButton: React.FC<{ name: string } & React.HTMLAttributes<HTMLButtonElement>> = ({name, ...props}) => {

    return (
        <button
            className={`h-[24px] align-middle hover:bg-slate-50 transition ease-in duration-200`} {...props}>{name}</button>
    )
}


export const DropDownSelectGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            <div className={`flex items-center justify-start gap-[9px]`}>
                {children}
            </div>
        </div>
    )
}


export const CoastSelectedDriver: React.FC<{
    caseType: 'driver' | 'car'
} & React.HTMLAttributes<HTMLDivElement>> = ({children, caseType, ...props}) => {

    const [selectVehiculeIsOpen, setSelectVehiculeIsOpen] = React.useState(false)
    const [selectDriverIsOpen, setSelectDriverIsOpen] = React.useState(false)

    const isCar = caseType === 'car'
    const {data: vehicules, isLoading, isError} = useGetVehicules()
    const {data: drivers, isLoading: dloading, isError: derrors} = useGetDrivers()
    const {activeDriver, activeVehicle, updateSelectedItem} = useDahsboardAppStore()

    React.useEffect(() => {
        if (vehicules && vehicules.length) {
            updateSelectedItem({vehicle: vehicules[0]})
        }
    }, [vehicules])

    React.useEffect(() => {
        if (drivers && drivers.length) {
            updateSelectedItem({driver: drivers[0]})
        }
    }, [drivers])

    if (isLoading || dloading || isError || !vehicules || vehicules && vehicules.length === 0 || !activeVehicle || derrors || !drivers || drivers && drivers.length == 0 || !activeDriver) {
        return (
            <div {...props}>
                <div className={`flex gap-[8px]`}>
                    <div className={`size-[45px] rounded-lg overflow-hidden bg-slate-200 animate-pulse`}></div>
                    <div className={`flex flex-col gap-2`}>
                        <div className={`bg-slate-200 animate-pulse h-[15px] rounded-lg w-[120px]`}></div>
                        <div className={`bg-slate-200 animate-pulse h-[15px] rounded-lg w-[170px]`}></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div {...props}>
            <div className={`flex gap-[8px]`}>
                <div className={`size-[45px] rounded-sm overflow-hidden`}>
                    <VImageProvider className={`w-[45px] h-[45px]`} width={50} height={50}
                                    src={`${isCar ? activeVehicle.getCover : activeDriver?.getAvatar}`}
                                    alt={""}/>
                </div>
                <div>
                    <div className="text-slate-400 text-sm font-medium">{isCar ? 'Véhicule' : 'Chauffeur'}</div>
                    <div className="text-[#506D82]  text-base font-bold flex items-center text-nowrap">
                        <div>{isCar ? activeVehicle.getBrand : activeDriver?.getUsername}</div>
                        <button className={`cursor-pointer hover:opacity-75 transition duration-200`}
                                onClick={() => isCar ? setSelectVehiculeIsOpen(true) : setSelectDriverIsOpen(true)}>
                            <ArrowDropDownIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <>
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
                            updateSelectedItem({vehicle: items[0]})
                        }
                    }}
                />

                <EntitySelectDialog<Driver, typeof DialogDriverItem>
                    title={"Selectionner un chauffeur"}
                    emptyMessage={"Aucun chauffer créé pour l’instant"}
                    DisplayItem={DialogDriverItem}
                    isSelect={true}
                    selectMultiple={false}
                    getData={() => drivers}
                    isOpen={selectDriverIsOpen}
                    //loading={savingGroupe}
                    onClose={() => setSelectDriverIsOpen(false)}
                    onValidate={() => {
                        setSelectVehiculeIsOpen(false)
                    }}
                    handleSelectItems={(items) => {
                        updateSelectedItem({driver: items[0]})
                    }}
                />
            </>
        </div>
    )
}

export const SectionCheckBoxGroup: React.FC<{
    variant?: 'default' | 'dialog'
} & React.HTMLAttributes<HTMLDivElement>> = ({variant, children, ...props}) => {

    const isDialogCtx = variant === 'dialog'

    return (
        <div {...props}>
            <div className={`flex gap-[24px] ${isDialogCtx ? 'gap-[20px]' : 'gap-[5px]'}`}>
                {children}
            </div>
        </div>
    )
}
