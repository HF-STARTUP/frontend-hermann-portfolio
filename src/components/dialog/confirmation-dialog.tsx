'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import BtnBase from "@/components/elements/BtnBase";

interface ConfirmationDialogProps {
    onConfirm: () => void;
    title: string;
    subtitle: string;
    triggerText?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ConfirmationDialog({
                                               onConfirm,
                                               title,
                                               subtitle,
                                               triggerText = "Supprimer",
                                               open,
                                               setOpen
                                           }: ConfirmationDialogProps) {

    const handleConfirm = () => {
        onConfirm()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className={"font-normal text-center text-[20px] text-[#506D82] tracking-[-2%]"}>
                        {subtitle}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className={"flex flex-col gap-2 w-full mt-2"}>
                        <BtnBase
                            shape={'square'}
                            to={''}
                            variant={'contained'}
                            color={'blue'}
                            fullwidth={true}
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </BtnBase>

                        <BtnBase
                            onClick={handleConfirm}
                            shape={'square'}
                            to={''}
                            variant={'contained'}
                            color={'yellow'}
                            fullwidth={true}
                            fontWeight={"bold"}
                        >
                            {triggerText}
                        </BtnBase>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}