import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";
import "@testing-library/jest-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import WeatherContextProvider from "../contexts/WeatherContext";

const queryClient = new QueryClient();

describe("<Header />", () => {

    beforeEach(() => {
        render(
            <QueryClientProvider client={queryClient}>
                <WeatherContextProvider>
                    <Header />
                </WeatherContextProvider>
            </QueryClientProvider>
        );
    });

    test("should render all elements properly", async () => {
        const logo = screen.getByAltText("Just weather logo");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", "/src/assets/logo.svg");
        expect(screen.getByPlaceholderText("Search for cities")).toBeInTheDocument();
    });

    test("should handle temp unit toggle", async () => {
        const user = userEvent.setup();
        const toggleUnit = screen.getByText(/C/);
        expect(toggleUnit).toHaveClass("text-white");
        await user.click(toggleUnit);
        expect(toggleUnit).not.toHaveClass("text-white");
    });
});