
import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { customRender } from "./utils";
import WeekForecast from "../components/WeekForecast";
import "@testing-library/jest-dom";

describe("<WeekForecast />", () => {

    const weatherData = {
        forecast: {
            forecastday: [
                {
                    date: "2024-01-01",
                    day: {
                        condition: {
                            icon: "test_url",
                            text: "test_text",
                        },
                        maxtemp_c: "30",
                        maxtemp_f: "90",
                        mintemp_c: "20",
                        mintemp_f: "70",
                    }
                },
                {
                    date: "2024-01-02",
                    day: {
                        condition: {
                            icon: "test_url_2",
                            text: "test_text_2",
                        },
                        maxtemp_c: "35",
                        maxtemp_f: "95",
                        mintemp_c: "25",
                        mintemp_f: "75",
                    }
                }
            ],
        }
    }

    test("should render skeleton loader while loading", () => {
        const state = {
            tempUnit: "celsius",
        }
        const { container } = customRender(<WeekForecast />, {wrapperProps: {contextValue: {isLoading: true, state, weatherData}}});
        expect(container.querySelector(".react-loading-skeleton")).toBeInTheDocument();
        expect(container.querySelectorAll(".react-loading-skeleton")).toHaveLength(7);
    });

    test("should display week weather data in celsius", () => {
        const state = {
            tempUnit: "celsius",
        }
        customRender(<WeekForecast />, {wrapperProps: {contextValue: {isLoading: false, state, weatherData}}});
        expect(screen.getByText("Jan 01")).toBeInTheDocument();
        expect(screen.getByText("Jan 02")).toBeInTheDocument();
        expect(screen.getByAltText("test_text")).toHaveAttribute("src", "test_url");
        expect(screen.getByAltText("test_text_2")).toHaveAttribute("src", "test_url_2");
        expect(screen.getByText(/30/)).toBeInTheDocument();
        expect(screen.getByText(/20/)).toBeInTheDocument();
        expect(screen.getByText(/35/)).toBeInTheDocument();
        expect(screen.getByText(/25/)).toBeInTheDocument();
    });

    test("should display week weather data in fahrenheit", () => {
        const state = {
            tempUnit: "fahrenheit",
        }
        customRender(<WeekForecast />, {wrapperProps: {contextValue: {isLoading: false, state, weatherData}}});
        expect(screen.getByText(/90/)).toBeInTheDocument();
        expect(screen.getByText(/70/)).toBeInTheDocument();
        expect(screen.getByText(/95/)).toBeInTheDocument();
        expect(screen.getByText(/75/)).toBeInTheDocument();
    });
});
