"use client"

import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {
    ChatContainer,
    ChatSectionBody,
    ChatSectionHead
} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatUtils";
import {ChatUsersNav} from "@/app/(protected)/dashboard/chat/_components/chatUsers/chatUsers";
import {ChatMessages} from "@/app/(protected)/dashboard/chat/_components/chatMessage/chatMessages";
import {EmptyMessage} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatMessageUtils";
import {ChatInputPrompt} from "@/app/(protected)/dashboard/chat/_components/chatInput/chatInput";
import {Crumb} from "@/components/ui/custom/crumb";
import React from "react";
import {PageTitle} from "@/components/ui/custom/PageTitle";

export default function TicketPage() {

    const {activeDiscussion} = usePrompStore()

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Messagerie",
                        url: "/tickets",
                    }
                ]}
            />
            <div className={"mt-1"}>
                <PageTitle
                    page_title={"Tickets de réclamations"}
                    withSelect={false}
                />
            </div>
            <ChatContainer
                nav={<ChatUsersNav/>}
            >
                <div className={"bg-white"}>
                    <ChatSectionHead/>
                    <ChatSectionBody>
                        {activeDiscussion && <ChatMessages/>}
                        {!activeDiscussion && <EmptyMessage/>}
                        {activeDiscussion && <ChatInputPrompt/>}
                    </ChatSectionBody>
                </div>
            </ChatContainer>
        </div>
    )
}