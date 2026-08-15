"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LuPlus, LuSearch } from "react-icons/lu"
import { useUsersHook } from "../../_hook/useUsersHook"
import { DataTable } from "@/components/display/CustomTableDisplay"
import { AdminAccountStatus } from "@/types/__form/profile.type"
import { UserFormDialog } from "../_dialogs/UserFormDialog"
import { useState } from "react"
import { UserToggleDialog } from "../_dialogs/ToggleUserDialog"

const UsersPage = () => {
    const {
        citiesList,
        isLoadingCities,
        isLoadingUsers,
        pagination,
        rowActions,
        tableColumns,
        usersList,
        filters,
        setFilters,

        formAction,
        handleAdd,
        handleEdit,
        handleToggle,
        isFormVisible,
        isToggleVisible,
        selectedUser,
        setIsFormVisible,
        setIsToggleVisible,
        toggleAction
    } = useUsersHook()
    return (
        <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-end flex-wrap gap-4">
                <div className="filters flex items-center gap-4 flex-wrap w-full">
                    <div className="search">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl shadow-sm border border-vaTextPrimary/5">
                            <Input
                                placeholder="Recherche par nom d'utilisateur..."
                                type="search"
                                className="pl-9 h-10 w-80 bg-[#F4F7FE] border-none text-sm"
                                leftIcon={<LuSearch className="text-vaTextPrimary" />}
                                value={filters?.name}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                                autoComplete="false"
                                autoFocus
                            />
                        </div>
                    </div>
                    <Select defaultValue="all" value={filters?.city_id} onValueChange={(value) => setFilters(prev => ({
                        ...prev,
                        city_id: Number(value)
                    }))}>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Filtrer par pays" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les villes</SelectItem>

                            {
                                citiesList?.map((c, index) =>

                                    <SelectItem value={c.id} key={index}> {c.name} </SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all" value={filters?.status} onValueChange={(value) => setFilters(prev => ({
                        ...prev,
                        status: value as AdminAccountStatus
                    }))}>
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="new">Nouveau</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                            <SelectItem value="locked">Verrouillé</SelectItem>
                            <SelectItem value="deactivated">Désactivé</SelectItem>
                            <SelectItem value="gps_configuration_pending">Configuration GPS en attente</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => handleAdd()}>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Ajouter un utilisateur
                    </Button>
                </div>
            </div>

            <DataTable columns={tableColumns} data={usersList || []} pagination={pagination} isLoading={isLoadingUsers} rowActions={rowActions} />
            <UserFormDialog isOpenned={isFormVisible} onClose={() => setIsFormVisible(false)} action={formAction} userId={selectedUser?.getID} />
            <UserToggleDialog action={toggleAction} isOpenned={isToggleVisible} onClose={() => setIsToggleVisible(false)} user={selectedUser} />

        </div>
    )
}


export default UsersPage