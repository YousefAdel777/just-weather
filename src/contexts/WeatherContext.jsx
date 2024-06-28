/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useReducer, useContext, createContext, useEffect } from "react";
import weatherReducer from "./weatherReducer";
import useGetWeatherData from "../hooks/useGetWeatherData";

export const WeatherContext = createContext();
export const useWeatherContext = () => useContext(WeatherContext);

const initialState = {
    location: null,
    tempUnit: localStorage.getItem("unit") || "celsius",
    day: 0,
}

const WeatherContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);
    const { isError, isLoading, data: weatherData } = useGetWeatherData(state.location);

    useEffect(() => {
        localStorage.setItem("unit", state.tempUnit);
    }, [state.tempUnit]);

    return (
        <WeatherContext.Provider value={{state, dispatch, weatherData, isLoading, isError}}>
            {children}
        </WeatherContext.Provider>
    );
}

export default WeatherContextProvider;