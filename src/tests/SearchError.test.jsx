import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import SearchError from "../components/SearchError";

describe("<SearchError />", () => {
    test("should display all elements properly", () => {
        render(<SearchError />);
        expect(screen.getByAltText("Search error image")).toHaveAttribute("src", "/src/assets/cloud-error-illustration.svg");
        expect(screen.getByText("An unexpected error has occured.")).toBeInTheDocument();
    });
});