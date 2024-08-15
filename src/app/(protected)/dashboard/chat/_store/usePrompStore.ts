import {create} from 'zustand';
import {MessageModel} from "@/model/message/Message";
import {TicketModel} from "@/model/ADMIN/ticket";


type AppStore = {

    promptValue: string;
    setPromptValue: (v: string) => void

    activeDiscussion?: TicketModel
    setActiveDiscussion: (discussion: TicketModel) => void

    activeMessages?: MessageModel[]
    initMessages: (messages: MessageModel[]) => void
    addNewMessage: (message: MessageModel) => void

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

        set({activeMessages: currentMessages});
    },


}));

export default usePromptStore;
