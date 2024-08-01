import React from "react";
import Image from "next/image";
import VImageProvider from "@/components/helpers/VImageProvider";

export const DefaultDialogListItem: React.FC<{
    index?: string,
    selected?: string,
    title?: string,
    subtitle?: string,
    image?: string,
} & React.HTMLAttributes<HTMLDivElement>> = ({title , subtitle, image, children, selected='_', index = '/', ...props}) => {

    const isSelected = selected === index

    return (
        <div {...props}>
            <div
                className={`${isSelected ? 'bg-[#8E9BBA] text-white' : 'bg-[#F4F7FE] text-admin-primary hover:bg-sky-50'} px-[25px] py-[5px] flex justify-between rounded-2xl cursor-pointer  transition duration-200`}>
                <div className={`flex gap-[20px] items-center justify-center`}>
                    {image&& <div>
                        <div className={`rounded-[17.55px] overflow-hidden size-[50.88px] relative block`}>
                            <VImageProvider
                                src={`${image ?? `/assets/faker/default-car-1.png`}`}
                                alt={''}
                                width={55}
                                height={55}
                                className={`size-[50.88px]`}
                            />
                        </div>
                    </div>}
                    <p className={`font-medium text-[14px] leading-[15px] tracking-[-2%]`}>
                        <span className={`block`}>{title ?? `Toyota Corolla 2008`}</span>
                        <span className={`block`}>{subtitle ?? 'CE 7842 GT - Noire'}</span>
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}
