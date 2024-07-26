import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "../../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default value if key is not in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("non-existent-key"));
    expect(result.current[0]).toBe("");
  });

  it("returns value from localStorage if key exists", () => {
    const key = "existing-key";
    const value = "Hello, World!";
    localStorage.setItem(key, value);

    const { result } = renderHook(() => useLocalStorage(key));
    expect(result.current[0]).toBe(value);
  });

  it("updates localStorage when value changes", () => {
    const key = "update-key";
    const { result } = renderHook(() => useLocalStorage(key));

    const newValue = "New Value";
    act(() => {
      result.current[1](newValue);
    });

    expect(localStorage.getItem(key)).toBe(newValue);
  });

  it("catches errors when accessing localStorage", () => {
    const key = "error-key";
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = () => {
      throw new Error("Error accessing localStorage");
    };

    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toBe("");
    localStorage.getItem = originalGetItem;
  });
});
