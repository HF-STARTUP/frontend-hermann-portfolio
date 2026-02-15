"use client"

import React, { memo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  COUNTRY_ID_OPTIONS,
  SALES_AGENT_CHANNEL_OPTIONS,
  SALES_AGENT_STATUS_OPTIONS,
} from "@/types/marketing.types"
import { useAddSalesAgentForm } from "@/hooks/marketing/useAddSalesAgentForm"
import type { AddSalesAgentFormValues } from "@/hooks/marketing/useAddSalesAgentForm"
import type { FieldError } from "react-hook-form"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"
import BtnBase from "@/components/elements/BtnBase"

interface AddCommercialDialogProps {
  isOpen: boolean
  onClose: () => void
}

type TextFieldProps = {
  name: keyof AddSalesAgentFormValues
  label: string
  placeholder: string
  type?: "text" | "tel" | "email"
  required?: boolean
}

const TextField = memo<TextFieldProps>(function TextField({
  name,
  label,
  placeholder,
  type = "text",
  required,
}) {
  const { register } = useFormContext<AddSalesAgentFormValues>()
  const { errors } = useFormState({ name })
  const error = errors[name] as FieldError | undefined

  return (
    <Input
      {...register(name)}
      label={label}
      placeholder={placeholder}
      type={type}
      required={required}
      error={error}
    />
  )
})

function CountrySelectField() {
  const { control } = useFormContext<AddSalesAgentFormValues>()
  const { errors } = useFormState({ name: "country_id" })

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-[#405768]">
        Pays<span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name="country_id"
        render={({ field }) => (
          <Select
            value={field.value === 0 ? "" : String(field.value)}
            onValueChange={(v) => field.onChange(v === "" ? 0 : Number(v))}
          >
            <SelectTrigger className="h-[50px] rounded-[12px] border-[#80878c]">
              <SelectValue placeholder="Sélectionner le pays" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_ID_OPTIONS.map((option) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.country_id?.message ? (
        <p className="text-sm text-red-500">
          {String(errors.country_id.message)}
        </p>
      ) : null}
    </div>
  )
}

function ChannelSelectField() {
  const { control } = useFormContext<AddSalesAgentFormValues>()
  const { errors } = useFormState({ name: "channel" })

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-[#405768]">
        Canal principal<span className="text-red-500">*</span>
      </label>
      <Controller
        control={control}
        name="channel"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="h-[50px] rounded-[12px] border-[#80878c]">
              <SelectValue placeholder="Sélectionner le canal" />
            </SelectTrigger>
            <SelectContent>
              {SALES_AGENT_CHANNEL_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.channel?.message ? (
        <p className="text-sm text-red-500">
          {String(errors.channel.message)}
        </p>
      ) : null}
    </div>
  )
}

function StatusSelectField() {
  const { control } = useFormContext<AddSalesAgentFormValues>()

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-[#405768]">
        Statut
      </label>
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="h-[50px] rounded-[12px] border-[#80878c]">
              <SelectValue placeholder="Sélectionner le statut" />
            </SelectTrigger>
            <SelectContent>
              {SALES_AGENT_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}

export const AddCommercialDialog: React.FC<AddCommercialDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const formMethods = useAddSalesAgentForm({
    isOpen,
    onClose,
  })

  const { handleSubmit, onSubmit, isSubmitting, handleClose } = formMethods

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] p-8 rounded-[20px]">
        {isOpen && (
          <>
            <DialogHeader>
              <DialogTitle className="text-[24px] font-semibold text-[#0b0b0b]">
                Ajouter un commercial
              </DialogTitle>
            </DialogHeader>

            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 mt-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="first_name"
                    label="Prénom"
                    placeholder="Entrer le prénom"
                    required
                  />
                  <TextField
                    name="last_name"
                    label="Nom"
                    placeholder="Entrer le nom"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    name="phone"
                    label="Numéro de téléphone"
                    type="tel"
                    placeholder="Entrer le numéro de téléphone"
                    required
                  />
                  <TextField
                    name="email"
                    label="Adresse e-mail"
                    type="email"
                    placeholder="Entrer l'adresse e-mail"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <CountrySelectField />
                  <ChannelSelectField />
                </div>

                <TextField
                  name="identification_number"
                  label="Numéro d'identification"
                  placeholder="Entrer le numéro d'identification"
                />

                <StatusSelectField />

                <BtnBase
                  children={isSubmitting ? "Ajout en cours..." : "Ajouter"}
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  fullwidth={true}
                  color="blue"
                  variant="contained"
                  shape="square"
                  size="sm"
                />
              </form>
            </FormProvider>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
