import {io, Socket} from "socket.io-client";
import {useGetParkID, useGetProfileID} from "@/hooks/__globlal/useGlobalHook";
import {getUid} from "@/lib/uuid";
import React from "react";
import usePromptStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {MessageModel} from "@/model/message/Message";
import {MessageResponseType} from "@/types/chat.types";
import chatService from "@/services/ChatService";


export enum SOCKET_GET_DATA {
    LIST_DISCUSSION = "get_user_discussions",
    REQUEST_MESSAGE = "request_messages",
    DISCUSSION_MESSAGES = "discussion_messages",
    NEW_MESSAGE = "new_message",
    JOIN_ROOM = "join_discussion",
    LIST_MESSAGE = "list_messages",
    ROOM_JOINED = "room_joined",
    MESSAGE_SEND = "message_sent",
    MESSAGE_READ = "message_read",
    USER_DISCUSSION = "user_discussions",
}

export enum SOCKET_POST_DATA {
    SEND_MESSAGE = "send_message",
    READ_MESSAGE = "read_message"
}

export enum MessageType {
    Text = "text",
    Image = "image",
    File = "file"
}

export type SendMessageInput = {
    from_profile_id: string
    front_id: string
    content: string
    message_type: MessageType,
    discussion_id: string
}

export type SendTextMesssageInput = {
    content: string
    message_type: MessageType
}
export const useChatSocket = () => {
    const {parkID} = useGetParkID();
    const {profile_id} = useGetProfileID();
    const {activeDiscussion} = usePromptStore();

    const {
        addNewMessage
    } = usePromptStore()

    const socketRef = React.useRef<Socket | null>(null);

    React.useEffect(() => {
        if (profile_id && parkID) {

            if (!socketRef.current) {
                socketRef.current = io("https://api-vtctl-staging.vtccontrol.com/live", {
                    reconnectionDelayMax: 10000,
                    query: {
                        "profile_id": profile_id,
                        "park_id": parkID,
                    }
                });

                socketRef.current.on(SOCKET_GET_DATA.NEW_MESSAGE, (message: MessageResponseType) => {
                    const newMessage = new MessageModel(message)
                    addNewMessage(newMessage)
                });

                socketRef.current.on(SOCKET_GET_DATA.USER_DISCUSSION, (message: MessageResponseType[]) => {
                    // const newMessage = new MessageModel(message)
                    // addNewMessage(newMessage)
                    void chatService.refreshDiscussion()
                });

                if (activeDiscussion) {
                    socketRef.current.emit(SOCKET_GET_DATA.JOIN_ROOM, JSON.stringify({discussion_id: activeDiscussion.id}));
                }

            }

        }


    }, [parkID, profile_id, activeDiscussion]);

    const sendTextMessage = (message: string, isImage = false) => {
        const data: SendMessageInput = {
            from_profile_id: profile_id,
            front_id: getUid(),
            content: isImage ? JSON.stringify({title: message, image: message}) : message,
            message_type: isImage ? MessageType.Image : MessageType.Text,
            discussion_id: '' + activeDiscussion?.id
        };


        addMessageToStore(data);

        socketRef.current?.emit(SOCKET_POST_DATA.SEND_MESSAGE, JSON.stringify(data));
    };

    const addMessageToStore = (message: SendMessageInput)=>{

        const messageInstance = new MessageModel(
            {
                ...message,
                isLocal: true,
                created_at: new Date(),
                updated_at: new Date()
            } as MessageResponseType
        )


        addNewMessage(messageInstance)
    }


    return {
        sendTextMessage,
        socket: socketRef.current
    };
};