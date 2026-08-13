"use client";

import { useState } from "react";
import { ConversationListItem } from "./ConversationListItem";
import { EmptyInboxState } from "./EmptyInboxState";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { mockConversations } from "../../WhatsappMockData";

interface ConversationListProps {
    conversations?: WaConversationModel[];
}

const defaultConversations = WaConversationModel.fromResponseArray(mockConversations);

export function ConversationList({ conversations = defaultConversations }: ConversationListProps) {
    const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");

    if (conversations.length === 0) {
        return <EmptyInboxState />;
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    active={conversation.id === activeId}
                    onSelect={setActiveId}
                />
            ))}
        </div>
    );
}