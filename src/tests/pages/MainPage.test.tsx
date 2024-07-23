import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainPage from "../../pages/MainPage/MainPage";
import { Mock, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import fetchDataOfPeopleApi from "../../service/api";

vi.mock("../../service/api", () => ({
  __esModule: true,
  default: vi.fn() as Mock,
}));

describe("MainPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the MainPage component", () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("fetches data when a search is performed", async () => {
    (fetchDataOfPeopleApi as Mock).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [{ name: "Luke Skywalker", url: "http://example.com/people/1" }],
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search...",
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Luke" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(fetchDataOfPeopleApi).toHaveBeenCalledWith("", 1);
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });
  });

  it("clears search input and local storage when search is empty", async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search...",
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(fetchDataOfPeopleApi).toHaveBeenCalledWith("", 1);
      expect(searchInput.value).toBe("");
    });
  });

  it("shows loading state while fetching data", async () => {
    (fetchDataOfPeopleApi as Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Luke" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Loading data, please wait")).toBeInTheDocument();
  });

  it("displays appropriate message for empty API response", async () => {
    (fetchDataOfPeopleApi as Mock).mockResolvedValue({
      count: 0,
      next: null,
      previous: null,
      results: [],
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, {
      target: { value: "Non-existing character" },
    });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText(/Data not found/i)).toBeInTheDocument();
    });
  });

  it("navigates through pages correctly", async () => {
    (fetchDataOfPeopleApi as Mock).mockResolvedValueOnce({
      count: 20,
      next: "nextPageUrl",
      previous: null,
      results: [{ name: "Luke Skywalker", url: "http://example.com/people/1" }],
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Luke" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    const nextButton = screen.getByText("→");
    fireEvent.click(nextButton);
  });
});
