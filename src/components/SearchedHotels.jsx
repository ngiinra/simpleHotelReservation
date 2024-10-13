import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "../context/HotelsProvider";

export default function SearchedHotels() {

    const { allData, isLoading } = useHotels();
    if (isLoading) return <Loader />
    return (
        <div>
            <h2 className="pl-2">founded hotels ({allData.length})</h2>
            {allData.map(hotel => {
                return (
                    <Link to={hotel.id} key={hotel.id} >
                        <div className="hotel-min-card" onError={(e) => e.target.src = '/img/home/home-not-founded.webp'}>
                            <img src={hotel.xl_picture_url} />
                            <div className="hotel-desc">
                                <h3 className="bold">{hotel.name}</h3>
                                <p><span className="bold">bedrooms no: </span>{hotel.bedrooms}</p>
                                <p><span className="bold">location: </span>{hotel.host_location}</p>
                                <p className="bold">{hotel.price} $</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}