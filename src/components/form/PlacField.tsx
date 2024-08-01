"use client"

import Autocomplete from "react-google-autocomplete";
//import {Autocomplete} from "@react-google-maps/api";
import {EnvVars} from "@/utils/const/envVars";
import React from "react";
import {cn} from "@/lib/utils";
import {CourseAddress} from "@/schema/course.schema";
import {LocationIconAlt} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";


export const PlaceFieldInput = React.forwardRef<React.HTMLAttributes<HTMLDivElement>, &{
    onSelectLocation: (location: CourseAddress) => void,
    label: string,
}>(({onSelectLocation, label, ...props}, ref) => {

    const _baseClassname = `m-0 block px-[8px] h-[32px] text-text-body h-[58px] px-[20px] py-[10px] text-stone-500
          w-full rounded-[9.19px] rounded-md'
          border-neutral-300 border border-solid border-opacity-60 bg-transparent
          bg-clip-padding text-base leading-tight text-neutral-700 transition duration-200
          ease-linear placeholder:text-stone-300 focus:border-primary text-[10px] font-normal
          focus:text-neutral-700 focus:outline-none peer-focus:text-primary focus:outline-offset-1 focus:outline-2 focus:outline-blue-200`

    const handlePlaceSelected = (place: any, inputRef: any, autocomplete: any) => {
        console.log("Place here")
        const address_name = place.formatted_address
        const address_lat = place.geometry.location.lat()
        const address_lng = place.geometry.location.lng()

        const addrs: CourseAddress = {
            name: address_name,
            description: `${address_name} ${address_lat} ${address_lng}`,
            latitude: address_lat,
            longitude: address_lng
        }

        console.log(place)
        console.log("place valus====")
        console.log(addrs)

        onSelectLocation(addrs)
    };


    return (
        <div>
            <label className="w-[452px] text-[#506D82] text-sm font-normal leading-normal mb-2 block">{label}</label>
            <div className={"relative"}>
                <Autocomplete
                    apiKey={EnvVars.GOOGLE_MAP_API_KEY}
                    onPlaceSelected={handlePlaceSelected}
                    options={{
                        types: ['geocode'],
                        //componentRestrictions: {country: "cm"}
                    }}
                    placeholder={""}
                    type={"text"}
                    className={cn(_baseClassname, "text-[16px] h-[45px]")}
                    {...props as any}
                />
                <div className={"absolute right-0 h-full px-5 top-0 flex items-center justify-center"}>
                    <LocationIconAlt/>
                </div>
            </div>
        </div>
    )
})

PlaceFieldInput.displayName = "PlaceFieldInputP"