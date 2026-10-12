"use client"

import React, { useEffect, useState } from "react";
import DialogBase, { DialogActions, DialogContentText } from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import { useRouter } from 'next/navigation'
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import notify from "@/utils/func/notification";
import { useCheckTransactionStatus } from "@/hooks/subscription/useSubscription";
import { CircularProgress } from "@/components/ui/Loader";
import { TransactionStatusType } from "@/services/suscription/SubscriptionService";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogMainBody } from "../display/DialogMainBody";
import { DialogFooter } from "../display/DialogFooter";

interface SignOutProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
}

const SignOutAction: React.FC<SignOutProps> = ({ children, isOpen, onClose }) => {
    const [signingOut, setSigningOut] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        setSigningOut(true);
        try {
            await AuthManagerGuard.logoutToApp();
            notify('Déconnexion réussie !', 'success');
        } catch (error) {
            notify('Erreur lors de la déconnexion', 'error');
        } finally {
            setSigningOut(false);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogMainBody>
                    <div className="text-lg text-vaTextPrimary py-4 text-center">
                        Vous êtes sur le point de vous déconnecter de VTCADMIN, vos données seront restituées à votre
                        prochaine connexion.
                    </div>
                </DialogMainBody>
                <DialogFooter className="grid grid-cols-2 gap-8">
                    <Button onClick={onClose} loading={signingOut} variant={'outline'} fullWidth>
                        Annuler
                    </Button>
                    <Button
                        loading={signingOut}
                        onClick={handleSignOut}
                        variant={'orange'}
                        fullWidth
                    >
                        Déconnexion
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export const CheckTransactionStatusDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
}> = ({ children, defaultOpen = false, ...props }) => {

    const [withVerification, setWithVerification] = useState(false);
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [transactionID, setTransactionID] = useState<string | undefined>();
    const [poulCount, setPoulCount] = useState(1);
    const [isCancel, setIsCancel] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)

    const $router = useRouter();
    const { data, isLoading } = useCheckTransactionStatus(transactionID as string, poulCount);

    useEffect(() => {
        const transactionID = AuthManagerGuard?.getTransactionID;
        if (transactionID) {
            setTransactionID(transactionID);
            if (withVerification) setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [])

    useEffect(() => {
        if (data) {
            switch (data.status) {
                case TransactionStatusType.pending:
                    break
                case TransactionStatusType.success:
                    AuthManagerGuard.removeTransactionID()
                    setIsSuccess(true)
                    break
                default:
                    setIsCancel(true)
                    break
            }
        }
    }, [data])

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
        setIsOpen(!isOpen);
        $router.refresh()
    }

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={() => setIsOpen(true)} bgType={'whited'}>
                <DialogContentText>
                    <div className={"flex items-center justify-center flex-col gap-[50px] py-[50px]"}>
                        {!isCancel && <CircularProgress />}
                        <div className={"text-[18px] font-semibold text-center max-w-[300px]"}>
                            {!isSuccess && !isCancel &&
                                <span>Vérification de votre abonnement en cours...</span>}
                            {isSuccess && <span>Votre abonnement à été activer avec success</span>}
                            {isCancel && <span>Abonnement innactif</span>}
                        </div>
                        {isSuccess && (
                            <BtnBase
                                onClick={() => toggleModal()} shape={'square'}
                                to={''}
                                variant={'contained'}
                                color={'blue'}
                                fullwidth={true}
                            >Continuer</BtnBase>
                        )}
                    </div>
                </DialogContentText>
            </DialogBase>
        </div>
    )
}


export default SignOutAction
