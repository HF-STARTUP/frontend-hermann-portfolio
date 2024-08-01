"use client"

import React from "react";
import Image from "next/image";
import {CheckIcon, CheckWithIcon, CloseIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import Chip from "@/components/box/Chip";
import {ReceiptUserProps} from "@/app/(protected)/dashboard/receipts/_components/receiptsUsers/ReceiptsUsers";
import useScheduleStore from "@/stores/protected/dashboard/schedule/useScheduleStore";
import {useGetAgents, useGetDrivers} from "@/hooks/driver/useDriver";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import {cn} from "@/utils/ui/cn";
import VImageProvider from "@/components/helpers/VImageProvider";

type PlaningUserProps = {
    avatar: string,
    username: string,
    enabled: boolean
}

const PlaningUsersList: React.FC = () => {

    const {isLoading: loadingDrivers, data: drivers} = useGetDrivers()
    const {isLoading: loadingVehicules, data: vehicules} = useGetVehicules()
    const {isLoading: loadingAgents, data: agents} = useGetAgents()

    const {
        activePlaningType,
        setActiveItem, activeVehicule,
        activeDriver,
        activeAgent
    } = useScheduleStore()

    const {
        getIfPlaningTypeIsCars,
        getIfPlaningTypeIsAgent,
    } = useScheduleStore()

    //const selectedDriver = getActiveDriver()
    const planingTypeIsCar = getIfPlaningTypeIsCars()
    const planingTypeIsAgent = getIfPlaningTypeIsAgent()

    React.useEffect(() => {
        setActiveItem({close: true})
    }, [planingTypeIsCar])

    return (
        <div className={`max-w-[291px]`}>
            {activeDriver && <div className={`mb-[14px]`}>
                <ActiveUser user={{
                    name: activeDriver.getUsername ?? '',
                    avatar: activeDriver.getAvatar,
                    role: activeDriver.getGrade,
                    id: +activeDriver.id,
                    active: false
                }}/>
            </div>}
            {activeAgent && <div className={`mb-[14px]`}>
                <ActiveUser user={{
                    name: activeAgent.getUsername ?? '',
                    avatar: activeAgent.getAvatar,
                    role: activeAgent.getGrade,
                    id: +activeAgent.id,
                    active: false
                }}/>
            </div>}
            {activeVehicule && <div className={`mb-[14px]`}>
                <ActiveUser user={{
                    name: activeVehicule.getFullName,
                    avatar: activeVehicule.getCover,
                    id: +activeVehicule.id,
                    active: false
                }}/>
            </div>}
            <div className={`relative bg-white rounded-[10px]`}>
                <div className="text-[#506D82] text-sm font-medium leading-normal border-b border-violet-50">
                    <div className={`px-[27px] py-[12px] flex justify-between items-center`}>
                        <div>{`Sélectionner un ${activePlaningType.toLowerCase().split('s')[0]}`}</div>
                        <CheckWithIcon className={`text-admin-primary`}/>
                    </div>
                </div>
                <div className={`max-h-[470px] min-h-[450px] scrollbar scrollbar-thumb-text-body overflow-y-scroll scrollbar-w-[6px] 
                  scrollbar-thumb-rounded-full scrollbar-corner-rounded-full scrollbar-track-transparent scrollbar-h-2`}>
                    <div className={`py-[12px] flex flex-col gap-[6px] `}>
                        {loadingDrivers || loadingVehicules || loadingAgents || !vehicules || !drivers || !agents ? <div>loading...</div>
                            : (
                                <div>
                                    {planingTypeIsCar ? <div>
                                            {vehicules.map((v, key) => (
                                                <UserItem
                                                    onClick={() => setActiveItem({vehicule: v})}
                                                    user={{
                                                        username: v.getFullName,
                                                        avatar: v.getCover,
                                                        enabled: false,
                                                        id: v.id
                                                    }}
                                                    key={key}/>
                                            ))}
                                        </div>
                                        : <div>
                                            {(planingTypeIsAgent ? agents : drivers).map((d, key) => (
                                                <UserItem
                                                    onClick={() => setActiveItem({driver: d})}
                                                    user={{
                                                        username: d.getUsername ?? '',
                                                        avatar: d.getAvatar,
                                                        enabled: false,
                                                        id: '' + d.id
                                                    }}
                                                    key={key}/>
                                            ))}
                                        </div>
                                    }

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/*<div className={`mt-[16px] flex flex-col gap-[20px]`}>*/}
            {/*    {planingTypeIsCar && <CarsFilter/>}*/}
            {/*</div>*/}
        </div>
    )
}

const UserItem: React.FC<{ user: PlaningUserProps & { id?: string } } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                                     user,
                                                                                                                     className,
                                                                                                                     ...props
                                                                                                                 }) => {


    return (
        <div
            className={cn(`flex gap-[6px] items-center justify-between cursor-pointer 
            hover:bg-sky-100 py-1 px-[27px] transition duration-200 ease-in`, className)}
            {...props}
        >
            <div className={`flex gap-[6px] items-center`}>
                <Image width={22} height={22} className={`w-[22px] h-[22px] rounded-md`} src={`${user.avatar}`}
                       alt={user.avatar}/>
                <div className="text-gray-500 text-sm font-normal leading-normal">{user.username}</div>
            </div>
            <div>
                <CheckIcon width={13} height={13}
                           className={`text-[13px] ${user.enabled ? 'text-green-400' : 'text-gray-200'}`}/>
            </div>
        </div>
    )
}

const ActiveUser: React.FC<{ user: ReceiptUserProps } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                     user,
                                                                                                     className,
                                                                                                     ...props
                                                                                                 }) => {

    const scheduleStore = useScheduleStore()

    const handleCloseActiveUser = () => {
        scheduleStore.setActiveItem({close: true})
    }

    return (
        <div className={`relative bg-white rounded-[20px] py-[16px] px-[11px]`}>
            <div className={`flex gap-[29px]`}>
                <VImageProvider className={`w-24 h-24 relative rounded-[20px]`} width={100} height={100}
                                src={`${user.avatar}`}
                                alt={user.avatar}/>
                <div className={`flex`}>
                    <div>
                        <div
                            className={"text-admin-primary text-xl font-bold leading-tight mb-[10px] max-w-[20px]"}>{user.name}</div>
                        {user.role && <Chip name={user.role}/>}
                        {/*<div className="text-slate-500 text-sm font-medium leading-normal mt-[4px]">Titulaire</div>*/}
                    </div>
                    <div>
                        <button
                            onClick={handleCloseActiveUser}
                            className={`text-slate-400 absolute top-[7px] right-[10px] cursor-pointer 
                            hover:opacity-85 transition ease-in duration-200`}>
                            <CloseIcon width={24} height={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// const DateFilter: React.FC = () => {
//     const [isAutoPlaning, setIsAutoPlaning] = React.useState(false)
//
//     const toggleIsAutoPlaning = () => {
//         setIsAutoPlaning(!isAutoPlaning)
//     }
//
//     return (
//         <div>
//             {!isAutoPlaning ? <div>
//                     <div className={`bg-white rounded-[20px] mb-[16px]`}>
//                         <div
//                             className="text-admin-primary text-sm font-medium leading-normal border-b border-violet-50 py-[6px] px-[12px]">Planning
//                             automatique
//                         </div>
//                         <div className={`py-[10px] px-[15px]`}>
//                             <Stack>
//                                 <FieldDate size={'sm'} label={'Du'}/>
//                                 <FieldDate size={'sm'} label={'Au'}/>
//                             </Stack>
//                         </div>
//                     </div>
//                     <BtnBase onClick={toggleIsAutoPlaning} size={'sm'} color={'blue'} variant={'contained'} shape={'square'}
//                              fullwidth={true} to={''}>Plannifier automatiquement</BtnBase>
//                 </div>
//                 : <div className={`bg-white rounded-[20px] mb-[16px] py-[6px] px-[12px] flex flex-col gap-[12px]`}>
//                     <BtnBase size={'sm'} color={'blue'} variant={'outline'} shape={'square'} fullwidth={true} to={''}
//                              onClick={toggleIsAutoPlaning}>Annuler</BtnBase>
//                     <BtnBase size={'sm'} color={'blue'} variant={'outline'} shape={'square'} fullwidth={true} to={''}>Relancer
//                         la plannification auto</BtnBase>
//                     <BtnBase size={'sm'} color={'blue'} variant={'contained'} shape={'square'} fullwidth={true} to={''}>Confirmer
//                         la planification</BtnBase>
//                 </div>
//             }
//
//         </div>
//     )
// }

// const CarsFilter: React.FC = () => {
//     return (
//         <div className={`flex flex-col gap-[16px]`}>
//             <ExpandableSelect name={'Selectionner une Marque'} items={['Lanborgini', 'Toyota', 'Porche']}
//                               selected={'toutes'}/>
//             <ExpandableSelect name={'Selectionner un modèle'} items={['Lanborgini', 'Toyota', 'Porche']}/>
//             <BtnBase size={'sm'} color={'blue'} variant={'contained'} shape={'square'} fullwidth={true}
//                      to={''}>Confirmer</BtnBase>
//         </div>
//     )
// }

export default PlaningUsersList
