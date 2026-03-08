import { TextArea } from "@/components/form/TextField"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const ChecklistForm = ({ checklistId, action = "add", onCancel }: { checklistId?: string, action?: "add" | "edit", onCancel?: ()=>void }) => {

    const canauxOptions: MultiSelectOption[] = [
        {
            label: "Jean Marie",
            value: "USR1"
        },
        {
            label: "Esai Ngwa",
            value: "USR2"
        },
        {
            label: "Matuidi Charo",
            value: "USR3"
        },
        {
            label: "Genius ",
            value: "USR4"
        }
    ]

    const [collaborateurs, setCollaborateurs] = useState<string[]>([])

    return (<div className="rounded-2xl bg-vaLightGray/5 shadow-sm border p-6 flex flex-col gap-4">
        <TextArea label="Description de la tâche" placeholder="Décrivez la tâche" />
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium">Collaborateur assigné</label>
                <MultiSelect options={canauxOptions} placeholder="Sélectionner une ou plusieurs personnes" value={collaborateurs} onChange={setCollaborateurs} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-sm font-medium">Type de tache</label>
                <Select>
                    <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                        <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="call">Appel</SelectItem>
                        <SelectItem value="content-creation">Création de contenu</SelectItem>
                        <SelectItem value="retargetting">Relance</SelectItem>
                        <SelectItem value="suivi">Suivi</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Input type="date" label="Date limite" />
            <Input type="time" label="Heure limite" />
        </div>
        <div className="flex items-center gap-4 mt-4">
            <Button variant={"mainBlue"} className="min-w-40">Ajouter</Button>
            <Button variant={"outline"} className="min-w-40" onClick={onCancel}>Annuler</Button>
        </div>
    </div>)
}

export default ChecklistForm