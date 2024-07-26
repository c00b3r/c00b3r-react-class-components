import { describe, expect, it } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DarkLightThemeContext, {
  ThemeProvider,
} from "../../context/LightDarkThemeContext";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

describe("ThemeProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <div>Children</div>
      </ThemeProvider>,
    );
    expect(getByText("Children")).toBeInTheDocument();
  });

  it("should toggle theme", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <DarkLightThemeContext.Consumer>
          {(contextValue) => {
            if (!contextValue) {
              return null;
            }
            const { theme, toggleTheme } = contextValue as ThemeContextType;
            return (
              <div>
                <div>Current theme: {theme}</div>
                <button onClick={toggleTheme}>Toggle theme</button>
              </div>
            );
          }}
        </DarkLightThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(getByText("Current theme: dark")).toBeInTheDocument();

    const toggleButton = getByText("Toggle theme");
    fireEvent.click(toggleButton);

    await waitFor(() => getByText("Current theme: light"));
    expect(getByText("Current theme: light")).toBeInTheDocument();
  });

  it("should update body class", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <DarkLightThemeContext.Consumer>
          {(contextValue) => {
            if (!contextValue) {
              return null;
            }
            const { theme, toggleTheme } = contextValue as ThemeContextType;
            return (
              <div>
                <div>Current theme: {theme}</div>
                <button onClick={toggleTheme}>Toggle theme</button>
              </div>
            );
          }}
        </DarkLightThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(document.body.className).toBe("dark");

    const toggleButton = getByText("Toggle theme");
    fireEvent.click(toggleButton);

    await waitFor(() => getByText("Current theme: light"));
    expect(document.body.className).toBe("light");
  });

  it("should not update body class when theme is the same", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <DarkLightThemeContext.Consumer>
          {(contextValue) => {
            if (!contextValue) {
              return null;
            }
            const { theme, toggleTheme } = contextValue as ThemeContextType;
            return (
              <div>
                <div>Current theme: {theme}</div>
                <button onClick={toggleTheme}>Toggle theme</button>
              </div>
            );
          }}
        </DarkLightThemeContext.Consumer>
      </ThemeProvider>,
    );

    expect(document.body.className).toBe("dark");

    const toggleButton = getByText("Toggle theme");
    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    await waitFor(() => getByText("Current theme: dark"));
    expect(document.body.className).toBe("dark");
  });
});
