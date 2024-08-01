import React from "react";
import {MiddleHeadContainer} from "@/components/box/PrimaryBgCardContainer";
import Image from "next/image";
import Container from "@/components/box/Container";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";
import pVectorWhite from "@/assets/img/design/product/pVectorWhite.png";
import {ProductType} from "@/types/generic";
import {ALL_PRODUCTS} from "@/app/(main)/produit/_mock/product.mock";
import {HeroTitleColorized} from "@/components/typo/typo";

export const ProductHead: React.FC = () => {

    return (
        <div className={`hidden lg:block`}>
            <MiddleHeadContainer>Un produit sur<br/>mesure pour vous</MiddleHeadContainer>
        </div>
    )
}

const OneProduct: React.FC<{ product: ProductType }> = ({ product }) => {
    const productColorClass = `text-${product.color} hover:border-${product.color}`;

    const getColorClass = (color:string) => {
        switch (color) {
            case 'blue-700': return 'text-blue-700 hover:border-blue-700';
            case 'yellow-500': return 'text-yellow-500 hover:border-yellow-500';
            case 'red-500': return 'text-red-500 hover:border-red-500';
            case 'green-600': return 'text-green-600 hover:border-green-600';
            case 'zinc-500': return 'text-zinc-500 hover:border-zinc-500';
            case 'red-700': return 'text-red-700 hover:border-red-700';
            default: return 'text-gray-800 hover:border-gray-800';
        }
    };

    return (
        <div className={`px-6 py-[45px] bg-white rounded-[20px] shadow col-span-12 md:col-span-6 xl:col-span-4 border-4 border-transparent lg:hover:scale-125 duration-500 ${getColorClass(product.color)}`}>
            <Image src={product.cover} alt={product.title} className="mb-[10px]" />
            <div className="flex-col justify-start items-start gap-[29px] flex">
                <div className={`text-center ${productColorClass} text-[28px] font-bold font-['DM Sans'] leading-9 mb-[29px]`}>{product.title}</div>
                <div className="text-zinc-800 text-base font-normal font-['Mulish'] leading-normal">{product.description}</div>
            </div>
        </div>
    );
};


export const ProductsListContainer: React.FC = () => {

    return (
        <div className="py-[27px] lg:py-[128px] bg-gradient-to-bl from-blue-700 to-sky-500 relative">
            <div className={`relative z-10`}>
                <Container>
                    <div className={`lg:hidden mb-[27px]`}>
                        <HeroTitleColorized color={"white"}>Un produit sur<br/>mesure pour vous</HeroTitleColorized>
                    </div>
                    <div className={`flex flex-col gap-[44px] justify-center items-center`}>
                        <div className={`grid grid-cols-12 gap-[24px]`}>
                            {ALL_PRODUCTS.map((oneProduct, k)=>(
                                <OneProduct product={oneProduct} key={k} />
                            ))}
                        </div>
                        <BtnBase fit={true} color={'white'} variant={'outline'} to={NAVIGATIONS_URL.requestDemo.url}>Essayez gratuitement</BtnBase>
                    </div>
                </Container>
            </div>
            <Image src={pVectorWhite} alt="design vector line" width={800}
                   className="absolute top-[45px] right-0 z-0"/>
        </div>
    )
}
