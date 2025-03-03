"use client";

import React, {useId} from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import TextField from "@/components/form/TextField";
import {useGetMyDrawals, useGetWithdrawalMode, useRemoveMoney} from "@/hooks/withdrawal/useWithdrawal";
import DrawalModeModel, {PaymentInfoModel} from "@/model/drawal/Drawal";
import Loading from "@/components/ui/Loader";
import VImageProvider from "@/components/helpers/VImageProvider";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    AddPaymentMethodInfosDialog
} from "@/app/(protected)/dashboard/status-accounts/soldes/actions/addPaymentMethod/_actions/addPaymentMethodInfos/AddPaymentMethodInfosDialog";

export const PaymentMethodsDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    mode?: "remove" | "add"
}> = ({children, mode = "add"}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [finishIsOpen, setFinishIsOpen] = React.useState(false)

    const [activePayMode, setActivePayMode] = React.useState<DrawalModeModel>()
    const [activeRemoveMode, setActiveRemoveMode] = React.useState<PaymentInfoModel>()

    const [retraitAmount, setRetraitAmount] = React.useState<number>()

    const {data: modes, isLoading} = useGetWithdrawalMode()
    const {data: myDrawals, isLoading: loadingMyDrawals} = useGetMyDrawals()
    const {handleRemoveMoney, loading, data, isSuccess} = useRemoveMoney()

    const isRemove = mode === "remove"
    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    React.useEffect(() => {
        if (modes?.length) {
            setActivePayMode(modes[0])
        }
    }, [modes])

    React.useEffect(() => {
        if (myDrawals?.length) {
            setActiveRemoveMode(myDrawals[0])
        }
    }, [myDrawals])

    const onNext = () => {
        if(!isRemove){
            if (activePayMode) setFinishIsOpen(true)
            return;
        }

        console.log(`Prepare to bacting, ${retraitAmount}`)
        if(retraitAmount && activeRemoveMode){
            handleRemoveMoney({withdraw_on_park_id: activeRemoveMode?.id, amount: retraitAmount})
        }
    }

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
                        title={isRemove ? "Retirer des fonds" : "Ajouter un moyen de retrait"}
                        handleToggle={handleToggleDialog}
                    />
                    <div>
                        <TransactionTitle/>
                        {!isRemove&&<RadioGroup
                            defaultValue={activePayMode?.id}
                            onValueChange={(v) => {
                                const mode = modes?.find(m => m.id === v)
                                if (mode) setActivePayMode(mode)
                            }}
                        >
                            <MetthodList/>
                        </RadioGroup>}

                        {isRemove&&<RadioGroup
                            defaultValue={activeRemoveMode?.id}
                            onValueChange={(v) => {
                                const mode = modes?.find(m => m.id === v)
                                if (mode) setActivePayMode(mode)
                            }}
                        >
                            <MetthodList2 />
                        </RadioGroup>}

                    </div>
                    <DialogActions className={`pt-[1px]`}>
                        <div className={"py-[18px]"}>
                            {/*<div*/}
                            {/*    className="w-[343px] text-black/opacity-20 text-sm font-normal mb leading-normal">Saisir*/}
                            {/*    le montant à retirer*/}
                            {/*</div>*/}
                            {isRemove && <TextField
                                size={'md'}
                                value={retraitAmount}
                                onChange={(e)=>setRetraitAmount(+e.currentTarget.value)}
                                placeholder={'15,000'}
                                inputType={"number"}
                            />}
                        </div>
                        <BtnBase
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'button'}
                            onClick={onNext}
                            loading={loading}
                            fullwidth={true}>Suivant</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>

            {activePayMode && <AddPaymentMethodInfosDialog
                paymentMode={activePayMode}
                isOpen={finishIsOpen}
                onClose={() => setFinishIsOpen(false)}
            />}
        </div>
    )
}

const TransactionTitle = () => {

    return (
        <div className="text-[#506D82] text-xl font-bold leading-normal mb-4">Sélectionnez le moyen de retrait</div>
    )
}

const MetthodList = () => {

    const {data: modes, isLoading} = useGetWithdrawalMode()

    if (isLoading) {

        return (
            <Loading/>
        )
    }

    if (modes?.length) {
        return (
            <ScrollArea className={"max-h-[400px]"}>
                <div className={"flex flex-col gap-2"}>
                    {modes.map((p, i) => (
                        <PayModeSelect
                            pay={p}
                            key={i}
                        />
                    ))}
                </div>
            </ScrollArea>
        )
    }
}

const PayModeSelect: React.FC<{ pay: DrawalModeModel }> = ({pay}) => {

    const _id = useId()

    return (

        <label htmlFor={pay.id}
               className={"pl-[15px] pr-[18px] py-3 bg-neutral-100 border border-transparent hover:border-neutral-500 rounded-xl border-gray-200 flex items-center justify-between"}>
            <div className={"flex items-center gap-[12px] justify-between"}>
                <RadioGroupItem value={pay.id}/>
                <div className="text-black text-sm font-normal font-vInter leading-none">{pay.name}</div>
            </div>
            <div>
                <VImageProvider
                    src={pay.image}
                    alt={pay.name}
                    width={24}
                    height={24}
                    className={"rounded-sm"}
                />
            </div>
        </label>
    )
}



const MetthodList2 = () => {

    const {data: modes, isLoading} = useGetMyDrawals()

    if (isLoading) {

        return (
            <Loading/>
        )
    }

    if (modes?.length) {
        return (
            <ScrollArea className={"max-h-[400px]"}>
                <div className={"flex flex-col gap-2"}>
                    {modes.map((p, i) => (
                        <PayModeSelect2
                            pay={p}
                            key={i}
                        />
                    ))}
                </div>
            </ScrollArea>
        )
    }
}

const PayModeSelect2: React.FC<{ pay: PaymentInfoModel }> = ({pay}) => {

    const _id = useId()

    return (

        <label htmlFor={pay.id}
               className={"pl-[15px] pr-[18px] py-3 bg-neutral-100 border border-transparent hover:border-neutral-500 rounded-xl border-gray-200 flex items-center justify-between"}>
            <div className={"flex items-center gap-[12px] justify-between"}>
                <RadioGroupItem value={pay.id}/>
                <div className="text-black text-sm font-normal font-vInter leading-none">{pay.title}</div>
            </div>
            <div>
                <VImageProvider
                    src={pay.withdrawalInfo.image}
                    alt={pay.title}
                    width={24}
                    height={24}
                    className={"rounded-sm"}
                />
            </div>
        </label>
    )
}