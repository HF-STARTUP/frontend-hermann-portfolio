import {create} from 'zustand';
import {Discussion, MessageModel} from "@/model/message/Message";


type AppStore = {
    promptValue: string;
    setPromptValue: (v: string)=>void

    activeDiscussion?: Discussion
    setActiveDiscussion: (discussion: Discussion)=>void

    activeMessages?: MessageModel[]
    initMessages: (messages: MessageModel[])=>void
    addNewMessage: (message: MessageModel)=>void


}


const usePromptStore = create<AppStore>((set, getState) => ({
    promptValue: '',

    setPromptValue: (v) => set({promptValue: v}),
    setActiveDiscussion: (discussion) => set({activeDiscussion: discussion}),

    initMessages: (messages) => set({activeMessages: messages}),

    addNewMessage: (message: MessageModel) => {
        const currentMessages = getState().activeMessages ?? [];
        const messageIndex = currentMessages.findIndex(m => m.frontID === message.frontID);

        if (messageIndex !== -1) {
            currentMessages[messageIndex] = message;
        } else {
            currentMessages.push(message);
        }

        set({ activeMessages: currentMessages });
    },



}));

export default usePromptStore;
