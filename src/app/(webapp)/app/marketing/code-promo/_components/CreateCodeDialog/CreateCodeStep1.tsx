"use client"

import React from "react"
import { 
  CreatePromoCodeFormData, 
  CODE_TYPE_OPTIONS, 
  CODE_VALUE_OPTIONS,
  PromoCodeType 
} from "@/types/marketing.types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface CreateCodeStep1Props {
  initialData: CreatePromoCodeFormData
  onSubmit: (data: CreatePromoCodeFormData) => void
  onClose: () => void
}

export const CreateCodeStep1: React.FC<CreateCodeStep1Props> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = React.useState<CreatePromoCodeFormData>(initialData)

  const handleChange = (field: keyof CreatePromoCodeFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isValid = formData.code && formData.value && formData.validity && formData.usagePerUser > 0

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DialogHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
        <DialogTitle className="text-[28px] font-bold text-admin-primary leading-[30px]">
          Créer un code
        </DialogTitle>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Étape 1/2</span>
        </div>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
          Type de code
        </label>
        <Select 
          value={formData.type} 
          onValueChange={(value) => handleChange('type', value as PromoCodeType)}
        >
          <SelectTrigger className="h-[45px] rounded-[10px] border-neutral-300 border-opacity-60">
            <SelectValue placeholder="Sélectionner le type de code" />
          </SelectTrigger>
          <SelectContent>
            {CODE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input
        label="Libellé du code*"
        value={formData.code}
        onChange={(e) => handleChange('code', e.target.value)}
        placeholder="Ex : PROMO25"
        required
      />

      <Textarea
        label="Message affiché à l'utilisateur"
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        placeholder="Ex: Félicitations ! Vous bénéficiez de 20% de réduction sur votre premier mois"
        rows={3}
      />

      <div className="flex flex-col gap-2">
        <label className="text-[14px] leading-[24.57px] tracking-[-2%] text-admin-primary">
          Valeur du code<span className="text-red-500">*</span>
        </label>
        <Select 
          value={formData.value} 
          onValueChange={(value) => handleChange('value', value)}
        >
          <SelectTrigger className="h-[45px] rounded-[10px] border-neutral-300 border-opacity-60">
            <SelectValue placeholder="Sélectionner la valeur du code" />
          </SelectTrigger>
          <SelectContent>
            {CODE_VALUE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Validité*"
          value={formData.validity}
          onChange={(e) => handleChange('validity', e.target.value)}
          placeholder="Ex : 30 jours"
          required
        />

        <Input
          label="Utilisation par utilisateur*"
          type="number"
          min={1}
          value={formData.usagePerUser}
          onChange={(e) => handleChange('usagePerUser', parseInt(e.target.value) || 1)}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="mt-4 w-full h-[52px] rounded-[10px] bg-[#DBEAFE] text-blue-600 font-medium text-base hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant
      </Button>
    </form>
  )
}
