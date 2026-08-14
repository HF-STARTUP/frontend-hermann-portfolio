"use client";

import { useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { DateSeparator } from "./DateSeparator";
import { ScrollToBottomButton } from "./ScrollToBottomButton";
import WaMessageModel from "@/model/whatsapp/WaMessageModel";
import { mockMessages } from "../../WhatsappMockData";
import Image from "next/image";

interface MessageListProps {
    messages?: WaMessageModel[];
    isLoading?: boolean;
    isFetching?: boolean;
}

const defaultMessages = WaMessageModel.fromResponseArray(mockMessages);

function MessageBubbleSkeleton({ align = "start" }: { align?: "start" | "end" }) {
    return (
        <div className={`flex w-full ${align === "end" ? "justify-end" : "justify-start"}`}>
            <div className="h-10 w-40 animate-pulse rounded-2xl bg-muted" />
        </div>
    );
}

function MessageListSkeleton() {
    return (
        <div className="space-y-3 px-4 py-4">
            <MessageBubbleSkeleton align="start" />
            <MessageBubbleSkeleton align="end" />
            <MessageBubbleSkeleton align="start" />
            <MessageBubbleSkeleton align="start" />
            <MessageBubbleSkeleton align="end" />
        </div>
    );
}

export function MessageList({ messages = defaultMessages, isLoading, isFetching }: MessageListProps) {
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

    if (isLoading) {
        return (
            <div className="relative flex-1 overflow-hidden">
                <MessageListSkeleton />
            </div>
        );
    }

    return (
        <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-blue-primary/15">
                <Image
                    src="/chat-doobles.png"
                    alt="Chat VTCC ADMIN"
                    fill
                    className="object-cover scale-110 opacity-20"
                    priority
                />
            </div>

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="relative z-10 h-full overflow-y-auto px-4 py-4 space-y-2"
            >
                {isFetching && (
                    <div className="flex justify-center py-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-primary border-t-transparent" />
                    </div>
                )}

                <DateSeparator label="Aujourd'hui" />

                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </div>

            <ScrollToBottomButton
                visible={showScrollButton}
                onClick={scrollToBottom}
            />
        </div>
    );
}