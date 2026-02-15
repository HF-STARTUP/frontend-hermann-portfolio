import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import type {
  CreatePromoCodeFormData,
  CreatePromoCodePayload,
  PromoCode,
} from "@/types/marketing.types"
import {
  useCreatePromoCode,
  useUpdatePromoCode,
  useGetPromoCodeDetails,
} from "@/hooks/marketing/useMarketing"
import { createPromoCodeFormSchema } from "@/schema/marketing.schema"

function promoCodeToFormData(code: PromoCode): CreatePromoCodeFormData {
  return {
    code_label: code.code_label,
    code_type: code.code_type,
    discount_type: code.discount_type,
    discount_value: String(code.discount_value),
    validity_days: String(code.validity_days),
    max_usage_per_user: String(code.max_usage_per_user),
    is_stackable: code.is_stackable,
  }
}

const DEFAULT_VALUES: CreatePromoCodeFormData = {
  code_label: "",
  code_type: "",
  discount_type: "",
  discount_value: "",
  validity_days: "",
  max_usage_per_user: "",
  is_stackable: false,
}

function mapFormValuesToPayload(
  data: CreatePromoCodeFormData,
): CreatePromoCodePayload {
  return {
    code_label: data.code_label.trim(),
    code_type: data.code_type as CreatePromoCodePayload["code_type"],
    discount_type:
      data.discount_type as CreatePromoCodePayload["discount_type"],
    discount_value: Number(data.discount_value),
    validity_days: Number(data.validity_days),
    max_usage_per_user: Number(data.max_usage_per_user),
    is_stackable: data.is_stackable,
  }
}

export type CreatePromoCodeStep = 1 | 2

export interface UseCreatePromoCodeFormOptions {
  onSuccess?: () => void
  onClose?: () => void
  isOpen?: boolean
  codeId?: string | null
}

export function useCreatePromoCodeForm(options?: UseCreatePromoCodeFormOptions) {
  const { onSuccess, onClose, isOpen = false, codeId } = options ?? {}
  const [currentStep, setCurrentStep] = useState<CreatePromoCodeStep>(1)
  const isEdit = Boolean(codeId)

  const form = useForm<CreatePromoCodeFormData>({
    resolver: joiResolver(createPromoCodeFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  })

  const { reset, trigger, getValues } = form
  const { data: editCode, isLoading: isLoadingDetails } =
    useGetPromoCodeDetails(isEdit && isOpen ? codeId ?? "" : undefined)
  const createMutation = useCreatePromoCode()
  const updateMutation = useUpdatePromoCode()

  const isLoading = isEdit ? updateMutation.isLoading : createMutation.isLoading
  const isSuccess = isEdit ? updateMutation.isSuccess : createMutation.isSuccess

  const handleClose = useCallback(() => {
    setCurrentStep(1)
    reset(DEFAULT_VALUES)
    onClose?.()
  }, [reset, onClose])

  useEffect(() => {
    if (isSuccess) {
      reset(DEFAULT_VALUES)
      setCurrentStep(1)
      onSuccess?.()
      onClose?.()
    }
  }, [isSuccess, reset, onSuccess, onClose])

  useEffect(() => {
    if (isOpen && !isEdit) {
      reset(DEFAULT_VALUES)
      setCurrentStep(1)
    }
  }, [isOpen, isEdit, reset])

  useEffect(() => {
    if (isOpen && isEdit && editCode) {
      reset(promoCodeToFormData(editCode))
      setCurrentStep(1)
    }
  }, [isOpen, isEdit, editCode, reset])

  const handleStep1Submit = useCallback(() => {
    trigger().then((valid) => {
      if (!valid) return
      const data = getValues()
      const payload = mapFormValuesToPayload(data)
      if (isEdit && codeId) {
        updateMutation.handleMutation({ id: codeId, payload })
      } else {
        createMutation.handleMutation(payload)
      }
    })
  }, [trigger, getValues, isEdit, codeId, createMutation, updateMutation])

  const handleBack = useCallback(() => {
    setCurrentStep(1)
  }, [])

  const onFinalSubmit = useCallback(() => {
    const data = getValues()
    const payload = mapFormValuesToPayload(data)
    if (isEdit && codeId) {
      updateMutation.handleMutation({ id: codeId, payload })
    } else {
      createMutation.handleMutation(payload)
    }
  }, [getValues, isEdit, codeId, createMutation, updateMutation])

  return {
    ...form,
    currentStep,
    handleClose,
    handleStep1Submit,
    handleBack,
    handleFinalSubmit: onFinalSubmit,
    isLoading: isLoading || (isEdit && isLoadingDetails),
    isEdit,
  }
}
