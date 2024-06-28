import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeAll, vi, afterAll } from "vitest";
import userEvent from "@testing-library/user-event";
import WeatherError from "../components/WeatherError";

describe("<WeatherError />", () => {
    const original = window.location;
    beforeAll(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: vi.fn() },
        });
    });

    afterAll(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: original,
        });
    });

    test("renders coontent successfully", () => {
        render(<WeatherError />);
        expect(screen.getByText("Oh no!")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.getByText("Refresh Page")).toBeInTheDocument();
    });

    test("should reload page", async () => {
        const user = userEvent.setup();
        render(<WeatherError />);
        await user.click(screen.getByText("Refresh Page"));
        expect(window.location.reload).toHaveBeenCalledTimes(1);
    })
})