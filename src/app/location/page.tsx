'use client'
import AddMap from "@/components/addMap";
import { Button, Inset } from "@radix-ui/themes";
import { Image, ImageUp, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Location() {

    const [markerLoc, setMarkerLoc] = useState<google.maps.LatLng | null>(null)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [image, setImage] = useState<File | null>(null)

    const locationSubmit = () => {
        setSubmitting(true)
        if (markerLoc != null) {
            // addLocation(markerLoc).then(() => {
            //     setSubmitting(false)
            // })
        }
    }

    const getLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((poistion) => {
                setMarkerLoc(new google.maps.LatLng(poistion.coords.latitude, poistion.coords.longitude))
            })
        } else {
            console.log("not supported")
        }
    }

    return (
        <div className="grid grid-cols-2 grid-rows-1 w-full font-title text-primary ">

            <AddMap markerLoc={markerLoc} setMarkerLoc={setMarkerLoc} />

            <div className='bg-secondary p-5 flex flex-col'>
                <div className="text-7xl font-bold">Add Location</div>
                <div className="m-8">
                    <div>Lat: {markerLoc?.lat() ?? 0}</div>
                    <div>Long: {markerLoc?.lng() ?? 0}</div>
                    <Button onClick={getLocationClick} className="font-title">Use My Location<MapPin /></Button>
                </div>
                <div className={`border ${image ? "" : "border-dashed"} rounded-2xl min-h-[200px] max-h-[500px] overflow-clip flex justify-around relative`}>
                    {image ? 
                    <img src={window.URL.createObjectURL(image!)} alt="Image upload"/> 
                    : 
                    <div className="flex flex-col w-full h-full items-center text-2xl ">
                        <ImageUp className="" size={100}/>
                        <div>Upload Image</div>
                    </div>
                    }

                    <input className="text-secondary absolute h-full w-full" type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files![0])}/>

                </div>
                <div className="flex">
                    <span className="flex-1"></span>
                    <Button onClick={locationSubmit} className="">
                        {submitting ? "Sending..." : "Add Location"}
                    </Button>
                </div>


            </div>


        </div>
    )
}