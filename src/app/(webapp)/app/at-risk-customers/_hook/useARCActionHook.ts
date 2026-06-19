import { useAddARCAction } from "@/hooks/at-risk-customers/useAtRiskCustomers"
import { ARCNewActionPayload } from "@/types/at-risk-customers.type"
import { useEffect, useState } from "react"

export const useARCActionHook = (clientId?: string, action: 'add' | 'edit' = "add") => {

    const [payload, setPayload] = useState<ARCNewActionPayload>({
        park_id: clientId,
        result: "positive"
    })

    const resetPayload = () => setPayload({ park_id: clientId })

    const { isError, loading, handleMutation, isSuccess } = useAddARCAction()

    const onSubmit = () => {
        if (action == "add") {
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