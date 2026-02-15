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
import { useCreatePromoCodeForm } from "@/hooks/marketing/useCreatePromoCodeForm"
import { FormProvider } from "react-hook-form"

interface CreateCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  codeId?: string | null
}

export const CreateCodeDialog: React.FC<CreateCodeDialogProps> = ({
  isOpen,
  onClose,
  codeId = null,
}) => {
  const formMethods = useCreatePromoCodeForm({
    onClose,
    isOpen,
    codeId,
  })

  const {
    currentStep,
    handleStep1Submit,
    handleBack,
    handleFinalSubmit,
    handleClose,
    isLoading,
    isEdit,
  } = formMethods

  const title = isEdit ? "Modifier le code" : "Créer un code"
  const step2Title = isEdit ? "Modifier le code" : "Créer un code"
  const submitLabel = isEdit
    ? isLoading
      ? "Enregistrement..."
      : "Enregistrer"
    : isLoading
      ? "Création..."
      : "Créer le code"
  const step2Summary = isEdit
    ? "Récapitulatif : enregistrez pour valider les modifications."
    : "Récapitulatif : créez le code pour valider."

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
        {isOpen && (
          <>
            {currentStep === 1 && (
              <FormProvider {...formMethods}>
                <CreateCodeStep1
                  onStep1Submit={handleStep1Submit}
                  onClose={handleClose}
                  title={title}
                />
              </FormProvider>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-6">
                <DialogHeader className="flex flex-row justify-between items-center space-y-0">
                  <DialogTitle className="text-[28px] font-bold text-admin-primary">
                    {step2Title}
                  </DialogTitle>
                  <span className="text-gray-400 text-sm">Étape 2/2</span>
                </DialogHeader>

                <div className="text-center py-8 text-gray-500">
                  {step2Summary}
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
                    {submitLabel}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
