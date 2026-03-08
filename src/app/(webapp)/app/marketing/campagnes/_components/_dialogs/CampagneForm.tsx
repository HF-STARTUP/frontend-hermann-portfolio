import { DialogFooter } from "@/components/display/DialogFooter"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { useState } from "react"

const CampagneForm = ({ isOpenned, onClose, action = "add", campagneId }: { isOpenned: boolean, onClose: () => void, action?: "add" | "edit", campagneId?: string }) => {
    const cibleOptions: MultiSelectOption[] = [
        {
            label: "Trafic",
            value: "trafic"
        },
        {
            label: "Lead",
            value: "lead"
        },
        {
            label: "Vente",
            value: "vente"
        },
        {
            label: "Autres (à préciser)",
            value: "other"
        }
    ]

    const canauxOptions: MultiSelectOption[] = [
        {
            label: "Facebook",
            value: "facebook"
        },
        {
            label: "Google",
            value: "google"
        },
        {
            label: "WhatsApp",
            value: "whatsapp"
        },
        {
            label: "Influenceur",
            value: "influenceur"
        }
    ]

    const [cibles, setCibles] = useState<string[]>([])
    const [canaux, setCanaux] = useState<string[]>([])
    const [usePromoCode, setUsePromoCode] = useState<string>()

    const { currency } = useGetActiveCurrency()
    return (
        <Dialog open={isOpenned} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {action === "add" ? "Créer une campagne" : "Modifier une campagne"} </DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    <Input type="text" label="Nom de la campagne" placeholder="Ex: Campagne de prospection Q1 2026" required />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-medium">Type de campagne <span className="text-vaRed">*</span> </label>
                        <Select>
                            <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="prospection">Prospection</SelectItem>
                                <SelectItem value="reactivation">Réactivation</SelectItem>
                                <SelectItem value="fidelisation">Fidélisation</SelectItem>
                                <SelectItem value="evenementiel">Évènementiel</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-medium">Cibles <span className="text-vaRed">*</span> </label>
                        <MultiSelect options={cibleOptions} placeholder="Sélectionner un ou plusieurs canaux" value={cibles} onChange={setCibles} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm font-medium">Canaux <span className="text-vaRed">*</span> </label>
                        <MultiSelect options={canauxOptions} placeholder="Sélectionner un ou plusieurs canaux" value={canaux} onChange={setCanaux} />
                    </div>
                    <Input type="text" label="Objectif" placeholder="Ex: Générer 500 leads qualifiés" required />
                    <div className="relative flex items-center justify-end h-fit">
                        <Input type="number" label="Budget prévu" placeholder="Entrer le montant" />
                        <p className="absolute top-[55%] right-4 font-semibold">{currency}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="date" label="Date de début" required />
                        <Input type="date" label="Date de fin" required />
                    </div>
                    <div className={`grid gap-4 ${usePromoCode === "true" ? "grid-cols-2" : "grid-cols-1"}`}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-medium">Usage de code promo <span className="text-vaRed">*</span> </label>
                            <Select value={usePromoCode} onValueChange={setUsePromoCode}>
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner une option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Oui</SelectItem>
                                    <SelectItem value="false">Non</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {usePromoCode === "true" && <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-medium">Type de code</label>
                            <Select>
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new-cust">Réduction nouveau client</SelectItem>
                                    <SelectItem value="keep-cust">Fidélisation client existant</SelectItem>
                                    <SelectItem value="free">Coupon gratuit</SelectItem>
                                    <SelectItem value="demo">Reddition commerciale (démo)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>}
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <Button variant={"mainBlue"} size={"lg"} fullWidth>
                        {action === "add" ? "Créer une campagne" : "Enregistrer les modifications"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CampagneForm