"use client";

import {create} from 'zustand';
import {CourseAddress} from "@/schema/course.schema";

type ClientStore = {
    activeAddress: CourseAddress[];
    setAddress: (v: CourseAddress) => void,
    removeAddressByName: (name: string) => void;
    reset: () => void;

}

const useClientStore = create<ClientStore>((set, getState) => ({
    activeAddress: [],
    setAddress: (add) => set({activeAddress: [...getState().activeAddress, add]}),
    removeAddressByName: (name) => set({
        activeAddress: getState().activeAddress.filter(address => address.name !== name)
    }),
    reset: ()=>{
        set({activeAddress: []})
    }

}));

export default useClientStore;
