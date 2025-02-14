import useFetch from "../customHooks/useFetch";
import { Loader } from 'rsuite';
export default function AllLocations(){
    const {allData, isLoading}= useFetch("http://localhost:5000/hotels");

    if (isLoading) return <Loader content="loading..."/>;
    return (
        <div className="locations">
            {allData.map(data=> {
                return (
                    <div className="location" key={data.id}>
                        <img className="location-pic" src={data?.xl_picture_url} onError={(e)=>e.target.src = '/img/home/home-not-founded.webp'}/>
                        <div className="location-all-desc">
                            <p>{data.smart_location}</p>
                            <p className="location-name">{data.name}</p>
                            <p> <span> € {data.price}</span> night</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}