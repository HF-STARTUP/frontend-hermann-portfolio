import { useGetARCAssignees } from "@/hooks/at-risk-customers/useAtRiskCustomers"
import { AtRiskCustomersParams } from "@/types/at-risk-customers.type"
import { useState } from "react"

export const useAssigneesHook = () => {
    const [params, setParams] = useState<AtRiskCustomersParams>({

    })
    const { assignees, isLoading } = useGetARCAssignees(params)
    return {
        assignees,
        isLoadingAssignees: isLoading
    }
}