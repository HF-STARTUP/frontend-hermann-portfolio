type MapCarColorType = 'green' | 'yellow' | 'black' | 'blue'


export type MapDriverCarPointProps = {
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    carVariant: MapCarColorType
}
