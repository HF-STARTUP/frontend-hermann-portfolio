import {create} from 'zustand';
import User from "@/model/user/User";


type AppStore = {
    sidebarIsMinimized: boolean;
    toggleSidebar: (newSidebarStatus: boolean) => void;
    getIfSidebarIsMinimised: () => boolean;
    user: User | null
    setUser: (user: User)=>void
    getUser: (user: User)=>void
}


const useAppStore = create<AppStore>((set, getState) => ({
    sidebarIsMinimized: false,
    user: null,

    toggleSidebar: (newSidebarStatus) => set({sidebarIsMinimized: newSidebarStatus}),
    getIfSidebarIsMinimised: () => {
        return getState().sidebarIsMinimized
    },

    setUser: (user)=>{
        set({user})
    },
    getUser: ()=>{
        return getState().user
    }
}));

export default useAppStore;
