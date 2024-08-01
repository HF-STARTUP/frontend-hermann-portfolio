import React from "react";
import {Discussion} from "@/model/message/Message";
import {cn} from "@/lib/utils";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";

export const ChatContainer: React.FC<React.HTMLAttributes<HTMLDivElement> & { nav: React.ReactNode }> = ({
                                                                                                             nav,
                                                                                                             children
                                                                                                         }) => {

    return (
        <div className={"p-3 bg-white rounded-lg"}>
            <div className={"grid grid-cols-12 gap-[12px]"}>
                <div className="col-span-4 2xl:col-span-3">
                    {nav}
                </div>
                <div className="col-span-8 2xl:col-span-9">
                    {children}
                </div>
            </div>
        </div>
    )
}

const UserChatBadge = () => {
    return (
        <div className="w-2 h-2 relative bg-neutral-200 rounded-[20px]"/>
    )
}

const UserAvatar = () => {
    return (
        <div
            className="w-[54px] h-[54px] pl-2.5 pr-[11px] py-[15px] bg-fuchsia-200 rounded-[40px] justify-center items-center inline-flex">
            <div className="text-center text-violet-600 text-xl font-semibold font-vInter leading-normal">MA</div>
        </div>
    )
}


export const ChatUser: React.FC<React.HTMLAttributes<HTMLDivElement> & { discussion: Discussion }> = ({
                                                                                                          discussion,
                                                                                                          className,
                                                                                                          ...props
                                                                                                      }) => {

    const {setActiveDiscussion} = usePromptStore()

    const onNavigateToDiscussion = () => {
        setActiveDiscussion(discussion)
    }

    return (
        <div
            onClick={onNavigateToDiscussion}
            className={cn(
                "flex items-start gap-4 p-2 overflow-hidden bg-neutral-100 border border-transparent hover:border-slate-200 transition hover:bg-neutral-200 cursor-pointer rounded-xl",
                className
            )}>
            <UserAvatar/>
            <div className="flex flex-col items-start justify-start gap-2 overflow-hidden w-full">
                <div className="flex items-center justify-between w-full">
                    <div
                        className="text-zinc-900 text-[15px] font-semibold font-vInter leading-normal truncate max-w-[80%]">{discussion.discussionName}</div>
                    <div className="flex items-center justify-between gap-1">
                        <div
                            className="text-gray-500 text-[15px] font-normal font-vInter leading-normal">{discussion.lastMessage?.sendedAt}</div>
                        <UserChatBadge/>
                    </div>
                </div>
                {discussion.lastMessage && (
                    <div className={"overflow-hidden"}>
                        <div
                            className="text-neutral-500 text-[15px] font-normal font-vInter truncate">
                            {discussion.lastMessage?.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const ChatSectionHead = () => {

    const {activeDiscussion} = usePrompStore()

    if(!activeDiscussion){
        return (
            <div></div>
        )
    }

    if(activeDiscussion){
        return (
            <div className={" p-6 bg-stone-50 rounded-tl-xl rounded-tr-xl flex items-center gap-[14.11px]"}>
                <UserAvatar/>
                <div className="text-black text-2xl font-semibold font-vInter leading-[37.77px]">{activeDiscussion.discussionName}</div>
            </div>
        )
    }
}

export const ChatSectionBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (
        <div className={"p-6 bg-white rounded-bl-xl rounded-br-xl border border-zinc-100 "}>
            <div>
                {children}
            </div>
        </div>
    )
}