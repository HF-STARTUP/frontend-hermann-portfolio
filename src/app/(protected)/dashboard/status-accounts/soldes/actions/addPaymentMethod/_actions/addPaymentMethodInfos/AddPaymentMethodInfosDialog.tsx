import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import DrawalModeModel from "@/model/drawal/Drawal";
import {AddDrawalInputs} from "@/types/drawal.types";
import {addDrawalSchema} from "@/schema/drawal.schema";
import {useAddDrawalMode} from "@/hooks/withdrawal/useWithdrawal";

export const AddPaymentMethodInfosDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    paymentMode: DrawalModeModel,
    isOpen: boolean,
    onClose: () => void
}> = ({children, paymentMode, onClose, isOpen}) => {

    const {handleAdddDrawalMode, data, isSuccess, loading} = useAddDrawalMode()

    const handleToggleDialog = () => {
        onClose()
    }

    const onSubmit: SubmitHandler<AddDrawalInputs> = (inputs) => {
        handleAdddDrawalMode({...inputs, vct_withdraw_id: paymentMode.id})
    }

    const {
        register,
        handleSubmit,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddDrawalInputs>({
        resolver: joiResolver(addDrawalSchema)
    })

    React.useEffect(() => {
        if (isSuccess && data) {
            onClose()
            resetForm()
        }
    }, [isSuccess, data])


    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase
                isSubDialog={false}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={handleToggleDialog}
                bgType={'whited'}>
                <form>
                    <AdminDialogHead
                        withBack={true}
                        title={paymentMode.name}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <TextField
                                size={'md'}
                                label={'Nom du moyen de retrait'}
                                required={true}
                                register={register('title')}
                                errors={errors}
                            />
                            <TextField
                                size={'md'}
                                label={'Numéro orange money'}
                                required={true}
                                register={register('phone_number')}
                                errors={errors}
                                inputType={"tel"}
                            />
                        </FormGroup>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            onClick={handleSubmit(onSubmit)}
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'button'}
                            loading={loading}
                            disabled={loading}
                            fullwidth={true}>Ajouter le moyen de retrait</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
