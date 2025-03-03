"use client";

import {Bounce, TypeOptions} from "react-toastify";
import React from "react";
import {cn} from "@/utils/ui/cn";
import {CloseIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {toast} from "@/components/ui/use-toast";





const notify = (message: string | undefined, type: TypeOptions = 'success') => {
    return toast({title: message, variant: type === "error" ? "destructive" : "default", duration: 2000})
}

export default notify

// {
//     position: "bottom-right",
//         autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     transition: Bounce,
//     type: type
// }
