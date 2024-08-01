import Container from "@/components/box/Container";
import Image from "next/image";
import gestionPerson from '@/assets/img/illustrations/gestion-person.png'
import gestionDriver from '@/assets/img/illustrations/gestion-driver.png'
import gestionCar from '@/assets/img/illustrations/gestion-car.png'

const FlotManagement = () => {

    const ILLUSTRATIONS = [
        {
            label: 'Solution person',
            img: gestionPerson
        },
        {
            label: 'Solution driver',
            img: gestionDriver
        },
        {
            label: 'Solution car',
            img: gestionCar
        }
    ]

    return (
        <div className={`bg-sky-50 pt-[40px] lg:pt-[90px] relative w-full`}>
            <Container>
                <div className={`h-full flex flex-col lg:flex-row gap-[54px] justify-between items-start w-full`}>
                    <div className={`max-w-[510px]`}>
                        <div className={'flex  flex-col gap-[28px]'}>
                            <h4 className={`text-center lg:text-justify text-black text-2xl font-bold leading-7 `}>La solution ultime de gestion
                                de flotte VTC. </h4>
                            <p className={`text-justify text-black text-base font-normal leading-tight`}>
                                Nous comprenons que chaque minute compte, c'est pourquoi nous avons créé une plateforme
                                innovante qui va au-delà de la simple gestion de flotte, pour propulser votre entreprise vers de
                                nouveaux sommets. Que vous ayez une petite ou une grande flotte libérez votre potentiel avec
                                VTCControl.
                            </p>
                        </div>
                    </div>
                    <div className={''}>
                        <div className={'grid grid-cols-12 gap-[24px]'}>
                            {
                                ILLUSTRATIONS.map((illus, index)=>(
                                    <div className={`col-span-4`} key={index}>
                                        <Image className={`w-auto`} src={illus.img} alt={'Solution person'} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default FlotManagement
