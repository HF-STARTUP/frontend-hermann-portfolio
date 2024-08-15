"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatMdgContent} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatMessageUtils";
import React, {useRef} from "react";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import Loading from "@/components/ui/Loader";
import {useGetProfileID} from "@/hooks/__globlal/useGlobalHook";
import {useGetTicketMessageList} from "@/hooks/admin/useTicketHook";

export const ChatMessages = () => {

    const {activeDiscussion} = usePromptStore()

    const {
        activeDiscussion: discussion,
    } = usePromptStore()


    const {profile_id} = useGetProfileID()

    const {isLoading, data: messages,} = useGetTicketMessageList(activeDiscussion?.id as unknown as string)

    return (
        <ScrollArea className="h-[43vh] data-scrolable">
            <div className={"flex flex-col gap-[24px] pb-[200px]"}>
                {isLoading && (
                    <Loading/>
                )}
                {messages && messages.map((message, index) => {
                    return (
                        <ChatMdgContent
                            key={index}
                            message={message}
                        />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

