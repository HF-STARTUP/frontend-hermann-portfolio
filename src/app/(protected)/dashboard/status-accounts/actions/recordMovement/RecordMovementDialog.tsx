"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ACCOUNTING_TYPE} from "@/types/Accounting.types";
import {CreateFundMovementInput, createFundMovementSchema} from "@/schema/accounting.schema";
import {useCreateFundMovement, useGetPnlAccounts, useGetPnlSubAccounts} from "@/hooks/acounting/useAcounting";
import {Input} from "@/components/ui/input";

export const RecordMovementDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [defaultType, setDefaultType] = React.useState<ACCOUNTING_TYPE>(ACCOUNTING_TYPE.PROFIT)
    const [isOpen, setIsOpen] = React.useState(false)
    const [activeCtg, setActiveCtg] = React.useState("")

    const {
        data,
        onCreateFundMovement,
        isSuccess,
        loading
    } = useCreateFundMovement()

    const {data: pnlDatas, isLoading: loadingPnlCtg} = useGetPnlAccounts(defaultType)
    const {data: pnlSubDatas, isLoading: loadingSubPnlCtg} = useGetPnlSubAccounts(activeCtg)

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const onSubmit: SubmitHandler<CreateFundMovementInput> = ({sub_account_id, ...inputs}) => {
        onCreateFundMovement({
            ...inputs,
            sub_account_id: (sub_account_id === "Sélectionnez le sous-compte" || !sub_account_id?.length) ? undefined : sub_account_id
        })
    }

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        reset: resetForm,
        formState: {errors},
        setValue,
    } = useForm<CreateFundMovementInput>({
        resolver: joiResolver(createFundMovementSchema)
    })


    React.useEffect(() => {
        if (isSuccess) {
            handleToggleDialog()
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={true}
                        title={"Enregistrez un mouvement de fonds"}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <div>
                                <div className="text-[#506D82] text-lg font-bold leading-normal mb-2">
                                    Déterminer le type de mouvement
                                </div>
                                <RadioGroup
                                    defaultValue={ACCOUNTING_TYPE.PROFIT}
                                    onValueChange={(v: ACCOUNTING_TYPE) => {
                                        setDefaultType(v)
                                    }}
                                    className={"flex items-center gap-4"}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={ACCOUNTING_TYPE.PROFIT} id="r1"/>
                                        <label htmlFor="r1">Entrée de fonds</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={ACCOUNTING_TYPE.PERTE} id="r2"/>
                                        <label htmlFor="r2">Sortie de fonds</label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                {pnlDatas && <Input
                                    as={"select"}
                                    {...register("account_id")}
                                    label={"Sélectionnez le compte"}
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        setActiveCtg(e.currentTarget.value)
                                    }}
                                    options={pnlDatas.map(d => ({value: d.id, label: d.name}))}
                                />}
                            </div>

                            <div>
                                {pnlSubDatas && <Input
                                    as={"select"}
                                    {...register("sub_account_id")}
                                    label={"Sélectionnez le sous-compte"}
                                    options={pnlSubDatas.map(d => ({value: d.id, label: d.name}))}
                                />}
                            </div>

                            <TextField
                                size={'md'}
                                label={'Saisir le montant'}
                                inputType={"number"}
                                required={true}
                                register={register('amount')}
                                errors={errors}
                            />
                        </FormGroup>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'submit'}
                            loading={loading}
                            disabled={loading}
                            fullwidth={true}>Confirmer</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
