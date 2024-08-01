"use client"

import React from "react";
import {motion, Variants} from "framer-motion";
import AdminNavbar from "@/components/layout/admin/AdminNavbar/AdminNavbar";
import AdminSidebar from "@/components/layout/admin/sidebar/AdminSidebar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@/utils/func/notify.scss"
import useAppStore from "@/stores/global/useAppStore";
import {CheckTransactionStatusDialog} from "@/components/actions/Signout.action";
import {useCheckActiveSubscriptionInfos} from "@/hooks/subscription/useSubscription";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    
    const {} = useCheckActiveSubscriptionInfos()


    return (
        <React.Fragment>
            <AdminNavbar/>
            <LayoutContent>
                {children}
                <CheckTransactionStatusDialog/>
            </LayoutContent>
        </React.Fragment>
    )
}


const LayoutContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    const appStore = useAppStore();

    const variants: Variants = {
        open: {marginLeft: '290px', transition: {duration: 0.3, ease: 'easeInOut'}},
        minimized: {marginLeft: '80px', transition: {duration: 0.3, ease: 'easeInOut'}},
    };

    return (
        <div className={`flex bg-stone-50`}>
            <AdminSidebar/>
            <motion.div initial={false} animate={appStore.getIfSidebarIsMinimised() ? 'minimized' : 'open'}
                        variants={variants} className={`mt-[94px] w-full bg-transparent min-h-lvh`}>
                <div className={`pt-[40px] pl-[30px] pr-[24px]`}>
                    {children}
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer/>
            </motion.div>
        </div>
    );
};
export default AdminLayout

//bg-stone-50
