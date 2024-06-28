import { cleanup } from "@testing-library/react";
import { beforeEach } from "@vitest/runner";
import "@testing-library/jest-dom/vitest";

beforeEach(() => {
    cleanup();
});