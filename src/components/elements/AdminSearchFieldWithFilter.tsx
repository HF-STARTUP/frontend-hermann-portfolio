"use client";

import {SearchTextField} from "@/components/form/TextField";
import {FilterIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import React from "react";

const AdminSearchFieldWithFilter:React.FC<{variant?: `dialogCtx` | `main`} & React.HTMLAttributes<HTMLDivElement>> = ({variant, ...props}) => {

    const isMainCtx = variant === `main`

  return(
      <div {...props}>
          <div className={`flex gap-4 items-center justify-center`}>
              <div className={`${isMainCtx ? '' : 'shadow bg-white py-[10px] px-[10px] rounded-[10px]'}`}>
                  <SearchTextField fieldVariant={isMainCtx ? `main` : 'default'} placeholder={'Rechercher'}/>
              </div>
              <button
                  className={`text-text-body flex items-center justify-center gap-2 font-normal text-[14px] leading-[20px] tracking-[-2%]`}>
                  <FilterIcon/>
                  <div>Trier par nom ...</div>
              </button>
          </div>
      </div>
  )
}

export default AdminSearchFieldWithFilter
