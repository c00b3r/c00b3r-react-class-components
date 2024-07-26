import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import SearchBar from "../../components/SearchBar/SearchBar";

describe("MainPage", () => {
  it("should renders with placeholder", async () => {
    render(
      <MemoryRouter>
        <SearchBar onSearch={vi.fn()} updateLocalStorageItem={vi.fn()} />
      </MemoryRouter>,
    );
    screen.debug();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
