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
        <div className="grid grid-cols-2 grid-rows-1 w-full">
            <div className="min-h-full w-full bg-secondary p-2 text-[230px]/50 align-middle font-title text-primary">
                WHERE'S<br/>MY<br/>SON?
            </div>  
            <div className="min-h-full w-full flex">
                
                <Suspense fallback={<div className="bg-gray-200 animate-pulse rounded-2xl flex-1 m-8"/>}>
                    <DisplayMap locations={locations} />
                </Suspense>
            </div>
        </div>


    )
}

