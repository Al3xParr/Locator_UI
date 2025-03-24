'use client'

import { Map, APIProvider, AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'

import { use } from 'react'
import { LocationDTO } from '../../utils/types'
import { Popover } from '@radix-ui/themes'
import { Polyline } from './map/polyline'

export default function DisplayMap({ locations }: { locations: Promise<LocationDTO[]> }) {

    const allLocations = use(locations)
    const firstLoc = allLocations.at(0)
    const center = {lat: firstLoc?.lat ?? 53.283791, lng: firstLoc?.long ?? -1.668767}

    const [points, setPoints] = useState<google.maps.LatLng[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    function onLoad() {
        setPoints([])
        allLocations.forEach((loc: LocationDTO) => {
            setPoints(points => [...points, new google.maps.LatLng(loc.lat, loc.long)])
        })
        setLoading(false)
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
                        mapId={"1"}>
                        {
                            allLocations.map((loc: LocationDTO, index) => {
                                return (

                                    <Popover.Root key={loc.id}>
                                        <Popover.Trigger>
                                            <AdvancedMarker key={loc.id} position={{ lat: loc.lat, lng: loc.long }}>
                                                <Pin>
                                                    {(index + 1).toString()}
                                                </Pin>
                                            </AdvancedMarker>
                                        </Popover.Trigger>
                                        <Popover.Content align='start'>
                                            <div>{new Date(loc.time).toDateString()}</div>
                                            <div>Latitude: {loc.lat}</div>
                                            <div>Longitude: {loc.long}</div>
                                        </Popover.Content>
                                    </Popover.Root>
                                )
                            })
                        }
                        <Polyline strokeColor="#000000" strokeWeight={2} path={points} />
                    </Map>
                }
            </APIProvider>

        </div>
    )
}
