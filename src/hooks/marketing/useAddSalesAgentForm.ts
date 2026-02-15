import { useCallback, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import type { CreateSalesAgentPayload } from "@/types/marketing.types"
import type { SalesAgent } from "@/types/marketing.types"
import {
  useCreateSalesAgent,
  useUpdateSalesAgent,
  useGetSalesAgentDetails,
} from "@/hooks/marketing/useMarketing"
import { createSalesAgentFormSchema } from "@/schema/marketing.schema"

function salesAgentToFormValues(agent: SalesAgent): AddSalesAgentFormValues {
  return {
    first_name: agent.first_name ?? "",
    last_name: agent.last_name ?? "",
    phone: agent.phone ?? "",
    country_id: agent.country?.id ?? 0,
    channel: agent.channel ?? "",
    email: agent.email ?? "",
    identification_number: agent.identification_number ?? "",
    status: agent.status ?? "",
  }
}

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
  agentId?: string | null
}

export function useAddSalesAgentForm(options?: UseAddSalesAgentFormOptions) {
  const { onSuccess, onClose, isOpen = false, agentId } = options ?? {}
  const isEdit = Boolean(agentId)

  const form = useForm<AddSalesAgentFormValues>({
    resolver: joiResolver(createSalesAgentFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  })

  const { reset } = form
  const { data: editAgent, isLoading: isLoadingDetails } =
    useGetSalesAgentDetails(
      isEdit && isOpen ? agentId ?? undefined : undefined,
      undefined,
      { enabled: isEdit && isOpen && Boolean(agentId) }
    )
  const { mutate: createSalesAgent, isPending: isCreatePending } =
    useCreateSalesAgent()
  const { mutate: updateSalesAgent, isPending: isUpdatePending } =
    useUpdateSalesAgent()

  const isSubmitting = isCreatePending || isUpdatePending || (isEdit && isLoadingDetails)

  const handleClose = useCallback(() => {
    reset(DEFAULT_VALUES)
    onClose?.()
  }, [reset, onClose])

  const onSubmit: SubmitHandler<AddSalesAgentFormValues> = useCallback(
    (data) => {
      const payload = mapFormValuesToPayload(data)
      if (isEdit && agentId) {
        updateSalesAgent(
          { id: agentId, payload },
          {
            onSuccess: () => {
              reset(DEFAULT_VALUES)
              onSuccess?.()
              onClose?.()
            },
          }
        )
      } else {
        createSalesAgent(payload, {
          onSuccess: () => {
            reset(DEFAULT_VALUES)
            onSuccess?.()
            onClose?.()
          },
        })
      }
    },
    [
      isEdit,
      agentId,
      updateSalesAgent,
      createSalesAgent,
      reset,
      onSuccess,
      onClose,
    ]
  )

  useEffect(() => {
    if (isOpen && !isEdit) {
      reset(DEFAULT_VALUES)
    }
  }, [isOpen, isEdit, reset])

  useEffect(() => {
    if (isOpen && isEdit && editAgent) {
      reset(salesAgentToFormValues(editAgent))
    }
  }, [isOpen, isEdit, editAgent, reset])

  return {
    ...form,
    handleClose,
    onSubmit,
    isSubmitting,
    isEdit,
  }
}
