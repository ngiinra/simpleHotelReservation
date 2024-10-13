import React, { useEffect, useRef, useState } from 'react'
import { useHotels } from '../context/HotelsProvider'
import Loader from './Loader';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import useUserLocation from '../customHooks/useUserLocation';
import { toast } from 'react-toastify';

function Map() {
    const isSingleMode = useRef(false);
    const {getSingleHotel, getAllHotels} = useHotels();
    const [mapCenter, setMapCenter] = useState([52.36795586072917, 4.874447396294998]);
    const url = useLocation();
    const {userLocation, setUserPosition, isLoading:userLocationLoading, error:userLocationError} = useUserLocation();

    useEffect(()=>{
        const urlArray = url.pathname.split("/hotels/");
        if (urlArray.length === 2){
            isSingleMode.current = true;
        }
        else if (urlArray.length === 1){
            isSingleMode.current = false;
        }
    }, [url, isSingleMode]);


    if (isSingleMode.current){
        const urlArray = url.pathname.split("/hotels/");
        let {data} = getSingleHotel(urlArray[1].trim());
        setMapCenter(() => [data?.latitude, data?.longitude]);
    }
    const {data, isLoading} = getAllHotels();

    // showing single hotel or all hotel by checking url
    /*useEffect(() => {
        const urlArray = url.pathname.split("/hotels/");
        if (urlArray.length === 2 && allData.length !== 0) {
            const hotelData = allData.find(hotel => hotel.id === urlArray[1].trim());
            setMapCenter(() => [hotelData?.latitude, hotelData?.longitude]);
        }
    }, [url, allData]);*/

    // update location if user location had set 
    useEffect(()=>{
        if (userLocationError !== "")
            toast.error(userLocationError);
        else if (userLocation.length===2 && userLocation[0]!==null && userLocation[1]!==null)
            setMapCenter(userLocation);
    },[userLocation,userLocationError])

    if (isLoading) return <Loader />
    return (
        <div style={{width:"100%", height:"100%"}}>

            <button className='mapNearbyBtn' onClick={setUserPosition}>
                {userLocationLoading?"Loading ...":"find your nearby hotels"}
            </button>

            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <ChangeCenter position={mapCenter} />
                {data.map(
                    hotel => {
                        return (<Marker key={hotel.id} position={[hotel?.latitude, hotel?.longitude]}>
                            <Popup>
                                {hotel?.name}
                            </Popup>
                        </Marker>);
                    }
                )}
            </MapContainer>
        </div>
    )
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}
export default Map