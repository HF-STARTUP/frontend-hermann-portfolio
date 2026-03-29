import { Edit, Plus, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Badge from "@/components/display/Badge"
import { AddRoleDialog } from "./_dialogs/RoleFormDialog"
import { useState } from "react"
import RootRoleModel from "@/model/ADMIN/RoleAccessModel"
import { useRoleHook } from "../_hook/useRoleHook"

// Composant Shimmer local
export const RoleCardShimmer = () => {
    return (
        <div className="p-4 border rounded-xl shadow-sm flex-grow flex flex-col gap-4 w-full animate-pulse">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="size-10 rounded-lg bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="size-8 rounded-md bg-gray-200" />
            </div>
            <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-32 rounded-full bg-gray-200" />
        </div>
    )
}

export const RoleCard = ({ item, onEdit }: { item: RootRoleModel, onEdit: (item: RootRoleModel) => void }) => {
    const moduleNames = Object.keys(item.groupedAccesses || {});
    return (
        <div className="p-4 border rounded-xl shadow-sm flex-grow flex flex-col gap-4 hover:scale-105 transition-all duration-300 cursor-pointer w-full">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="bg-vaTextPrimary/10 p-1.5 rounded-lg size-10 flex items-center justify-center text-vaTextPrimary">
                        <Shield />
                    </div>
                    <div className="text-base text-vaTextPrimary">
                        <p className="text-vaPrimary font-semibold">{item.displayName}</p>
                        <p className="text-xs">{item.userCount} utilisateur(s)</p>
                    </div>
                </div>

               { item.isModifiable &&
                <Button variant={"ghost"} size="icon" className="text-vaTextPrimary" onClick={() => onEdit(item)}>
                    <Edit size={16} />
                </Button>}
            </div>
            <p className="text-sm text-vaTextPrimary line-clamp-2" title={moduleNames.join(', ')}>
                {moduleNames.length > 0 ? moduleNames.join(', ') : "Aucun module"}
            </p>
            <Badge variant="blue">
                {
                    item.accesses.length
                } Permissions actives
            </Badge>
        </div>
    )
}

const RoleList = ({ items, isLoading }: { items?: RootRoleModel[], isLoading?: boolean }) => {
    const { formAction, handleAdd, handleEdit, isFormVisible, setIsFormVisible, selectedRole} = useRoleHook()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div onClick={() => handleAdd()}
                className="p-4 border flex items-center justify-center rounded-xl shadow-sm text-vaTextPrimary hover:scale-105 transition-all duration-300 cursor-pointer border-dashed h-full min-h-[160px]">
                <Plus size={44} />
            </div>

            {isLoading ? (
                <>
                    <RoleCardShimmer />
                    <RoleCardShimmer />
                    <RoleCardShimmer />
                </>
            ) : (
                items?.map((item, index) =>
                    <RoleCard item={item} key={index} onEdit={() => handleEdit(item)} />
                )
            )}
            <AddRoleDialog isOpenned={isFormVisible} onClose={() => setIsFormVisible(false)} action={formAction} roleId={selectedRole?.id} />
        </div>
    )
}

export default RoleList