import { useState } from "react";

export default function useUserLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation, setUserLocation] = useState([]);
    const [error, setError] = useState("");

    function setUserPosition(){
        if (!navigator.geolocation) {
            setError("your browser does not support Geolocation.");
        }
        else {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    setIsLoading(false);
                },
                // Error callback function
                (error) => {
                    setError("Error getting user location:", error);
                    setIsLoading(false);
                }
            );
        }
    }

    return {userLocation, setUserPosition, isLoading, error};
}