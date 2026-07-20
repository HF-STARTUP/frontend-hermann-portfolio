import { Input } from "@/components/ui/input";
import { FleetRegisterFormData } from "@/types/admin/fleet.type";

interface ProfilStepProps {
    formData: FleetRegisterFormData;
    updateField: (field: keyof FleetRegisterFormData, value: any) => void
}

export default function ProfilStep({ formData, updateField }: ProfilStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 w-full gap-4">
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => updateField("first_name", e.target.value)}
                        placeholder="Ex: John"
                        label="Prénom"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => updateField("last_name", e.target.value)}
                        placeholder="Ex: Doe"
                        label="Nom"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-4">
                <div className="flex flex-col gap-2">
                    <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Ex: john.doe@example.com"
                        label="Adresse e-mail"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Ex: 675 67 65 43"
                        label={"Numéro de téléphone"}
                        required
                    />
                </div>
            </div>
        </div>
    )
}