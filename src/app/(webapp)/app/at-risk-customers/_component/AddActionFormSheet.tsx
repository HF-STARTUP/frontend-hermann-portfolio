import { useEffect, useState } from "react"
import { SheetContent, Sheet, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Check, SquareArrowDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { SwitcherTabs } from "@/components/display/switcher-tabs"
import { CustomComboBox } from "@/components/ui/custom/custom-comobo-box"
import { useARCClientsColumns } from "../_utils/at-risk-clients-columns"
import { useARCActionHook } from "../_hook/useARCActionHook"
import { ActionFormConstants } from "../_utils/action-form-contants"
import { Input, Label } from "@/components/ui/input"
import { SelectableChip } from "./SelectableChip"
import { Textarea } from "@/components/ui/textarea"
import { TextArea } from "@/components/form/TextField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/display/DialogFooter"

export const AddActionFormSheet = ({
    isOpenned,
    onClose,
    action = "add",
    clientId,
    initTab = "interaction"
}: {
    isOpenned: boolean,
    onClose: () => void,
    clientId?: string,
    initTab?: 'interaction' | 'retarget',
    action?: 'add' | 'edit'
}) => {
    const { clients, isLoadingCustomers, setParams, params } = useARCClientsColumns()
    const [activeTab, setActiveTab] = useState<'interaction' | 'retarget'>(initTab)

    const {
        isSuccess,
        loading,
        payload,
        setPayload,
        resetPayload,
        onSubmit
    } = useARCActionHook(clientId, action)

    const {
        CommunicationChannels,
        ContactReasons,
        IdentifiedNeeds,
        NextActions,
        Priorities,
        Statuses
    } = ActionFormConstants({ payload, setPayload })

    useEffect(() => {
        if (isSuccess) {
            resetPayload()
            onClose()
        }
    }, [isSuccess])
    useEffect(() => {
        resetPayload()
        if (activeTab == "interaction") {
            setPayload({
                ...payload,
                mode: "register_interaction"
            })
        } else {
            setPayload({
                ...payload,
                mode: "schedule_follow_up"
            })
        }
    }, [activeTab])
    return (
        <Sheet open={isOpenned} onOpenChange={() => onClose()}>
            <SheetContent variant={"xl"}>
                <SheetHeader>
                    <div className="flex items-start justify-between">
                        <SheetTitle>
                            {action == "add" ? "Nouvelle action" : "Modifier l'action"}
                            <SheetDescription>
                                Créer/ Modifier une relance ou enregistrer une interaction
                            </SheetDescription>
                        </SheetTitle>
                        <Button variant={"ghost"} size={"icon"} onClick={() => onClose()}>
                            <X />
                        </Button>
                    </div>
                </SheetHeader>
                <DialogMainBody className="max-h-[calc(100dvh-170px)]">
                    <SwitcherTabs
                        value={activeTab}
                        onSelect={(v) => {
                            setActiveTab(v as 'interaction' | 'retarget');
                            setPayload({ ...payload, mode: v == "interaction" ? "register_interaction" : "schedule_follow_up" })
                        }}
                        fullWidth
                        tabs={[
                            {
                                label: "Enregistrer une interaction",
                                value: "interaction",
                            },
                            {
                                label: "Planifier une relance",
                                value: "retarget",
                            }
                        ]}
                    />

                    {
                        activeTab == "interaction" &&
                        <div className="space-y-6">
                            <CustomComboBox
                                options={[
                                    ...(isLoadingCustomers
                                        ? [{ label: "Chargement des clients...", value: "" }]
                                        : (clients && clients.length > 0)
                                            ? clients.map((cl) => ({
                                                label: cl.name,
                                                value: cl.parkId
                                            }))
                                            : [{ label: "Aucun client trouvé", value: "" }]
                                    )
                                ]}

                                onValueChange={(v) => {
                                    setPayload({ ...payload, park_id: v })
                                }}
                                value={payload.park_id}
                                onSearch={(v) => setParams({ ...params, search: v })}
                                label="Client concerné"
                                required
                                emptyMessage="Aucun client trouvé"
                            />
                            <div className="space-y-2">
                                <Label required>
                                    Canal de communication
                                </Label>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {
                                        CommunicationChannels.map((cc) =>
                                            <SelectableChip {...cc} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>
                                    Motif du contact
                                </Label>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {
                                        ContactReasons.map((cr) =>
                                            <SelectableChip {...cr} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="-space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>
                                        Compte rendu de l’échange
                                    </Label>
                                    <span className="text-xs text-muted-foreground">
                                        Ce qui s’est dit en résumé
                                    </span>
                                </div>
                                <TextArea placeholder="ex. Echange de 15 min Le client confirme vouloir continuer mais demande un geste commercial..." />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>
                                        Besoins identifiés
                                    </Label>
                                    <span className="text-xs text-muted-foreground">
                                        Sélectionnez tout ce qui s'applique
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 flex-wrap">
                                    {
                                        IdentifiedNeeds.map((idn) =>
                                            <SelectableChip {...idn} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label required>
                                    Résultat
                                </Label>
                                <Select value={payload.result} defaultValue="positive" onValueChange={(v) => setPayload({ ...payload, result: v })}>
                                    <SelectTrigger className="w-full rounded-xl py-3.5 px-4 h-10" inForm>
                                        <SelectValue placeholder="issue de l'interaction" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"positive"}>
                                            Positif
                                        </SelectItem>
                                        <SelectItem value={"negative"}>
                                            Négatif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>
                                        Prochaines étapes
                                    </Label>
                                    <span className="text-xs text-muted-foreground">
                                        Convertie en action planifiée si renseignée
                                    </span>
                                </div>
                                <Input type="text" value={payload.next_steps} onChange={(e) =>
                                    setPayload({
                                        ...payload,
                                        next_steps: e.target.value
                                    })
                                } placeholder="ex. Envoyer la proposition chiffrée avant Vendredi" />
                            </div>
                        </div>
                    }
                </DialogMainBody>
                <DialogFooter>
                    <div className="flex items-center justify-between">
                        <Button onClick={() => {
                            resetPayload();
                            onClose()
                        }} variant={"ghost"}>
                            Annuler
                        </Button>
                        <div className="flex items-center gap-4">
                            <Button loading={loading} variant={"outline"} onClick={() => {
                                setPayload({
                                    ...payload,
                                    status: "daft"
                                })
                                onSubmit()
                            }}>
                                <SquareArrowDown size={16} className="mr-2" />
                                Brouillon
                            </Button>
                            <Button loading={loading} variant={"mainBlue"} onClick={() => {
                                setPayload({
                                    ...payload,
                                    status: "in_progress"
                                })
                                onSubmit()
                            }}>
                                <Check size={16} className="mr-2" />
                                Enregistrer la relance
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </SheetContent>
        </Sheet>
    )
}