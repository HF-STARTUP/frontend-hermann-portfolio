"use client";

import React from "react";

const VAlert:React.FC<{name: string}> = ({name}) => {
  return(
      <div className="px-[21px] py-[11px] bg-blue-100 rounded-md justify-center items-center gap-2.5 inline-flex">
          <span className="text-blue-800 text-sm lg:text-base font-bold">{name}</span>
      </div>
  )
}

export default VAlert
