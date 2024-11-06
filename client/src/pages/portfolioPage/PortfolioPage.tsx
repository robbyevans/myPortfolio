// src/pages/PortfolioPage/PortfolioPage.tsx
import React from "react";
import Header from "../../components/Header/Header";
import Github from "../../components/GithubSection/GithubSection";
import Projects from "../../components/Projects/Projects";
import Footer from "../../components/Footer/Footer";
import * as S from "./styles";

const PortfolioPage: React.FC = () => {
  return (
    <S.Container>
      <Header />
      <Github />
      <Projects />
      <Footer />
    </S.Container>
  );
};

export default PortfolioPage;
