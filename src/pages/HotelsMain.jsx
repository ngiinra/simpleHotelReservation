import { Outlet, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { HotelsProvider } from "../context/HotelsProvider";
import Map from "../components/Map";

export default function HotelsMain() {
    const scrollRef = useRef(null);
    useEffect(() => scrollRef.current.scrollIntoView(), []);
    return (
        <HotelsProvider>
            <div className="hotelsMain">
                <div className="hotelsList-content" ref={scrollRef}>
                    <Outlet />
                </div>
                <div className='hotelsMap'>
                    <Map />
                </div>
            </div>
        </HotelsProvider>
    );
}