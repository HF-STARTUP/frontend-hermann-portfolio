import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";

const PackInfo = ()=>{

    return(
        <div className="w-full lg:h-36 px-7 py-[23px] bg-white  rounded-md border-2 border-blue-700 justify-start items-start gap-2.5 flex flex-row lg:inline-flex">
            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-[15px] w-full">
                <div className={`flex flex-col items-center lg:items-start gap-[15px]`}>
                    <div className="text-[32px] font-bold leading-[41px] text-[#2D2D2D]">Offre personalisée</div>
                    <div className="max-w-[489px] text-base font-medium text-[#6B6B6B]">Pour les particuliers et entreprises qui possèdent plusieurs flottes de véhicules, confectionnez vous une offre sur mesure.</div>
                </div>
                <BtnBase fit color={'yellow'} variant={'contained'} to={NAVIGATIONS_URL.requestDemo.url}>Demander un devis</BtnBase>
            </div>
        </div>
    )
}

export default PackInfo
