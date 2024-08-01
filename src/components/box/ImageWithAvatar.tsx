import Image from "next/image";
import React from "react";
import VImageProvider from "@/components/helpers/VImageProvider";


type ImageWithAvatarProps = {
    bgImage: string,
    avatar?: string,
    variant?: 'default' | 'sm'
}
const ImageWithAvatar: React.FC<ImageWithAvatarProps> = ({ bgImage, avatar, variant = 'sm' }) => {
    const defaultBgImage = `/assets/faker/default-car-1.png`;

    const backgroundImageUrl = bgImage || defaultBgImage;

    const isDefault = variant === 'default'

    return (
        <div className={`relative w-fit`}>
            <div className={`overflow-hidden ${isDefault ? 'size-32 rounded-[20px]' : 'size-[64px] rounded-[9.97px]'} justify-center items-center inline-flex z-0 cursor-pointer hover:opacity-85 transition ease-in duration-200`}>
                <VImageProvider
                    src={backgroundImageUrl}
                    alt={''}
                    width={190}
                    height={190}
                    className={`group-hover:scale-105 object-cover ${isDefault ? 'size-32 rounded-[20px]' : 'size-[64px] rounded-[9.97px]'}`}
                />
            </div>
            {avatar && (
                <VImageProvider
                    src={avatar}
                    width={40}
                    height={40}
                    className={`size-[34px] rounded-[13px] border-4 border-white absolute bottom-[-5px] right-[-10px] z-10 cursor-pointer hover:opacity-94 hover:border-slate-200 transition ease-in duration-200`}
                    alt={''}
                />
            )}
        </div>
    );
};


// '/assets/faker/default-car-1.png'
// '/assets/faker/defaultUserAvatar.png'


export default ImageWithAvatar
