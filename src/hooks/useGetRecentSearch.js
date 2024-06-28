import { useQueries } from "@tanstack/react-query";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const useGetRecentSearch = (recentSearchResults) => {
    return useQueries({
        queries: recentSearchResults.map(result => {
            return ({
                queryKey: ["weather", {location: {lat: result.lat, lon: result.lon}}],
                enabled: recentSearchResults.length > 0,
                queryFn: async () => {
                    return (await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${result.lat},${result.lon}&days=7&aqi=no&alerts=no`)).data;
                }
            });
        })
    });
}

export default useGetRecentSearch;