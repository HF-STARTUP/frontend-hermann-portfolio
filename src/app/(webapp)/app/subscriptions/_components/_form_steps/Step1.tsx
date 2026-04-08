import { TextArea } from "@/components/form/TextField";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { FleetType } from "@/types/admin/fleet.type";
import { PackageFormData } from "@/types/subscription.types";

interface Step1Props {
  data: PackageFormData;
  onChange: (updates: Partial<PackageFormData>) => void;
}

export const PackageStep1 = ({ data, onChange }: Step1Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Cible <span className="text-vaRed">*</span>
        </label>
        <Select 
          value={data.account_type}
          onValueChange={(val: FleetType) => onChange({ account_type: val })}
        >
          <SelectTrigger className="w-full rounded-xl py-2.5">
            <SelectValue placeholder="Sélectionner une cible" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professionnel">Professionnel</SelectItem>
            <SelectItem value="particulier">Particulier</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input
        type="text"
        label="Nom du package"
        placeholder="Ex. Essentiel"
        required
        value={data.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />

      <div className="space-y-2">
        <TextArea
          label="Description"
          placeholder="Décrivez brièvement ce package..."
          value={data.description}
          onChange={(e: any) => 
            onChange({ description: e.target.value })
          }
        />
        <div className="flex items-center justify-between text-xs px-2 text-vaTextPrimary">
          <div className="flex items-center gap-1">
            <Info className="size-3" />
            <p>Visible côté client</p>
          </div>
          {data.description?.length || 0}/150
        </div>
      </div>
    </div>
  );
};