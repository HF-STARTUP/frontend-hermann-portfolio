import Container from "@/components/box/Container";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import NavArrow from "@/components/app/NavArrow";
import calendar from '@/assets/img/icons/calendar.png'
import fournisseur from '@/assets/img/icons/fournisseur.png'
import geolocalisation from '@/assets/img/icons/geolocalisation.png'
import mobile from '@/assets/img/icons/mobile.png'
import money from '@/assets/img/icons/money.png'
import vehicule from '@/assets/img/icons/vehicule.png'
import Image, {StaticImageData} from "next/image";
import React from "react";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";


type Fonctionnality = {
    icon: StaticImageData,
    title: string,
    desc: string,
    url: string,
    gradiant: string,
    isDaltonian?: boolean
}

const Fonctionnalities = () => {
    return (
        <div className={'bg-orange-50 relative py-[75px]'}>
            <Container>
                <div className={'flex flex-col justify-center items-center gap-[18px] lg:gap-[74px'}>
                    <h2 className="text-black text-2xl lg:text-[40px] font-bold leading-10 lg:leading-[50px] text-center">Des fonctionnalités
                        pratiques</h2>
                    <div>
                        <FunCards/>
                    </div>
                    <div className={`mt-[40px] animate-bounce`}>
                        <BtnBase color={'yellow'} variant={'outline'} to={NAVIGATIONS_URL.requestDemo.url}>Essayez gratuitement</BtnBase>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export const FunCards = () => {

    const FUNCTIONNALITIES = [
        {
            icon: calendar,
            title: 'Planning automatique',
            desc: 'Organisez les rotations de vos chauffeurs et véhicules en évitant les conflits d\'emploi du temps.',
            url: '/',
            gradiant: 'hover:from-blue-700 hover:to-sky-500',
        },
        {
            icon: money,
            title: 'Suivi et encaissements des recettes',
            desc: 'suivez les revenus générés par la flotte,en enregistrant les paiements et en facilitant l\'encaissement des recettes.',
            url: '/',
            gradiant: 'hover:from-amber-500 hover:to-yellow-400',
            isDaltonian: true
        },
        {
            icon: vehicule,
            title: 'Suivi auto de pannes et entretiens de véhicule',
            desc: 'Assurez le bon état de votre flotte et minimiser les temps d’immobilisation',
            url: '/',
            gradiant: 'hover:from-red-800 hover:to-red-600'
        },
        {
            icon: fournisseur,
            title: 'Gestion fournisseurs',
            desc: 'Centralisez   la   gestion   de   vos   fournisseurs   de services automobiles',
            url: '/',
            gradiant: 'hover:from-lime-800 hover:to-lime-600'
        },
        {
            icon: geolocalisation,
            title: 'Géolocalisation',
            desc: 'Localisez et suivez en temps réel l\'emplacement de chacunde vos véhicules',
            url: '/',
            gradiant: 'hover:from-neutral-800 hover:to-neutral-400'
        },
        {
            icon: mobile,
            title: 'Application mobile',
            desc: 'Une extension mobile de VTCC pour vos chauffeurs et agents de terrain',
            url: '/',
            gradiant: 'hover:from-fuchsia-950 hover:to-fuchsia-600'
        },
    ] satisfies Fonctionnality[]
    return (
        <div className={`grid grid-cols-12 gap-[24px] justify-center`}>
            {
                FUNCTIONNALITIES.map((funcInfo, index) => (
                    <FuncCard item={funcInfo} key={index}/>
                ))
            }
        </div>
    )
}

const FuncCard: React.FC<{ item: Fonctionnality }> = ({item}) => {
    return (
        <div
            className={`px-[35px] py-[39px] bg-white rounded-[20px] shadow bg-gradient-to-bl  text-zinc-800 col-span-12 md:col-span-6 xl:col-span-4 ${item.gradiant}  ${item.isDaltonian ? 'card-func-dalt hover:text-black' : 'card-func hover:text-white transition-[background-color,color] ease-linear delay-75 duration-300'}`}>
            <div>
                <div className="flex-col justify-start items-center gap-[29px] flex">
                    <Image width={80} src={item.icon} alt={item.title}/>
                    <div
                        className="text-center text-[18.67px] lg:text-[28px] font-bold  leading-relaxed lg:leading-9"> {item.title} </div>
                    <div
                        className="text-center text-base font-normal leading-normal">{item.desc}</div>
                    <div className="justify-start items-center gap-0.5 inline-flex text-blue-700 nav-link">
                        <VLinkProvider to={''}>
                            <div
                                className="text-center  text-base font-semibold fpoppins leading-normal">En
                                savoir plus
                            </div>
                        </VLinkProvider>
                        <div className="w-5 h-5 justify-center items-center flex">
                            <NavArrow/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fonctionnalities
