"use client"
import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, MouseEventHandler} from 'react'
import Image from "next/image";
import close from "@/assets/img/icons/close.png";
import back from "@/assets/img/icons/back.png";
import {
    ChevronBackIcon,
    EditIcon,
    FilterIcon,
    SimpleCloseIcon,
    TrashIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {CustomScroll} from "@/components/box/CustomScroll";
import {SearchTextField} from "@/components/form/TextField";
import {cn} from "@/utils/ui/cn";
import useAppStore, {FindModeType} from "@/stores/global/useAppStore";
import Vehicule from "@/model/vehicule/Vehicule";
import {DefaultDialogListItem} from "@/components/listConstructor/ListConstructor";
import {
    VehiculeInfosDialog
} from "@/app/(protected)/dashboard/vehicule-list/actions/seeAllCars/actions/VehiculeInfosDialog";
import VehiculeGroup from "@/model/vehicule/VehiculeGroup";
import {VehicleInfosDialog} from "@/components/actions/VehiculeInfosDialog";
import Driver from "@/model/driver/Driver";
import Chip from "@/components/box/Chip";
import {DriverInfoDialog} from "@/components/actions/DriverInfoDialog";
import Supplier from "@/model/supplier/Supplier";
import ClientModel from "@/model/client/ClientModel";

type DialogBaseProps = {
    children: React.ReactNode,
    bgType?: 'blured' | 'whited'
    contentBgType?: 'transparent' | 'whited'
    variant?: 'lg' | 'sm' | 'xl',
    isSubDialog?: boolean,
    isOpenned: boolean,
    onClose: (value: boolean) => void
}

const DialogBase: React.FC<React.HTMLAttributes<HTMLDivElement> & DialogBaseProps> = ({
                                                                                          children,
                                                                                          contentBgType = 'whited',
                                                                                          variant,
                                                                                          isSubDialog = false,
                                                                                          isOpenned,
                                                                                          onClose,
                                                                                          bgType = 'blured',
                                                                                          className
                                                                                      }) => {

    const isLgDialog = variant === "lg"
    const isSmDialog = variant === "sm"
    const isBluredBg = bgType === 'blured'
    const isTransparentContentBgType = contentBgType === 'transparent'

    return (
        <>
            <Transition appear show={isOpenned} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className={`fixed inset-0 ${!isSubDialog ? (isBluredBg ? 'bg-black bg-opacity-70 backdrop-blur-[20px]' : 'bg-[#D9D9D9B2]') : ''}`}/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom={`opacity-0 ${isSubDialog ? 'translate-x-[-3rem]' : 'scale-95'}`}
                                enterTo={`opacity-100 ${isSubDialog ? 'translate-x-0' : 'scale-100'}`}
                                leave="ease-in duration-200"
                                leaveFrom={`opacity-100 ${isSubDialog ? 'translate-x-0' : 'scale-100'}`}
                                leaveTo={`opacity-0 ${isSubDialog ? 'translate-x-[-3rem]' : 'scale-95'}`}
                            >
                                <Dialog.Panel
                                    className={cn(
                                        `w-full ${isLgDialog ? 'max-w-2xl' : 'max-w-[506px]'}  transform  rounded-2xl ${isTransparentContentBgType ? 'bg-[#FFFFFFD9]' : 'bg-white'} p-6 text-left align-middle ${!isSubDialog ? 'shadow-xl' : ''} transition-all`,
                                        className
                                    )}>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

type DialogHeadProps = {
    title: string,
    subTitle?: string,
    handleToggle: MouseEventHandler<HTMLDivElement>,
    withBack?: boolean,
}
export const AdminDialogHead: React.FC<DialogHeadProps> = ({
                                                               title,
                                                               subTitle,
                                                               handleToggle,
                                                               withBack = false,
                                                           }) => {
    return (
        <div>
            <div className={`flex justify-between items-start pb-[15px] bg-white ${withBack ? 'mb-[10px]' : ''}`}>
                <div
                    className={`flex justify-center items-center gap-[24px] text-admin-primary text-[28px] font-bold  leading-[30px] tracking-[-2%]`}>
                    {withBack && <div className={`cursor-pointer hover:opacity-60 transition ease-in duration-300`}
                                      onClick={handleToggle}>
                        <ChevronBackIcon/>
                    </div>}
                    {!subTitle && <h4 className={``}> {title} </h4>}
                    {subTitle && (
                        <div className={`text-[17px] flex flex-col justify-start items-start leading-[20px] `}>
                            <h4>{title}</h4>
                            <p className={`font-medium`}>{subTitle}</p>
                        </div>
                    )}
                </div>
                <div
                    className={`text-admin-primary text-[39px] cursor-pointer hover:opacity-60 transition ease-in duration-300 hover:rotate-3`}
                    onClick={handleToggle}>
                    <SimpleCloseIcon/>
                </div>
            </div>
        </div>
    )
}

export const DialogHead: React.FC<DialogHeadProps> = ({title, handleToggle}) => {
    return (
        <div>
            <div className={`flex justify-between items-start pb-6`}>
                <div className="flex justify-center items-center gap-[24px]">
                    <div className={`cursor-pointer hover:opacity-60 transition ease-in duration-300`}
                         onClick={handleToggle}>
                        <Image src={back} alt={'close icon'} width={15}/>
                    </div>
                    <h4 className="text-black text-[22px] font-bold font-['DM Sans'] leading-snug"> {title} </h4>
                </div>
                <div className={`cursor-pointer hover:opacity-60 transition ease-in duration-300 hover:rotate-3`}
                     onClick={handleToggle}>
                    <Image src={close} alt={'close icon'} width={27}/>
                </div>
            </div>
        </div>
    )
}

type DialogContentProps = {
    children: React.ReactNode
}
export const DialogContent: React.FC<DialogContentProps> = ({children}) => {
    return (
        <div className={`pt-[42px]`}>
            <div>
                {children}
            </div>
        </div>
    )
}

export const DialogContentListItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            <div className={`flex flex-col gap-[5px]`}>
                {children}
            </div>
        </div>
    )
}


export const DialogActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            <div className={`flex flex-col gap-[14px]`}>
                {children}
            </div>
        </div>
    )
}

export const DialogContentText: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div {...props}>
            <div className={`font-normal text-center text-[20px] text-[#506D82] tracking-[-2%]`}>
                {children}
            </div>
        </div>
    )
}


export const DefaultDialogMainBody: React.FC<{
    ctx?: 'dialog' | 'dialogMin'
} & React.HTMLAttributes<HTMLDivElement>> = ({ctx = 'dialog', children, ...props}) => {

    return (
        <CustomScroll ctx={ctx}>
            <div {...props}>

                <div className={`pb-10 px-3`}>
                    {children}
                </div>
            </div>
        </CustomScroll>
    )
}


export const DefaultDialogSearch: React.FC<{} & React.HTMLAttributes<HTMLDivElement>> = ({className, ...props}) => {

    const findMode: FindModeType = 'dialog'

    const {setFindToken, resetFindToken} = useAppStore()

    React.useEffect(() => {
        resetFindToken();
    }, [resetFindToken]);

    return (
        <div className={cn(`mt-[15px] mb-[20px]`, className)} {...props}>
            <div>
                <div className={`flex gap-4 items-center justify-center`}>
                    <div>
                        <SearchTextField
                            onChange={(e) => setFindToken(e.target.value, findMode)}
                            placeholder={'Rechercher'}
                        />
                    </div>
                    <button
                        className={`text-text-body flex items-center justify-center gap-2 font-normal text-[14px] leading-[20px] tracking-[-2%]`}>
                        <FilterIcon/>
                        <div>Trier par nom ...</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export const DialogCarItem: React.FC<{
    item: Vehicule,
    selectable?: boolean,
    handleSelect?: (item: Vehicule, remove?: boolean) => void
}> = ({item, selectable, handleSelect}) => {

    const [editCarDialogIsOpen, setEditCarDialogIsOpen] = React.useState<boolean>(false)
    const [selected, setSelected] = React.useState(``)

    const handleToggleDialog = () => {
        if (selectable) {
            setSelected(selected.length ? '' : item.id)
            if (selected.length) {
                handleSelect && handleSelect(item, true)
            } else {
                handleSelect && handleSelect(item)
            }
            return
        }
        setEditCarDialogIsOpen(!editCarDialogIsOpen)
    }


    if (item) {
        return (
            <div className={`mb-[8px]`}>
                <DefaultDialogListItem
                    selected={selected}
                    index={item.id}
                    onClick={handleToggleDialog}
                    title={item.getFullName}
                    subtitle={item.getRegistrationWithColor}
                    image={item.getCover}
                >
                </DefaultDialogListItem>
                {/*<AddCarDialog*/}
                {/*    isUpdate={true}*/}
                {/*    isOpen={editCarDialogIsOpen}*/}
                {/*    onClose={handleToggleDialog}*/}
                {/*    vehicule={item}*/}
                {/*/>*/}
                <VehicleInfosDialog
                    vehicule={item}
                    isOpen={editCarDialogIsOpen}
                    onClose={handleToggleDialog}
                />
                {/*<VehiculeInfosDialog isOpen={editCarDialogIsOpen} onClose={handleToggleDialog} />*/}
            </div>
        )
    }


    return (
        <div>
            <DefaultDialogListItem onClick={handleToggleDialog}>
                <div className={`flex justify-center items-center gap-[5px] text-admin-primary`}>
                    <p>Élisée Martial Rémy</p>
                    <Image width={20} height={20} className={`rounded-lg`} src={`/assets/faker/default-car-user.png`}
                           alt={''}/>
                </div>
            </DefaultDialogListItem>
            <VehiculeInfosDialog isOpen={editCarDialogIsOpen} onClose={handleToggleDialog}/>
        </div>
    )
}

export const DialogDriverItem: React.FC<{
    item: Driver,
    selectable?: boolean,
    handleSelect?: (item: Driver, remove?: boolean) => void
}> = ({item, selectable, handleSelect}) => {

    const [editDriverDialogIsOpen, setEditDriverDialogIsOpen] = React.useState<boolean>(false)
    const [selected, setSelected] = React.useState('')

    const handleToggleDialog = () => {
        if (selectable) {
            setSelected(selected.length ? '' : item.id)
            if (selected.length) {
                handleSelect && handleSelect(item, true)
            } else {
                handleSelect && handleSelect(item)
            }
            return
        }
        setEditDriverDialogIsOpen(!editDriverDialogIsOpen)
    }

    const handleToggleEditDriverDialog = () => {
        setEditDriverDialogIsOpen(!editDriverDialogIsOpen)
    }

    if (item) {
        return (
            <div className={`mb-2`}>
                <DefaultDialogListItem
                    image={item.getAvatar}
                    title={item.getUsername}
                    selected={selected}
                    index={item.id}
                    subtitle={item.getExperience}
                    onClick={handleToggleDialog}
                >
                    <div className={`h-full mt-2`}>
                        <Chip name={item.getGrade}/>
                    </div>
                </DefaultDialogListItem>
                <DriverInfoDialog driver={item} isOpen={editDriverDialogIsOpen} onClose={handleToggleEditDriverDialog}/>
            </div>
        )
    }
}

export const DialogSupplierItem: React.FC<{
    item: Supplier,
    selectable?: boolean,
    handleSelect?: (item: Supplier, remove?: boolean) => void
}> = ({item, selectable, handleSelect}) => {

    const [selected, setSelected] = React.useState("")

    const handleSelectItem = () => {
        setSelected(selected.length ? '' : '' + item.id)
        if (selected.length) {
            handleSelect && handleSelect(item, true)
        } else {
            handleSelect && handleSelect(item)
        }
        return
    }


    if (item) {
        return (
            <div className={`mb-2`}>
                <DefaultDialogListItem
                    image={item.getLogo}
                    title={item.getDisplayName}
                    selected={selected}
                    index={'' + item.id}
                    subtitle={item.getActivity}
                    onClick={handleSelectItem}
                >
                    <div className={`h-full mt-2 flex flex-col justify-end items-end`}>
                        <div>{item.getCity}</div>
                        <div>{item.getStreet}</div>
                    </div>
                </DefaultDialogListItem>
            </div>
        )
    }
}


export const DialogClientItem: React.FC<{
    item: ClientModel,
    selectable?: boolean,
    handleSelect?: (item: ClientModel, remove?: boolean) => void
}> = ({item, selectable, handleSelect}) => {

    const [selected, setSelected] = React.useState("")

    const handleSelectItem = () => {
        setSelected(selected.length ? '' : '' + item.id)
        if (selected.length) {
            handleSelect && handleSelect(item, true)
        } else {
            handleSelect && handleSelect(item)
        }
        return
    }


    if (item) {
        return (
            <div className={`mb-2`}>
                <DefaultDialogListItem
                    title={item.username}
                    selected={selected}
                    index={'' + item.id}
                    subtitle={item.phoneWithEmail}
                    onClick={handleSelectItem}
                >
                    <div className={`h-full mt-2 flex flex-col justify-end items-end`}>
                        <div className={"text-right"}>{item.address}</div>
                        <div>{item.courseCount} courses</div>
                    </div>
                </DefaultDialogListItem>
            </div>
        )
    }
}

export const DialogVehiculeGroupItem: React.FC<{ item: VehiculeGroup, selectable?: boolean }> = ({
                                                                                                     item,
                                                                                                     selectable
                                                                                                 }) => {

    const [editCarDialogIsOpen, setEditCarDialogIsOpen] = React.useState<boolean>(false)

    const handleToggleDialog = () => {
        setEditCarDialogIsOpen(!editCarDialogIsOpen)
    }

    return (
        <div className={cn(
            `flex justify-between items-center text-admin-primary text-xl font-bold  leading-[42px] 
        mb-[18px] p-[10px] bg-white rounded-[14px] border border-slate-400 cursor-pointer`,
            `hover:bg-violet-50 hover:border-violet-50 transition duration-200 ease-in`
        )}>
            <div>
                <div className={`flex gap-[8px]`}>
                    <h5 className="">{item.getDisplayName}</h5>
                    <button>
                        <EditIcon width={19} height={19}/>
                    </button>
                </div>
                <div className="text-text-body text-sm font-medium font-['DM Sans'] leading-normal">
                    <span>Nombre de véhicules: </span>
                    <span className="text-gray-500 text-sm font-normal">18</span>
                </div>
            </div>
            <button>
                <TrashIcon className={`size-6`}/>
            </button>
        </div>
    )
}

export const DialogInfoTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (
        <div className="text-blue-primary text-xl font-bold  leading-normal">{children}</div>
    )
}

export const DialogInfoItem: React.FC<{ label: string, value: string }> = ({label, value}) => {
    return (
        <div className={`text-base font-normal leading-normal text-admin-primary`}>
            <span className={`font-bold mr-[7px]`}>{label}</span>
            <span>{value}</span>
        </div>
    )
}


export const DialogInfoGroup: React.FC<{ groupTitle: string } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                             children,
                                                                                                             groupTitle,
                                                                                                             className,
                                                                                                             ...props
                                                                                                         }) => {
    return (
        <div className={cn(className)} {...props}>
            <div className={`flex flex-col gap-[16px]`}>
                <DialogInfoTitle>{groupTitle}</DialogInfoTitle>
                {children}
            </div>
        </div>
    )
}


export const DialogInfoDivider = () => {
    return (
        <div className="w-full h-[0px] border border-zinc-100 my-[24px]"></div>
    )
}

export default DialogBase
