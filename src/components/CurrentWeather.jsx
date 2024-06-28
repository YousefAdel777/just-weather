import { useWeatherContext } from "../contexts/WeatherContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CurrentWeather = () => {
    const { weatherData, state, isLoading } = useWeatherContext();
    const forecastDay = weatherData?.forecast.forecastday[state.day];

    if (isLoading) {
        return (
            <div className="container mb-8">
                <div className="flex gap-8 items-center">
                    <div>
                        <Skeleton className="mb-10" height={"3rem"} width={"10rem"} />
                        <Skeleton className="mb-2" height={"3rem"} width={"10rem"} />
                        <Skeleton height={"3rem"} width={"10rem"} />
                    </div>
                    <Skeleton height={"10rem"} width={"10rem"} />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container flex gap-4 items-center justify-center md:justify-start md:gap-8">
                <div>
                    <h1 className="text-4xl font-semibold mb-3">{weatherData?.location.name}</h1>
                    <div className="flex items-center gap-4 text-[3.5rem] font-bold leading-none">
                        <span className="text-black">{(state.tempUnit === "celsius" ? Math.round(forecastDay?.day.maxtemp_c) : Math.round(forecastDay?.day.maxtemp_f))}&deg;</span>
                        <span className="text-gray-500">{state.tempUnit === "celsius" ? Math.round(forecastDay?.day.mintemp_c) : Math.round(forecastDay?.day.mintemp_f)}&deg;</span>
                    </div>
                </div>
                <img className="min-w-[8rem]" src={forecastDay?.day.condition.icon} alt={forecastDay?.day.condition.text} />
            </div>
        </div>
    );
}

export default CurrentWeather;