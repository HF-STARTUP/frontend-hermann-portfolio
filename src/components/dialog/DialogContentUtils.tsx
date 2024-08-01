import React from "react";
import {CheckCircleIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import Image from "next/image";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {cn} from "@/utils/ui/cn";
import VImageProvider from "@/components/helpers/VImageProvider";

export const DialogCoverImage: React.FC<{
    withSuccess?: boolean,
    image?: string
}&React.HTMLAttributes<HTMLDivElement>> = ({ withSuccess, image, children, ...props }) => {
    const defaultImage = `/assets/faker/faker_planify.png`;

    const imageUrl = image || defaultImage;

    return (
        <div {...props}>
            <div className={`relative`}>
                <div className={`rounded-[18px] w-auto h-[300px] bg-no-repeat bg-cover bg-center`}
                     style={{backgroundImage: `url(${imageUrl})`}}>
                    <CardContainer>
                        <CardBody>
                            <CardItem translateZ={30} className="w-full h-[300px]">
                                <VImageProvider
                                    src={imageUrl}
                                    alt={''}
                                    width={486}
                                    height={300}
                                    className={`h-[300px] w-[486px] rounded-[18px]`}
                                />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </div>
                {withSuccess && (
                    <div className={`text-[135px] size-[135px] rounded-full text-success border-2 border-white absolute bottom-[-65px] left-[37%] flex items-center justify-center bg-white`}>
                        <CheckCircleIcon/>
                    </div>
                )}
                {children && (
                    <div className={`absolute left-[20px] bottom-[20px]`}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};


export const DialogSuccessTitle: React.FC<{ name: string } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                          name,
                                                                                                          ...props
                                                                                                      }) => {
    return (
        <div {...props}>
            <h2 className={`text-admin-primary font-bold max-w-[320px] text-[28px] text-center tracking-[-2%] leading-[28px]`}>{name}</h2>
        </div>
    )
}

export const DialogSuccessText: React.FC<{} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {

    return (
        <div {...props}>
            <p className={`text-admin-primary font-normal max-w-[385px] text-[17.55px] text-center tracking-[-2%] leading-[24.55px]`}>{children}</p>
        </div>
    )
}

export const DialogSuccessContent: React.FC<{} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {

    return (
        <div {...props}>
            <div className={`flex flex-col items-center justify-center gap-[30px]`}>
                {children}
            </div>
        </div>
    )
}

