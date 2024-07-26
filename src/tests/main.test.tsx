import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DetailPage from "../pages/DetailPage/DetailPage";
import { loader as loaderPersonData } from "../pages/DetailPage/DetailPageLoader.ts";
import React from "react";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.tsx";
import "@testing-library/jest-dom";

describe("React Router", () => {
  const routes = [
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "/people/:id",
          element: <DetailPage />,
          loader: loaderPersonData,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ];

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
