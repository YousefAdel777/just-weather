import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import WeatherContextProvider from "../contexts/WeatherContext";
import { useWeatherContext } from "../contexts/WeatherContext";
import useGetWeatherData from "../hooks/useGetWeatherData";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

const mockedUseGetWeatherData = useGetWeatherData;
vi.mock("../hooks/useGetWeatherData.js");

const TestComponent = () => {
    const {dispatch, state, isLoading, isError, weatherData} = useWeatherContext();

    return (
        <div>
            <p data-testid="loading">{String(isLoading)}</p>
            <p data-testid="error">{String(isError)}</p>
            <p data-testid="tempUnit">{String(state.tempUnit)}</p>
            <p data-testid="lon">{String(state.location?.lon)}</p>
            <p data-testid="lat">{String(state.location?.lat)}</p>
            <p data-testid="day">{String(state.day)}</p>
            <p data-testid="weatherData">{String(weatherData)}</p>
            <button onClick={() => dispatch({type: "SET_LOCATION", payload: {lon: 30, lat: 30}})}>
                Set Location
            </button> 
            <button onClick={() => dispatch({type: "SET_DAY", payload: 3})}>
                Set Day
            </button> 
            <button onClick={() => dispatch({type: "SET_UNIT", payload: "fahrenheit"})}>
                Set Unit
            </button> 
        </div>
    );
}

describe("<WeatherContextProvider />", () => {

    mockedUseGetWeatherData.mockImplementation(() => ({data: "test_data", isLoading: false, isError: false}));
    test("should provide weather context to children", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <WeatherContextProvider>
                    <TestComponent />
                </WeatherContextProvider>
            </QueryClientProvider>
        );
        const user = userEvent.setup();
        const loading = screen.getByTestId("loading");
        const error = screen.getByTestId("error");
        const lon = screen.getByTestId("lon");
        const lat = screen.getByTestId("lat");
        const tempUnit = screen.getByTestId("tempUnit");
        const day = screen.getByTestId("day");
        const weatherData = screen.getByTestId("weatherData");
        const dayBtn = screen.getByText("Set Day");
        const locationBtn = screen.getByText("Set Location");
        const unitBtn = screen.getByText("Set Unit");
        expect(loading).toHaveTextContent("false");
        expect(error).toHaveTextContent("false");
        expect(lon).toHaveTextContent("undefined");
        expect(lat).toHaveTextContent("undefined");
        expect(tempUnit).toHaveTextContent("celsius");
        expect(day).toHaveTextContent("0");
        expect(weatherData).toHaveTextContent("test_data");
        await user.click(dayBtn);
        expect(day).toHaveTextContent("3");
        await user.click(locationBtn);
        expect(lon).toHaveTextContent("30");
        expect(lat).toHaveTextContent("30");
        await user.click(unitBtn);
        expect(tempUnit).toHaveTextContent("fahrenheit");
    });
});