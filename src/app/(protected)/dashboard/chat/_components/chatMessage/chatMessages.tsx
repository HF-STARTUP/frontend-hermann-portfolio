"use client"

import {ScrollArea} from "@/components/ui/scroll-area";
import {ChatMdgContent} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatMessageUtils";
import {useGetDiscussionMessages} from "@/hooks/chat/useDiscussions";
import React, {useRef} from "react";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import Loading from "@/components/ui/Loader";
import {scrollToBottom} from "@/lib/utils";
import {useGetProfileID} from "@/hooks/__globlal/useGlobalHook";

export const ChatMessages = () => {

    const [loadingMessage, setLoadingMessage] = React.useState(true)
    const {activeDiscussion} = usePromptStore()

    const {
        activeDiscussion: discussion,
        activeMessages,
        initMessages
    } = usePromptStore()

    const {
        data: discussionsMessages,
        isLoading,
        refresh,
    } = useGetDiscussionMessages(discussion?.id)

    const scrollRef = useRef(null);

    React.useEffect(() => {
        setLoadingMessage(isLoading)
    }, [isLoading])

    React.useEffect(() => {
        if (discussionsMessages?.length) {
            initMessages(discussionsMessages)
        } else {
            initMessages([])
        }
    }, [discussionsMessages])


    React.useEffect(() => {
        if (scrollRef.current && discussionsMessages?.length) {
            scrollToBottom(scrollRef.current);
            console.log("Scroll to bottom")
        }
    }, [discussionsMessages])

    React.useEffect(() => {
        void refresh()
    }, [activeDiscussion])

    const {profile_id} = useGetProfileID()


    return (
        <ScrollArea className="h-[43vh] data-scrolable" ref={scrollRef}>
            <div className={"flex flex-col gap-[24px] pb-[200px]"}>
                {loadingMessage && (
                    <Loading/>
                )}
                {activeMessages && activeMessages?.map((message, index) => {

                    return (
                        <ChatMdgContent
                            isReverse={profile_id !== message.senderID}
                            key={index}
                            message={message}
                        />
                    )
                })}
            </div>
        </ScrollArea>
    )
}

