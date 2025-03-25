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

            <div className='bg-secondary p-5 pb-0 flex flex-col'>
                <div className="text-7xl font-bold">Add Location</div>
                <div className="m-5 flex items-center">
                    <Button 
                        onClick={getLocationClick} 
                        className="font-title flex items-center"
                        size={"4"}
                        radius="large">
                            <MapPin size={30}/>
                    </Button>

                    <div className="pl-5 align-middle tracking-wide text-lg">
                        Latitude: {markerLoc?.lat() ?? 0}<br/>
                        Longitude: {markerLoc?.lng() ?? 0}
                    </div>
                </div>
                <div className={`border ${image ? "" : "border-dashed"} rounded-2xl min-h-[200px] max-h-[500px] overflow-clip flex flex-col items-center justify-evenly relative`}>
                    {image ? 
                    <img src={window.URL.createObjectURL(image!)} alt="Image upload"/> 
                    : 
                    <>
                        <ImageUp strokeWidth="1.8" size={100}/>
                        <div className="text-2xl">Upload Image</div>
                    </>
                    }

                    <input className="text-transparent absolute h-full w-full cursor-pointer" type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files![0])}/>

                </div>
                <div className="flex mt-5">
                    <span className="flex-1"></span>
                    <Button onClick={locationSubmit} className="">
                        {submitting ? "Sending..." : "Add Location"}
                    </Button>
                </div>


            </div>


        </div>
    )
}