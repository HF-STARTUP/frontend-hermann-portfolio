import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ACCOUNTING_TYPE} from "@/types/Accounting.types";
import {CreateAccountingOrSubAccountingInput, createAccountingSchema} from "@/schema/accounting.schema";
import {useCreatePnlCategory, useGetPnlAccounts} from "@/hooks/acounting/useAcounting";
import {Input} from "@/components/ui/input";

export const CreateAccountingOrSubAccounting: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "subpnl"
}> = ({children, variant = "default"}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const isSubPnl = variant === "subpnl"

    const {data: pnlDatas, isLoading: loadingPnlCtg} = useGetPnlAccounts()

    const {
        data,
        onCreatePnlCtg,
        isSuccess,
        loading
    } = useCreatePnlCategory()

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const onSubmit: SubmitHandler<CreateAccountingOrSubAccountingInput> = (inputs) => {
        setIsLoading(true)
        onCreatePnlCtg(inputs)
    }

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        reset: resetForm,
        formState: {errors},
        setValue,
    } = useForm<CreateAccountingOrSubAccountingInput>({
        resolver: joiResolver(createAccountingSchema)
    })


    React.useEffect(() => {
        if (isSuccess) {
            handleToggleDialog()
            resetForm()
            setIsLoading(false)
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
                        title={isSubPnl ? "Ajoutez un sous-compte" : "Ajoutez un compte"}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <div>
                                <div className="text-[#506D82] text-lg font-bold leading-normal mb-2">
                                    Déterminez le type
                                </div>
                                <RadioGroup
                                    defaultValue={ACCOUNTING_TYPE.PROFIT}
                                    {...register("type")}
                                    onValueChange={(v: ACCOUNTING_TYPE) => {
                                        console.log(v)
                                        setValue("type", v)
                                    }}
                                    className={"flex items-center gap-4"}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={ACCOUNTING_TYPE.PROFIT} id="r1"/>
                                        <label htmlFor="r1">Profit</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={ACCOUNTING_TYPE.PERTE} id="r2"/>
                                        <label htmlFor="r2">Perte</label>
                                    </div>
                                </RadioGroup>
                            </div>
                            {isSubPnl && <div>
                                {pnlDatas && <Input
                                    as={"select"}
                                    {...register("account_id")}
                                    label={"Sélectionnez la catégorie"}
                                    options={pnlDatas.map(d => ({value: d.id, label: d.name}))}
                                />}
                            </div>}
                            <TextField
                                size={'md'}
                                label={'Saisir le nom du compte'}
                                required={true}
                                register={register('name')}
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
                            fullwidth={true}>{!isSubPnl ? "Ajouter le compte" : "Ajouter le sous-compte"}</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
