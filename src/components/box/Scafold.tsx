"use client";

import React from "react";
import Loading from "@/components/ui/Loader";

const Scafold:React.FC<{title: string} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
  return (
      <div {...props}>
          <React.Suspense fallback={<Loading />}>
              {children}
          </React.Suspense>
      </div>
  )
}


export default Scafold
