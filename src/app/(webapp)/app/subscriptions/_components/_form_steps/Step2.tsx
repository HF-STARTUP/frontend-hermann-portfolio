import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  PackageFormData,
  PackagePeriod,
  PackageType,
} from "@/types/subscription.types";

export const PackageStep2 = ({
  data,
  onChange,
}: {
  data: PackageFormData;
  onChange: (updates: Partial<PackageFormData>) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Type de package <span className="text-vaRed">*</span>
        </label>
        <Select
          value={data.type}
          onValueChange={(val: PackageType) => onChange({ type: val })}
        >
          <SelectTrigger className="w-full rounded-xl py-2.5">
            <SelectValue placeholder="Sélectionner un type de package" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="essentiel">Essentiel</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="tryfree">Essai (Tryfree)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Période <span className="text-vaRed">*</span>
        </label>
        <Select
          value={data.period}
          onValueChange={(val: PackagePeriod) => onChange({ period: val })}
        >
          <SelectTrigger className="w-full rounded-xl py-2.5">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensuel</SelectItem>
            <SelectItem value="yearly">Annuel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="number"
        label="Montant"
        placeholder="0"
        value={data.amount ?? ""}
        onChange={(e) =>
          onChange({ amount: e.target.value ? Number(e.target.value) : 0 })
        }
        required
      />

      {/* <div className="grid grid-cols-3 gap-4">
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
      </div> */}

      {/* <div className="flex items-center gap-2">
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
      )} */}

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="Véhicules max"
          value={data.vehicle_number ?? ""}
          onChange={(e) =>
            onChange({
              vehicle_number: e.target.value ? Number(e.target.value) : 0,
            })
          }
          required
        />
        <Input
          type="number"
          label="Chauffeurs max"
          value={data.driver_number ?? ""}
          onChange={(e) =>
            onChange({
              driver_number: e.target.value ? Number(e.target.value) : 0,
            })
          }
          required
        />
      </div>

      {/* <div className="flex items-center justify-between p-1">
        <label htmlFor="support-prio" className="cursor-pointer">Support prioritaire</label>
        <Switch
          id="support-prio"
          checked={data.prioritySupport}
          onCheckedChange={(val) => onChange({ prioritySupport: val })}
        />
      </div> */}
    </div>
  );
};