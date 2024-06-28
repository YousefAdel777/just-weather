import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import WeatherCard from "../components/WeatherCard";

describe("<WeatherCard />", () => {
    test("should render <Icon /> and all elements using props", () => {
        const Icon = vi.fn();
        render(<WeatherCard Icon={Icon} text="test_text" title="test_title" />);
        expect(screen.getByText("test_text")).toBeInTheDocument();
        expect(screen.getByText("test_title")).toBeInTheDocument();
        expect(Icon.mock.calls).toHaveLength(1);
    });
});