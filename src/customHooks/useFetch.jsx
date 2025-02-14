import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetch(fetchPath, query = "") {
    const [isLoading, setLoading] = useState(true);
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                setLoading(true);
                const { data } = await axios.get(`${fetchPath}?${query}`);
                setAllData(data);

            } catch (err) {
                if (!axios.isCancel(err)) {
                    toast.error(err?.message);
                    setAllData([]);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchCharacters();
    }, [query]);


    return { allData, isLoading };
}