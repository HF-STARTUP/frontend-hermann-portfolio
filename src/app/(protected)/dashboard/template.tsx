import React from "react";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {


    return (
        <div className={`relative pb-10`}>
            <div>
                {children}
            </div>
        </div>
    )
}


export default Template
