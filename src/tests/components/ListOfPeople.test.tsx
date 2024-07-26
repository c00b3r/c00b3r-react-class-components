import { render, screen } from "@testing-library/react";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import { BrowserRouter as Router } from "react-router-dom";
import { mockData } from "../mockData";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("ListOfPeople", () => {
  it("should render list of people correctly when data is available", () => {
    render(
      <Router>
        <Provider store={store}>
          <ListOfPeople
            data={{
              count: 0,
              next: null,
              previous: null,
              results: [],
            }}
            page={1}
            setPage={vi.fn()}
          />
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("should render list of people specified number of cards", () => {
    render(
      <Router>
        <Provider store={store}>
          <ListOfPeople data={mockData} page={1} setPage={vi.fn()} />
        </Provider>
      </Router>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();
  });

  it("should render pagination if count of data > 10", () => {
    const setPage = vi.fn();
    render(
      <Router>
        <Provider store={store}>
          <ListOfPeople
            data={{
              count: 21,
              next: "http://swapi.dev/api/people/?page=2",
              previous: null,
              results: [],
            }}
            page={1}
            setPage={setPage}
          />
        </Provider>
      </Router>,
    );

    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });
});
