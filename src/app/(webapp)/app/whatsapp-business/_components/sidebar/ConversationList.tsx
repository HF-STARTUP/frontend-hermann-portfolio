"use client";

import { useState } from "react";
import { ConversationListItem } from "./ConversationListItem";
import { EmptyInboxState } from "./EmptyInboxState";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { ScrollContainer } from "@/components/box/ScrollContainer";

interface ConversationListProps {
    conversations?: WaConversationModel[];
    loadMore: () => void;
    isLoading?: boolean;
    isFetching?: boolean;
}

function ConversationListItemSkeleton() {
    return (
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            </div>
        </div>
    );
}

function ConversationListSkeleton() {
    return (
        <div className="flex-1">
            {Array.from({ length: 3 }).map((_, index) => (
                <ConversationListItemSkeleton key={index} />
            ))}
        </div>
    );
}

export function ConversationList({ conversations = [], loadMore, isFetching, isLoading }: ConversationListProps) {
    const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");

    if (isLoading) {
        return <ConversationListSkeleton />;
    }

    if (conversations?.length === 0) {
        return <EmptyInboxState />;
    }

    return (
        <ScrollContainer onNearBottom={() => loadMore()} className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
                <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    active={conversation.id === activeId}
                    onSelect={setActiveId}
                />
            ))}
            {isFetching && <ConversationListItemSkeleton />}
        </ScrollContainer>
    );
}