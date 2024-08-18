"use client"
import React from "react";
import NavigationLoaderWrapper from "@/app/(webapp)/app/layout/ux/NavigationLoaderWrapper";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}


export default Template

