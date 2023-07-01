import React, { createContext, useReducer } from "react";

type ThemeMode = "light" | "dark";

type contextType = {
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

export const ThemeContext = createContext<contextType | null>(null);

ThemeContext.displayName = "ThemeContext";

const storeTheme = (mode: ThemeMode) => {
  localStorage.setItem("theme", mode);
};

const getStoredTheme = () => {
  return localStorage.getItem("theme");
};

const getSystemTheme = (): ThemeMode => {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  return mql.matches ? "dark" : "light";
};

const initialTheme = () => {
  let storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  } else {
    return getSystemTheme();
  }
};

const reducer = (state: string, action: string) => {
  storeTheme(action as ThemeMode);
  return action;
};

interface props {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(reducer, initialTheme());

  return (
    <ThemeContext.Provider
      value={{ themeMode: state as ThemeMode, setTheme: dispatch }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
