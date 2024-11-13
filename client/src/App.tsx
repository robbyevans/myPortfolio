// File: /client/src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import PortfolioPage from "./pages/portfolioPage/PortfolioPage";
import AdminPageContainer from "./containers/AdminPageContainer";
import AuthContainer from "./containers/AuthContainer";
import RequireAuth from "./components/RequireAuth/RequireAuth"; // Import the RequireAuth component

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
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/signup" element={<AuthContainer />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminPageContainer />} />
          {/* Add more protected routes here if needed */}
        </Route>
      </Routes>
    </Router>
  </>
);

export default App;
