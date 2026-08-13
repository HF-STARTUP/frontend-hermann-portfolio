"use client";

import { useState } from "react";
import { SidebarHeader } from "../sidebar/SidebarHeader";
import { ConversationSearchBar } from "../sidebar/ConversationSearchBar";
import { ConversationStatusTabs } from "../sidebar/ConversationStatusTabs";
import { ConversationList } from "../sidebar/ConversationList";

type TabValue = "OPEN" | "ASSIGNED_TO_ME" | "CLOSED";

export function SidebarColumn() {
    const [tab, setTab] = useState<TabValue>("OPEN");
    const [search, setSearch] = useState("");

    return (
        <div className="flex h-full flex-col">
            <SidebarHeader />
            <ConversationSearchBar value={search} onChange={setSearch} />
            <ConversationStatusTabs value={tab} onChange={setTab} />
            <ConversationList />
        </div>
    );
}