"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageSublink, AdminPageTitle} from "@/components/typo/typo";
import {MoreVerIcon, TrashIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/lib/utils";
import {MoreHorizontal, MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {AddAdminDialog} from "@/app/(webapp)/app/settings/profile/actions/addAdmin/AddAdminDialog";

const UsersPage: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div>
            <AdminSettingBox>
                <AdminPageTitle
                    handleAdd={() => {
                        setIsOpen(true)
                    }}
                    withMb={true}
                >
                    Administrateurs
                </AdminPageTitle>
                <AdminUsers/>
                <AddAdminDialog isOpen={isOpen} setIsOpen={v => setIsOpen(v)}/>
            </AdminSettingBox>
        </div>
    )
}

const AdminUsers: React.FC = () => {

    const users = [
        {name: 'Christian Onguene Ludovic', role: 'Caissier'},
        {name: 'Victoire Joelle', role: 'Agent'},
        {name: 'Roberto Carlos', role: 'Administrateur'},
        {name: 'Florent Ewane', role: 'Administrateur'},
        {name: 'L’incontournable John Doe', role: 'Superviseur'},
    ]

    return (
        <div className={`flex gap-[9px] flex-col w-full`}>
            {users.map(user => (
                <OneAdminUser user={user} key={user.name}/>
            ))
            }
        </div>
    )
}

const OneAdminUser: React.FC<{ user: { name: string, role: string } }> = ({user}) => {

    const {name, role} = user

    return (
        <div
            className={"bg-[#eeeeff] transition hover:bg-[#e4e4ff] border p-[10px] rounded-xl flex flex-col gap-[10px]"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex gap-[9px] items-center"}>
                    <div className="text-black text-xl font-medium leading-[30.12px]">Christian Onguene Ludovic</div>
                    <div className={"text-black text-sm font-medium leading-[21.08px] flex gap-[9px] items-center"}>
                        <div className="">ludovicchristian1@gmail.com</div>
                        <div>+237 698112491</div>
                    </div>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={"text-[#506D82] size-[31px] text-[16px] flex items-center justify-center hover:opacity-70"}>
                                <MoreVertical/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Modifier l’administrateur</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className={"text-[#E51D13] hover:text-[#E51D13]"}>Désactiver
                                l’administrateur</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={"bg-[#fdfdfd] px-[20px] py-[10px] rounded-md flex flex-col gap-[10px]"}>

                <div className={"flex gap-[12px]"}>
                    <RoleTitle>Lecture :</RoleTitle>
                    <div className={"flex items-center gap-[10px]"}>
                        <RoleTag>Véhicules</RoleTag>
                        <RoleTag>Chauffeurs</RoleTag>
                    </div>
                </div>

                <div className={"flex gap-[12px]"}>
                    <RoleTitle>Ecriture :</RoleTitle>
                    <div className={"flex items-center gap-[10px]"}>
                        <RoleTag tagType={"write"}>Client </RoleTag>
                    </div>
                </div>

            </div>
        </div>
    )
}

const RoleTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className="text-slate-500 text-sm font-medium leading-[21.08px]">{children}</div>
    )
}

const RoleTag: React.FC<React.HTMLAttributes<HTMLDivElement> & { tagType?: "read" | "write" }> = ({
                                                                                                      children,
                                                                                                      tagType = "read"
                                                                                                  }) => {

    const isWriteTag = tagType === "write"

    return (
        <div
            className={cn(
                "text-center  font-['DM Sans'] text-white text-xs font-medium leading-snug bg-[#2554ae] min-w-[83px] w-fit py-[5px] rounded-md px-[15px]",
                isWriteTag && "text-[#C87800] bg-[#FFF0D9]"
            )}>
            {children}
        </div>
    )
}

export default UsersPage
