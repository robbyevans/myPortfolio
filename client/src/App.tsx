import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PortfolioPage from "./pages/portfolioPage/PortfolioPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
