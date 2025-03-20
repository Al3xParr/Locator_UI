import { DATA_API } from "../../../utils/apis"
import { Location } from "../../../utils/types"

import { Suspense, use } from 'react'

async function get_location_data() : Promise<Location[]>{
    const data_call = await fetch(DATA_API.GET_ALL_LOCATIONS)
    const location_data = await data_call.json()

    return location_data
}


export function Map({locations}: {locations: Promise<Location[]>}){

    const all_locations = use(locations)

    return(
        <ul>
        {all_locations.map((location : Location) => (
            <li className="flex gap-2 border">
                <div>{location.id}</div>
                <div>{new Date(location.time).toUTCString()}</div>
                <div>{location.lat}</div>
                <div>{location.long}</div>
            </li>
        )
        )}
    </ul>
    )

}


export default async function Body(){

    const locations = get_location_data()

    return(
        <Suspense fallback={<div>Loading Data...</div>}>
            <Map locations={locations}/>
        </Suspense>
    )
}

