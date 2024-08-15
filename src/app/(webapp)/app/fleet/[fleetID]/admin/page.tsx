"use client"

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {ABtnAction} from "@/components/ui/custom/actions";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import * as React from "react";

export default function AdminsPage() {
    return (
        <div className={"px-[23.70px] py-[22.57px] bg-white rounded-[22.57px] max-w-[974px]"}>
            <div className={"mt-[24px] flex items-center  justify-between gap-[26px]"}>
                <div className={"mb-[43px]"}>
                    <ABlockTitle>Administrateurs de la flotte (12)</ABlockTitle>
                </div>
                <ABtnAction>Ajouter un administrateur</ABtnAction>
            </div>
            <div>
                <AdminTab/>
            </div>
        </div>
    )
}

const AdminTab = () => {

    const roles = [
        {
            id: "#40325",
            name: "Pierre-Stéphane",
            role: "Super admin",
            date: "Date d’ajout",
            statut: "Active"
        },
        {
            id: "#40325",
            name: "Pierre-Stéphane",
            role: "Super admin",
            date: "Date d’ajout",
            statut: "Active"
        },

        {
            id: "#40325",
            name: "Pierre-Stéphane",
            role: "Super admin",
            date: "Date d’ajout",
            statut: "Active"
        },
        {
            id: "#40325",
            name: "Pierre-Stéphane",
            role: "Super admin",
            date: "Date d’ajout",
            statut: "Active"
        },

    ]

    return (
        <div className={"w-full"}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Date d'ajout</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role) => {


                        const isActive = role.statut === "Active"
                        const isInactive = role.statut === "Désactivé"

                        return (
                            <TableRow key={role.id}>
                                <TableCell className="font-medium">{role.id}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell>{role.role}</TableCell>
                                <TableCell>{role.date}</TableCell>
                                <TableCell className={cn(
                                    "font-bold",
                                    isActive && "text-[#82be6d] bg-[#eafae5] flex items-center justify-center gap-[8.8px] h-[30px] px-[2px] py-[0.88px] rounded-sm",
                                    isInactive && "text-[#ff0000] bg-[#fae5e5] flex items-center justify-center gap-[8.8px] h-[30px] px-[15px] py-[0.88px] rounded-sm",
                                )}>
                                    {role.role}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

