import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import useDebounce from "../hooks/useDebounce";


describe("useDebounce", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("should return null before delay ends", async () => {
        const { result } = renderHook(() => useDebounce("test", 200));
        expect(result.current.debouncedValue).toBeNull();
    });

    test("should return value after delay ends", async () => {
        const { result } = renderHook(() => useDebounce("test", 200));
        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(result.current.debouncedValue).toBe("test");
    });
});