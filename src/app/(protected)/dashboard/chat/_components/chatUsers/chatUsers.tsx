"use client"

import * as React from "react";
import {ChatUser} from "@/app/(protected)/dashboard/chat/_components/chatUtils/chatUtils";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UserCircle} from "lucide-react";
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

export const ChatUsersNav = () => {
    return (
        <div>
            <Users/>
        </div>
    )
}

const Users = () => {

    return (
        <div className={""}>
            <Tabs defaultValue="account" className={"p-2"}>
                <TabsList className="grid w-full grid-cols-2 p-1 bg-zinc-100 rounded-[40px] mb-[36px]">
                    <TabsTrigger value="account" className={"mt-[-3px]"}>
                        <div className={"flex items-center gap-2"}>
                            <UserCircle/>
                            <div>Individuel</div>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="password" className={"mt-[-3px]"}>
                        <div className={"flex items-center gap-2"}>
                            <RiGlobalLine fontSize={"24"}/>
                            <div>Global</div>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <NewDiscussion className={"mb-[24px]"}/>
                <TabsContent value="account">
                    <ScrollArea className="h-[58vh]">
                        <MembersList/>
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="password">
                    <div className={"flex flex-col gap-[8px]"}>
                        <MembersList discussionType={"general"}/>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

const MembersList:React.FC<React.HTMLAttributes<HTMLDivElement>&{discussionType?: "general"}> = ({discussionType }) => {

    const [activeDiscution, setActiveDiscution] = React.useState<Discussion>()

    const {data: discussions, isLoading: loadingDisucssion} = useGetDiscussions()
    const {data: discussionsMembers, isLoading} = useGetDiscussionMembers(activeDiscution?.id)

    const isGeneral = discussionType === "general"

    const {setActiveDiscussion} = usePrompStore()

    React.useEffect(() => {

        if (!loadingDisucssion && discussions?.length) {
            if (discussions.length > 0) {
                //setActiveDiscution(discussions[0])
                //setActiveDiscussion(discussions[0])
            }
        }

    }, [loadingDisucssion, discussions])

    if (loadingDisucssion) {
        return (
            <Loading/>
        )
    }

    if (discussions?.length) {
        return (
            <div className={"flex flex-col gap-[8px]"}>

                {isGeneral&&discussions.filter(d=>d.isGenenal).map((discussion, i) => (
                    <ChatUser discussion={discussion} key={i}/>
                ))}

                {!isGeneral&&discussions.filter(d=>!d.isGenenal).map((discussion, i) => (
                    <ChatUser discussion={discussion} key={i}/>
                ))}
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