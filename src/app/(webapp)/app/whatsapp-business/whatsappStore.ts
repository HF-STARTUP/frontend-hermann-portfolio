import { ReactNode, useEffect } from "react"
import { create } from "zustand"
import WaConversationModel from "@/model/whatsapp/WaConversationModel"

interface WhatsAppStoreState {
    selectedConversation: WaConversationModel | null
    setSelectedConversation: (conversation: WaConversationModel | null) => void

    detailsOpen: boolean
    detailsContent: ReactNode | null
    toggleDetails: () => void
    openDetails: () => void
    closeDetails: () => void
    setDetailsContent: (content: ReactNode | null) => void
}

export const useWhatsAppStore = create<WhatsAppStoreState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),

    detailsOpen: false,
    detailsContent: null,
    toggleDetails: () => set((state) => ({ detailsOpen: !state.detailsOpen })),
    openDetails: () => set({ detailsOpen: true }),
    closeDetails: () => set({ detailsOpen: false }),
    setDetailsContent: (content) => set({ detailsContent: content }),
}))

export function useWhatsAppDetailsPanel(content: ReactNode) {
    const setDetailsContent = useWhatsAppStore((state) => state.setDetailsContent)

    useEffect(() => {
        setDetailsContent(content)
        return () => setDetailsContent(null)
    }, [content, setDetailsContent])
}