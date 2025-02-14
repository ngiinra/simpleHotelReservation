import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import {useHotels } from "../context/HotelsProvider";
import Map from "../components/Map";

export default function HotelsMain() {
    const scrollRef = useRef(null);
    useEffect(() => scrollRef.current.scrollIntoView(), []);
    const { allData } = useHotels();
    return (
        <div className="hotelsMain">
            <div className="hotelsList-content" ref={scrollRef}>
                <Outlet />
            </div>
            <div className='hotelsMap'>
                <Map markers={allData}/>
            </div>
        </div>
    );
}