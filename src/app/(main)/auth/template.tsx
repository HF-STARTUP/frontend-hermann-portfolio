import React from "react";
import Image from "next/image";
import vectorSky from "@/assets/img/design/vectorSky.png";
import Container from "@/components/box/Container";
import authBanner from "@/assets/img/illustrations/authBanner.png"

const Template:React.FC<{children: React.ReactNode}> = ({children})=>{
    return (
        <div className={`relative bg-sky-50 lg:bg-white`}>
            <div className={`w-full`}>
                <Container>
                    <div className={`py-[24px] lg:py-[105px] flex items-center justify-center md:block md:w-[461px] relative z-10 min-h-[600px]`}>
                        {children}
                    </div>
                </Container>
            </div>
            <Image src={vectorSky} alt="design vector line top" width={980}
                   className="hidden lg:block  absolute top-0 left-0 z-0"/>
            <Image priority={true} src={authBanner} alt={'auth banner'} className={`hidden xl:block absolute right-0 top-0`}  width={565} />
        </div>
    )
}


export default Template
