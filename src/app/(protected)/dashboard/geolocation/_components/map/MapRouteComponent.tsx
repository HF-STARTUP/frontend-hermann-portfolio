"use client";

import React from "react";
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { EnvVars } from "@/utils/const/envVars";
import MapOptions = google.maps.MapOptions;
import {CourseAddress} from "@/schema/course.schema";

const mapContainerStyle = {
    width: '100%',
    height: '415px',
};

const center = {
    lat: 4.084031,
    lng: 9.769437,
};

const options = {
    streetViewControl: false,
    scaleControl: false,
    mapTypeControl: false,
    zoomControl: true,
    fullscreenControl: false,
};

const MapRouteComponent: React.FC<{ startAddress?: CourseAddress | null, endAddress?: CourseAddress | null }> = ({ startAddress, endAddress }) => {
    const { isLoaded } = useJsApiLoader({
        id: EnvVars.NEXT_PUBLIC_GOOGLE_MAP_API_ID,
        googleMapsApiKey: EnvVars.GOOGLE_MAP_API_KEY
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [directions, setDirections] = React.useState<google.maps.DirectionsResult | null>(null);

    const fetchDirections = (startPos: any, endPos: any) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin: startPos,
            destination: endPos,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    };

    React.useEffect(() => {
        if (startAddress && endAddress) {
            const startPos = { lat: startAddress.latitude, lng: startAddress.longitude };
            const endPos = { lat: endAddress.latitude, lng: endAddress.longitude };
            fetchDirections(startPos, endPos);
        } else if (startAddress || endAddress) {
            // Centre the map on the single provided address
            const singleAddress = startAddress || endAddress;
            setMap(prevMap => {
                if(startAddress?.latitude && singleAddress?.longitude)
                    prevMap?.setCenter({ lat: singleAddress.latitude, lng: singleAddress.longitude });
                return prevMap;
            });
        }
    }, [startAddress, endAddress, map]);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    return (
        <div className={`overflow-hidden relative rounded-2xl`}>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                    options={options}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {directions && <DirectionsRenderer directions={directions} options={{
                        polylineOptions: {
                            strokeColor: "#00A656",
                            strokeWeight: 5,
                        },
                    }} />}
                    {startAddress && <Marker
                        position={{ lat: startAddress.latitude, lng: startAddress.longitude }}
                        icon={{
                            url: '/assets/routeCarMarker.png', // Replace with your image path
                            scaledSize: new google.maps.Size(30, 30) // Adjust size according to your needs
                        }}
                        zIndex={999}
                    />}
                    {endAddress && !startAddress && <Marker
                        position={{ lat: endAddress.latitude, lng: endAddress.longitude }}
                        icon={{
                            url: '/assets/routeCarMarker.png', // Replace with your image path
                            scaledSize: new google.maps.Size(30, 30) // Adjust size according to your needs
                        }}
                        zIndex={999}
                    />}
                </GoogleMap>
            )}
        </div>
    );
};

export default MapRouteComponent;
