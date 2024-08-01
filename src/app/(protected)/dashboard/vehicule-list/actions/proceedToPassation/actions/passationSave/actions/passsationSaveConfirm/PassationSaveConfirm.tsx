import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import {ImageUploadField, ImageUploadFieldGroup} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {DefaultPassationUser, DefaultPassationUserGroup} from "@/components/uiHelper/passationUtils/PassationUtils";
import {EvaluateHero, EvaluateHeroContainer} from "@/components/typo/typo";
import {LoadingDialog} from "@/app/(protected)/dashboard/_components/globalActions/loadingDialog/LoadingDialog";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";

export const PassationSaveConfirm: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [loadingDialogIsOpen, setLoadingDialogIsOpen] = React.useState(false)
    const [successDialogIsOpen, setSuccessDialogIsOpen] = React.useState(false)

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const handleToggleLoadingDialog = () => {
        setLoadingDialogIsOpen(!loadingDialogIsOpen)
    }

    const handleToggleSuccessDialog = () => {
        setSuccessDialogIsOpen(!successDialogIsOpen)
    }

    const openLoadingDialog = () => {
        setLoadingDialogIsOpen(true)
        const timer = setTimeout(() => {
            setLoadingDialogIsOpen(false)
            setSuccessDialogIsOpen(true)
            clearTimeout(timer)
        }, 2000)
    }

    return (
        <div>
            <>
                <LoadingDialog handleToggleDialog={handleToggleLoadingDialog} isOpen={loadingDialogIsOpen}/>
                <SimpleSuccessDialogWithContent
                    title={'Passation effectuée avec succès!'}
                    handleToggleDialog={handleToggleSuccessDialog}
                    isOpen={successDialogIsOpen}
                    image={'/assets/faker/default-car-1.png'}
                >
                    {/*<DefaultPassationUserGroup*/}
                    {/*    className={`mt-[20px] mb-[10px]`}*/}
                    {/*    firstChild={<DefaultPassationUser avatar={`/assets/faker/default-car-user.png`}*/}
                    {/*                                      name={'Takam Djeutcha Hervé'} badge={'Pro'}/>}*/}
                    {/*    hour={'12h'}*/}
                    {/*    secondChild={<DefaultPassationUser variant={'second'}*/}
                    {/*                                       avatar={`/assets/faker/default-car-user.png`}*/}
                    {/*                                       name={'Takam Djeutcha Hervé'} badge={'Intermédiaire'}/>}*/}
                    {/*/>*/}
                </SimpleSuccessDialogWithContent>
            </>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={true} title={'Confirmation de la passation'}
                                 handleToggle={handleToggleDialog}/>
                <DefaultPassationUserGroup
                    className={`mt-[20px] mb-[10px]`}
                    firstChild={<DefaultPassationUser avatar={`/assets/faker/default-car-user.png`}
                                                      name={'Takam Djeutcha Hervé'} badge={'Pro'}/>}
                    hour={'12h'}
                    secondChild={<DefaultPassationUser variant={'second'} avatar={`/assets/faker/default-car-user.png`}
                                                       name={'Takam Djeutcha Hervé'} badge={'Intermédiaire'}/>}
                />
                <DefaultDialogMainBody ctx={'dialogMin'} className={`mt-[20px]`}>
                    <FormGroup adminForm={true}>

                        <EvaluateHeroContainer
                            firstChild={<EvaluateHero label={'Recette du jour '} value={'11,000 XAF'}/>}
                            secondChild={<EvaluateHero label={'Reste à verser  '} value={'1,500 XAF'}
                                                       variant={'red'}/>}
                        />

                        <EvaluateHeroContainer
                            firstChild={<EvaluateHero label={'Kilométrage enregistré '} value={'891 Km'}/>}
                            secondChild={<EvaluateHero label={'Prochaine vidange dans: '} value={'349 Km'}
                                                       variant={'secondary'}/>}
                        />

                        <ImageUploadFieldGroup
                            label={`Photos du véhicule`}
                            multiple={false}
                            //handleChange={handleFileChange}
                        />

                        <div
                            className={`flex flex-col gap-[10px] font-normal text-[14px] leading-[17px] tracking-[-2%] text-text-body`}>
                            <h4 className={`text-[17px] text-admin-primary`}>Informations complementaires</h4>
                            <p className={``}>Vitre légèrement fissurée, roue droite avant presque à plat, le chauffeur
                                dit que c’est un problème d’air</p>
                            <h4 className={`text-[17px] text-admin-primary`}>Panne constatée</h4>
                            <p className={``}>Pot de phare brisé</p>
                        </div>
                    </FormGroup>
                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase onClick={openLoadingDialog} to={''} color={'blue'} variant={'contained'} shape={'square'}
                             fullwidth={true}>Confirmez avec le receveur</BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
