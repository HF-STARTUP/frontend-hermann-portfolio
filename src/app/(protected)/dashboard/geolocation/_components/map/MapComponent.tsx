"use client";

import React from "react";
import {GoogleMap, Marker, OverlayView, useJsApiLoader} from '@react-google-maps/api';
import {EnvVars} from "@/utils/const/envVars";
import {MapDriverCarPointProps} from "@/types/map/geolocation.types";
import {CarIllusIcon, PhoneIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import MapOptions = google.maps.MapOptions;
import Image from "next/image";
import Chip, {Badge} from "@/components/box/Chip";
import {Divider} from "@/components/box/Card";
import BtnBase from "@/components/elements/BtnBase";

const mapContainerStyle = {
    width: '100%',
    height: '680px',
};

const center = {
    lat: 4.084031,
    lng: 9.769437,
};

const carPosition = {
    lat: 4.086053,
    lng: 9.767849,
};

const logpomPosition = {
    lat: 4.0516,
    lng: 9.7679,
};

const restrictBounds = {
    north: 4.05,
    south: 3.75,
    west: 9.65,
    east: 9.85,
};

const MAP_ZOOM_SCALE_FACTOR = 3

const options: MapOptions = {
    streetViewControl: false,
    scaleControl: false,
    mapTypeControl: false,
    zoomControl: true,
    fullscreenControl: false,
    // restriction: {
    //     latLngBounds: restrictBounds,
    //     strictBounds: true,
    // },
};


const MapComponent: React.FC = () => {
    const {isLoaded} = useJsApiLoader({
        id: EnvVars.NEXT_PUBLIC_GOOGLE_MAP_API_ID,
        googleMapsApiKey: EnvVars.GOOGLE_MAP_API_KEY
    })

    const [map, setMap] = React.useState<google.maps.Map | null>()

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(carPosition);
        map.fitBounds(bounds);

        const listener = google.maps.event.addListener(map, 'idle', () => {
            // if(map.getZoom() !== undefined){
            //     if (map.getZoom() > 15) {
            //     }
            // }
            map.setZoom(15);

            google.maps.event.removeListener(listener);
        });

        setMap(map)
    }, [])


    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    const mapOverlayViews: MapDriverCarPointProps[] = [
        {
            carVariant: 'blue',
            position: {
                lat: 4.086053,
                lng: 9.767849,
            }
        },
        {
            carVariant: 'green',
            position: {
                lat: 4.083752,
                lng: 9.769621,
            }
        },
        {
            carVariant: 'yellow',
            position: {
                lat: 4.086942,
                lng: 9.770441,
            }
        },
        {
            carVariant: 'black',
            position: {
                lat: 4.083033,
                lng: 9.774888,
            }
        },
        {
            carVariant: 'black',
            position: {
                lat: 4.082310,
                lng: 9.782156,
            }
        },
    ]


    if (isLoaded) {
        return (
            <div className={`overflow-hidden relative rounded-2xl`}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={MAP_ZOOM_SCALE_FACTOR}
                    options={options}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <Marker position={logpomPosition}/>
                    {mapOverlayViews.map((overlay, key) => (<MapDriverCarPoint key={key} car={overlay}/>))}

                </GoogleMap>
            </div>
        );
    }

    return (
        <div className={`w-full h-full animate-pulse rounded-lg bg-[#f1f3f4]`}></div>
    )

};


const MapDriverCarPoint: React.FC<{
    car: MapDriverCarPointProps,
}> = ({car}) => {

    const carIconBaseClasses = `z-10`
    let variantClasses = ``

    switch (car.carVariant) {
        case "black":
            variantClasses = `text-[#000000]`
            break
        case "blue":
            variantClasses = `text-[#205DD3]`
            break
        case "yellow":
            variantClasses = `text-[#FEC600]`
            break
        case "green":
            variantClasses = `text-[#02B66A]`
            break
    }

    const carClasses = `${carIconBaseClasses} ${variantClasses}`

    return (
        <OverlayView
            position={car.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div className={`group relative size-[50px]`}>
                <div className={carClasses}>
                    <CarIllusIcon/>
                </div>
                <div
                    className={`h-[364px] w-[233px] shadow-lg bg-white absolute left-[45px] top-[-5px] z-[9999] rounded p-[12px] hidden group-hover:block transition duration-200 delay-100 ease-linear`}>
                    <div>
                        <div className={`w-full h-[80px] overflow-hidden rounded-lg`}>
                            <Image src={`/assets/faker/mapCar.png`} width={217} height={144} alt={``}/>
                        </div>
                        <div className={`py-4`}>
                            <div className={`font-bold text-[14px] leading-[15px] tracking-[-2%] mb-2`}>
                                <h4>Suzuki Celerio 2008 - Noire</h4>
                                <p>CE 920 BF</p>
                            </div>
                            <div className={`flex flex-col gap-1 mb-2`}>
                                <CarOverlayItem
                                    icon={<Image src={`/assets/faker/defaultCarOverviewItemUser.png`} width={24}
                                                 height={24} alt={`Car driver`}/>}
                                    label={`+237 698 114 558`}
                                />
                                <CarOverlayItem
                                    icon={<PhoneIcon/>}
                                    label={`Remy Hervé Ngono`}
                                />
                            </div>
                            <Chip name={`Intermédiaire`}/>
                            <div className={`mt-2`}>
                                <Divider/>
                            </div>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-2`}>
                        <BtnBase to={``} size={`sm`} shape={`square`} color={`grey`} fullwidth={true}>Faire sonner
                            l'alarme</BtnBase>
                        <BtnBase to={``} size={`sm`} shape={`square`} color={`blue`} fullwidth={true}>Arrêter le
                            véhicule</BtnBase>
                    </div>
                </div>
            </div>
        </OverlayView>
    )
}

const CarOverlayItem: React.FC<{ icon: React.ReactNode, label: string }> = ({icon, label}) => {
    return (
        <div
            className={`flex items-center justify-start gap-2 font-medium text-[14px] leading-[15px] text-admin-primary`}>
            {icon}
            <div>{label}</div>
        </div>
    )
}

export default MapComponent
