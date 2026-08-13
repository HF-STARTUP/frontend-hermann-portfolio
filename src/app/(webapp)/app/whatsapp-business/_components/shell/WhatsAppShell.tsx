"use client";

import { ReactNode, useEffect } from "react";
import { create } from "zustand";

interface WhatsAppShellState {
    detailsOpen: boolean;
    detailsContent: ReactNode | null;
    toggleDetails: () => void;
    openDetails: () => void;
    closeDetails: () => void;
    setDetailsContent: (content: ReactNode | null) => void;
}

export const useWhatsAppShellStore = create<WhatsAppShellState>((set) => ({
    detailsOpen: false,
    detailsContent: null,
    toggleDetails: () => set((state) => ({ detailsOpen: !state.detailsOpen })),
    openDetails: () => set({ detailsOpen: true }),
    closeDetails: () => set({ detailsOpen: false }),
    setDetailsContent: (content) => set({ detailsContent: content }),
}));

export function useWhatsAppDetailsPanel(content: ReactNode) {
    const setDetailsContent = useWhatsAppShellStore((state) => state.setDetailsContent);

    useEffect(() => {
        setDetailsContent(content);
        return () => setDetailsContent(null);
    }, [content, setDetailsContent]);
}

interface WhatsAppShellProps {
    sidebar: ReactNode;
    children: ReactNode;
}

export function WhatsAppShell({ sidebar, children }: WhatsAppShellProps) {
    const detailsOpen = useWhatsAppShellStore((state) => state.detailsOpen);
    const detailsContent = useWhatsAppShellStore((state) => state.detailsContent);

    return (
        <div className="flex h-[calc(100dvh-144px)] w-full overflow-hidden bg-background">
            <aside className="w-[360px] shrink-0 border-r border-border">
                {sidebar}
            </aside>
            <main className="flex min-w-0 flex-1">
                <div className="min-w-0 flex-1">{children}</div>
                {detailsOpen && detailsContent && (
                    <aside className="w-[320px] shrink-0 border-l border-border">
                        {detailsContent}
                    </aside>
                )}
            </main>
        </div>
    );
}