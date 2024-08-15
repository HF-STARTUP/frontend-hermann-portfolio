import React from "react";
import {cn} from "@/lib/utils";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {TicketModel} from "@/model/ADMIN/ticket";
import {TicketStatus} from "@/types/admin/ticket";

const AVATAR_COLORS = [
    {
        bgColor: "text-violet-600",
        textColor: "bg-fuchsia-200"
    },
    {
        bgColor: "text-red-600",
        textColor: "bg-rose-200"
    },
    {
        bgColor: "text-green-600",
        textColor: "bg-emerald-200"
    },
    {
        bgColor: "text-orange-600",
        textColor: "bg-amber-200"
    },
    {
        bgColor: "text-blue-600",
        textColor: "bg-sky-200"
    },
    {
        bgColor: "text-yellow-600",
        textColor: "bg-yellow-200"
    },
    {
        bgColor: "text-indigo-600",
        textColor: "bg-indigo-200"
    },
    {
        bgColor: "text-teal-600",
        textColor: "bg-teal-200"
    },
    {
        bgColor: "text-pink-600",
        textColor: "bg-pink-200"
    },
    {
        bgColor: "text-cyan-600",
        textColor: "bg-cyan-200"
    }
];


function getLetterValue(letter: string) {
    return letter.toLowerCase().charCodeAt(0) - 97;
}

function getAvatarColor(name: string) {
    if (name.length < 2) {
        throw new Error("Le nom doit avoir au moins deux lettres.");
    }

    const firstLetterValue = getLetterValue(name[0]);
    const secondLetterValue = getLetterValue(name[1]);

    const combinedValue = firstLetterValue + secondLetterValue;

    const colorIndex = combinedValue % AVATAR_COLORS.length;

    return AVATAR_COLORS[colorIndex];
}


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

const UserAvatar: React.FC<React.HTMLAttributes<HTMLDivElement> & { avatarLabel: string }> = ({avatarLabel}) => {

    const [activeColor, setActiveColor] = React.useState(
        getAvatarColor(avatarLabel)
    )

    React.useEffect(() => {
        setActiveColor(getAvatarColor(avatarLabel))
    }, [avatarLabel])


    return (
        <div>
            <div
                className={cn(
                    "size-[54px] rounded-full justify-center items-center inline-flex overflow-hidden",
                    activeColor.textColor
                )}>
                <div
                    className={
                        cn(
                            "text-center text-violet-600 text-xl font-semibold font-vInter leading-normal",
                            activeColor.bgColor
                        )}

                >{avatarLabel[0]}{avatarLabel[1]}</div>
            </div>
        </div>
    )
}


export const ChatUser: React.FC<React.HTMLAttributes<HTMLDivElement> & { ticket: TicketModel }> = ({
                                                                                                       ticket,
                                                                                                       className,
                                                                                                       ...props
                                                                                                   }) => {
    const {setActiveDiscussion, activeDiscussion} = usePromptStore()

    const onNavigateToDiscussion = () => {
        setActiveDiscussion(ticket)
    }

    const isActive = activeDiscussion?.id === ticket.id

    return (
        <div
            onClick={onNavigateToDiscussion}
            className={cn(
                "flex items-start gap-4 p-2 overflow-hidden bg-neutral-100 border border-transparent hover:border-slate-200 transition hover:bg-neutral-200 cursor-pointer rounded-xl",
                isActive && "bg-[#2554AE] text-white hover:opacity-90 hover:bg-[#2554AE]",
                className
            )}>
            <UserAvatar avatarLabel={ticket.profile.username}/>
            <div className="flex flex-col items-start justify-start gap-2 overflow-hidden w-full">
                <div className="flex items-center justify-between w-full">
                    <div
                        className={cn(
                            "text-zinc-900 text-[15px] font-semibold font-vInter leading-normal truncate max-w-[80%]",
                            isActive && "text-white"
                        )}>{ticket.profile.username}</div>
                    <div className="flex items-center justify-between gap-1">
                        <div
                            className={cn(
                                "text-gray-500 text-[15px] font-normal font-vInter leading-normal",
                                isActive && "text-white"
                            )}>{ticket.lastMessage?.createdAt}
                        </div>
                        <div
                            className={
                                cn(
                                    "w-2 h-2 relative bg-neutral-200 rounded-[20px]",
                                    ticket.status === TicketStatus.Pending && "bg-red-400",
                                    ticket.status === TicketStatus.Processed && "bg-yellow-400",
                                    ticket.status === TicketStatus.Success && "bg-green-400",
                                )
                            }
                        />

                    </div>
                </div>
                {ticket.title && (
                    <div className={"overflow-hidden"}>
                        <div
                            className={cn(
                                "text-neutral-500 text-[15px] font-normal font-vInter truncate",
                                isActive && "text-[#efefef]/80"
                            )}>
                            {ticket.title}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const ChatSectionHead = () => {

    const {activeDiscussion} = usePrompStore()

    if (!activeDiscussion) {
        return (
            <div></div>
        )
    }

    if (activeDiscussion) {
        return (
            <div className={"p-6 bg-[#ecf3ff] rounded-tl-xl rounded-tr-xl flex items-center justify-between"}>
                <div className={"flex items-center gap-[14.11px]"}>
                    <UserAvatar avatarLabel={activeDiscussion.profile.username}/>
                    <div>
                        <div
                            className="text-black text-2xl font-semibold font-vInter leading-[37.77px]">{activeDiscussion.profile.username}</div>
                        <div
                            className="text-[#2554ae] text-xl font-light leading-[37.77px]">
                            {activeDiscussion.title}
                        </div>
                    </div>
                </div>
                <div>
                    <UserInfoItem label="Tel" value={activeDiscussion.profile.user.phone}/>
                    <UserInfoItem label="Email" value={activeDiscussion.profile.user.email}/>
                </div>
            </div>
        )

    }
}

const UserInfoItem: React.FC<{ label: string, value: string }> = ({label, value}) => {

    return (
        <div className={"text-black text-sm font-normal flex items-center gap-2"}>
            <div>{label} :</div>
            <div className="font-bold"> {value}</div>
        </div>
    )
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