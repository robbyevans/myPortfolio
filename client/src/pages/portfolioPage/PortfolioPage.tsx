import React from "react";
import Header from "../../components/Header/Header";
import Github from "../../components/GithubSection/GithubSection";
import Projects from "../../components/Projects/Projects";
import Footer from "../../components/Footer/Footer";
import * as S from "./styles";

interface PortfolioPageProps {
  toggleTheme: () => void;
  theme: string;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  toggleTheme,
  theme,
}) => {
  return (
    <>
      <S.PortfolioContainer>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Github />
        <Projects />
      </S.PortfolioContainer>
      <Footer />
    </>
  );
};

export default PortfolioPage;
