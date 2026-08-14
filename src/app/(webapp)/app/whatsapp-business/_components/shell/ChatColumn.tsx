"use client";

import { mockConversations } from "../../WhatsappMockData";
import { ChatHeader } from "../chat/ChatHeader";
import { MessageList } from "../chat/MessageList";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { Composer } from "../chat/Composer";
import { EmptyConversationState } from "../shared/EmptyConversationState";
import { useMessagesHook } from "../../_hooks/useMessagesHook";
import { useWhatsAppStore } from "../../whatsappStore";




export function ChatColumn() {
    const {
        selectedConversation: defaultConversation
    } = useWhatsAppStore()
    if (!defaultConversation) {
        return <EmptyConversationState />;
    }
    const {
        isFetching,
        isLoading,
        messages,
        loadMore,
    } = useMessagesHook()
    return (
        <div className="flex h-full flex-col">
            <ChatHeader
                conversation={defaultConversation}
                onToggleDetails={() => { }}
                onAssignToMe={() => { }}
                onClose={() => { }}
                onReopen={() => { }}
            />
            <MessageList messages={messages} isLoading={isLoading} isFetching={isFetching} />
            <Composer canReply={defaultConversation.canReply} sending={false} onSend={() => { }} />
        </div>
    );
}