'use client'

import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api'
import React from 'react'

import { use } from 'react'
import { LocationDTO } from '../../utils/types'

export default function DisplayMap({ locations }: { locations: Promise<LocationDTO[]> }) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.MAPS_API_KEY ?? ""
    })
    const all_locations = use(locations)

    const points = [] as google.maps.LatLng[]

    //all_locations.forEach((loc: LocationDTO) => {
    //    points.push(new google.maps.LatLng(loc.lat, loc.long))
    //})

    const containerStyle = {
        width: '600px',
        height: '600px',
    }

    const center = {
        lat: 53.283791,
        lng: -1.668767,
    }





    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {

        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])


    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    return (
        <div>
            {
                isLoaded
                    ?
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}>

                        {
                            all_locations.map((loc: LocationDTO, index) => {
                                return (<Marker key={loc.id} position={{ lat: loc.lat, lng: loc.long }} />)
                            })
                        }

                        <Polyline path={points} />

                    </GoogleMap >
                    :
                    <div >Loading Map...</div>

            }
        </div>
    )

}
