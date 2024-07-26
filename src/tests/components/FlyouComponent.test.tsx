import { fireEvent, render, screen } from "@testing-library/react";
import FlyoutComponent from "../../components/FlyoutComponent/FlyoutComponent";
import { setupStore } from "../../store/store";
import { Provider } from "react-redux";

describe("FlyoutComponent", () => {
  const selectedItem = [
    {
      name: "Luke Skywalker",
      birthYear: "19BBY",
      gender: "male",
      height: "172",
    },
    {
      name: "Darth Vader",
      birthYear: "41.9BBY",
      gender: "male",
      height: "202",
    },
  ];
  const store = setupStore({
    selectedItem,
  });

  it("renders nothing when no items are selected", () => {
    URL.createObjectURL = vi.fn();
    const { container } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );

    expect(container).not.toBeEmptyDOMElement();
  });

  it("renders the correct number of selected items", () => {
    const selectedItems = [
      { name: "Item 1", birthYear: "1990", gender: "male", height: "180" },
      { name: "Item 2", birthYear: "1995", gender: "female", height: "160" },
    ];
    store.dispatch({ type: "SELECTED_ITEMS", payload: selectedItems });
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );
    expect(getByText("2 items are selected")).toBeInTheDocument();
  });

  it("renders the correct tools of selected items", () => {
    store.dispatch({ type: "selectedItem", payload: selectedItem });
    const { getAllByRole } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );
    const buttonItems = getAllByRole("button");

    expect(buttonItems.length).toBe(1);
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('calls the clearSelectedItems action when the "Unselect all" button is clicked', () => {
    store.dispatch({ type: "selectedItem", payload: selectedItem });
    const { getByText } = render(
      <Provider store={store}>
        <FlyoutComponent />
      </Provider>,
    );
    const unselectAllButton = getByText("Unselect all");
    fireEvent.click(unselectAllButton);
    expect(store.getState().selectedItem).toEqual([]);
  });
});
