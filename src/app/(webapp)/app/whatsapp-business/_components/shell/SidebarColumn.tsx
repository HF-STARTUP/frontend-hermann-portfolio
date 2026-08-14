"use client";

import { useState } from "react";
import { SidebarHeader } from "../sidebar/SidebarHeader";
import { ConversationSearchBar } from "../sidebar/ConversationSearchBar";
import { ConversationStatusTabs } from "../sidebar/ConversationStatusTabs";
import { ConversationList } from "../sidebar/ConversationList";
import { useConversationsHook } from "../../_hooks/useConversationsHook";
import { WaConversationStatus } from "@/types/whatsapp.type";

type TabValue = "OPEN" | "ASSIGNED_TO_ME" | "CLOSED";

export function SidebarColumn() {

    const {
        isLoading,
        isFetching,
        hasMore,
        loadMore,
        setFilters,
        total,
        page,
        params,
        setParams,
        conversations
    } = useConversationsHook()

    return (
        <div className="flex h-full flex-col">
            <SidebarHeader  />
            <ConversationSearchBar value={params.search ?? ""} onChange={(v) => setFilters({ ...params, search: v })} />
            <ConversationStatusTabs value={params.status??WaConversationStatus.OPEN} onChange={(v) => setFilters({ ...params, status: v })} />
            <ConversationList loadMore={loadMore} conversations={conversations} isLoading={isLoading} isFetching={isFetching} />
        </div>
    );
}