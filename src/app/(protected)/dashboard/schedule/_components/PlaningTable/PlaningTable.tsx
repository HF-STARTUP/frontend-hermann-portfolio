import PlaningTableUtils from "@/app/(protected)/dashboard/schedule/_components/_utils/PlaningTableUtils";
import React from "react";
import BtnBase from "@/components/elements/BtnBase";
import {PrintIcon, SettingIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import useScheduleStore from "@/stores/protected/dashboard/schedule/useScheduleStore";
import {PLANING_TYPES} from "@/utils/staticData";
import {SCHEDULE_SUBURLS} from "@/utils/protectedNavigation";

const PlaningTable = () => {

    const scheduleStore = useScheduleStore()

    const planingTypeNotIsDriver = scheduleStore.activePlaningType !== PLANING_TYPES.drivers

  return(
      <div>
         <div>
             <PlaningTableUtils tableMode={'Mensuelle'} />
         </div>
          <div className={`mt-[20px] flex items-start justify-between gap-[14px] text-slate-500 text-lg font-medium leading-tight`}>
              <div>
                  {planingTypeNotIsDriver && <button className={`flex items-center justify-center gap-2 hover:opacity-80`}>
                      <PrintIcon/>
                      <span className={`block`}>Imprimer le calendrier</span>
                  </button>}
              </div>
              <div className={` flex flex-col items-end justify-end gap-[14px]`}>
                  <div className="">
                      <span>Chauffeurs actifs non planifiés cette semaine</span>
                      <span className={'font-normal ml-1'}>9/22</span>
                  </div>
                  <BtnBase
                      icon={<SettingIcon />}
                      color={'admin-primary'}
                      shape={'square'}
                      variant={'outline'}
                      to={SCHEDULE_SUBURLS.planingSettings.url}>Paramètres du planning</BtnBase>
              </div>
          </div>
      </div>
  )
}


export default PlaningTable
