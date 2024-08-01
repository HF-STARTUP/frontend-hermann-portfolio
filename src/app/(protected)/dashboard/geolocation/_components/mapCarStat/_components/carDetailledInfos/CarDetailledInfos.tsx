import React from "react";
import {
    CalendarAltIcon,
    CalendarIcon,
    ChevronBackAltIcon, ChevronDownFilIcon,
    ChevronDownIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import useGeolocationStore from "@/stores/protected/dashboard/geolocation/useGeolocationStore";
import Image from "next/image";

const CarDetailledInfos: React.FC = () => {
    return (
        <div className={`bg-white rounded-[18px]`}>
            <div className={`px-[20px] py-[18px]`}>
                <DetailHead/>
                <CarInfos />
            </div>
            <div>
                <BodyTabs />
            </div>
        </div>
    )
}


const CarInfos:React.FC = () => {
  return(
      <div className={`font-medium text-[20px] leading-[25px] tracking-[-2%] flex gap-[20px] pb-[15px] cursor-default`}>
          <div className={`size-[122px] rounded-2xl overflow-hidden`}>
              <Image src={`/assets/faker/mapCarItem.png`} width={198} height={132} alt={''} />
          </div>
          <div>
              <div>SUZUKI Célério 2008</div>
              <div>CE 7815 KN - Noire</div>
              <div className={`font-normal text-[18px]`}>Confort +</div>
              <div className={`font-normal text-[18px]`}>No GPS: 678 145 478</div>
          </div>
      </div>
  )
}

const DetailHead: React.FC = () => {

    const {setSelectedCar} = useGeolocationStore()

    const handleBack = () => {
      setSelectedCar(undefined)
    }

    return (
        <div className={`cursor-default text-admin-primary leading-[25px] tracking-[-2%] font-medium flex items-center gap-[5px] pb-[34px]`}>
            <button className={`text-text-body text-[70px] cursor-pointer hover:translate-x-0.5 hover:opacity-80 transition duration-200`} onClick={handleBack}>
                <ChevronBackAltIcon/>
            </button>
            <div>Revenir à liste des véhicules</div>
        </div>
    )
}


const BodyTabs:React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'day'|'last7days'>(`day`)


    return(
        <div>
            <div className={`flex justify-between pr-[20px] text-admin-primary text-[16px]`}>
                <div className={`flex gap-[3px]`}>
                    <Tab onClick={()=>setActiveTab(`day`)} id={`day`} name={`Aujourd’hui`} activeItem={activeTab} />
                    <Tab onClick={()=>setActiveTab(`last7days`)} id={`last7days`} name={`les 7 derniers jours`} activeItem={activeTab} />
                </div>
                <button className={`hover:opacity-85 transition duration-200`}>
                    <CalendarAltIcon width={16} height={16} />
                </button>
            </div>
            <div className={`pt-[30px] bg-[#F4F7FE] px-[20px] py-[18px] min-h-[400px]`}>
                {activeTab === 'day' && <CarParcourItem />}
                {activeTab === 'last7days' && (
                    <div className={`flex flex-col gap-2`}>
                        <CarParcourItem label={`Mercredi 07 Nov. 2023`}/>
                        <CarParcourItem label={`Mercredi 07 Nov. 2023`}/>
                        <CarParcourItem label={`Mercredi 07 Nov. 2023`}/>
                        <CarParcourItem label={`Mercredi 07 Nov. 2023`}/>
                        <CarParcourItem label={`Mercredi 07 Nov. 2023`}/>
                    </div>
                )}
            </div>
        </div>
    )
}

const Tab:React.FC<{id: string, name: string, activeItem: string} & React.HTMLAttributes<HTMLDivElement>> = ({id, name, activeItem, ...props}) => {

    const isActive = activeItem === id

    return(
        <div className={`cursor-pointer hover:opacity-85 transition duration-200 
        ${isActive ? 'bg-[#F4F7FE] font-extrabold' : 'bg-white border'} rounded-t-[10px]  
        h-[33px] w-[123px] border-[#CCD6EE] border-b-0 flex items-center 
        justify-center align-middle text-admin-primary font-medium text-[12px] leading-[25px] tracking-[-2%]`} {...props}>
            {name}
        </div>
    )
}

const CarParcourItem:React.FC<{label?: string}> = ({label}) => {
    const [isActive, setIsActive] = React.useState(false)
    const [expanded, setExpanded] = React.useState(false)

    type ParcourItemProps = {hour: string, place: string, time: string}

    const PARCOUR_ITEMS: ParcourItemProps[] = [
        {hour: `11:08`, place: `À 100m de Carrefour Zachman Ndogbong :`, time: `15 min`},
        {hour: `14:07`, place: `À 20m de Parcours vita Makepe :`, time: `15 min`},
        {hour: `16:37`, place: `À Hopital Laquintinie Akwa :`, time: `15 min`},
        {hour: `17:47`, place: `À 20m de Tchop & Yamo Bonamoussadi :`, time: `15 min`},
    ]

    const onToggleExpend = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setExpanded(!expanded)
    }

    const LIItem:React.FC<{parcour: ParcourItemProps}> = ({parcour}) => {

        const {hour, place, time} = parcour

      return(
          <div className={`flex justify-between items-center font-extrabold text-[12px] leading-[25px] tracking-[-2%]`}>
              <div className={`text-[10px] font-normal`}>{hour}</div>
              <div className={`text-right`}>
                <span className={`font-normal`}>{place}</span>
                  <span>{time}</span>
              </div>
          </div>
      )
    }

  return(
<div>
    {label && <div className={`text-admin-primary font-normal text-[12px] leading-[25px] tracking-[-2%] mb-[2px]`}>{label}</div>}
    <div onClick={()=>setIsActive(!isActive)} className={`
      py-[10px] px-[20px]
      rounded-[14px] font-medium text-[14px]
      leading-[25px] tracking-[-2%] cursor-default border border-transparent 
      hover:border-text-body transition duration-200
      ${isActive ? 'bg-[#506D82] text-white' : 'bg-white text-admin-primary'}
      `}>
        <div className={`flex justify-between items-center`}>
            <div>345 Km</div>
            <div className={`flex gap-2`}>
                <div>09 arrêts (2heures)</div>
                <button onClick={onToggleExpend} className={`hover:scale-105 transition duration-200 ${expanded ? 'rotate-180' : ''}`}>
                    <ChevronDownFilIcon />
                </button>
            </div>
        </div>
        {expanded &&
            <div>
                {PARCOUR_ITEMS.map((item, key)=>(<LIItem key={key} parcour={item} />))}
            </div>
        }
    </div>
</div>
  )
}

export default CarDetailledInfos
