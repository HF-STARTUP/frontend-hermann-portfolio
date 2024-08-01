"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageTitle} from "@/components/typo/typo";
import {CheckBox, SelectField, SwitchField} from "@/components/form/TextField";

const NotificationsPage: React.FC = () => {

    const [notifyIsAllow, setNotifyIsAllow] = React.useState(false)

    const NOTIFICATION_OPTIONS = [
        {
            name: 'A chaque panne de véhicule constatée',
            active: true
        },
        {
            name: 'Lorsqu’un planning n’a pas encore été effectué (7 jours avant)',
            active: false
        },
        {
            name: 'Lorsque la recette d’un chauffeur en service n’a pas été encaissée la veille',
            active: false
        },
        {
            name: 'En cas de désaccord entre un chauffeur et un superviseur pendant une passation',
            active: false
        },
        {
            name: 'Lorsqu’un vehicule doit faire son entretien',
            active: false
        },
    ]

    return (
        <div>
            <AdminSettingBox>
                <AdminPageTitle withMb={true}>Notifications</AdminPageTitle>
                <div className={`flex flex-col`}>
                    <div className={`mb-[30px]`}>
                        <ItemWithCheck className={`mb-[26.5px]`}>
                            <TitleBolder name={'Autoriser les notifications'}/>
                            <SwitchField handleToggle={(s)=>{
                                setNotifyIsAllow(s)
                            }}/>
                        </ItemWithCheck>
                        <div className="w-full h-[0px] border border-violet-200"></div>
                        <ItemWithCheck className={`mt-[31.5px]`}>
                            <TitleBolder name={'Jouer un son pour les notifications'}/>
                            <SwitchField/>
                        </ItemWithCheck>
                    </div>
                    <div className={`mb-[8px]`}>
                        <TitleBolder name={"Recevoir des notifications:"}/>
                    </div>
                    <div className={`flex flex-col gap-[14px] relative`}>
                        {!notifyIsAllow&&<div className={`bg-white w-full h-full absolute opacity-80 z-20`}></div>}
                        {
                            NOTIFICATION_OPTIONS.map((notif, k) => (
                                <ItemWithCheck key={notif.name}>
                                    <TitleNormal name={notif.name}/>
                                    <CheckBox/>
                                </ItemWithCheck>
                            ))
                        }
                        <div className={`flex justify-start items-center gap-[6px]`}>
                            <SelectField fit={true} size={'sm'} variant={'rounded'}
                                         items={[{label: '1', value: '1'}, {label: '2', value: '2'}]}/>
                            <TitleNormal name={'jours avant la date prévue'}/>
                        </div>
                    </div>
                </div>
            </AdminSettingBox>
        </div>
    )
}

const ItemWithCheck: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                           children,
                                                                                                           ...props
                                                                                                       }) => {
    return (
        <div {...props}>
            <div className={`flex gap-[23px] justify-between w-[450px]`}>
                {children}
            </div>
        </div>
    )
}


const TitleBolder: React.FC<{ name: string }> = ({name}) => (
    <div className="max-w-[306px] text-[#506D82] text-base font-semibold finter leading-normal">{name}</div>)
const TitleNormal: React.FC<{ name: string }> = ({name}) => (
    <div className="max-w-[306px] text-gray-500 text-sm font-normal finter leading-[21.08px]">{name}</div>)

export default NotificationsPage
