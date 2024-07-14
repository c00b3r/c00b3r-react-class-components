import fetchDataOfPeopleApi from "../service/api";
import { Mock, vi } from "vitest";

describe("fetchDataOfPeopleApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return data on a successful API call", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 1,
            next: null,
            previous: null,
            results: [
              { name: "Luke Skywalker", url: "http://example.com/people/1" },
            ],
          }),
      }),
    ) as Mock;

    const data = await fetchDataOfPeopleApi("Luke", 1);

    expect(data).toEqual({
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "Luke Skywalker", url: "http://example.com/people/1" }],
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=Luke&page=1",
    );
  });

  it("should handle errors gracefully", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error")),
    ) as Mock;

    await expect(fetchDataOfPeopleApi("Luke", 1)).rejects.toThrow(
      "Network error",
    );
  });

  it("should call the API with default parameters when no arguments are provided", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 0,
            next: null,
            previous: null,
            results: [],
          }),
      }),
    ) as Mock;

    const data = await fetchDataOfPeopleApi();

    expect(data).toEqual({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?search=&page=1",
    );
  });
});
