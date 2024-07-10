import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

const root = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong, check console.</p>}>
      <RouterProvider router={root} />
    </ErrorBoundary>
  </React.StrictMode>,
);
