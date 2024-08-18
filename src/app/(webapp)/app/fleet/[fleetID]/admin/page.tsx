"use client"

import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import * as React from "react";
import {useGetFleetAdmin} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import Image from "next/image";

export default function AdminsPage() {

    const {data: admins, isLoading} = useGetFleetAdmin()

    return (
        <div className={"px-[23.70px] py-[22.57px] bg-white rounded-[22.57px] max-w-[974px]"}>
            <div className={"mt-[24px] flex items-center  justify-between gap-[26px]"}>
                <div className={"mb-[43px]"}>
                    <ABlockTitle>Administrateurs de la flotte ({admins?.length ?? 0})</ABlockTitle>
                </div>
                {/*<ABtnAction>Ajouter un administrateur</ABtnAction>*/}
            </div>
            <div>
                <AdminTab/>
            </div>
        </div>
    )
}

const AdminTab = () => {

    const {data: admins, isLoading} = useGetFleetAdmin()

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (admins && admins.length) {
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
                        {admins.map((admin) => {


                            const isActive = admin.status === "inactive"
                            const isInactive = admin.status === "desactivated"

                            return (
                                <TableRow key={admin.id}>
                                    <TableCell className="font-medium">{admin.id}</TableCell>
                                    <TableCell>
                                        <div className={"flex items-center gap-2"}>
                                            {admin.imageUrl &&
                                                <Image className={"size-[40px] rounded-full border-2 border-blue-400"}
                                                       src={admin.imageUrl}
                                                       alt={"Admin avatar"} width={50} height={50}/>}
                                            <p className={"text-nowrap"}>{admin.username}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{admin.role}</TableCell>
                                    <TableCell>{admin.createdAt}</TableCell>
                                    <TableCell>
                                        <div className={cn(
                                            "font-bold w-fit text-nowrap px-5",
                                            isActive && "text-[#82be6d] bg-[#eafae5] flex items-center justify-center gap-[8.8px] h-[30px]  py-[0.88px] rounded-sm",
                                            isInactive && "text-[#ff0000] bg-[#fae5e5] flex items-center justify-center gap-[8.8px] h-[30px] py-[0.88px] rounded-sm",
                                        )}>
                                            {isActive ? "Actif" : "Inactif"}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

