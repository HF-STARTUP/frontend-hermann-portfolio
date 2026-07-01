import { useAddARCAction } from "@/hooks/at-risk-customers/useAtRiskCustomers"
import { ARCNewActionPayload, ARCResult } from "@/types/at-risk-customers.type"
import notify from "@/utils/func/notification"
import { useEffect, useState } from "react"

export const useARCActionHook = (clientId?: string, action: 'add' | 'edit' = "add") => {

    const [payload, setPayload] = useState<ARCNewActionPayload>({
        park_id: clientId,
        result: ARCResult.POSITIVE
    })

    const resetPayload = () => setPayload({
        park_id: clientId,
        mode: undefined,
        action_type: undefined,
        type: undefined,
        title: undefined,
        description: undefined,
        assigned_to_profile_id: undefined,
        deadline_at: undefined,
        scheduled_at: undefined,
        priority: undefined,
        status: undefined,
        notes: undefined,
        communication_channel: undefined,
        contact_reason: undefined,
        exchange_summary: undefined,
        identified_needs: [],
        proposed_solution: undefined,
        next_follow_up_at: undefined,
        result: undefined,
        next_steps: undefined,
        occurred_at: undefined,
        category: undefined,
    })

    const { isError, loading, handleMutation, isSuccess } = useAddARCAction()

    const onSubmit = () => {
        if (action == "add") {

            if (!payload.park_id) {
                return notify("Veuillez selectionner un client", "error")
            }

            if (payload.mode == "register_interaction") {
                if (!payload.communication_channel)
                    return notify("Veuillez choisir le cannal de commucation", "error")

                if (!payload.result)
                    return notify("Veuillez selectionner le resultat de l'echange", "error")
            } else {
                if (!payload.action_type)
                    return notify("Veuillez choisir le type d'action", "error")

                if (!payload.description)
                    return notify("Veuillez entrer une description", "error")
            }

            handleMutation(payload)
        } else {

        }
    }

    return {
        loading,
        isSuccess,
        setPayload,
        payload,
        resetPayload,
        onSubmit
    }
}