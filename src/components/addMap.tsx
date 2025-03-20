'use client'

import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { addLocation } from './lib/serverCalls'

import { Location } from "../../utils/types"


export default function AddMap() {

    const containerStyle = {
        width: '600px',
        height: '600px',
    }

    const center = {
        lat: 53.283791,
        lng: -1.668767,
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.MAPS_API_KEY ?? ""
    })



    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const [markerLoc, setMarkerLoc] = useState<google.maps.LatLng | null>(null)

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])


    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    const onClick = React.useCallback(function callback(clickLocation: google.maps.MapMouseEvent) {
        setMarkerLoc(clickLocation.latLng)
    }, [])

    const [submitting, setSubmitting] = useState<boolean>(false)

    const locationSubmit = () => {
        setSubmitting(true)
        if (markerLoc != null) {
            addLocation(markerLoc).then(() => {
                setSubmitting(false)
            })
        }
    }

    return (
        <div className='flex'>
            {
                isLoaded
                    ?
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={onClick}>

                        {markerLoc ? <Marker position={markerLoc} /> : <></>}

                    </GoogleMap >
                    :
                    <div >Loading Map...</div>

            }
            <div className=''>
                <div>Lat: {markerLoc?.lat()}</div>
                <div>Long: {markerLoc?.lng()}</div>
            </div>

            <Button onClick={locationSubmit}>{submitting ? "Sending..." : "Add Location"}</Button>
        </div>
    )

}
