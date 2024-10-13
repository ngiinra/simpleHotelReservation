import { useEffect } from "react";

export default function useOutsideClick(ref, exceptionId, callBackFunc) {
    useEffect(() => {

        function closeModalWithClickingOutside(event) {
            if (ref.current && event.target.id !== exceptionId && event.target.contains(ref.current))
                callBackFunc();
        };
        document.addEventListener("mousedown", closeModalWithClickingOutside);

        return () => {   //cleanup function
            document.removeEventListener("mousedown", closeModalWithClickingOutside);
        }
    }
        , [ref, callBackFunc]);

}