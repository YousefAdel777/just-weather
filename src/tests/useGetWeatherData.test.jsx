import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, describe, test } from "vitest";
import useSearch from "../hooks/useSearch";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const wrapper = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

describe("useSearch", () => {
    test("successful useSearch hook", async () => {
        // nock("https://api.weatherapi.com").get("/v1/search.json").reply(200, { res: "test" })
        // const { result } = renderHook(() => useSearch("query"), { wrapper });
        // await waitFor(() => {
        //     expect(result.current.isSuccess).toBe(true);
        //     expect(result.current.data).toEqual({ res: "test" });
        // });
    });
    
    test("should be disabled if no search query is provided", async () => {
        // nock("https://api.weatherapi.com").get("/v1/search.json").reply(200, { res: "test" })
        // const { result } = renderHook(() => useSearch(), { wrapper });
        // await waitFor(() => {
        //     expect(result.current.isPaused).toBe(true);
        //     expect(result.current.data).toBeUndefined();
        // });
    });
}); 