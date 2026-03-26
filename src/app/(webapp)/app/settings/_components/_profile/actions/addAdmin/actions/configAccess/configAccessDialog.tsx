"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {PlaceFieldInput} from "@/components/form/PlacField";
import {CourseAddress} from "@/schema/course.schema";
import notify from "@/utils/func/notification";
import useClientStore from "@/app/(protected)/dashboard/clients/store/useAddClientStore";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {CheckStatusIcon, UncheckStatusIcon} from "@/components/ui/__icons";
import {useGetAdminAccess} from "@/hooks/admin/useSettingsHook";
import {RoleType} from "@/services/admin/settings/settingsService";
import Loading from "@/components/ui/Loader";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export const ConfigAccessDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                       children,
                                                                                       ...props
                                                                                   }) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [place, setPlace] = React.useState("")
    const [address, setAddress] = React.useState<CourseAddress>()
    const {setAddress: setNewAddress} = useClientStore()


    const onAddAddress = () => {
        if (!place || !address) {
            notify("Veuillez fournir les informations demandées", "error")
            return
        }

        setNewAddress({...address, description: place})
        setAddress(undefined)
        setPlace("")
        setIsOpen(false)
    }

    return (
        <div {...props}>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={() => setIsOpen(false)}
                        bgType={'whited'}>
                <AdminDialogHead
                    withBack={true}
                    title={"Configurez les accès"}
                    handleToggle={() => setIsOpen(false) as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <div
                        className="text-[#506D82] text-sm font-bold font-['DM Sans'] leading-normal mb-[20px]">Autoriser
                        l’accès aux onglets
                    </div>



                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}><BtnBase
                    color={'blue'}
                    variant={'contained'}
                    type={'button'}
                    fullwidth={true}
                    shape={'square'}
                    onClick={onAddAddress}
                    to={''}
                >
                    Confirmer
                </BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
