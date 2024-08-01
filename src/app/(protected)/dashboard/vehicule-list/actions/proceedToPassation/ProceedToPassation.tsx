import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import BtnBase from "@/components/elements/BtnBase";
import {DefaultPassationUser, DefaultPassationUserGroup} from "@/components/uiHelper/passationUtils/PassationUtils";
import {
    PassationSave
} from "@/app/(protected)/dashboard/vehicule-list/actions/proceedToPassation/actions/passationSave/PassationSave";
import {useMakePassationTransfert} from "@/hooks/vehicule/useVehicule";
import ChangeDriverReceiver
    from "@/app/(protected)/dashboard/vehicule-list/actions/changeDriverReceiver/ChangeDriverReceiver";
import Driver from "@/model/driver/Driver";
import Vehicule from "@/model/vehicule/Vehicule";

export const ProceedToPassation: React.FC<{

    image: string,
    isOpen: boolean,
    vehicule: Vehicule,
    handleToggleDialog: () => void
} & React.HTMLAttributes<HTMLDivElement>> = ({image, isOpen, handleToggleDialog, vehicule}) => {
    const [changeDialogReceiverIsOpen, setChangeDialogReceiverIsOpen] = React.useState(false)


    const {} = useMakePassationTransfert()

    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={vehicule.getBrandWithColor} subTitle={vehicule.getRegistration}
                                 handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={vehicule.getCover} withSuccess={false}/>
                <DefaultPassationUserGroup
                    className={`mt-[20px]`}
                    firstChild={
                    vehicule.hasPrincipalDriver && <DefaultPassationUser
                        avatar={vehicule.getPrincipalDriverDisplayAvatar ?? ''}
                        name={vehicule.getPrincipalDriverDisplayName}
                        badge={vehicule.getPrincipalDriverGrade}/>
                }
                    hour={'12h'}
                    secondChild={
                    vehicule.hasSecondaryDriver&&<DefaultPassationUser
                        variant={'second'}
                        avatar={`/assets/faker/default-car-user.png`}
                        name={'Takam Djeutcha Hervé'}
                        badge={'Intermédiaire'}/>
                }
                />
                <DialogActions className={`pt-[20px]`}>
                    <PassationSave>
                        <BtnBase
                            fullwidth={true}
                            to={''}
                            shape={'square'}
                            variant={'contained'}
                            color={'blue'}>
                            Procéder à la passation
                        </BtnBase>
                    </PassationSave>
                    <BtnBase
                        fullwidth={true}
                        to={''}
                        shape={'square'}
                        fontWeight={'bold'}
                        variant={'contained'}
                        onClick={()=>setChangeDialogReceiverIsOpen(false)}
                        color={'yellow'}>
                        Changer le chauffeur receveur
                    </BtnBase>
                </DialogActions>
            </DialogBase>
            <>
                <ChangeDriverReceiver isOpen={changeDialogReceiverIsOpen} onClose={()=>setChangeDialogReceiverIsOpen(false)}/>
            </>
        </div>
    )
}
