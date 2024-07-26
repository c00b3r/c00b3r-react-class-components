import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import DetailPage from "../../pages/DetailPage/DetailPage";
import { loader as loaderPersonData } from "../../pages/DetailPage/DetailPageLoader";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("DetailPage", () => {
  const routes = [
    {
      path: "/people/:id",
      element: <DetailPage />,
      loader: loaderPersonData,
    },
  ];

  it("should render detail information correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/people/1"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/Height:/)).toBeInTheDocument();
      expect(screen.getByText("172")).toBeInTheDocument();
      expect(screen.getByText(/Mass:/)).toBeInTheDocument();
      expect(screen.getByText("77")).toBeInTheDocument();
      expect(screen.getByText(/BirthYear:/)).toBeInTheDocument();
      expect(screen.getByText("19BBY")).toBeInTheDocument();
      expect(screen.getByText(/Gender:/)).toBeInTheDocument();
      expect(screen.getByText("male")).toBeInTheDocument();
    });
  });

  it("should close the detail view when the Close button is clicked", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/people/1"],
    });

    render(<RouterProvider router={router} />);

    const closeButton = await screen.findByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("should navigate to correct URL when clicking outside the component", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/people/1"],
    });

    render(<RouterProvider router={router} />);

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);
    fireEvent.click(outsideElement);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
