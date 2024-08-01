"use client"

import React from "react";
import {ArrowSortIcon, CheckIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {Divider} from "@/components/box/Card";
import Image from "next/image";
import {CustomScroll} from "@/components/box/CustomScroll";
import {useGetDriversToEncaissToday} from "@/hooks/driver/useDriver";
import Loading from "@/components/ui/Loader";
import {getDayDate} from "@/lib/utils";


export type ReceiptUserProps = {
    id?: number | string,
    avatar: string,
    role?: string,
    name: string,
    active: boolean
}

const ReceiptsUsers: React.FC = () => {
    return (
        <div className={`bg-white rounded-[18px] px-[20px] py-[18px]`}>
            <ReceiptsUsersHead/>
            <UsersList/>
        </div>
    )
}


const ReceiptsUsersHead: React.FC = () => {
    const {data: drivers} = useGetDriversToEncaissToday()

    return (
        <div>
            <div className={`flex flex-col gap-[17px] mb-[9px]`}>
                <div className={`flex justify-between items-center`}>
                    <div className="text-admin-primary text-xl font-bold  leading-[25px]">Planning du jour</div>
                    <div className="text-sm font-normal leading-[25px] text-[#506D82]">{getDayDate()}</div>
                </div>
                <div className={`flex items-center gap-1.5`}>
                    <ArrowSortIcon/>
                    <div className="text-black text-sm font-medium leading-normal">Trier : Chauffeurs non encaissés
                        {drivers && <span>({drivers?.length}/{drivers?.length})</span>}
                    </div>
                </div>
            </div>
            <Divider/>
        </div>
    )
}


const UsersList: React.FC = () => {

    const {data: drivers, isLoading} = useGetDriversToEncaissToday()

    return (
        <CustomScroll>
            <div className={`flex flex-col gap-[16px]`}>
                {isLoading && <Loading/>}
                {drivers && drivers.map((user, index) => (
                    <User user={{
                        id: user.id,
                        name: user.driver.getUsername,
                        avatar: user.driver.getAvatar,
                        active: user.encaissed
                    }} key={index}
                    />
                ))
                }
            </div>
        </CustomScroll>
    )
}

const User: React.FC<{ user: ReceiptUserProps }> = ({user}) => {
    const {name, role, avatar, active} = user
    return (
        <div
            className={`flex justify-between items-center py-[8px] px-[10px] mr-[16px] cursor-default hover:bg-stone-100 transition duration-200 ease-in`}>
            <div className={`flex gap-[12.67px] items-center`}>
                <button className={`text-[30px] ${active ? 'text-green-400' : 'text-text-body'}`}>
                    <CheckIcon/>
                </button>
                <div className={"size-[30px]"}>
                    <Image width={30.11}
                           height={30.11}
                           className={`rounded-[10.38px] size-[30px]`}
                           src={avatar} alt={'default use receipt'}
                    />
                </div>
                <div className="max-w-[113px] text-admin-primary text-sm font-medium leading-none">{name}</div>
            </div>
            <div className="text-center text-slate-400 text-xs font-normal leading-tight">{role}</div>
        </div>
    )
}


export default ReceiptsUsers
