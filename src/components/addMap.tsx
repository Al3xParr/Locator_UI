'use client'

import { Map, APIProvider, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'

import { AddMapProps } from "../../utils/types"


export default function AddMap({ markerLoc, setMarkerLoc }: AddMapProps) {

    const [loading, setLoading] = useState<boolean>(true)
    
    const center = { lat: 53.283791, lng: -1.668767 }

    function onLoad() {
        setLoading(false)
    }

    const onClick = (e : MapMouseEvent) => {
        setMarkerLoc(new google.maps.LatLng(e.detail.latLng!))
    }

    return (
        <div className='min-h-full min-w-full flex'>

            <APIProvider apiKey={''} onLoad={onLoad} >
                {loading ?
                    <div className="bg-gray-200 animate-pulse rounded-2xl flex-1 m-8" />
                    :

                    <Map
                        className='h-screen w-full'
                        defaultCenter={center}
                        defaultZoom={8}
                        mapId={"1"}
                        onClick={onClick}
                        >

                        {markerLoc ?

                            <AdvancedMarker position={markerLoc}>
                                <Pin>
                                </Pin>
                            </AdvancedMarker>
                            : <></>}

                    </Map>
                }
            </APIProvider>

        </div>




    )

}
