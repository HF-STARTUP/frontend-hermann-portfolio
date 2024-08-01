import React from "react";
import {SelectField, VSelectProp} from "@/components/form/TextField";

const FormGroup: React.FC<{
    children: React.ReactNode,
    auth?: boolean,
    adminForm?: boolean,
    groupTitle?: string
} & React.HTMLAttributes<HTMLDivElement>> = ({children, auth, groupTitle, adminForm, ...props}) => {
    return (
        <div {...props}>
            {groupTitle && <h4 className={`text-admin-primary mb-[20px] font-bold`}>{groupTitle}</h4>}
            <div className={`flex flex-col ${auth ? 'gap-[26px]' : (adminForm ? 'gap-[22px]' : 'gap-[10px]')}`}>
                {children}
            </div>
        </div>
    )
}

export const AuthFormContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children})=> {

    return(
        <div className={`bg-white py-[18px] px-[15px] rounded-md border border-neutral-400 border-opacity-60
                    lg:bg-transparent lg:py-0 lg:px-0 lg:border-0
                `}>
            {children}
        </div>
    )
}


export const SystemOptionItem:React.FC<{items: VSelectProp[], title: string, loading?: boolean}> = ({items, title, loading})=> {
    return(
        <div className={`flex gap-[24px] items-center justify-start`}>
            <div className="text-gray-500 text-base font-mediumleading-normal max-w-[800px]"> { title } </div>
            <SelectField loading={loading} items={items} fit={true} variant={'rounded'} size={'sm'}  />
        </div>
    )
}

export default FormGroup
