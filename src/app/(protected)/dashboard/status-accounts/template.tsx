"use client"

import React from "react";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {
    AccountAfterTitleComponent
} from "@/app/(protected)/dashboard/status-accounts/_components/_UtilsComponents/UtilsComponent";
import {DataTableActionBtnGroup} from "@/components/display/AdminTableDisplayData";
import BtnBase from "@/components/elements/BtnBase";
import {DownloadIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {usePathname} from "next/navigation";
import {
    RecordMovementDialog
} from "@/app/(protected)/dashboard/status-accounts/actions/recordMovement/RecordMovementDialog";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const $pathname = usePathname()
    const isSoldePage = $pathname === "/dashboard/status-accounts/soldes"
    const isPnlPage = $pathname === "/dashboard/status-accounts/simplified"

    return (
        <div>
            <AdminSubNav
                title={`Etat des comptes`}
                withFilterSection={false}
                withUserSetting={false}
                afterTitle={<AccountAfterTitleComponent/>}
                endTitle={<DataTableActionBtnGroup>
                    <>
                        {!isSoldePage && <>
                            {isPnlPage &&
                                <RecordMovementDialog>
                                    <BtnBase size={'sm'} to={``} color={"blue"} shape={"square"}>Enregistrez un
                                        mouvement de fonds</BtnBase>
                                </RecordMovementDialog>}
                            <BtnBase fit={true} size={'sm'} to={``} variant={"contained"} color={"emerald"}
                                     shape={"square"} icon={<DownloadIcon width={20} height={20}/>}/>
                        </>}
                    </>
                </DataTableActionBtnGroup>}
            />
            <div>
                {children}
            </div>
        </div>
    )
}


export default Template
