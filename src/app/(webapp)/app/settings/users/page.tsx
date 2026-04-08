"use client";

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageTitle} from "@/components/typo/typo";
import {cn} from "@/lib/utils";
import {LoaderCircle, MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {AddAdminDialog} from "@/app/(webapp)/app/settings/_components/_profile/actions/addAdmin/AddAdminDialog";
import {useDeactivateOrActivateAdmin, useGetAdminList, useRemoveAdminOnCity} from "@/hooks/admin/useSettingsHook";
import UserProfile from "@/model/user/User";
import Loading from "@/components/ui/Loader";
import {AdminAccountStatus} from "@/types/__form/profile.type";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {SetCityToAdminDialog} from "@/app/(webapp)/app/settings/_components/_profile/actions/addAdmin/AddCityOnAdmin";
import {AiFillDelete} from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BtnBase from "@/components/elements/BtnBase";
import {ExpandableRoles} from "@/app/(webapp)/app/settings/users/_components/expandable-roles";

const UsersPage: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {data: admins, isLoading} = useGetAdminList({
        itemPerPage: 999,
        page: 1,
    })


    return (
        <div>
            <AdminSettingBox>
                <AdminPageTitle
                    handleAdd={() => {
                        setIsOpen(true)
                    }}
                    withMb={true}
                >
                    Administrateurs({admins?.admins?.length ?? "-"})
                </AdminPageTitle>
                <AdminUsers/>
                <AddAdminDialog isOpen={isOpen} setIsOpen={v => setIsOpen(v)}/>
            </AdminSettingBox>
        </div>
    )
}

const AdminUsers: React.FC = () => {

    const {data: adminsData, isLoading} = useGetAdminList({
        itemPerPage: 999,
        page: 1,
    })

    if (isLoading) {

        return <Loading/>
    }

    if (adminsData && adminsData.admins.length) {
        return (
            <div className={`flex gap-[9px] flex-col w-full`}>
                {
                    adminsData.admins
                        .sort((a, b) => {
                            const statusA = a._instance.status;
                            const statusB = b._instance.status;

                            if (statusA === statusB) return 0;

                            if (statusA === "deactivated" && statusB !== "deactivated") {
                                return 1;
                            }

                            if (statusB === "deactivated" && statusA !== "deactivated") {
                                return -1;
                            }

                            return 0;
                        })
                        .map((admin) => (
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
    const [modifyCityIsOpen, setModifyCityIsOpen] = React.useState(false)

    const isDeactivated = user._instance.status == "deactivated"
    const isLoggedAdmin = AuthManagerGuard.getProfileID === user.getID

    return (
        <div
            className={cn(
                "bg-[#eeeeff] transition hover:bg-[#e4e4ff] border p-[10px] rounded-xl flex flex-col gap-[10px]",
                isDeactivated && "bg-red-200 hover:bg-red-100"
            )}>
            <div className={"flex justify-between lg:items-center"}>
                <div className={"flex flex-col lg:flex-row gap-[9px] lg:items-center"}>
                    <div
                        className="text-black text-xs lg:text-md font-bold lg:font-medium lg:leading-[30.12px]">{username}</div>
                    <div
                        className={"text-black text-sm font-medium leading-[21.08px] flex flex-col lg:flex-row gap-[9px] lg:items-center"}>
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
                            >
                                Modifier l’administrateur
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => setModifyCityIsOpen(true)}
                            >
                                Attribuer une ville
                            </DropdownMenuItem>

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
            <ExpandableRoles
                readRoles={readRoles}
                writeRoles={writeRoles}
            />
            <div className={"flex items-center flex-col lg:flex-row gap-[12px] text-xs"}>
                <div>Ville:</div>
                <div className={"flex gap-2 items-center"}>
                    {user.cities.map(c => (
                        <CityItem
                            citySize={user.cities.length}
                            cityID={"" + c.id}
                            userID={"" + user.profileUserID}
                            id={"" + c.id}
                            key={c.id}
                        >{c.name}</CityItem>
                    ))}
                </div>
            </div>
            <AddAdminDialog
                profile={user}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <SetCityToAdminDialog
                profile={user}
                isOpen={modifyCityIsOpen}
                setIsOpen={setModifyCityIsOpen}
            />
        </div>
    )
}

const CityItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    cityID: string,
    userID: string,
    citySize: number
}> = ({
          citySize,
          cityID,
          userID,
          children
      }) => {

    const {onRemoveAdmonOnCity, loading} = useRemoveAdminOnCity()

    const [isOpen, setIsOpen] = React.useState(false)

    const handleRemoveCity = () => {
        onRemoveAdmonOnCity({
            city_id: cityID,
            user_id: userID
        })
    }

    return (
        <div
            className={cn("bg-white/40 border rounded-md p-2 flex items-center justify-between gap-2 group", citySize < 2 && "opacity-70")}>
            <div>{children}</div>
            {citySize > 1 && (<Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {<button disabled={loading} className={"hidden group-hover:block transition"}>
                        {loading ? <LoaderCircle/> : <AiFillDelete/>}
                    </button>}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression de la ville pour cet administrateur</DialogTitle>
                        <DialogDescription className={"pt-4"}>
                            Êtes-vous sûr de vouloir effectuer cette opération ? Après cela, vous ne pourrez plus
                            revenir en arrière.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className={`mt-[20px] w-full flex flex-col gap-2`}>

                            <BtnBase
                                onClick={() => setIsOpen(false)}
                                shape={'square'}
                                to={''}
                                variant={'contained'}
                                color={'blue'}
                                fullwidth={true}
                                className={"w-full"}
                                disabled={loading}
                            >
                                Annuler
                            </BtnBase>
                            <BtnBase
                                shape={'square'}
                                to={''}
                                variant={'contained'}
                                fontWeight={'bold'}
                                color={'yellow'}
                                fullwidth={true}
                                className={"w-full"}
                                disabled={loading}
                                onClick={handleRemoveCity}
                                loading={loading}
                            >
                                Retirer la ville
                            </BtnBase>

                        </div>
                    </DialogFooter>
                </DialogContent>

            </Dialog>)}
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
