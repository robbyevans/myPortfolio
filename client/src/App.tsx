// src/App.tsx
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lightTheme } from "./theme/lightTheme";
import { darkTheme } from "./theme/darkTheme";
import GlobalStyle from "./globalStyles";
import PortfolioPage from "./pages/portfolioPage/PortfolioPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme");
    if (savedTheme) {
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
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PortfolioPage toggleTheme={toggleTheme} theme={theme} />}
          />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
