"use client"
import {CrownIcon} from "@/components/ui/__icons";
import * as React from "react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {cn} from "@/lib/utils";
import {
    useActiveSubscription,
    useGetActiveSubscriptionOnFleet,
    useSuspendSubscription
} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {AbonResponseModel} from "@/model/ADMIN/fleet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BtnBase from "@/components/elements/BtnBase";
import {getSubscriptionColors} from "@/utils/subscriptionColors";

export const ActiveAbonnSection = () => {

    const {data: activeSubscription, isLoading} = useGetActiveSubscriptionOnFleet()

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (activeSubscription) {

        const abon = activeSubscription.subscription
        const hasAbonnement = !!activeSubscription._instance.subscription

        return (
            <div className={"flex flex-col gap-[18px]  p-4 bg-white rounded-[20px]"}>
                <ABlockTitle>Abonnement en cours</ABlockTitle>
                <div className={"flex flex-col lg:flex-row gap-[46px]"}>
                    {hasAbonnement ? <AbonnTypeCard
                        title={abon.name}
                        subtitle={activeSubscription.abonResume}
                        action={<div className="text-white text-xs font-semibold">Expire
                            le {activeSubscription.endDate}</div>}
                        logoColor={"text-[#e89900]"}
                        className={"bg-gradient-to-r from-[#FF9900] via-[#ffcd6f] to-[#E89900]"}
                    /> : (<div
                        className={"h-[200px] w-full flex items-center justify-center"}>
                        <p className={"text-xl text-center text-vaTextPrimary font-medium"}>Aucun abonnement actif.</p>
                    </div>)}
                    {hasAbonnement && <ActiveAbonnDetails subs={activeSubscription}/>}
                </div>
            </div>
        )
    }
}

const ActiveAbonnDetails: React.FC<{ subs: AbonResponseModel }> = ({subs}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const {data, isSuccess, loading, onSuspendSubscription} = useSuspendSubscription()

    return (
        <div className={"flex flex-col gap-[16px] w-full"}>
            {[
                ["Type d'abonnement :", subs.subscription.name],
                ["Date de souscription :", subs.startDate]
            ].map((item, index) => (
                <div key={index} className={"flex justify-between items-center"}>
                    <div className="text-black w-full text-base font-normal font-['DM Sans'] leading-[25px]">
                        {item[0]}
                    </div>
                    <div>
                        <div className="text-[#506d82] text-base font-normal font-['DM Sans'] leading-[25px]">
                            {item[1]}
                        </div>
                    </div>
                </div>
            ))}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    {<button
                        className={cn(
                            "text-center text-[#e51d13] text-sm font-bold font-['DM Sans'] leading-3 px-5 py-[12px] bg-[#ffeae9] rounded-md w-fit hover:opacity-80 transition",
                            "cursor-pointer"
                        )}>
                        Résilier l'abonnement
                    </button>}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suspension de l'abonnement</DialogTitle>
                        <DialogDescription className={"pt-4"}>
                            Êtes-vous sûr de vouloir suspendre l'abonnement pour cette flotte de véhicules ?
                            Une fois suspendue, cette flotte sera inaccessible pour les réservations jusqu'à ce qu'un
                            nouvel abonnement soit souscrit ou que l'abonnement soit réactivé manuellement.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className={`mt-[20px] w-full flex flex-col gap-2`}>

                            <BtnBase
                                onClick={() => setIsOpen(false)}
                                shape={'square'}
                                to={''}
                                variant={'contained'}
                                color={'blue'}
                                fullwidth={true}
                                className={"w-full"}
                                disabled={loading}
                            >
                                Annuler
                            </BtnBase>
                            <BtnBase
                                shape={'square'}
                                to={''}
                                variant={'contained'}
                                fontWeight={'bold'}
                                color={'yellow'}
                                fullwidth={true}
                                className={"w-full"}
                                disabled={loading}
                                onClick={onSuspendSubscription}
                                loading={loading}
                            >
                                Suspendre l'abonnement
                            </BtnBase>

                        </div>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

        </div>
    )
}


type AbonnTypeCardProps = {
    id?: string,
    title: string,
    subtitle: string,
    action?: React.ReactNode,
    logoColor: string,
}

export const AbonnTypeCard: React.FC<React.HTMLAttributes<HTMLDivElement> & AbonnTypeCardProps> = ({
                                                                                                       id,
                                                                                                       title,
                                                                                                       subtitle,
                                                                                                       action,
                                                                                                       logoColor,
                                                                                                       className
                                                                                                   }) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false)


    const {data, onActiveSubscription, loading} = useActiveSubscription()

    const handleActiveSubscription = () => {
        id && onActiveSubscription(id)
    }


    React.useEffect(() => {
        if (loading && data) {
            setIsOpen(false)
        }
    }, [data, loading])

    // Utiliser le système de couleurs centralisé si aucune couleur n'est fournie
    const colors = getSubscriptionColors(title);
    const finalTextColor = logoColor || colors.textColor;
    const finalBgColor = className || colors.bgColor;

    return (

        <div
            className={
                cn(
                    "px-[17px] py-[18px] bg-[#ffd37f] rounded-lg min-w-[302px]",
                    finalBgColor,
                )}
        >
            <div className={"flex flex-col gap-[15px]"}>
                <div className={"flex justify-between"}>
                    <div
                        className={"size-[42px] bg-white flex justify-center items-center rounded-full text-[#E89900]"}>
                        <CrownIcon className={cn(
                            "self-center",
                            finalTextColor
                        )}
                                   width={25}
                                   height={25}
                        />
                    </div>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <div>
                                {!loading && <div>{action}</div>}
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Activer le pack <span className={""}>"{title}"</span> pour cette flotte de
                                    véhicules</DialogTitle>
                                <DialogDescription className={"pt-4"}>
                                    Êtes-vous sûr de vouloir activer ce pack pour la flotte sélectionnée ? Une fois
                                    activé, le pack sera immédiatement appliqué à l'ensemble des véhicules de cette
                                    flotte.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <div className={`mt-[20px] w-full flex flex-col gap-2`}>
                                    <BtnBase
                                        onClick={() => setIsOpen(false)}
                                        shape={'square'}
                                        to={''}
                                        variant={'contained'}
                                        color={'blue'}
                                        fullwidth={true}
                                        className={"w-full"}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </BtnBase>
                                    <BtnBase
                                        shape={'square'}
                                        to={''}
                                        variant={'contained'}
                                        fontWeight={'bold'}
                                        color={'yellow'}
                                        fullwidth={true}
                                        className={"w-full"}
                                        disabled={loading}
                                        onClick={handleActiveSubscription}
                                        loading={loading}
                                    >
                                        Activer l'abonnement
                                    </BtnBase>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {loading &&
                        <span className={"text-white font-medium text-[12px]"}>Activation...</span>
                    }
                </div>
                <div>
                    <div className="text-white text-lg font-bold  tracking-wider">{title}</div>
                    <div className="text-white text-sm font-bold font-['DM Sans']">{subtitle}</div>
                </div>
            </div>
        </div>
    )
}
