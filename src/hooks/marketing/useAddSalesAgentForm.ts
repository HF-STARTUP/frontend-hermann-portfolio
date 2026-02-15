import { useCallback, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import type { CreateSalesAgentPayload } from "@/types/marketing.types"
import { useCreateSalesAgent } from "@/hooks/marketing/useMarketing"
import { createSalesAgentFormSchema } from "@/schema/marketing.schema"

export interface AddSalesAgentFormValues {
  first_name: string
  last_name: string
  phone: string
  country_id: number
  channel: string
  email: string
  identification_number: string
  status: string
}

const DEFAULT_VALUES: AddSalesAgentFormValues = {
  first_name: "",
  last_name: "",
  phone: "",
  country_id: 0,
  channel: "",
  email: "",
  identification_number: "",
  status: "",
}

function mapFormValuesToPayload(
  data: AddSalesAgentFormValues,
): CreateSalesAgentPayload {
  const payload: CreateSalesAgentPayload = {
    first_name: data.first_name.trim(),
    last_name: data.last_name.trim(),
    phone: data.phone.trim(),
    country_id: data.country_id,
    channel: data.channel as CreateSalesAgentPayload["channel"],
  }
  if (data.email?.trim()) payload.email = data.email.trim()
  if (data.identification_number?.trim())
    payload.identification_number = data.identification_number.trim()
  if (data.status && data.status !== "")
    payload.status = data.status as CreateSalesAgentPayload["status"]
  return payload
}

export interface UseAddSalesAgentFormOptions {
  onSuccess?: () => void
  onClose?: () => void
  isOpen?: boolean
}

export function useAddSalesAgentForm(options?: UseAddSalesAgentFormOptions) {
  const { onSuccess, onClose, isOpen = false } = options ?? {}

  const form = useForm<AddSalesAgentFormValues>({
    resolver: joiResolver(createSalesAgentFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  })

  const { reset } = form
  const { mutate: createSalesAgent, isPending } = useCreateSalesAgent()

  const handleClose = useCallback(() => {
    reset(DEFAULT_VALUES)
    onClose?.()
  }, [reset, onClose])

  const onSubmit: SubmitHandler<AddSalesAgentFormValues> = useCallback(
    (data) => {
      const payload = mapFormValuesToPayload(data)
      createSalesAgent(payload, {
        onSuccess: () => {
          reset(DEFAULT_VALUES)
          onSuccess?.()
          onClose?.()
        },
      })
    },
    [createSalesAgent, reset, onSuccess, onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    reset(DEFAULT_VALUES)
  }, [isOpen, reset])

  return {
    ...form,
    handleClose,
    onSubmit,
    isSubmitting: isPending,
  }
}
