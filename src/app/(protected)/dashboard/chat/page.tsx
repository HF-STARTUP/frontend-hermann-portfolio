"use client"
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {ChatAfterTitle} from "@/app/(protected)/dashboard/status-accounts/_components/_UtilsComponents/UtilsComponent";
import {
    ChatContainer,
    ChatSectionBody,
    ChatSectionHead
} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatUtils";
import {ChatUsersNav} from "@/app/(protected)/dashboard/chat/_components/chatUsers/chatUsers";
import {ChatMessages} from "@/app/(protected)/dashboard/chat/_components/chatMessage/chatMessages";
import {ChatInputPrompt} from "@/app/(protected)/dashboard/chat/_components/chatInput/chatInput";
import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {EmptyMessage} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatMessageUtils";


//M
export default function Page() {

    const {activeDiscussion} = usePrompStore()

    return (
        <div>
            <AdminSubNav
                withUserSetting={false}
                afterTitle={<ChatAfterTitle/>}
            />
            <ChatContainer
                nav={<ChatUsersNav/>}
            >
                <div className={"bg-white"}>
                    <ChatSectionHead/>
                    <ChatSectionBody>
                        {activeDiscussion&&<ChatMessages/>}
                        {!activeDiscussion&&<EmptyMessage />}
                        {activeDiscussion&&<ChatInputPrompt/>}
                    </ChatSectionBody>
                </div>
            </ChatContainer>
        </div>
    )
}