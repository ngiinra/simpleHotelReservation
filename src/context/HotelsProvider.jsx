import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";

const HotelsContext = createContext();
const BASE_URL= "http://localhost:5000/hotels";
export function HotelsProvider({children}){
    const [searchParams, setSearchParams] = useSearchParams();
    const location= searchParams.get("location");
    const room= JSON.parse(searchParams.get("options"))?.room;

    const {allData, isLoading}=useFetch(BASE_URL,`q=${location||""}&accommodates_gte=${room||0}`);
    function getAllHotels(){
        const {allData:data, isLoading}=useFetch(BASE_URL,`q=${location||""}&accommodates_gte=${room||0}`);
        return {data, isLoading};
    } 

    function getSingleHotel(id) {
        const {allData:data, isLoading} = useFetch(`${BASE_URL}/${id}`,"");
        return {data, isLoading};
    }

    return (
        <HotelsContext.Provider value={{allData, isLoading, getAllHotels, getSingleHotel}}>
            {children}
        </HotelsContext.Provider>
    );
}
export function useHotels(){
    return useContext(HotelsContext);
}