import {create} from "zustand";
import {getCurrentMonthYear} from "@/lib/utils";

type DashboardStore = {
    activeMonth: number,
    setMonth: (month: number) => void
}

export const useDashboardStore2 = create<DashboardStore>((set, getState) => ({
    activeMonth: getCurrentMonthYear().month,
    setMonth: (month) => set({activeMonth: month}),
}))
