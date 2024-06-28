import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { customRender } from "./utils";
import WeatherDetails from "../components/WeatherDetails";
import "@testing-library/jest-dom";

describe("<WeatherDetails />", () => {

    const weatherData = {
        forecast: {
            forecastday: [
                {
                    astro: {
                        sunrise: "05:00 AM",
                        sunset: "06:00 PM",
                    },
                    day: {
                        daily_chance_of_rain: "60",
                        uv: "7",
                        avgvis_km: "10",
                        avgtemp_c: "30",
                        avgtemp_f: "90",
                    }
                },
                {
                    astro: {
                        sunrise: "05:01 AM",
                        sunset: "06:01 PM",
                    },
                    day: {
                        daily_chance_of_rain: "50",
                        uv: "4",
                        avgvis_km: "9",
                        avgtemp_c: "20",
                        avgtemp_f: "70",
                    }
                }
            ],
        },
        current: {
            pressure_mb: "1000",
            wind_kph: "20",
        },
    }

    test("should render skeleton loader while loading", () => {
        const state = {
            tempUnit: "celsius",
            day: 0,
        }
        const { container } = customRender(<WeatherDetails />, {wrapperProps: {contextValue: {state, weatherData, isLoading: true}}});
        expect(container.querySelector(".react-loading-skeleton")).toBeInTheDocument();
        expect(container.querySelectorAll(".react-loading-skeleton")).toHaveLength(8);
    });

    test("should display weather data", () => {
        const state = {
            tempUnit: "celsius",
            day: 0,
        }
        customRender(<WeatherDetails />, {wrapperProps: {contextValue: {state, weatherData}}});
        expect(screen.getByText("05:00 AM")).toBeInTheDocument();
        expect(screen.getByText("06:00 PM")).toBeInTheDocument();
        expect(screen.getByText("60%")).toBeInTheDocument();
        expect(screen.getByText("1000 mb")).toBeInTheDocument();
        expect(screen.getByText("20 km/h")).toBeInTheDocument();
        expect(screen.getByText("30°")).toBeInTheDocument();
        expect(screen.getByText("7 of 10")).toBeInTheDocument();
        expect(screen.getByText("10 km")).toBeInTheDocument();
    });

    test("should display temp in fahrenheit", () => {
        const state = {
            tempUnit: "fahrenheit",
            day: 0,
        }
        customRender(<WeatherDetails />, {wrapperProps: {contextValue: {state, weatherData}}});
        expect(screen.getByText("90°")).toBeInTheDocument();
    });

    test("should handle day change", () => {
        const state = {
            tempUnit: "celsius",
            day: 1,
        }
        customRender(<WeatherDetails />, {wrapperProps: {contextValue: {state, weatherData}}});
        expect(screen.getByText("05:01 AM")).toBeInTheDocument();
        expect(screen.getByText("06:01 PM")).toBeInTheDocument();
        expect(screen.getByText("50%")).toBeInTheDocument();
        expect(screen.getByText("1000 mb")).toBeInTheDocument();
        expect(screen.getByText("20 km/h")).toBeInTheDocument();
        expect(screen.getByText("20°")).toBeInTheDocument();
        expect(screen.getByText("4 of 10")).toBeInTheDocument();
        expect(screen.getByText("9 km")).toBeInTheDocument();
    });
});