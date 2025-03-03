"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage, DialogSuccessContent} from "@/components/dialog/DialogContentUtils";
import BtnBase from "@/components/elements/BtnBase";
import {
    ScheduleTroubleshotRepair
} from "@/app/(protected)/dashboard/vehicule-list/actions/proceedToPassation/actions/passationSave/actions/scheduleTroubleshotReppair/ScheduleTroubleshotRepair";
import {DrainProgramming} from "@/app/(protected)/dashboard/maintenance/actions/drainProgramming/DrainProgramming";
import {useGetRepairTypes} from "@/hooks/entretien/useEntretien";
import Loading from "@/components/ui/Loader";
import useEntretienStore from "@/stores/protected/dashboard/entretien/useEntretienStore";
import {ENTRETIEN_REPAIR_TYPE} from "@/types/entretien.types";

export const PlanifyCarMaintenance: React.FC<{
    isOpen: boolean,
    handleToggleDialog: () => void
} & React.HTMLAttributes<HTMLDivElement>
> = ({children, handleToggleDialog, isOpen}) => {

    const {data: repairTypes, isLoading} = useGetRepairTypes()
    const {entretien, setActiveMaintence} = useEntretienStore()

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={'Planifier un entretien du vehicule'}
                                 handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={`/assets/faker/faker_planify.png`}/>
                <DialogSuccessContent className={`mt-[80px]`}>
                </DialogSuccessContent>
                {isLoading&&<Loading />}
                {!isLoading&&<DialogActions className={`pt-[15px]`}>
                    {repairTypes?.map((_type, i)=>(
                        <DrainProgramming repairType={_type} key={i}>
                            <BtnBase
                                onClick={()=>{setActiveMaintence(_type.id, _type)}}
                                color={'blue'}
                                variant={'contained'}
                                fullwidth={true}
                                shape={'square'}
                                to={''}
                            >
                                {_type.name}
                            </BtnBase>
                        </DrainProgramming>
                    ))}
                </DialogActions>}
            </DialogBase>
        </div>
    )
}
