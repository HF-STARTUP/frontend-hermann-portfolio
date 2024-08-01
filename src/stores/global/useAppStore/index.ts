import {create} from 'zustand';
import User from "@/model/user/User";

type SortType = 'asc' | 'desc'
export type FindModeType = 'main' | 'dialog'

type AppStore = {
    pageFindToken: string;

    filterToken: string;
    dialogFindToken: string;

    sortAsc: SortType;

    sidebarIsMinimized: boolean;
    abonAlertIsOpen: boolean;
    toggleSidebar: (newSidebarStatus: boolean) => void;
    toggleAbonAlert: (newStatus: boolean) => void;

    setFindToken: (token: string, mode?: FindModeType) => void;
    getFindToken: (mode?: FindModeType) => string;
    resetFindToken: () => void;

    getIfSidebarIsMinimised: () => boolean;
    getIfAbonAlertIsOpen: () => boolean;
    user: User | null
    setUser: (user: User) => void
    getUser: (user: User) => void

    setFilterToken: (token: string) => void;
    getFilterToken: () => string;

    setSortAsc: (token: SortType) => void;
    getSortAsc: () => SortType;
}


const useAppStore = create<AppStore>((set, getState) => ({
    pageFindToken: '',
    dialogFindToken: '',
    filterToken: '',
    sortAsc: 'asc',

    sidebarIsMinimized: false,
    abonAlertIsOpen: true,
    user: null,

    toggleSidebar: (newSidebarStatus) => set({sidebarIsMinimized: newSidebarStatus}),
    toggleAbonAlert: (newStatus) => set({abonAlertIsOpen: newStatus}),
    getIfSidebarIsMinimised: () => {
        return getState().sidebarIsMinimized
    },
    getIfAbonAlertIsOpen: () => {
        return getState().abonAlertIsOpen
    },

    setUser: (user) => {
        set({user})
    },

    getUser: () => {
        return getState().user
    },

    setFindToken: (token, dialogFindToken) => {
        isDialogFilterMode(dialogFindToken) ? set({dialogFindToken: token}) : set({pageFindToken: token})
    },

    getFindToken: (dialogFindToken) => {
        return isDialogFilterMode(dialogFindToken) ? getState().dialogFindToken : getState().pageFindToken
    },

    setFilterToken: (token) => {
        set({filterToken: token})
    },
    getFilterToken: () => {
        return getState().filterToken
    },

    setSortAsc: (asc) => {
        set({sortAsc: asc})
    },
    getSortAsc: () => {
        return getState().sortAsc
    },

    resetFindToken: () => {
        getState().setFindToken('', "dialog")
        getState().setFindToken('')
        getState().setFilterToken('')
        getState().setSortAsc('asc')
    },
}));

const isDialogFilterMode = (mode: FindModeType | undefined) => mode === 'dialog'

export default useAppStore;
