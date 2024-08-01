"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageSublink, AdminPageTitle} from "@/components/typo/typo";
import {TrashIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

const UsersPage: React.FC = () => {
    return (
        <div>
            <AdminSettingBox>
                <AdminPageTitle handleAdd={()=>{}} withMb={true} subElement={<AdminPageSublink name={'Gérer les roles'} />}>Utilisateurs</AdminPageTitle>
                <AdminUsers />
            </AdminSettingBox>
        </div>
    )
}

const AdminUsers: React.FC = ()=> {

    const users = [
        {name: 'Christian Onguene Ludovic', role: 'Caissier'},
        {name: 'Victoire Joelle', role: 'Agent'},
        {name: 'Roberto Carlos', role: 'Administrateur'},
        {name: 'Florent Ewane', role: 'Administrateur'},
        {name: 'L’incontournable John Doe', role: 'Superviseur'},
    ]

    return (
        <div className={`flex gap-[9px] flex-col w-full`}>
            {users.map(user=>(
                <OneAdminUser user={user} key={user.name} />
            ))
            }
        </div>
    )
}

const OneAdminUser:React.FC<{user:{name: string, role: string}}> = ({user})=> {

    const {name, role} = user

    return (
        <div className={`flex justify-between items-center bg-stone-50 rounded p-[10px] w-full hover:bg-stone-100 transition ease-in duration-200 cursor-default`}>
            <div className="text-slate-500 text-xl font-medium leading-[30.12px]">{name}</div>
            <div>
                <div className="text-right text-slate-300 text-xl font-medium leading-[30.12px] flex items-center gap-[13px]">
                    <div>{role}</div>
                    <button className={`cursor-pointer hover:opacity-65 transition duration-200`}>
                        <TrashIcon className={`text-admin-primary`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersPage
