"use client"

//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/app/_utils/network/reactQuery";
import React from "react";
import {Toaster} from "@/components/ui/toaster";
import PortfolioHydration from "@/components/providers/PortfolioHydration";

const GlobalLayoutProvider:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children })=>{
    return (
        <QueryClientProvider client={queryClient}>
            <PortfolioHydration>
                {children}
            </PortfolioHydration>
            {/*{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}*/}
            <Toaster />
        </QueryClientProvider>
    );
}

export default GlobalLayoutProvider
