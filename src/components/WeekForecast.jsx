import { useWeatherContext } from "../contexts/WeatherContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Skeleton from "react-loading-skeleton";

dayjs.extend(customParseFormat);

const WeekForecast = () => {
    const { isLoading, weatherData, dispatch, state} = useWeatherContext();

    if (isLoading) {
        return (
            <div className="flex items-center flex-wrap justify-center gap-8 bg-gray-200 p-8 rounded-xl">
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
                <Skeleton height={"8rem"} width={"6rem"} />
            </div>
        );
    }

    return (
        <div className="my-8">
            <div className="container">
                <div className="rounded-xl bg-gray-400 px-4 pt-6 pb-5">
                    <h2 className="uppercase text-sm text-gray-600 font-semibold mb-4 leading-none">Week forecast</h2>
                    <Swiper
                        spaceBetween={15}
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
                        }}
                    >
                        {weatherData?.forecast.forecastday.map((day, i) => {
                            return (
                                <SwiperSlide 
                                    key={i}
                                    className="*:mx-auto *:text-center group bg-gray-200 p-2 select-none rounded-xl cursor-pointer hover:bg-violet-700 hover:text-white"
                                    onClick={() => {
                                        dispatch({type: "SET_DAY", payload: i});
                                    }}
                                >
                                    <span className="font-bold text-gray-500 block text-sm group-hover:text-white md:text-base">
                                        {dayjs(day.date).format("MMM DD")}
                                    </span>
                                    <img className="w-24" src={day.day.condition.icon} alt={day.day.condition.text} />
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="font-bold text-lg">{state.tempUnit === "celsius" ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f)}&deg;</span>
                                        <span className="font-bold text-lg text-gray-500 group-hover:text-white">{state.tempUnit === "celsius" ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f)}&deg;</span>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default WeekForecast;