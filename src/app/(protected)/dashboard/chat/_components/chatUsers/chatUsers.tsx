"use client"

import * as React from "react";
import {ChatUser} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatUtils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ListChecksIcon, UserCircle} from "lucide-react";
import {RiGlobalLine} from "react-icons/ri";
import {useCreateDiscussion, useGetDiscussionMembers, useGetDiscussions} from "@/hooks/chat/useDiscussions";
import Loading from "@/components/ui/Loader";
import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {Discussion} from "@/model/message/Message";
import {MoreIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/lib/utils";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import Driver from "@/model/driver/Driver";
import {DialogDriverItem} from "@/components/dialog/Dialog";
import {useGetDrivers} from "@/hooks/driver/useDriver";
import {DISCUSSION_TYPE} from "@/types/chat.types";
import {useGetTicketList} from "@/hooks/admin/useTicketHook";
import {TbPlaylistX} from "react-icons/tb";
import {PiPlaylist} from "react-icons/pi";
import {ListIcon} from "@/components/ui/__icons";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import {useRouter} from "next/navigation";

export const ChatUsersNav = () => {
    return (
        <div>
            <Users/>
        </div>
    )
}

const Users = () => {

    const {data: discussionsMembers, isLoading} = useGetTicketList()

    const membersList = discussionsMembers?.length ? discussionsMembers.filter((msg) => msg.isPending) : []

    return (
        <div className={""}>
            <Tabs defaultValue="account" className={"p-2"}>
                <TabsList className="grid w-full grid-cols-2 p-1 bg-zinc-100 rounded-[40px] mb-[36px]">
                    <TabsTrigger value="account" className={"mt-[-3px]"}>
                        <div className={"flex items-center gap-2"}>
                            <ListChecksIcon/>
                            <div>Tous</div>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="password" className={"mt-[-3px]"}>
                        <div className={"flex items-center gap-2 relative"}>
                            <TbPlaylistX fontSize={"24"}/>
                            <div>Non lus</div>
                            {membersList.length && <div
                                className={"absolute -top-2 -right-3 bg-[#FF0000] text-[#f2f2f2] rounded-full size-[18px] flex items-center justify-center"}>
                                {membersList.length ?? '-'}
                            </div>}
                        </div>
                    </TabsTrigger>
                </TabsList>
                {/*<NewDiscussion className={"mb-[24px]"}/>*/}
                <TabsContent value="account">
                    <div className={"flex flex-col gap-[8px]"}>
                        <MembersList discussionType={"general"}/>
                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <div className={"flex flex-col gap-[8px]"}>
                        <MembersList discussionType={"not-replied"}/>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const MembersList: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    discussionType?: "general" | "not-replied"
}> = ({discussionType}) => {

    const {parkID} = useGetParkID()
    const $router = useRouter()
    const [countID, setCountID] = React.useState(1)

    const {data: discussionsMembers, isLoading} = useGetTicketList()

    const isGeneral = discussionType === "general"
    const {setActiveDiscussion} = usePrompStore()

    React.useEffect(()=>{
        setCountID(2)
        if(countID == 2){
            window.location.reload()
        }
    }, [parkID])


    if (isLoading) {
        return (
            <Loading/>
        )
    }

    const messages = discussionsMembers?.length ? discussionsMembers.filter((msg) => isGeneral ? true : msg.isPending) : []

    if (messages.length) {
        return (
            <div className={"flex flex-col gap-[8px]"}>
                {messages.map((ticket, i) => (
                    <ChatUser ticket={ticket} key={i}/>
                ))}
            </div>
        )
    }

    if (!messages.length) {

        return (
            <div>
                <p className={"text-center text-gray-4"}>ça semble vide ici !</p>
            </div>
        )
    }
}

const NewDiscussion: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className}) => {

    const [selectDriverIsOpen, setSelectDriverIsOpen] = React.useState(false)

    const {data: drivers, isLoading} = useGetDrivers()
    const {handleCreateDiscussion} = useCreateDiscussion()


    const onCreateDiscussion = (driver: Driver) => {
        handleCreateDiscussion({
            with_profile_id: driver.id,
            type: DISCUSSION_TYPE.Direct_discussion,
            name: driver.getUsername,
            description: driver.getUsername
        })
    }
    return (
        <>
            <button
                onClick={() => setSelectDriverIsOpen(true)}
                className={cn(
                    "py-[11px] bg-sky-100 hover:bg-sky-200 transition rounded-full border border-blue-200 text-center text-blue-800 text-xs font-semibold font-vInter leading-[17.07px]",
                    "flex items-center justify-center gap-1 w-full",
                    className
                )}>
                <MoreIcon/>
                <div className="">
                    Demarrer une discussion
                </div>
            </button>

            <EntitySelectDialog<Driver, typeof DialogDriverItem>
                title={"Selectionner un chauffeur"}
                emptyMessage={"Aucun vehicule créé pour l’instant"}
                DisplayItem={DialogDriverItem}
                isSelect={true}
                selectMultiple={false}
                getData={() => drivers}
                isOpen={selectDriverIsOpen}
                onClose={() => setSelectDriverIsOpen(false)}
                onValidate={() => {
                    setSelectDriverIsOpen(false)
                }}
                handleSelectItems={(items) => {
                    if (items.length > 0) {
                        onCreateDiscussion(items[0])
                    }
                }}
            />
        </>
    )
}