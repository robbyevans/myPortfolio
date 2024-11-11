import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import PortfolioPage from "./pages/portfolioPage/PortfolioPage";
import AdminPage from "./pages/AdminPage/AdminPage";

interface AppProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const App: React.FC<AppProps> = ({ toggleTheme, theme }) => (
  <>
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
  </>
);

export default App;
