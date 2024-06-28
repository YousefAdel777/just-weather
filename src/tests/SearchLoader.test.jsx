import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SearchLoader from "../components/SearchLoader";
import "@testing-library/jest-dom";

describe("<SearchLoader />", () => {
    test("should render successfully with spin animation", () => {
        const { container } = render(<SearchLoader />);
        const loader = container.querySelector(".search-loader");
        expect(loader).toBeInTheDocument();
        expect(loader.querySelector("span")).toHaveClass("animate-spin");
    });
});