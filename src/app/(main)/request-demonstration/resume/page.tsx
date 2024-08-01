"use client"

import React from "react";
import {HeroTitleColorized} from "@/components/typo/typo";
import {PrimaryBgSimpleWithVectorContainer} from "@/components/box/PrimaryBgCardContainer";
import Container from "@/components/box/Container";
import BtnBase from "@/components/elements/BtnBase";
import VAlert from "@/components/elements/Alert";
import CardDefault from "@/components/box/Card";

const ResumeDemoPage: React.FC = () => {
    return (
        <PrimaryBgSimpleWithVectorContainer>
            <Container>
                <div className={`py-[44px]`}>
                    <HeroTitleColorized>Votre rendez-vous</HeroTitleColorized>
                    <div className={`pt-[32px] pb-[25px]`}>
                        <VAlert name={'Votre rendez-vous a été réservé avec succès'}/>
                        <div className={`mt-[25px]`}>
                            <RequestDemoResumeData/>
                        </div>
                    </div>
                    <BtnBase color={'red'} variant={'contained'} to={''}>{'C\'est compris!'}</BtnBase>
                </div>
            </Container>
        </PrimaryBgSimpleWithVectorContainer>
    )
}

const RequestDemoResumeData = () => {

    const appointmentRecap = [
        {
            label: 'Quand:',
            content: 'ven. 12 janv. 2024 à 13:00:00 (fuseau horaire: Africa/Douala)'
        },
        {
            label: 'Durée:',
            content: '1 heure'
        },
        {
            label: 'Comment participer:',
            content: 'https://meet.vtccontrol.com/ido869ac5686+dsde87vs=kq'
        },
        {
            label: 'Lieu:',
            content: 'En ligne'
        },
        {
            label: 'Participants:',
            content: 'Loic Onguene'
        },
        {
            label: 'Détails:',
            content: [
                'Mobile : 696444547',
                'Email : loiconguene11@gmail.com',
                'Nom de la société: APPICORO',
                'Nombre d’employés: 5-20 employees',
                "Votre secteur d'activité: agricole",
                "Décrivez vos besoins: dascdqdddddqbkk lorem ipsum lorem ipsum",
                "Pour qui prenez-vous rendez-vous ?: My Company"
            ]
        },
    ]

    return (
        <CardDefault>
            <div className="flex-col justify-start items-start gap-2 inline-flex">
                {appointmentRecap.map(apointment => (
                    <AppointmentItem key={apointment.label} label={apointment.label} content={apointment.content}/>
                ))}
                <div className="text-stone-500 text-base font-medium">Congratulations,
                    your appointment is booked.
                    You'll receive a conference call meeting link by email before the meeting.
                    <br/><br/>Vous pouvez annuler ou reporter la réunion jusqu'à une heure avant la rendez-vous.
                    <br/>support@psatechnologie.com
                </div>
            </div>
        </CardDefault>
    )
}

type AppointmentInterface = {
    label: string
    content: string | string[]
}
const AppointmentItem: React.FC<AppointmentInterface> = ({label, content}) => {

    const isList = typeof content === 'object'
    const isUrl = !isList && content.split('https').length > 1

    return (
            <div className="flex flex-row justify-start items-start gap-2">
                <div className="text-stone-600 text-base font-medium whitespace-normal">{label}</div>
                <div className="text-gray-500 text-base font-normal whitespace-normal relative">
                    {!isList && !isUrl && <span>{content}</span>}
                    {!isList && isUrl && <a href={content} target="_blank" rel="noopener noreferrer"
                                            className="inline-block relative over:underline underline-offset-2 whitespace-normal break-all">{content}</a>}
                    {isList && (
                        <ul className="ml-8">
                            {content.map(v => (
                                <li className="list-disc whitespace-normal" key={v}>
                                    <span>{v.split(':')[0]}: </span>
                                    <span className="ml-2 text-gray-400">{v.split(':')[1]}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
    )
}


export default ResumeDemoPage
