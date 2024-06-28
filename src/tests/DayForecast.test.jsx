import { screen } from "@testing-library/react";
import { customRender } from "./utils";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";
import DayForecast from "../components/DayForecast";

describe("<DayForecast />", () => {

    const weatherData = {
        forecast: {
            forecastday: [
                {
                    date: "2024-01-01",
                    hour: [
                        {
                            temp_c: "30",
                            temp_f: "90",
                            condition: {
                                icon: "test_url",
                                text: "test_text"
                            },
                            time: "2024-01-01 00:00"
                        },
                        {
                            temp_c: "20",
                            temp_f: "70",
                            condition: {
                                icon: "test_url_2",
                                text: "test_text_2"
                            },
                            time: "2024-01-01 01:00"
                        }
                    ]
                },
                {
                    date: "2024-01-02",
                    hour: [
                        {
                            temp_c: "35",
                            temp_f: "95",
                            condition: {
                                icon: "test_url_3",
                                text: "test_text_3"
                            },
                            time: "2024-01-02 00:00"
                        },
                        {
                            temp_c: "25",
                            temp_f: "75",
                            condition: {
                                icon: "test_url_4",
                                text: "test_text_4"
                            },
                            time: "2024-01-02 00:00"
                        }
                    ]
                },
            ]
        },
    };

    test("should render skeleton loader while loading", () => {
        const state = {
            tempUnit: "celsius", 
            day: 0,
        };
        const { container } = customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: true, weatherData}}});
        expect(container.querySelector(".react-loading-skeleton")).toBeInTheDocument();
        expect(container.querySelectorAll(".react-loading-skeleton")).toHaveLength(7);
    });

    test("should display formatted date", () => {
        const state = {
            tempUnit: "celsius", 
            day: 0,
        };
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText(/Jan 01/)).toBeInTheDocument();
    });

    test("should display temp in celsius", () => {
        const state = {
            tempUnit: "celsius", 
            day: 0,
        };
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText(/30/)).toBeInTheDocument();
        expect(screen.getByText(/20/)).toBeInTheDocument();
    });

    test("should display temp in fahrenheit", () => {
        const state = {
            tempUnit: "fahrenheit", 
            day: 0,
        };
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText(/90/)).toBeInTheDocument();
        expect(screen.getByText(/70/)).toBeInTheDocument();
    });

    test("should display hour condition icon", () => {
        const state = {
            tempUnit: "celsius", 
            day: 0,
        };
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByAltText("test_text")).toHaveAttribute("src", "test_url");
        expect(screen.getByAltText("test_text_2")).toHaveAttribute("src", "test_url_2");
    });

    test("should handle day change", () => {
        const state = {
            tempUnit: "celsius", 
            day: 1,
        }
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText(/35/)).toBeInTheDocument();
        expect(screen.getByText(/25/)).toBeInTheDocument();
    });

    test("should display hour", () => {
        const state = {
            tempUnit: "celsius", 
            day: 0,
        }
        customRender(<DayForecast />, {wrapperProps: {contextValue: {state, isLoading: false, weatherData}}});
        expect(screen.getByText("00:00")).toBeInTheDocument();
        expect(screen.getByText("01:00")).toBeInTheDocument();
    });
});