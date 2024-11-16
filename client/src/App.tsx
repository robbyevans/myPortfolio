import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import PortfolioPage from "./pages/portfolioPage/PortfolioPage";
import AdminPageContainer from "./containers/AdminPageContainer";
import AuthContainer from "./containers/AuthContainer";
import RequireAuth from "./components/RequireAuth/RequireAuth";
// import { logAllowedOrigins } from "./utils/debug";

interface AppProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const App: React.FC<AppProps> = ({ toggleTheme, theme }) => {
  // useEffect(() => {
  //   logAllowedOrigins(); // Fetch and log allowed origins on mount
  // }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PortfolioPage toggleTheme={toggleTheme} theme={theme} />}
          />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/signup" element={<AuthContainer />} />

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminPageContainer />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
