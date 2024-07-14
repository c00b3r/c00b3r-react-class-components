import { render, screen } from "@testing-library/react";
import ListOfPeople from "../../components/ListOfPeople/ListOfPeople";
import { BrowserRouter as Router } from "react-router-dom";
import { mockData } from "./mockData";

describe("ListOfPeople", () => {
  it("should render loading state", () => {
    render(
      <Router>
        <ListOfPeople
          data={{ count: 0, next: null, previous: null, results: [] }}
          loadingData={true}
          page={1}
          setPage={vi.fn()}
        />
      </Router>,
    );

    expect(screen.getByText("Loading data, please wait")).toBeInTheDocument();
  });

  it("should render data not found if result is empty", () => {
    render(
      <Router>
        <ListOfPeople
          data={{ count: 0, next: null, previous: null, results: [] }}
          loadingData={false}
          page={1}
          setPage={vi.fn()}
        />
      </Router>,
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("should render list of people specified number of cards", () => {
    const { container } = render(
      <Router>
        <ListOfPeople
          data={mockData}
          loadingData={false}
          page={1}
          setPage={vi.fn()}
        />
      </Router>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();
    expect(container);
  });

  it("should render pagination if count of data > 10", () => {
    const setPage = vi.fn();
    render(
      <Router>
        <ListOfPeople
          data={{
            count: 21,
            next: "http://swapi.dev/api/people/?page=2",
            previous: null,
            results: [],
          }}
          loadingData={false}
          page={1}
          setPage={setPage}
        />
      </Router>,
    );

    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });
});
