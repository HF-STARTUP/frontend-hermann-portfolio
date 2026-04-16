'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import BtnBase from "@/components/elements/BtnBase"
import { DialogMainBody } from "../display/DialogMainBody"
import { Button } from "../ui/button"

interface ConfirmationDialogProps {
    onConfirm: () => void
    title: string
    subtitle: string
    triggerText?: string
    open: boolean
    setOpen: (open: boolean) => void
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
            <DialogContent className="p-4">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    <p className={"font-normal text-center text-[20px] text-[#506D82] tracking-[-2%]"}>
                        {subtitle}
                    </p>
                </DialogMainBody>
                <DialogFooter>
                    <div className={"grid grid-cols-2 gap-8 w-full"}>
                        <Button
                            variant={'outline'}
                            color={'blue'}
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </Button>

                        <Button
                            onClick={handleConfirm}
                            variant={'mainBlue'}
                        >
                            {triggerText}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}