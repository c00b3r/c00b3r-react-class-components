import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  it("should render input and button", () => {
    render(
      <Router>
        <SearchBar onSearch={vi.fn()} updateLocalStorageItem={vi.fn()} />
      </Router>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should call onSearch function when button is clicked", () => {
    const onSearchMock = vi.fn();
    const updateLocalStorageItemMock = vi.fn();

    render(
      <Router>
        <SearchBar
          onSearch={onSearchMock}
          updateLocalStorageItem={updateLocalStorageItemMock}
        />
      </Router>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith("test");
  });

  it("should call updateLocalStorageItem function when button is clicked", () => {
    const onSearchMock = vi.fn();
    const updateLocalStorageItemMock = vi.fn();

    render(
      <Router>
        <SearchBar
          onSearch={onSearchMock}
          updateLocalStorageItem={updateLocalStorageItemMock}
        />
      </Router>,
    );

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(updateLocalStorageItemMock).toHaveBeenCalledTimes(1);
    expect(updateLocalStorageItemMock).toHaveBeenCalledWith("");
  });
});
