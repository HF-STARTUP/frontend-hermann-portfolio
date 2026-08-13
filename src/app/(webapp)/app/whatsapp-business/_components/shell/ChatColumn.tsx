"use client";

import { mockConversations } from "../../WhatsappMockData";
import { ChatHeader } from "../chat/ChatHeader";
import { MessageList } from "../chat/MessageList";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { Composer } from "../chat/Composer";

const defaultConversation = WaConversationModel.fromResponse(mockConversations[0]);

export function ChatColumn() {
    return (
        <div className="flex h-full flex-col">
            <ChatHeader
                conversation={defaultConversation}
                onToggleDetails={() => {}}
                onAssignToMe={() => {}}
                onClose={() => {}}
                onReopen={() => {}}
            />
            <MessageList />
            <Composer canReply={defaultConversation.canReply} sending={false} onSend={() => {}} />
        </div>
    );
}