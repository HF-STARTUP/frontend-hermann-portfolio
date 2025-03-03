"use client"

import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import React from "react";
import ReceiptsUsers from "@/app/(protected)/dashboard/receipts/_components/receiptsUsers/ReceiptsUsers";
import ReceiptsContent from "@/app/(protected)/dashboard/receipts/_components/receiptsContent/ReceiptsContent";
import BtnBase from "@/components/elements/BtnBase";
import {DataTableActionBtnGroup} from "@/components/display/AdminTableDisplayData";
import Scafold from "@/components/box/Scafold";
import {DownloadIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import NewEncassDriverDialog from "@/app/(protected)/dashboard/receipts/actions/newEncaisDriver/newEncassDriverDialog";

export default function ReceiptsPage() {

    const [
        encaissementDialogIsOpen,
        setEncaissementDialogIsOpen
    ] = React.useState(false)


    return (
        <Scafold title={'Encaissements'}>
            <div>
                <AdminSubNav withUserSetting={false} endTitle={<DataTableActionBtnGroup>
                    <BtnBase
                        size={'sm'}
                        to={``}
                        color={"blue"}
                        shape={"square"}
                        onClick={() => setEncaissementDialogIsOpen(true)}
                    >
                        Encaisser un chauffeur
                    </BtnBase>
                    <BtnBase fit={true} size={'sm'} to={``} variant={"contained"} color={"emerald"}
                             shape={"square"} icon={<DownloadIcon width={20} height={20}/>}/>
                </DataTableActionBtnGroup>}/>
                <div className={`grid grid-cols-12 gap-[9px]`}>
                    <div className={`col-span-3`}>
                        <ReceiptsUsers/>
                    </div>
                    <div className={`col-span-9`}>
                        <ReceiptsContent/>
                    </div>
                </div>
            </div>
            <>
                <NewEncassDriverDialog
                    isOpen={encaissementDialogIsOpen}
                    onClose={() => setEncaissementDialogIsOpen(false)}
                />
            </>
        </Scafold>
    )
}
