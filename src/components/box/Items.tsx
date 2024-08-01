import React from "react";
import {cn} from "@/utils/ui/cn";
export const VerticalDisplayListItemsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                      children,
                                                                                                      className,
                                                                                                      ...rest
                                                                                                  }) => {


    return (
        <div className={cn("flex flex-col gap-[20px]", className)} {...rest}>
            {children}
        </div>
    )
}
