"use client"

import React, { memo } from "react"
import {
  CreatePromoCodeFormData,
  CODE_TYPE_OPTIONS,
  DISCOUNT_TYPE_OPTIONS,
  CodeType,
  DiscountType,
} from "@/types/marketing.types"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import BtnBase from "@/components/elements/BtnBase"
import type { FieldError } from "react-hook-form"
import {
  Controller,
  useFormContext,
  useFormState,
} from "react-hook-form"

interface CreateCodeStep1Props {
  onStep1Submit: () => void
  onClose: () => void
  title?: string
  submitLabel?: string
  isLoading?: boolean
}

const CodeLabelField = memo(function CodeLabelField() {
  const { register } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "code_label" })
  const error = errors.code_label as FieldError | undefined

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...register("code_label")}
        label="Libellé du code"
        placeholder="Ex : PROMO25"
        required
        error={error}
      />
    </div>
  )
})

const DiscountValueField = memo(function DiscountValueField() {
  const { register } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "discount_value" })
  const error = errors.discount_value as FieldError | undefined

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...register("discount_value")}
        label="Valeur de la réduction"
        type="number"
        min={0}
        step="any"
        placeholder="Ex : 10 ou 0.2"
        required
        error={error}
      />
    </div>
  )
})

const ValidityDaysField = memo(function ValidityDaysField() {
  const { register } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "validity_days" })
  const error = errors.validity_days as FieldError | undefined

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...register("validity_days")}
        label="Validité (jours)"
        type="number"
        min={1}
        placeholder="Ex : 30"
        required
        error={error}
      />
    </div>
  )
})

const MaxUsageField = memo(function MaxUsageField() {
  const { register } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "max_usage_per_user" })
  const error = errors.max_usage_per_user as FieldError | undefined

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...register("max_usage_per_user")}
        label="Utilisation max par utilisateur"
        type="number"
        min={1}
        placeholder="Ex : 1"
        required
        error={error}
      />
    </div>
  )
})

function CodeTypeSelectField() {
  const { control } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "code_type" })

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
        Type de code<span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name="code_type"
        render={({ field }) => (
          <Select
            value={field.value || undefined}
            onValueChange={(value) => field.onChange(value as CodeType)}
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
        )}
      />
      {errors.code_type?.message ? (
        <p className="text-sm text-destructive">
          {String(errors.code_type.message)}
        </p>
      ) : null}
    </div>
  )
}

function DiscountTypeSelectField() {
  const { control } = useFormContext<CreatePromoCodeFormData>()
  const { errors } = useFormState({ name: "discount_type" })

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
        Type de réduction<span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name="discount_type"
        render={({ field }) => (
          <Select
            value={field.value || undefined}
            onValueChange={(value) =>
              field.onChange(value as DiscountType)
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
        )}
      />
      {errors.discount_type?.message ? (
        <p className="text-sm text-destructive">
          {String(errors.discount_type.message)}
        </p>
      ) : null}
    </div>
  )
}

export const CreateCodeStep1: React.FC<CreateCodeStep1Props> = ({
  onStep1Submit,
  title = "Créer un code",
  submitLabel = "Créer le code",
  isLoading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStep1Submit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DialogHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
        <DialogTitle className="text-[28px] font-bold text-admin-primary leading-[30px]">
          {title}
        </DialogTitle>
      </DialogHeader>

      <CodeTypeSelectField />
      <CodeLabelField />
      <DiscountTypeSelectField />
      <DiscountValueField />

      <div className="grid grid-cols-2 gap-4">
        <ValidityDaysField />
        <MaxUsageField />
      </div>

      <BtnBase
        variant="contained"
        color="blue"
        type="submit"
        className="mt-4"
        shape="square"
        fullwidth={true}
        size="sm"
        disabled={isLoading}
      >
        {submitLabel}
      </BtnBase>
    </form>
  )
}
