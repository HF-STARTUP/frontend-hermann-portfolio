import React from "react";
import {Navbar} from "@/app/(webapp)/app/layout/header/Navbar";
import {Sidebar} from "@/app/(webapp)/app/layout/sidebar/Sidebar";

const SiteNav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (

        <div>
            <Navbar/>
            <Sidebar/>
            <div className={"ml-[320px] pt-[110px] mr-[100px]"}>
                <main>
                    {children}
                </main>
            </div>
        </div>

    )
}

export const SiteNavComp: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}