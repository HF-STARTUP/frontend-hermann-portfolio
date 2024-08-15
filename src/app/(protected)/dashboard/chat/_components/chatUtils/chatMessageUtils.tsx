import React from "react";
import {MessageModel} from "@/model/message/Message";
import {LiaCheckDoubleSolid} from "react-icons/lia";
import {CiClock1} from "react-icons/ci";
import {VTCC} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {MessageTicket} from "@/types/admin/ticket";
import {MessageTicketModel} from "@/model/ADMIN/ticket";
import AuthManagerGuard from "@/guard/AuthManagerGuard";

export const MessageDate: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div
            className="text-center text-black text-lg font-semibold font-vInter leading-none my-[16px]">{children}</div>
    )
}
export const ChatMdgContent: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    message: MessageTicketModel
}> = ({children, message}) => {

    const isReverse = AuthManagerGuard.getProfileID === message.senderProfileId

    return (
        <>
            {!isReverse && <div
                className={cn(
                    "p-2 bg-white rounded-tr-xl rounded-bl-xl rounded-br-xl border border-neutral-200 max-w-[566px] transition hover:bg-slate-50 cursor-default",
                    message.isImage && "w-fit"
                )}>
                {!message.isImage && <>
                    <div className="text-neutral-500 text-base font-normal font-vInter text-left line-clamp-5">
                        {message.description}
                    </div>
                    <div
                        className="text-right text-neutral-500 text-base font-normal font-vInter mt-1 flex gap-2 justify-end">
                        <div>{message.createdAt}</div>
                        {/*<div>*/}
                        {/*    {message.isSended && <LiaCheckDoubleSolid className={"text-green-500"}/>}*/}
                        {/*    {!message.isSended && <CiClock1 className={"text-gray-600"}/>}*/}
                        {/*</div>*/}
                    </div>
                </>}
                {message.isImage &&
                    <Image src={message.getImage}
                           alt={""}
                           width={321} height={214}
                           className={cn(
                               "h-[214px] w-auto  bg-white rounded-[21.40px] border border-gray-500/50",
                               message.isImage && "w-fit"
                           )}
                    />
                }
            </div>}

            {isReverse && <div className={"flex justify-end items-center"}>
                {!message.isImage && <div
                    className={"max-w-[566px] text-right text-black text-base font-normal cursor-default font-vInter p-2 bg-blue-50 rounded-tl-xl rounded-bl-xl rounded-br-xl border border-sky-100 hover:bg-slate-50 transition"}>
                    <div className="text-blue-800 text-base font-normal font-vInter">{message.description}</div>
                    <div
                        className="text-right text-black text-base font-normal font-vInter mt-1">{message.createdAt}</div>
                </div>}
                {message.isImage && <Image
                    src={message.description}
                    alt={""}
                    width={321}
                    height={214}
                    className={"h-[214px] w-auto  bg-white rounded-[21.40px] border border-gray-500/50"}
                />}
            </div>}
        </>
    )
}

export const EmptyMessage = () => {

    return (
        <div className={"flex items-center justify-center gap-2 text-gray-300 flex-col min-h-[400px]"}>
            <VTCC className={"text-[10px]"} width={80} height={80}/>
            <h4 className={"text-[#1A1D1F] font-bold text-[28px]"}>Vtccontrol Pro</h4>
            <p className={"text-gray-300 max-w-[250px] text-center"}>Cliquer sur une discussion pour commencer à
                ecrire</p>
        </div>
    )
}