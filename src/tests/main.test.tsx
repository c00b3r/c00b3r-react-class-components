import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DetailPage from "../pages/DetailPage/DetailPage";
import { loader as loaderPersonData } from "../pages/DetailPage/DetailPageLoader.ts";
import React from "react";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.tsx";
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

describe("React Router", () => {
  const routes = [
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/people/:id",
          element: <DetailPage />,
          loader: loaderPersonData,
        },
      ],
    },
  ];

  it("renders MainPage at root path", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(
      <React.StrictMode>
        <ErrorBoundary fallback={<p>Something went wrong, check console.</p>}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders error page on error", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/404"] });

    render(
      <React.StrictMode>
        <ErrorBoundary fallback={<p>Something went wrong, check console.</p>}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </React.StrictMode>,
    );

    await waitFor(() => screen.getByText("Oops! Page Not Found"));
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
  });
});
