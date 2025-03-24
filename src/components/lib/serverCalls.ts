import { DATA_API } from "../../../utils/apis";
import { Location } from "../../../utils/types";


export async function addLocation(location : google.maps.LatLng) : Promise<boolean> {
    
    const data : Location = {
        lat: location.lat(),
        long: location.lng(),
        time: new Date().toISOString(),
    }

    await fetch("http://localhost:8000/location", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'accept':  'application/json'},
        body: JSON.stringify(data)
    }).then((res) => {
        if(res.status == 200){
            return true
        }
        console.log(res.body)
    }).catch((err) => {
        console.log(err)
    })
    return false
}