"use client"

import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { DialogMainBody } from "./DialogMainBody"

export interface NotificationBandContent {
    label?: string;
    details?: string;
}

export type BandVariant = 'warning' | 'success' | 'error'

export const getBandVariantClasses = (variant?: BandVariant): string => {
    switch (variant) {
        case 'error':
            return "text-vaRed border-vaRed/20 bg-vaRed/10"

        case 'success':
            return "text-vaGreen border-vaGreen/20 bg-vaDarkGreen"
        case 'warning':
            return "text-vaOrange border-vaOrange/20 bg-vaOrange/10"

        default:
            return "text-vaOrange border-vaOrange/20 bg-vaOrange/10"
    }
}

const NotificationBand = ({ dialogTitle, children, content, variant }: { dialogTitle: ReactNode, children: ReactNode, content: NotificationBandContent, variant: BandVariant }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    return (
        <div>
            <div className={cn("rounded-2xl w-full p-4 flex items-center justify-between border gap-4 mb-5", getBandVariantClasses(variant))}>
                {/* Ajout de min-w-0 pour permettre au conteneur de rétrécir et au texte de tronquer */}
                <div className="flex flex-col gap-1 flex-grow min-w-0">
                    <p className="font-medium truncate" title={content.label}>
                        {content.label}
                    </p>
                    <p className="font-normal truncate text-sm opacity-90" title={content.details}>
                        {content.details}
                    </p>
                </div>

                <Button
                    variant={'mainBlueOutline'}
                    onClick={() => setIsOpened(true)}
                >
                    Voir les détails
                </Button>
            </div>

            <Dialog open={isOpened} onOpenChange={setIsOpened}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogTitle}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogMainBody>
                        {children}
                    </DialogMainBody>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NotificationBand