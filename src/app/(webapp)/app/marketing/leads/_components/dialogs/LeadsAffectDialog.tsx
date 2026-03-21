import { DialogFooter } from "@/components/display/DialogFooter"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export const AffectLeadsDialog = ({ isOpenned, onClose }: { isOpenned: boolean, onClose: () => void }) => {
    const [selectedCommercials, setSelectedCommercials] = useState<string[]>([])
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const commercials: MultiSelectOption[] = [
        {
            label: "Hermann",
            value: "1"
        },
        {
            label: "Fomo",
            value: "2"
        },
        {
            label: "Matuidi",
            value: "3"
        },
        {
            label: "Genius",
            value: "4"
        }
    ]
    const taskOptions: MultiSelectOption[] = [
        {
            label: "Appel",
            value: "call"
        },
        {
            label: "Relance",
            value: "retargetting"
        },
        {
            label: "Suivi",
            value: "follow"
        },
        {
            label: "Meeting",
            value: "meeting"
        },
        {
            label: "E-mail",
            value: "email"
        }
    ]
    return (
        <Dialog open={isOpenned} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Affecter des leads
                    </DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Groupe de leads <span className="text-vaRed">*</span>
                        </label>
                        <Select>
                            <SelectTrigger className="w-full rounded-xl py-2.5" inForm={true}>
                                <SelectValue placeholder="Sélectionner une cible" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les leads</SelectItem>
                                <SelectItem value="new">Nouveaux</SelectItem>
                                <SelectItem value="contacted">Contacté</SelectItem>
                                <SelectItem value="qualified">Qualifié</SelectItem>
                                <SelectItem value="converted">Convertis</SelectItem>
                                <SelectItem value="lost">Perdus</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Commerciaux assigné(es) <span className="text-vaRed">*</span>
                        </label>
                        <MultiSelect options={commercials} placeholder="Sélectionner un ou plusieurs commerciaux" onChange={setSelectedCommercials} value={selectedCommercials} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Tâches à realiser <span className="text-vaRed">*</span>
                        </label>
                        <MultiSelect options={taskOptions} placeholder="Sélectionner une ou plusieurs tâches" onChange={setSelectedTasks} value={selectedTasks} />
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <Button variant={"mainBlue"} fullWidth>
                        Affecter
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}