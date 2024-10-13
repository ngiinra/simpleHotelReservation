import React from 'react'
import { useLocation } from 'react-router-dom'
import Loader from './Loader';
import {useHotels } from '../context/HotelsProvider';

function SelectedHotel() {
    const url = useLocation();
    const hotelId = url.pathname.split("/hotels/")[1];
    const {getSingleHotel}=useHotels();
    const {data:singleHotelData, isLoading:isSingleHotelLoaded} =getSingleHotel(hotelId);
    
    if (isSingleHotelLoaded || !singleHotelData) return <Loader/>
    return (
        <div className="hotel-min-card" onError={(e) => e.target.src = '/img/home/home-not-founded.webp'}>
            <img src={singleHotelData.xl_picture_url} />
            <div className="hotel-desc">
                <h3 className="bold">{singleHotelData.name}</h3>
                <p><span className="bold">bedrooms no: </span>{singleHotelData.bedrooms}</p>
                <p><span className="bold">location: </span>{singleHotelData.host_location}</p>
                <p className="bold">{singleHotelData.price} $</p>
            </div>
        </div>
    )
}

export default SelectedHotel