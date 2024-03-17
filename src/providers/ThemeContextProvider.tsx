import React, { useEffect, useState, createContext } from "react";

type TTheme = "light" | "dark";

interface IThemeContextProviderProps {
  children: React.ReactNode;
}

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

const ThemeContextProvider: React.FC<IThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<TTheme>("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as TTheme | null;

    if (localTheme) {
      setTheme(localTheme);

      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
ThemeContextProvider.displayName = "ThemeContextProvider";

export { ThemeContextProvider, ThemeContext, type IThemeContext };
