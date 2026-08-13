"use client";

import { useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { DateSeparator } from "./DateSeparator";
import { ScrollToBottomButton } from "./ScrollToBottomButton";
import WaMessageModel from "@/model/whatsapp/WaMessageModel";
import { mockMessages } from "../../WhatsappMockData";

interface MessageListProps {
    messages?: WaMessageModel[];
}

const defaultMessages = WaMessageModel.fromResponseArray(mockMessages);

export function MessageList({ messages = defaultMessages }: MessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    function handleScroll() {
        const el = containerRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollButton(distanceFromBottom > 200);
    }

    function scrollToBottom() {
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }

    return (
        <div className="relative flex-1 overflow-hidden">
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="h-full space-y-2 overflow-y-auto bg-muted/40 px-4 py-4"
            >
                <DateSeparator label="Aujourd'hui" />
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </div>
            <ScrollToBottomButton visible={showScrollButton} onClick={scrollToBottom} />
        </div>
    );
}