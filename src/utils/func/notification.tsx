"use client";

import { Bounce, TypeOptions } from "react-toastify";
import { toast } from "@/components/ui/use-toast";





const notify = (message: string | undefined, type: TypeOptions = 'success') => {
    return toast({ title: message, variant: type === "error" ? "destructive" : "default", duration: 2000 })
}

export default notify