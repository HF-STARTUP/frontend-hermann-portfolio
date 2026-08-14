import { useGetWhatsAppMessages } from "@/hooks/whatsapp/useWhatsapp"
import WaMessageModel from "@/model/whatsapp/WaMessageModel"
import { WhatsAppMessagesParams } from "@/types/whatsapp.type"
import { useEffect, useMemo, useState } from "react"
import { useWhatsAppStore } from "../whatsappStore"

export const useMessagesHook = () => {
    const {
        selectedConversation
    } = useWhatsAppStore()
    const conversationId = selectedConversation?.id
    const [accumulatedMessages, setAccumulatedMessages] = useState<WaMessageModel[]>([])
    const [params, setParams] = useState<WhatsAppMessagesParams>({
        conversation_id: conversationId,
        page: 1,
        limit: 50,
    })

    const {
        messages,
        isLoading,
        total,
    } = useGetWhatsAppMessages(params)

    const isFetching = isLoading && ((params.page ?? 1) > 1)
    const hasMore = useMemo(() => {
        return accumulatedMessages.length < total
    }, [accumulatedMessages.length, total])

    useEffect(() => {
        setParams({ conversation_id: conversationId, page: 1, limit: 50 })
        setAccumulatedMessages([])
    }, [conversationId])

    useEffect(() => {
        if (!messages) return

        setAccumulatedMessages((prev) => {
            if ((params.page ?? 1) === 1) {
                return messages
            }
            return [...messages, ...prev]
        })
    }, [messages])

    function loadMore() {
        if (isFetching || !hasMore) return
        setParams((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }))
    }

    return {
        messages: accumulatedMessages,
        isLoading,
        isFetching,
        hasMore,
        loadMore,
        total,
        params,
        setParams,
    }
}