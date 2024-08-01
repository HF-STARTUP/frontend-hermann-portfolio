"use client"

import Link from "next/link";
import React from "react";
import {cn} from "@/lib/utils";

const VLinkProvider: React.FC<{
    to?: string,
    disabled?: boolean,
    children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
                                                          to,
                                                          children,
                                                          disabled = false,
                                                          className,
                                                          onClick,
                                                          ...props
                                                      }) => {
    return (
        <>
            {to
                ? <Link className={cn(className)} href={to} {...props}>
                    {children}
                </Link>
                : <button type={"button"} disabled={disabled}
                          onClick={(e) => onClick && onClick(e as unknown as React.MouseEvent<HTMLAnchorElement>)}>
                    <span className={className}>{children}</span>
                </button>
            }

        </>
    )
}
export default VLinkProvider
