"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CreateCodeStep1 } from "./CreateCodeStep1"
import { useCreatePromoCodeForm } from "@/hooks/marketing/useMarketing"

interface CreateCodeDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateCodeDialog: React.FC<CreateCodeDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    formData,
    setField,
    fieldErrors,
    currentStep,
    handleStep1Submit,
    handleBack,
    handleFinalSubmit,
    handleClose,
    isLoading,
  } = useCreatePromoCodeForm({ onClose })

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
        {currentStep === 1 && (
          <CreateCodeStep1
            formData={formData}
            onFieldChange={setField}
            fieldErrors={fieldErrors}
            onSubmit={handleFinalSubmit}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )}

        {currentStep === 2 && (
          <div className="flex flex-col gap-6">
            <DialogHeader className="flex flex-row justify-between items-center space-y-0">
              <DialogTitle className="text-[28px] font-bold text-admin-primary">
                Créer un code
              </DialogTitle>
              <span className="text-gray-400 text-sm">Étape 2/2</span>
            </DialogHeader>

            <div className="text-center py-8 text-gray-500">
              Récapitulatif : créez le code pour valider.
            </div>

            <div className="flex gap-4">
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
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
