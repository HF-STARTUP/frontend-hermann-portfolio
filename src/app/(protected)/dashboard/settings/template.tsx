import React from "react";
import SettingSidebar from "@/app/(protected)/dashboard/settings/_components/SettingSidebar";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {


    return (
        <div className={`relative`}>
            <AdminSubNav title={`Parametres`} withFilterSection={false} withUserSetting={false}/>
            <div className={`flex bg-white min-h-[70vh]`}>
                <SettingSidebar />
                <div className={`w-full`}>{children}</div>
            </div>
        </div>
    )
}


export default Template
