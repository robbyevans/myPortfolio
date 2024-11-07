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
    <S.Container>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Github />
      <Projects />
      <Footer />
    </S.Container>
  );
};

export default PortfolioPage;
