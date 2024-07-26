import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import { ThemeProvider } from "../../context/LightDarkThemeContext";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { Provider } from "react-redux";
import store from "../../store/store";

const handlers = [
  http.get("https://swapi.dev/api/people/", () => {
    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "male",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/",
          ],
          species: [],
          vehicles: [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/",
          ],
          starships: [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/",
          ],
          created: "2014-12-09T13:50:51.644000Z",
          edited: "2014-12-20T21:17:56.891000Z",
          url: "https://swapi.dev/api/people/1/",
        },
        {
          name: "C-3PO",
          height: "167",
          mass: "75",
          hair_color: "n/a",
          skin_color: "gold",
          eye_color: "yellow",
          birth_year: "112BBY",
          gender: "n/a",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/",
          ],
          species: ["https://swapi.dev/api/species/2/"],
          vehicles: [],
          starships: [],
          created: "2014-12-10T15:10:51.357000Z",
          edited: "2014-12-20T21:17:50.309000Z",
          url: "https://swapi.dev/api/people/2/",
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MainPage", async () => {
  await waitFor(() => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <ThemeProvider>
            <BrowserRouter>
              <MainPage />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>,
      );
    });
  });

  it("renders search bar and theme switch button", () => {
    const searchBar = screen.getByPlaceholderText(/search/i);
    const switchThemeButton = screen.getByText(/switch to light theme/i);
    expect(searchBar).toBeInTheDocument();
    expect(switchThemeButton).toBeInTheDocument();
  });

  it("loading data before render", () => {
    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  });

  it("switches themes correctly", async () => {
    const switchThemeButton = screen.getByText(/switch to light theme/i);
    fireEvent.click(switchThemeButton);

    expect(screen.getByText(/switch to dark theme/i)).toBeInTheDocument();
  });

  it("searches for people correctly", async () => {
    const searchBar = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchBar, { target: { value: "Luke" } });
    fireEvent.click(screen.getByText(/search people/i));

    await waitFor(() =>
      expect(screen.queryByText(/loading data/i)).not.toBeInTheDocument(),
    );
    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });
});
