import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeAll, afterAll } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender } from "./utils";
import Home from "../components/Home";
import "@testing-library/jest-dom";

describe("<Home />", () => {

    const original = navigator.geolocation;
    beforeAll(() => {
        Object.defineProperty(navigator, "geolocation", {
            configurable: true,
            value: { getCurrentPosition: vi.fn() }
        });
    });

    afterAll(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: original,
        });
    });

    test("should render all elements properly", async () => {
        customRender(<Home />, {wrapperProps: {contextValue: {}}});
        const img = screen.getByAltText("Man in the rain");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/src/assets/home.png");
        expect(screen.getByText("Just Weather")).toBeInTheDocument();
        expect(screen.getByText("Get The Forecast You Can Trust")).toBeInTheDocument();
        expect(screen.getByText("Accurate, real-time weather updates for your location and around the world.")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("Use Current Location");
    });

    test("should get user location", async () => {
        customRender(<Home />, {wrapperProps: {contextValue: {}}});
        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });
});