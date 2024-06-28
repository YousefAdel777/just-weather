import { useWeatherContext } from "../contexts/WeatherContext";
import { Sunrise, Sunset, Sun, Drop, Pressure, Temp, Wind, Visibility } from "../icons";
import WeatherCard from "../components/WeatherCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherDetails = () => {
    const { isLoading, weatherData, state } = useWeatherContext();
    const forecastDay = weatherData?.forecast.forecastday[state.day];

    if (isLoading) {
        return (
            <div className="container">
                <div className="flex gap-6 flex-wrap bg-gray-200 p-8 rounded-xl mb-8">
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                    <Skeleton height={"5rem"} width={"15rem"} />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="container">
                <div className="rounded-xl bg-gray-400 px-4 pt-6 pb-5">
                    <h2 className="uppercase text-sm text-gray-600 font-semibold mb-4 leading-none">Weather Details</h2>
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        <WeatherCard title="Sunrise" text={forecastDay?.astro.sunrise} Icon={Sunrise} />
                        <WeatherCard title="Sunset" text={forecastDay?.astro.sunset} Icon={Sunset} />
                        <WeatherCard title="Chance of rain" text={`${forecastDay?.day.daily_chance_of_rain}%`} Icon={Drop} />
                        <WeatherCard title="Pressure" text={`${weatherData?.current.pressure_mb} mb`} Icon={Pressure} />
                        <WeatherCard title="Wind" text={`${weatherData?.current.wind_kph} km/h`} Icon={Wind} />
                        <WeatherCard title="Feels like" text={`${state.tempUnit === "celsius" ? Math.round(forecastDay?.day.avgtemp_c) : Math.round(forecastDay?.day.avgtemp_f)}°`} Icon={Temp} />
                        <WeatherCard title="UV index" text={`${forecastDay?.day.uv} of 10`} Icon={Sun} />
                        <WeatherCard title="Visibility" text={`${forecastDay?.day.avgvis_km} km`} Icon={Visibility} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetails;