"use client"
import React, {useEffect, useId, useState} from "react";
import DialogBase, {DialogContent, DialogHead} from "@/components/dialog/Dialog";
import Image from "next/image";
import key from "@/assets/img/icons/key.png"
import {Divider} from "@/components/box/Card";
import BtnBase from "@/components/elements/BtnBase";
import PaymentMethodsSelect
    from "@/app/(main)/tarif/payment-validation/[packID]/components/BuyFormDialog/components/PaymentMethodsSelect";
import {useCheckTransactionStatus, useGetOperators, useInitSubscription} from "@/hooks/subscription/useSubscription";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import VImageProvider from "@/components/helpers/VImageProvider";
import Loading, {CircularProgress} from "@/components/ui/Loader";
import {imageBaseUrl} from "@/model/Model";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ScrollArea} from "@/components/ui/scroll-area";
import {OperatorResponseType} from "@/types/subscription.types";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import notify from "@/utils/func/notification";
import {formatNumberWithCommas} from "@/app/(main)/tarif/components/tarifPayConfirmDialog/TarifPayConfirmDialog";
import {useGetMyPosition} from "@/hooks/__globlal/useGlobalHook";
import {CheckTransactionStatusDialog} from "@/components/actions/Signout.action";
import {TransactionStatusType} from "@/services/suscription/SubscriptionService";
import {useRouter} from "next/navigation";

type BuyFormDialogProps = {
    children: React.ReactNode,
} & React.HTMLAttributes<HTMLDivElement>

const BuyFormDialog: React.FC<BuyFormDialogProps & {
    vehicle_number: number,
    subscription_type: string,
    subscription_id: string,
    total: number
}> = ({
          children,
          vehicle_number,
          total,
          subscription_type,
          subscription_id,
          ...props
      }) => {

    const [checking, setChecking] = React.useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const [isCreditCard, setIsCreditCard] = useState(true)
    const [payMethod, setPayMethod] = useState("credit_card")
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [creditCardOperator, setCreditCardOperator] = useState<OperatorResponseType>()
    const [defaultMobileOperator, setDefaultMobileOperator] = useState<OperatorResponseType>()
    const [isOM, setIsOM] = React.useState(false)
    const [checkDialogIsOpen, setCheckDialogIsOpen] = React.useState(false)

    const [transactionID, setTransactionID] = React.useState<string>()
    const [poulCount, setPoulCount] = React.useState<number>(1)

    const {data: operators, isLoading} = useGetOperators()
    const {data: myposition} = useGetMyPosition()
    const {
        data: transactionResult,
        isLoading: transactionLoading
    } = useCheckTransactionStatus(transactionID as string, poulCount);

    const $router = useRouter()

    useEffect(() => {
        if (transactionResult) {
            switch (transactionResult?.status) {
                case TransactionStatusType.pending:
                    break
                case TransactionStatusType.success:
                    AuthManagerGuard.removeTransactionID()
                    notify("Transaction effectuée")
                    $router.push("/dashboard/resume")
                    break
                default:
                    setChecking(false)
                    notify("Erreur survenus lors de la transaction", "error")
                    break
            }
        }
    }, [transactionResult])

    useEffect(() => {
        const timer = setInterval(() => {
            setPoulCount(prevCount => prevCount + 1);
            const transactionIDExist = AuthManagerGuard.getTransactionID;
            if (transactionIDExist) {
                console.log(`Transaction id exist: ${poulCount}`);
            } else {
                clearInterval(timer);
            }
        }, 4000);

        return () => clearInterval(timer);
    }, [transactionID])

    function toggleModal() {
        setIsOpen(!isOpen)
    }

    const {data, handleMutation, loading: subscription} = useInitSubscription()

    React.useEffect(() => {
        if (operators && operators.length) {
            const credit_card_operator = operators.find(op => op.type === "credit_card")
            const default_mobile_operaor = operators.find(op => op.type === "mobile_money")

            if (payMethod) {
                const selectedOperator = operators.find(op => op.id == payMethod)
                setIsOM(selectedOperator?.name === "orange")
            }

            setCreditCardOperator(credit_card_operator)
            setDefaultMobileOperator(default_mobile_operaor)
        }
    }, [operators, payMethod])


    React.useEffect(() => {
        if (!subscription && data) {
            if (data.status !== "Failed") {
                AuthManagerGuard.storeTransactionID(data.transaction_id)
                //setCheckDialogIsOpen(true)
                setTransactionID(data.transaction_id)
                if (isCreditCard) {
                    window.location = data.payment_url as unknown as Location
                } else {
                    setChecking(true)
                }

            } else {
                notify("Erreur lors de l'initisalisation de votre paiement", "error")
            }
        }
    }, [data, subscription])

    const handlePay = () => {

        if (!isCreditCard) {
            if (!phone && phone.length < 5) {
                notify("Numéro de téléphone invalide", "error")
                return
            }

            if (isOM && code.length < 1) {
                notify("Entrez le code", "error")
            }
        }

        if (operators) {
            const selectedOperator = operators.find(op => op.id == payMethod)

            //{myposition?.country_calling_code}
            handleMutation(
                {
                    vehicle_number: vehicle_number,
                    subscription_id: subscription_id,
                    country_iso_code: myposition ? myposition.country_code : "ci",
                    subscription_plan: subscription_type,
                    payment_method: isCreditCard ? creditCardOperator?.type : selectedOperator?.type,
                    operator_id: isCreditCard ? creditCardOperator?.id : selectedOperator?.id,
                    phone: isCreditCard ? undefined : `${myposition?.country_calling_code}${phone}`,
                    otp: !isOM ? undefined : code
                }
            )
        }
    }

    const handleProceed = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        AuthManagerGuard.removeTransactionID()
        handlePay()
        //toggleModal()
        // nextDialogRef.current.click()
        // logger.log(nextDialogRef.current)
    }


    return (
        <div {...props}>
            <div onClick={toggleModal}>{children}</div>
            <DialogBase variant={'lg'} isOpenned={isOpen} onClose={toggleModal}>
                <DialogHead handleToggle={toggleModal} title={'Méthode de paiement'}/>
                <DialogContent>
                    {checking && <div className={"flex flex-col gap-4"}>
                        <CircularProgress/>
                        <h3 className={"text-[2a2a2a]"}>Validation de votre abonnment en cour...</h3>
                    </div>}
                    {!checking && <div className={""}>
                        <ScrollArea className={"h-[400px]"}>
                            <div className={"px-4"}>
                                <div className={`justify-center items-start gap-[5px] inline-flex`}>
                                    <Image src={key} width={20} alt={'key icon'}/>
                                    <p className="text-black text-sm font-medium leading-snug">VTC Control ne stockera
                                        pas
                                        les
                                        informations de votre carte bancaire. Toutes les transactions sont sécurisées,
                                        traitées
                                        et autorisées par des prestataires de paiement externes</p>
                                </div>
                                <PaymentMethodsSelect onMethodChange={(m) => setIsCreditCard(m == "credit_card")}/>
                                <div className={`flex flex-col gap-[30px]`}>
                                    {!isCreditCard && <Divider/>}
                                    {!isCreditCard && <div>
                                        {isLoading && (
                                            <Loading/>
                                        )}

                                        <div className={"mb-4 text-[2a2a2a] text-[18px] font-semibold"}>Selectinner
                                            l'operateur:
                                        </div>
                                        <RadioGroup
                                            className={"flex flex-col gap-2"}
                                            onValueChange={setPayMethod}
                                            defaultValue={defaultMobileOperator?.id}
                                        >
                                            {operators && operators.length && operators.filter(op => op.type !== "credit_card").map(op => (
                                                <AbonPayModeSelect key={op.id} pay={{
                                                    id: op.id,
                                                    name: op.name,
                                                    type: op.id,
                                                    image: `${imageBaseUrl}/${op.image}`
                                                }}/>
                                            ))}
                                        </RadioGroup>
                                    </div>}
                                    {/*<div className={`flex flex-col gap-[18px]`}>*/}
                                    {/*    {*/}
                                    {/*        factureResume.map((resume) => (*/}
                                    {/*            <ResumeItem item={resume} key={resume.name}/>*/}
                                    {/*        ))*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </ScrollArea>
                        <div>
                            {!isCreditCard && <Divider/>}
                            <ResumeItem variant={'footer'}
                                        item={{name: 'Total', value: `${formatNumberWithCommas(total)} F`}}/>
                            {!isCreditCard && <div className={"py-4 flex flex-col gap-4 mb-5"}>
                                <div className={"grid grid-cols-12 gap-4"}>
                                    <div className={cn(
                                        isOM ? "col-span-8" : "col-span-12"
                                    )}>
                                        <Input
                                            fixedPhoneValue={myposition && myposition.country_calling_code}
                                            type={"tel"}
                                            placeholder={"Numéro de téléphone"}
                                            value={phone}
                                            onChange={e => setPhone(e.currentTarget.value)}
                                        />
                                    </div>
                                    {isOM && <div className={cn("col-span-4")}>
                                        <Input
                                            type={"number"}
                                            placeholder={"Code"}
                                            value={code}
                                            onChange={e => setCode(e.currentTarget.value)}
                                        />
                                    </div>}
                                </div>
                            </div>}
                            <div onClick={handleProceed}>
                                <BtnBase
                                    fullwidth={true}
                                    to={''}
                                    color={'black'}
                                    variant={'outline'}
                                    loading={subscription}
                                >Aller au paiement</BtnBase>
                            </div>
                            <CheckTransactionStatusDialog defaultOpen={checkDialogIsOpen}/>
                        </div>
                    </div>}
                </DialogContent>
            </DialogBase>
        </div>
    )
}

type ResumeItemProps = {
    name: string,
    value: string,
}
const ResumeItem: React.FC<{ item: ResumeItemProps, variant?: 'footer' | 'item' }> = ({item, variant}) => {

    const isFooter = variant === 'footer'

    return (
        <div className="justify-between flex">
            <div
                className={`text-black text-xl font-medium leading-[48.57px] ${isFooter && 'text-black text-[34px]'}`}>{item.name}</div>
            <div
                className={`text-black text-xl font-medium leading-[48.57px] ${isFooter && 'text-black text-[34px] text-blue-700'}`}>{item.value}</div>
        </div>
    )
}

export default BuyFormDialog

const AbonPayModeSelect: React.FC<{ pay: { id: string, name: string, image: string, type: string } }> = ({pay}) => {

    const _id = useId()

    return (

        <label
            htmlFor={_id}
            className={"pl-[15px] pr-[18px] py-3 bg-neutral-100 border border-transparent hover:border-neutral-500 rounded-xl border-gray-200 flex items-center justify-between"}>
            <div className={"flex items-center gap-[12px] justify-between"}>
                <RadioGroupItem value={pay.type} id={_id}/>
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
