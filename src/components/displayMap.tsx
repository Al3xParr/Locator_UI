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
    const center = { lat: firstLoc?.lat ?? 53.283791, lng: firstLoc?.long ?? -1.668767 }

    const [points, setPoints] = useState<google.maps.LatLng[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    const [imageData, setImageData] = useState<Blob>()
    const [imageLoading, setImageLoading] = useState<boolean>(true)
    const [lastClickedLocation, setLastClickedLocation] = useState<number>()

    function onLoad() {
        setPoints([])
        allLocations.forEach((loc: LocationDTO) => {
            setPoints(points => [...points, new google.maps.LatLng(loc.lat, loc.long)])
        })
        setLoading(false)
    }

    async function locationClick(id: number) {
        if (lastClickedLocation == id){ return }

        setImageLoading(true)
        setLastClickedLocation(id)

        await fetch("http://localhost:8000/image_return", {
            method: "POST",
            headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ location_id: id })
        }).then(async (res) => {
                if (!res.body) {return}
                const blob = await new Response(res.body).blob()
                setImageData(blob)
            })
        setImageLoading(false)
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
                                        <Popover.Trigger onClick={(e) => locationClick(loc.id)}>
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
                                            {imageLoading ? <div>loading...</div>
                                                : <img className='max-h-[100px] max-w-[100px]' src={URL.createObjectURL(imageData!)}></img>
                                            }
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
