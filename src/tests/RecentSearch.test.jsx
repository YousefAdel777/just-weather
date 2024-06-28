import { screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { customRender, mockedRecentSearchData } from "./utils";
import RecentSearch from "../components/RecentSearch";
import useGetRecentSearch from "../hooks/useGetRecentSearch";
import { userEvent } from "@testing-library/user-event";

const mockedUseGetRecentSearch = useGetRecentSearch;

vi.mock("../hooks/useGetRecentSearch.js");

describe("<RecentSearch />", () => {
    let props;
    beforeEach(() => {
        mockedUseGetRecentSearch.mockImplementation(() => [{isLoading: true}]);
        props = {
            handleResultClick: vi.fn(),
            deleteSearch: vi.fn(),
            clearAll: vi.fn(),
            recentSearchResults: [
                {
                    id: "1",
                    name: "test_name", 
                    region: "test_region", 
                    country: "test_country",
                },
                {
                    id: "2",
                    name: "test_name_2", 
                    region: "test_region_2", 
                    country: "test_country_2"
                }
            ],
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("should render <SearchLoader /> while loading", () => {
        const state = {
            tempUnit: "celsius",
        }
        const { container } = customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        expect(container.querySelector(".search-loader")).toBeInTheDocument();
    });

    test("should render <SearchError /> if isError", () => {
        const state = {
            tempUnit: "celsius",
        }
        mockedUseGetRecentSearch.mockImplementation(() => [{isError: true}]);
        customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        expect(screen.getByText("An unexpected error has occured.")).toBeInTheDocument();
    });

    test("should fetch using correct search results", () => {
        const state = {
            tempUnit: "celsius",
        }
        customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        expect(useGetRecentSearch).toHaveBeenCalledTimes(1);
        expect(useGetRecentSearch).toHaveBeenCalledWith(props.recentSearchResults);
    });

    test("should display data in celsius", () => {
        const state = {
            tempUnit: "celsius",
        }
        mockedUseGetRecentSearch.mockImplementation(() => mockedRecentSearchData);
        customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        expect(screen.getByText("Recent")).toBeInTheDocument();
        expect(screen.getByText("Clear All")).toBeInTheDocument();
        expect(screen.getByText(/30/)).toBeInTheDocument();
        expect(screen.getByText(/20/)).toBeInTheDocument();
        expect(screen.getByText("test_name")).toBeInTheDocument();
        expect(screen.getByText("test_region, test_country")).toBeInTheDocument();
        expect(screen.getByText("test_name_2")).toBeInTheDocument();
        expect(screen.getByText("test_region_2, test_country_2")).toBeInTheDocument();
        expect(screen.getByAltText("test_text")).toHaveAttribute("src", "test_url");
        expect(screen.getByAltText("test_text_2")).toHaveAttribute("src", "test_url_2");
        expect(screen.getAllByTitle("Delete")).toHaveLength(2);
    });

    test("should display data in fahrenheit", () => {
        const state = {
            tempUnit: "fahrenheit",
        }
        mockedUseGetRecentSearch.mockImplementation(() => mockedRecentSearchData);
        customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        expect(screen.getByText(/90/)).toBeInTheDocument();
        expect(screen.getByText(/70/)).toBeInTheDocument();
    });

    test("shold handle user interactivity", async () => {
        const state = {
            tempUnit: "celsius",
        }
        const user = userEvent.setup();
        mockedUseGetRecentSearch.mockImplementation(() => mockedRecentSearchData);
        customRender(<RecentSearch {...props} />, {wrapperProps: {contextValue: {state}}});
        await user.click(screen.getByText(/30/));
        expect(props.handleResultClick.mock.calls).toHaveLength(1);
        await user.click(screen.getByText("Clear All"));
        expect(props.clearAll.mock.calls).toHaveLength(1);
        await user.click(screen.getAllByTitle("Delete")[0]);
        expect(props.deleteSearch.mock.calls).toHaveLength(1);
        expect(props.deleteSearch).toHaveBeenCalledWith("1");
    });
});