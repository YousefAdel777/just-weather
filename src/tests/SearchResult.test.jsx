import { render, screen } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchResult from "../components/SearchResult";
import "@testing-library/jest-dom";

describe("<SearchResult />", () => {
    const props = {
        name: "test_name",
        region: "test_region",
        country: "test_country",
        onClick: vi.fn(),
    };

    test("should render all elements properly using props", () => {
        render(<SearchResult {...props} />);
        expect(screen.getByText("test_name, test_region, test_country")).toBeInTheDocument();
    });

    test("should handle user click", async () => {
        render(<SearchResult {...props} />);
        await userEvent.click(screen.getByText("test_name, test_region, test_country"));
        expect(props.onClick.mock.calls).toHaveLength(1);
    });
});