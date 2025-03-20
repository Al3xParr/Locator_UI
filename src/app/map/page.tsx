import { DATA_API } from "../../../utils/apis"
import { LocationDTO } from "../../../utils/types"


import { Suspense } from 'react'
import DisplayMap from "@/components/displayMap"

async function get_location_data(): Promise<LocationDTO[]> {
    const data_call = await fetch("http://localhost:8000/location_all")
    const location_data = await data_call.json()

    return location_data
}


export default async function Body() {

    const locations = get_location_data()

    return (
        <Suspense fallback={<div>Loading Data...</div>}>
            <DisplayMap locations={locations}/>
        </Suspense>
    )
}

