import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import axios from "axios";

const HotelsContext = createContext();
const BASE_URL= "http://localhost:5000/hotels";
export function HotelsProvider({children}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [singleHotel, setSingleHotel] = useState(null);
    const location= searchParams.get("location");
    const room= JSON.parse(searchParams.get("options"))?.room;

    const {allData, isLoading}=useFetch(BASE_URL , "host_location_like="+(location||"") +"&accommodates_gte=" + (room||0));
    function getSingleHotel(id){
        async function get(){
            const {data} = await axios.get(`${BASE_URL}/${id}`);
            setSingleHotel(data);
        }
        get();
    }
    return (
        <HotelsContext.Provider value={{allData, isLoading, getSingleHotel, singleHotel}}>
            {children}
        </HotelsContext.Provider>
    );
}
export function useHotels(){
    return useContext(HotelsContext);
}