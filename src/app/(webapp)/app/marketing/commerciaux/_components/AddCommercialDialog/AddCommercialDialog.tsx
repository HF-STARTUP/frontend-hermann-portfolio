"use client"

import React from "react"
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
  CreateCommercialFormData, 
  COUNTRY_OPTIONS, 
  CHANNEL_OPTIONS 
} from "@/types/marketing.types"
import { useCreateCommercial } from "@/hooks/marketing/useMarketing"
import { ImageIcon } from "lucide-react"

interface AddCommercialDialogProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_FORM_DATA: CreateCommercialFormData = {
  lastName: '',
  firstName: '',
  phone: '',
  email: '',
  country: '',
  channel: '',
}

export const AddCommercialDialog: React.FC<AddCommercialDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = React.useState<CreateCommercialFormData>(INITIAL_FORM_DATA)
  
  const { mutate: createCommercial, isLoading } = useCreateCommercial()

  const handleClose = () => {
    setFormData(INITIAL_FORM_DATA)
    onClose()
  }

  const handleChange = (field: keyof CreateCommercialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    createCommercial({
      lastName: formData.lastName,
      firstName: formData.firstName,
      phone: formData.phone,
      email: formData.email || undefined,
      country: formData.country,
      channel: formData.channel,
    }, {
      onSuccess: () => {
        handleClose()
      }
    })
  }

  const isValid = formData.lastName && formData.firstName && formData.phone && formData.country && formData.channel

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] p-8 rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-semibold text-[#0b0b0b]">
            Ajouter un commercial
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <div className="w-[120px] h-[120px] rounded-full bg-[#f4f6f6] flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          {/* Row 1: Nom / Prénoms */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nom*"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Entrer le nom"
              required
            />
            <Input
              label="Prénoms*"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Entrer le prénom"
              required
            />
          </div>

          {/* Row 2: Téléphone / Email */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Numéro de téléphone*"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Entrer le numéro de téléphone"
              required
            />
            <Input
              label="Adresse e-mail"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Entrer l'adresse e-mail"
            />
          </div>

          {/* Row 3: Pays / Canal */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#405768]">
                Pays<span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => handleChange('country', value)}
              >
                <SelectTrigger className="h-[50px] rounded-[12px] border-[#80878c]">
                  <SelectValue placeholder="Sélectionner le pays" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#405768]">
                Canal principal<span className="text-red-500">*</span>
              </label>
              <Select 
                value={formData.channel} 
                onValueChange={(value) => handleChange('channel', value)}
              >
                <SelectTrigger className="h-[50px] rounded-[12px] border-[#80878c]">
                  <SelectValue placeholder="Sélectionner le canal" />
                </SelectTrigger>
                <SelectContent>
                  {CHANNEL_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-[56px] rounded-[12px] bg-[#2554ae] hover:bg-[#1e4a9a] text-white font-bold text-lg disabled:opacity-20 disabled:bg-[#2554ae]"
          >
            {isLoading ? "Ajout en cours..." : "Ajouter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
