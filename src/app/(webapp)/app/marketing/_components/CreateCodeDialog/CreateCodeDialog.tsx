"use client"

import React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
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
    handleStep1Submit,
    handleClose,
    isLoading,
    isEdit,
  } = formMethods

  const title = isEdit ? "Modifier le code" : "Créer un code"
  const submitLabel = isEdit
    ? isLoading
      ? "Enregistrement..."
      : "Enregistrer"
    : isLoading
      ? "Création..."
      : "Créer le code"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl">
        {isOpen && (
          <FormProvider {...formMethods}>
            <CreateCodeStep1
              onStep1Submit={handleStep1Submit}
              onClose={handleClose}
              title={title}
              submitLabel={submitLabel}
              isLoading={isLoading}
            />
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  )
}
