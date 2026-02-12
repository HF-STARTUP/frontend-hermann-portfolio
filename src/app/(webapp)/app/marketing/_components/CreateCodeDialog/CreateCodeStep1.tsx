"use client"

import React from "react"
import {
  CreatePromoCodeFormData,
  CODE_TYPE_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  CodeType,
  DiscountType,
} from "@/types/marketing.types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BtnBase from "@/components/elements/BtnBase"

interface CreateCodeStep1Props {
  formData: CreatePromoCodeFormData
  onFieldChange: <K extends keyof CreatePromoCodeFormData>(
    field: K,
    value: CreatePromoCodeFormData[K]
  ) => void
  fieldErrors: Record<string, string>
  onSubmit: (data: CreatePromoCodeFormData) => void
  onClose: () => void
  isLoading: boolean
}

export const CreateCodeStep1: React.FC<CreateCodeStep1Props> = ({
  formData,
  onFieldChange,
  fieldErrors,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DialogHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
        <DialogTitle className="text-[28px] font-bold text-admin-primary leading-[30px]">
          Créer un code de réduction
        </DialogTitle>
        {/* <span className="text-gray-400 text-sm">Étape 1/2</span> */}
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
          Type de code<span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.code_type || undefined}
          onValueChange={(value) => onFieldChange("code_type", value as CodeType)}
        >
          <SelectTrigger className="h-[45px] rounded-[10px] border-neutral-300 border-opacity-60">
            <SelectValue placeholder="Sélectionner le type de code" />
          </SelectTrigger>
          <SelectContent>
            {CODE_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.code_type && (
          <p className="text-sm text-destructive">{fieldErrors.code_type}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="Libellé du code"
          value={formData.code_label}
          onChange={(e) => onFieldChange("code_label", e.target.value)}
          placeholder="Ex : PROMO25"
          required
        />
        {fieldErrors.code_label && (
          <p className="text-sm text-destructive">{fieldErrors.code_label}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
          Type de réduction<span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.discount_type || undefined}
          onValueChange={(value) =>
            onFieldChange("discount_type", value as DiscountType)
          }
        >
          <SelectTrigger className="h-[45px] rounded-[10px] border-neutral-300 border-opacity-60">
            <SelectValue placeholder="Sélectionner le type de réduction" />
          </SelectTrigger>
          <SelectContent>
            {DISCOUNT_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.discount_type && (
          <p className="text-sm text-destructive">{fieldErrors.discount_type}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Input
          label="Valeur de la réduction"
          type="number"
          min={0}
          step="any"
          value={formData.discount_value}
          onChange={(e) => onFieldChange("discount_value", e.target.value)}
          placeholder="Ex : 10 ou 0.2"
          required
        />
        {fieldErrors.discount_value && (
          <p className="text-sm text-destructive">{fieldErrors.discount_value}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Input
            label="Validité (jours)"
            type="number"
            min={1}
            value={formData.validity_days}
            onChange={(e) => onFieldChange("validity_days", e.target.value)}
            placeholder="Ex : 30"
            required
          />
          {fieldErrors.validity_days && (
            <p className="text-sm text-destructive">{fieldErrors.validity_days}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label="Utilisation max par utilisateur"
            type="number"
            min={1}
            value={formData.max_usage_per_user}
            onChange={(e) =>
              onFieldChange("max_usage_per_user", e.target.value)
            }
            placeholder="Ex : 1"
            required
          />
          {fieldErrors.max_usage_per_user && (
            <p className="text-sm text-destructive">{fieldErrors.max_usage_per_user}</p>
          )}
        </div>
      </div>

      {/* <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
            Cumulable*
          </label>
          <p className="text-sm text-muted-foreground">
            Le code peut-il être utilisé avec d&apos;autres offres ?
          </p>
        </div>
        <Switch
          checked={formData.is_stackable}
          onCheckedChange={(checked) => onFieldChange("is_stackable", checked)}
        />
      </div>
      {fieldErrors.is_stackable && (
        <p className="text-sm text-destructive">{fieldErrors.is_stackable}</p>
      )} */}

      <BtnBase 
        variant="contained" 
        color="blue" 
        type="submit" 
        className="mt-4"
        shape="square"
        fullwidth={true}
        size="sm"
        disabled={isLoading}
        loading={isLoading}
      >
        Créer le code
      </BtnBase>
    </form>
  )
}
