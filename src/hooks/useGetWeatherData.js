import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const useGetWeatherData = (location) => {
    return useQuery({
        queryKey: ["weather", { location }],
        enabled: location ? true : false,
        queryFn: async () => {
            return (await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&days=7&aqi=no&alerts=no`)).data;
        }
    });
}

export default useGetWeatherData;