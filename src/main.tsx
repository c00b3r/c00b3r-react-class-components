import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import { loader as loaderPersonData } from "./pages/DetailPage/DetailPageLoader.ts";
import DetailPage from "./pages/DetailPage/DetailPage.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ThemeProvider } from "./context/LightDarkThemeContext.tsx";

const root = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<p>Something went wrong, check console.</p>}>
        <ThemeProvider>
          <RouterProvider router={root} />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
