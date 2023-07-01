import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./context/ThemeContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
