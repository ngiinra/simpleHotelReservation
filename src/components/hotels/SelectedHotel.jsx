import React, { useEffect } from 'react'
import Loader from 'rsuite/Loader';
import { Link, useParams } from 'react-router-dom';
import { useHotels } from '../../context/HotelsProvider';

function SelectedHotel() {
    const { id } = useParams();
    const { singleHotel: hotel, getSingleHotel } = useHotels();
    useEffect(() => {
        getSingleHotel(id);
    }, [id])

    if (!hotel) return <Loader content="loading ..."/>
    return (
        <div>
            <Link to='/hotels'><button className='return-btn'>بازگشت ←</button></Link>
            <div className="hotel-indivisual" key={hotel.id} >
                <img src={hotel.xl_picture_url} onError={(e) => e.target.src = '/img/home/home-not-founded.webp'} />
                <div className="hotel-desc">
                    <h3 className="bold">{hotel.name}</h3>
                    <p><span className="bold">bedrooms no: </span>{hotel.bedrooms}</p>
                    <p><span className="bold">location: </span>{hotel.host_location}</p>
                    <p><span className="bold">summary: </span>{hotel.summary}</p>
                    <p><span className="bold">space: </span>{hotel.space}</p>
                    <p><span className="bold">description: </span>{hotel.description}</p>
                    <p className="bold">{hotel.price} $</p>
                </div>
            </div>
        </div>
    )
}

export default SelectedHotel