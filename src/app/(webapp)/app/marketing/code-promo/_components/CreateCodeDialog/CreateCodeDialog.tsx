"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CreatePromoCodeFormData } from "@/types/marketing.types"
import { CreateCodeStep1 } from "./CreateCodeStep1"
import { useCreatePromoCode } from "@/hooks/marketing/useMarketing"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { DialogFooter } from "@/components/display/DialogFooter"

interface CreateCodeDialogProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_FORM_DATA: CreatePromoCodeFormData = {
  type: '',
  code: '',
  message: '',
  value: '',
  validity: '',
  usagePerUser: 1,
}

export const CreateCodeDialog: React.FC<CreateCodeDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<CreatePromoCodeFormData>(INITIAL_FORM_DATA)
  
  const { mutate: createCode, isLoading } = useCreatePromoCode()

  const handleClose = () => {
    setCurrentStep(1)
    setFormData(INITIAL_FORM_DATA)
    onClose()
  }

  const handleStep1Submit = (data: CreatePromoCodeFormData) => {
    setFormData(data)
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleFinalSubmit = () => {
    if (!formData.type) return
    
    createCode({
      code: formData.code,
      type: formData.type,
      value: formData.value,
      target: formData.validity,
    }, {
      onSuccess: () => {
        handleClose()
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        {currentStep === 1 && (
          <CreateCodeStep1
            initialData={formData}
            onSubmit={handleStep1Submit}
            onClose={handleClose}
          />
        )}
        
        {currentStep === 2 && (
          <div className="flex flex-col gap-6">
            <DialogHeader>
              <DialogTitle className="text-[28px] font-bold text-admin-primary">
                Créer un code
              </DialogTitle>
              <span className="text-gray-400 text-sm">Étape 2/2</span>
            </DialogHeader>
            
            <DialogMainBody>
              <div className="text-center py-8 text-gray-500">
                Étape 2 - Configuration avancée (à définir)
              </div>
            </DialogMainBody>
            
            <DialogFooter className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 rounded-lg"
              >
                Retour
              </Button>
              <Button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isLoading}
                className="flex-1 h-12 rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? "Création..." : "Créer le code"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
