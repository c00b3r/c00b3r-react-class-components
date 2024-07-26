import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const DarkLightThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <DarkLightThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkLightThemeContext.Provider>
  );
}

export default DarkLightThemeContext;
