import { useContext } from "react";
import {
  IThemeContext,
  ThemeContext,
} from "@providers/ThemeContextProvider.tsx";

/**
 * A custom hook to access the theme context.
 * @returns An object containing the current theme and a function to toggle the theme.
 * @throws An error if used outside the context of a ThemeContextProvider.
 */
const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
};

export { useTheme };
