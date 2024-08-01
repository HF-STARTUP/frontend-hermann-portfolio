import PrimaryBgCardContainer from "@/components/box/PrimaryBgCardContainer";
import Container from "@/components/box/Container";
import vtcpc from '@/assets/img/illustrations/vtc-pc.png'
import Image from "next/image";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";

const Platform = ()=>{

    return(
        <PrimaryBgCardContainer>
            <Container>
                <div className={`py-[69px] flex flex-col gap-[56px] justify-center items-center`}>
                    <h2 className="text-center text-white  text-2xl lg:text-[40px] font-bold font-['DM Sans'] lg:leading-[50px] max-w-[761px]">Aussi bien pour un travail de bureau que de terrain</h2>
                    <Image src={vtcpc} alt={'platform'} className={`w-full  max-w-[1157px]`} />
                    <div className="lg:max-w-[1170px] text-center text-white text-xl font-medium font-['DM Sans']">Planifiez dès maintenant une démo gratuite et découvrez comment VTCControl peut transformer votre manière de gérer vos véhicules ou contactez notre équipe pour discuter de la manière dont nous pouvons répondre à vos besoins spécifiques</div>
                    <BtnBase fontWeight={"bold"} variant={'outline'} color={'white'} size={'sm'} to={NAVIGATIONS_URL.requestDemo.url}>Planifier une démo</BtnBase>
                </div>
            </Container>
        </PrimaryBgCardContainer>
    )
}

export default Platform
