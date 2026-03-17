import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePackagePricingHook } from "../../_hooks/usePackagePricingHook";
import { PackageFormData, PackagePeriod, PackagePeriodData } from "../../_hooks/usePackageForm";

const PeriodOption = ({ id, label, checked, onCheck }: any) => (
    <div className="flex items-center gap-4">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheck} />
        <label htmlFor={id} className="text-vaTextPrimary cursor-pointer select-none">
            {label}
        </label>
    </div>
);

export const PackageStep2 = ({ data, onChange }: { data: PackageFormData, onChange: (updates: any) => void }) => {
    const { periods, trials, togglePeriod, toggleTrial } = usePackagePricingHook();

    const updatePricingDetail = (period: PackagePeriod, field: keyof PackagePeriodData, value: any) => {
        const currentPricings = [...(data.pricings || [])];
        const index = currentPricings.findIndex((p: PackagePeriodData) => p.period === period);

        const normalizedValue = ["amount", "discount", "trialDays"].includes(field as string)
            ? (value === "" ? undefined : Number(value))
            : value;

        const existing = index > -1 ? currentPricings[index] : { period };
        const newDetail = { ...existing, [field]: normalizedValue };

        if (index > -1) currentPricings[index] = newDetail;
        else currentPricings.push(newDetail);

        onChange({ pricings: currentPricings });
    };

    const renderPeriodDetails = (period: PackagePeriod) => {
        const pricing = data.pricings?.find((p) => p.period === period);

        return (
            <div className="bg-vaLightGray/5 p-4 rounded-xl space-y-4 border border-vaLightGray/10 mt-2">
                <div className="grid grid-cols-3 gap-4">
                    <Input
                        type="number"
                        label="Montant"
                        placeholder="0"
                        value={pricing?.amount ?? ""}
                        onChange={(e) => updatePricingDetail(period, "amount", e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        label="Devise"
                        placeholder="XOF"
                        value={pricing?.currency ?? ""}
                        onChange={(e) => updatePricingDetail(period, "currency", e.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        label="Remise"
                        placeholder="0"
                        value={pricing?.discount ?? ""}
                        onChange={(e) => updatePricingDetail(period, "discount", e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={`trial-${period}`}
                        checked={trials[period]}
                        onCheckedChange={() => toggleTrial(period)}
                    />
                    <label htmlFor={`trial-${period}`} className="text-vaTextPrimary cursor-pointer text-sm">
                        Période d’essai
                    </label>
                </div>
                {trials[period] && (
                    <div className="grid grid-cols-2">
                        <Input
                            type="number"
                            label="Nombre de jours"
                            placeholder="Ex: 7"
                            value={pricing?.trialDays ?? ""}
                            onChange={(e) => updatePricingDetail(period, "trialDays", e.target.value)}
                            required
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Type de tarifaction <span className="text-vaRed">*</span></label>
                <Select value={data.pricingType} onValueChange={(val) => onChange({ pricingType: val as "Free" | "Payant" | "estimate" })}>
                    <SelectTrigger className="w-full rounded-xl py-2.5">
                        <SelectValue placeholder="Sélectionner un type de tarifaction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Free">Gratuit</SelectItem>
                        <SelectItem value="Payant">Payant</SelectItem>
                        <SelectItem value="estimate">Sur devis</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4">
                <label className="text-sm font-medium">Périodicités disponibles</label>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <PeriodOption id="monthly" label="Mensuel" checked={periods.includes("monthly")} onCheck={() => togglePeriod("monthly")} />
                        {periods.includes("monthly") && renderPeriodDetails("monthly")}
                    </div>
                    <div className="flex flex-col">
                        <PeriodOption id="quarterly" label="Trimestriel" checked={periods.includes("quarterly")} onCheck={() => togglePeriod("quarterly")} />
                        {periods.includes("quarterly") && renderPeriodDetails("quarterly")}
                    </div>
                    <div className="flex flex-col">
                        <PeriodOption id="annual" label="Annuel" checked={periods.includes("annual")} onCheck={() => togglePeriod("annual")} />
                        {periods.includes("annual") && renderPeriodDetails("annual")}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    type="number"
                    label="Véhicules max"
                    value={data.maxVehicles ?? ""}
                    onChange={(e) => onChange({ maxVehicles: e.target.value ? Number(e.target.value) : undefined })}
                    required
                />
                <Input
                    type="number"
                    label="Chauffeurs max"
                    value={data.maxDrivers ?? ""}
                    onChange={(e) => onChange({ maxDrivers: e.target.value ? Number(e.target.value) : undefined })}
                    required
                />
            </div>

            <div className="flex items-center justify-between p-1">
                <label htmlFor="support-prio" className="cursor-pointer">Support prioritaire</label>
                <Switch
                    id="support-prio"
                    checked={data.prioritySupport}
                    onCheckedChange={(val) => onChange({ prioritySupport: val })}
                />
            </div>
        </div>
    );
};