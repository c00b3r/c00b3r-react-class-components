import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import { loader as loaderPersonData } from "./pages/DetailPage/DetailPageLoader.ts";
import DetailPage from "./pages/DetailPage/DetailPage.tsx";

const root = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong, check console.</p>}>
      <RouterProvider router={root} />
    </ErrorBoundary>
  </React.StrictMode>,
);
