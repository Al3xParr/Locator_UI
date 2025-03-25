export type LocationDTO = {
    id: number,
    time: string,
    long: number,
    lat: number,
    image_name: string
}

export type Location = {
    time: string,
    long: number,
    lat: number    
}

export interface AddMapProps {
    markerLoc: google.maps.LatLng | null,
    setMarkerLoc: Function
}