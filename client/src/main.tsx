import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { darkTheme, lightTheme } from "./theme/theme";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "styled-components";

const Root = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  console.log(`Environment: ${import.meta.env.MODE}`);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme") as
      | "light"
      | "dark"
      | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("portfolioTheme", newTheme);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={themeMode}>
        <App toggleTheme={toggleTheme} theme={theme} />
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
