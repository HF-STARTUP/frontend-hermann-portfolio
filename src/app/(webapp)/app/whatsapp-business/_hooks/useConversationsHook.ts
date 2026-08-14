import { useGetWhatsAppConversation, useGetWhatsAppConversations } from "@/hooks/whatsapp/useWhatsapp"
import WaConversationModel from "@/model/whatsapp/WaConversationModel"
import { WaConversationStatus, WhatsAppConversationsParams } from "@/types/whatsapp.type"
import { useEffect, useMemo, useState } from "react"

export const useConversationsHook = () => {
    const [accumulatedConversations, setAccumulatedConversations] = useState<WaConversationModel[]>([])
    const [params, setParams] = useState<WhatsAppConversationsParams>({
        page: 1,
        status: WaConversationStatus.OPEN,
        limit: 20,
    })
    const {
        conversations,
        isLoading,
        total,
        page,
    } = useGetWhatsAppConversations(params)

    const isFetching = isLoading && ((params.page ?? 1) > 1);
    const hasMore = useMemo(() => {
        return page < total
    }, [total, page])

    useEffect(() => {
        if (!conversations) return

        setAccumulatedConversations((prev) => {
            if ((params.page ?? 1) === 1) {
                return conversations
            }
            return [...prev, ...conversations]
        })
    }, [conversations])

    function loadMore() {
        if (isFetching || !hasMore) return
        setParams((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }))
    }

    function setFilters(filters: Omit<WhatsAppConversationsParams, "page">) {
        setParams((prev) => ({ ...prev, ...filters, page: 1 }))
    }

    return {
        conversations: accumulatedConversations,
        isLoading,
        isFetching,
        hasMore,
        loadMore,
        setFilters,
        total,
        page,
        params,
        setParams,
    }
}