import React from "react";
import {GoogleMap, Marker, OverlayView, useJsApiLoader} from '@react-google-maps/api';
import {EnvVars} from "@/utils/const/envVars";
import MapOptions = google.maps.MapOptions;
import Image from "next/image";
import {cn} from "@/lib/utils";

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


const MapComponent: React.FC<React.HTMLAttributes<HTMLDivElement>&{addr?: {lat: number, lng: number}}> = ({className, addr}) => {
    const [marker, setMarker] = React.useState<{lat: number, lng: number}|null>(addr ?? logpomPosition);
    const {isLoaded} = useJsApiLoader({
        id: EnvVars.NEXT_PUBLIC_GOOGLE_MAP_API_ID,
        googleMapsApiKey: EnvVars.GOOGLE_MAP_API_KEY
    })

    const [map, setMap] = React.useState<google.maps.Map | null>()

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(addr ?? carPosition);
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

    const onMapClick = React.useCallback((event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarker({lat, lng});

        // Utiliser l'API de géocodage pour obtenir les informations du lieu
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({location: {lat, lng}}, (results, status) => {
            if (status === "OK" && results && results[0]) {
                console.log(results)
                console.log(results[4]);
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
            }
        });
    }, []);


    if (isLoaded) {
        return (
            <div className={cn(
                `overflow-hidden relative rounded-2xl h-[200px]`,
                className
            )}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={MAP_ZOOM_SCALE_FACTOR}
                    options={options}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={onMapClick}
                >
                    {marker&&<Marker position={marker}/>}

                </GoogleMap>
            </div>
        );
    }

    return (
        <div className={`w-full h-full animate-pulse rounded-lg bg-[#f1f3f4]`}></div>
    )

};




export default MapComponent
