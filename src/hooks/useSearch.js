import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const useSearch = (query) => {
    return useQuery({
        queryKey: ["search", query],
        enabled: query ? true : false,
        queryFn: async () => {
            return (await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`)).data;
        },
    });
}

export default useSearch;