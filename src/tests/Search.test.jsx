import { screen } from "@testing-library/react";
import { describe, expect, test, beforeEach, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender, mockedRecentSearchData } from "./utils";
import Search from "../components/Search";
import useSearch from "../hooks/useSearch";
import useGetRecentSearch from "../hooks/useGetRecentSearch";

const mockedUseSearch = useSearch;
const mockedUseGetRecentSearch = useGetRecentSearch;

vi.mock("../hooks/useGetRecentSearch.js");
vi.mock("../hooks/useSearch.js");

describe("<Search />", () => {

    beforeEach(() => {
        mockedUseSearch.mockImplementation(() => ({isLoading: true}));
        mockedUseGetRecentSearch.mockImplementation(() => ({isLoading: true}));
    });

    afterEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test("should handle render <SearchLoader /> while loading", () => {
        const { container } = customRender(<Search />, {wrapperProps: {contextValue: {}}});
        expect(container.querySelector(".search-loader")).toBeInTheDocument();
    });

    test("should handle render <SearchError /> if isError", () => {
        mockedUseSearch.mockImplementation(() => ({isError: true}));
        customRender(<Search />, {wrapperProps: {contextValue: {}}});
        expect(screen.getByText("An unexpected error has occured.")).toBeInTheDocument();
    });

    test("should display recent search results", async () => {
        const user = userEvent.setup();
        mockedUseSearch.mockImplementation(() => ({isError: false, isLoading: false}));
        mockedUseGetRecentSearch.mockImplementation(() => mockedRecentSearchData);
        localStorage.setItem("recent", JSON.stringify([
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
        ]));
        const state = {
            tempUnit: "celsius",
        }
        customRender(<Search />, {wrapperProps: {contextValue: {state}}});
        await user.click(screen.getByPlaceholderText("Search for cities"));
        expect(screen.getByText("Recent")).toBeInTheDocument();
        expect(screen.getByText("Clear All")).toBeInTheDocument();
        expect(screen.getByText("test_name")).toBeInTheDocument();
        expect(screen.getByText("test_name_2")).toBeInTheDocument();
    });

    test("should handle user input", async () => {
        customRender(<Search />, {wrapperProps: {contextValue: {}}});
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText("Search for cities");
        await user.type(input, "test");
        expect(input.value).toBe("test");
    });

    test("should display search results", async () => {
        const dispatch = vi.fn();
        mockedUseSearch.mockImplementation(() => ({
            isError: false, 
            isLoading: false, 
            data: [
                {
                    name: "test_name",
                    region: "test_region",
                    country: "test_country",
                    lon: 10,
                    lat: 10,
                },
                {
                    name: "test_name_2",
                    region: "test_region_2",
                    country: "test_country_2",
                    lon: 20,
                    lat: 20,
                }
            ]
        }));
        const user = userEvent.setup();
        customRender(<Search />, {wrapperProps: {contextValue: {dispatch}}});
        const firstResult = screen.getByText("test_name, test_region, test_country");
        const input = screen.getByPlaceholderText("Search for cities");
        expect(firstResult).toBeInTheDocument();
        expect(screen.getByText("test_name_2, test_region_2, test_country_2")).toBeInTheDocument();
        await user.type(input, "test");
        await user.click(firstResult);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({type: "SET_LOCATION", payload: {lon: 10, lat: 10}});
        expect(dispatch).toHaveBeenCalledWith({type: "SET_DAY", payload: 0});
        expect(input.value).toBe("");
    });

    test("should show message if no search results", () => {
        mockedUseSearch.mockImplementation(() => ({isError: false, isLoading: false, data: []}));
        customRender(<Search />, {wrapperProps: {contextValue: {}}});
        expect(screen.getByText("No Cities To Show.")).toBeInTheDocument();
    });
});