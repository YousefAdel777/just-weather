import { useWeatherContext } from "../contexts/WeatherContext";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import "swiper/css";
import "react-loading-skeleton/dist/skeleton.css";

dayjs.extend(customParseFormat);

const DayForecast = () => {
    const { isLoading, weatherData, state } = useWeatherContext();
    const forecastDay = weatherData?.forecast.forecastday[state.day];

    if (isLoading) {
        return (
            <div className="container mb-8">
                <div className="flex flex-wrap items-center justify-center gap-8 bg-gray-200 p-8 rounded-xl">
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                    <Skeleton height={"8rem"} width={"6rem"} />
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="container">
                <div className="rounded-xl bg-gray-400 px-4 pt-6 pb-5">
                    <h2 className="uppercase text-sm text-gray-600 font-semibold mb-4 leading-none">
                        {dayjs(forecastDay.date).format("MMM DD")} Forecast
                    </h2>
                    <Swiper
                        spaceBetween={15}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 3
                            },
                            768: {
                                slidesPerView: 5
                            },
                            992: {
                                slidesPerView: 7
                            },
                            1200: {
                                slidesPerView: 9
                            }
                        }}
                    >
                        {forecastDay?.hour.map((hour, i) => {
                            return (
                                <SwiperSlide 
                                    key={i}
                                    className="*:mx-auto *:block *:text-center bg-gray-200 p-2 select-none rounded-xl"
                                >
                                    <span className="font-bold text-gray-500">{hour.time.split(" ")[1]}</span>
                                    <img className="w-24" src={hour.condition.icon} alt={hour.condition.text} />
                                    <span className="font-bold text-lg">{state.tempUnit === "celsius" ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}&deg;</span>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default DayForecast;