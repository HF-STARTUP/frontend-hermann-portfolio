"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageTitle} from "@/components/typo/typo";
import {cn} from "@/lib/utils";
import {MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {AddAdminDialog} from "@/app/(webapp)/app/settings/profile/actions/addAdmin/AddAdminDialog";
import {useDeactivateOrActivateAdmin, useGetAdminList} from "@/hooks/admin/useSettingsHook";
import UserProfile from "@/model/user/User";
import Loading from "@/components/ui/Loader";
import {AdminAccountStatus} from "@/types/__form/profile.type";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

const UsersPage: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {data: admins, isLoading} = useGetAdminList()


    return (
        <div>
            <AdminSettingBox>
                <AdminPageTitle
                    handleAdd={() => {
                        setIsOpen(true)
                    }}
                    withMb={true}
                >
                    Administrateurs({admins?.length ?? "-"})
                </AdminPageTitle>
                <AdminUsers/>
                <AddAdminDialog isOpen={isOpen} setIsOpen={v => setIsOpen(v)}/>
            </AdminSettingBox>
        </div>
    )
}

const AdminUsers: React.FC = () => {

    const {data: admins, isLoading} = useGetAdminList()

    if (isLoading) {

        return <Loading/>
    }

    if (admins && admins.length) {
        return (
            <div className={`flex gap-[9px] flex-col w-full`}>
                {admins.map(admin => (
                    <OneAdminUser user={admin} key={admin.getID}/>
                ))
                }
            </div>
        )
    }
}

const OneAdminUser: React.FC<{ user: UserProfile }> = ({user}) => {

    const {onToggleStatus, loading: loadingToggle} = useDeactivateOrActivateAdmin()
    const {username, readRoles, writeRoles} = user
    const [isOpen, setIsOpen] = React.useState(false)

    const isDeactivated = user._instance.status === AdminAccountStatus.Deactivated
    const isLoggedAdmin = AuthManagerGuard.getProfileID === user.getID

    return (
        <div
            className={cn(
                "bg-[#eeeeff] transition hover:bg-[#e4e4ff] border p-[10px] rounded-xl flex flex-col gap-[10px]",
                isDeactivated && "bg-red-200 hover:bg-red-100"
            )}>
            <div className={"flex justify-between lg:items-center"}>
                <div className={"flex flex-col lg:flex-row gap-[9px] lg:items-center"}>
                    <div className="text-black text-xs lg:text-md font-bold lg:font-medium lg:leading-[30.12px]">{username}</div>
                    <div className={"text-black text-sm font-medium leading-[21.08px] flex flex-col lg:flex-row gap-[9px] lg:items-center"}>
                        <div className="">{user._instance.user.email}</div>
                        <div>{user._instance.user.phone}</div>
                        {isDeactivated && <div className={"text-red-800"}>Désactivé</div>}
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
                            <DropdownMenuItem
                                onClick={() => setIsOpen(true)}
                            >Modifier l’administrateur</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            {!isLoggedAdmin && <DropdownMenuItem
                                onClick={() => {
                                    onToggleStatus(user.getID)
                                }}
                                className={"text-[#E51D13] hover:text-[#E51D13]"}
                            >
                                {isDeactivated ? "Activer l'admin" : "Désactiver l’administrateur"}
                            </DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={"bg-[#fdfdfd] px-[20px] py-[10px] rounded-md flex flex-col gap-[10px] overflow-hidden"}>

                <div className={"flex flex-col lg:flex-row gap-[12px]"}>
                    <RoleTitle>Lecture:</RoleTitle>
                    <div className={"flex flex-wrap items-center gap-[10px]"}>
                        {readRoles.map((r, i) => <RoleTag key={i}>{r.onglet.name}</RoleTag>)}
                    </div>
                </div>

                <div className={"flex flex-col lg:flex-row gap-[12px]"}>
                    <RoleTitle>Ecriture:</RoleTitle>
                    <div className={"flex flex-wrap items-center gap-[10px]"}>
                        {writeRoles.map((r, i) => <RoleTag key={i} tagType={"write"}>{r.onglet.name}</RoleTag>)}
                    </div>
                </div>

            </div>
            <AddAdminDialog
                profile={user}
                isOpen={isOpen}
                setIsOpen={v => setIsOpen(v)}
            />
        </div>
    )
}

const RoleTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className="text-slate-500 text-sm font-medium leading-[21.08px] w-fit">{children}</div>
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
