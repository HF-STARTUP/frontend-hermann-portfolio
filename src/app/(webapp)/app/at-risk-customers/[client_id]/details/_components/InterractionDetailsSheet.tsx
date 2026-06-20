import Badge from "@/components/display/Badge"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Button } from "@/components/ui/button"
import Loading from "@/components/ui/Loader"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useGetARCInteractionDetail } from "@/hooks/at-risk-customers/useAtRiskCustomers"
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import { cn } from "@/lib/utils"
import { Dot, MapPin, X } from "lucide-react"
import Image from "next/image"
import { PiMegaphone } from "react-icons/pi"

export const InterractionDetailsSheet = ({ isOpenned, onClose, interactionId, parkId }: { isOpenned: boolean, onClose: () => void, interactionId: string, parkId: string }) => {

    const { interaction, isLoading } = useGetARCInteractionDetail({
        park_id: parkId,
        interraction_id: interactionId
    })

    return (
        <Sheet open={isOpenned} onOpenChange={() => onClose()}>
            <SheetContent variant={"xl"}>
                <SheetHeader>
                    <div className="flex items-start justify-between">
                        <SheetTitle className="w-fit">
                            Détails de l’interaction
                        </SheetTitle>
                        <Button onClick={onClose} variant={"ghost"}>
                            <X />
                        </Button>
                    </div>
                </SheetHeader>
                {
                    isLoading ? <Loading /> :
                        <DialogMainBody className="space-y-4 max-h-[calc(100dvh-100px)]">
                            <div className="flex items-center gap-4 bg-slate-100 p-4 rounded-xl">
                                <div className={cn("rounded-xl size-14 shrink-0 flex items-center justify-center text-2xl font-bold text-white", getAvatarColor(interaction?.clientName))}>
                                    {getAvatarInitials(interaction?.clientName)}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold text-foreground text-lg"> {interaction?.clientName} </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span className="max-w-40 line-clamp-1" title={interaction?.locationLabel}>
                                                {interaction?.locationLabel}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Dot size={16} />
                                            {interaction?.vehicleCountLabel}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    Canal de communication
                                </h1>
                                {<div className="p-3 rounded-xl bg-vaBlue/10 text-foreground flex items-center gap-2 border shadow font-medium">
                                    <PiMegaphone className="scale-x-[-1] text-vaMainBlue size-6" />
                                    {interaction?.communicationChannelLabel}
                                </div>}
                            </div>
                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    Motif du contact
                                </h1>
                                {interaction?.contactReason
                                    ? <Badge variant="red">
                                        {interaction?.contactReasonLabel}
                                    </Badge> : interaction?.contactReasonLabel}
                            </div>

                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    Compte rendu de l’échange
                                </h1>
                                {<div className="p-3 rounded-xl bg-vaBlue/5 text-muted-foreground flex items-center gap-2 font-medium">
                                    {interaction?.exchangeSummary}
                                </div>}
                            </div>

                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    BESOINS identifiés
                                </h1>
                                {interaction?.identifiedNeeds ?
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {interaction.identifiedNeedsLabels.map((nl) =>
                                            < Badge variant="light-blue">
                                                {nl}
                                            </Badge>
                                        )}
                                    </div>
                                    : <span className="text-muted-foreground">----</span>
                                }
                            </div>

                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    solution proposée
                                </h1>
                                {<div className="p-3 rounded-xl bg-vaBlue/5 text-muted-foreground flex items-center gap-2 font-medium">
                                    {interaction?.proposedSolution}
                                </div>}
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h1 className="uppercase text-muted-foreground font-medium">
                                        PROCHAINE RELANCE
                                    </h1>
                                    {<div className="font-bold">
                                        {interaction?.nextFollowUpAt}
                                    </div>}
                                </div>
                                <div className="space-y-4">
                                    <h1 className="uppercase text-muted-foreground font-medium">
                                        COMMERCIAL ASSIGNÉ
                                    </h1>
                                    {<div className="font-bold text-sm flex items-center gap-2">
                                        <div className={cn("rounded-full border size-6 text-white flex items-center justify-center", getAvatarColor(interaction?.assignedToFullName ?? "RAS"))}>

                                            {interaction?.assignedToImage
                                                ? <Image
                                                    src={interaction.assignedToImage}
                                                    alt={interaction.assignedToFullName}
                                                    width={50}
                                                    height={50}
                                                    className="size-full object-cover"
                                                />
                                                : getAvatarInitials(interaction?.assignedToFullName ?? "RAS")}
                                        </div>
                                        {interaction?.assignedToFullName ?? "----"}
                                    </div>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    résultat
                                </h1>
                                {interaction?.result
                                    ? <Badge variant="red">
                                        {interaction?.resultLabel}
                                    </Badge> : interaction?.resultLabel}
                            </div>

                            <div className="space-y-4">
                                <h1 className="uppercase text-muted-foreground font-medium">
                                    prochaines étapes
                                </h1>
                                {<div className="p-3 rounded-xl bg-vaBlue/5 text-muted-foreground flex items-center gap-2 font-medium">
                                    {interaction?.nextSteps}
                                </div>}
                            </div>
                        </DialogMainBody>
                }

            </SheetContent>
        </Sheet >
    )
}