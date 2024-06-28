/* eslint-disable react/prop-types */
import { screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import CurrentWeather from "../components/CurrentWeather";
import { customRender } from "./utils";
import "@testing-library/jest-dom";

describe("<CurrentWeather />", () => {
    const weatherData = {
        forecast: {
            forecastday: [
                {
                    day: {
                        maxtemp_c: "30",
                        mintemp_c: "20",
                        maxtemp_f: "90",
                        mintemp_f: "70",
                        condition: {
                            icon: "test_url",
                            text: "test_text"
                        }
                    }
                },
                {
                    day: {
                        maxtemp_c: "35",
                        mintemp_c: "25",
                        maxtemp_f: "95",
                        mintemp_f: "75",
                        condition: {
                            icon: "test_url_2",
                            text: "test_text_2"
                        }
                    }
                },
            ]
        },
        location: {
            name: "test_city"
        }
    }

    test("should render skeleton loader while loading", () => {
        const state = {
            day: 0,
            tempUnit: "celsius",
        }
        const { container } = customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state, isLoading: true, weatherData}}})
        expect(container.querySelector(".react-loading-skeleton")).toBeInTheDocument();
        expect(container.querySelectorAll(".react-loading-skeleton")).toHaveLength(4);
    });

    test("should display location name", () => {
        customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state: {}, isLoading: false, weatherData}}})
        expect(screen.getByText("test_city")).toBeInTheDocument();
    });

    test("should display current day wheather info in celsius", () => {
        const state = {
            tempUnit: "celsius",
            day: 0,
        }
        customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.queryByText(/30/)).toBeInTheDocument();
        expect(screen.queryByText(/20/)).toBeInTheDocument();
    });

    test("should display current day wheather info in fahrenheit", () => {
        const state = {
            tempUnit: "fahrenheit",
            day: 0,
        }
        customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText(/90/)).toBeInTheDocument();
        expect(screen.getByText(/70/)).toBeInTheDocument();
    });

    test("should handle day change", () => {
        const state = {
            day: 1,
            tempUnit: "celsius",
        }
        customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}})
        expect(screen.queryByText(/35/)).toBeInTheDocument();
        expect(screen.queryByText(/25/)).toBeInTheDocument();
    });

    test("should render weather condition icon", () => {
        const state = {
            day: 1,
            tempUnit: "celsius",
        }
        customRender(<CurrentWeather />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}})
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "test_url_2");
        expect(img).toHaveAttribute("alt", "test_text_2");
    });
});