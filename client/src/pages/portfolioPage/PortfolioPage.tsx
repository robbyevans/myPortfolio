// src/pages/portfolioPage/PortfolioPage.tsx

import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Github from "../../components/GithubSection/GithubSection";
import Projects from "../../components/Projects/Projects";
import Footer from "../../components/Footer/Footer";
import * as S from "./styles";
import useHandleProjects from "../../hooks/useHandleProjects";

interface PortfolioPageProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  toggleTheme,
  theme,
}) => {
  const { projectsList, loading, handleFetchProjects } = useHandleProjects();
  console.log("projectsList", projectsList);
  console.log("isLoading", loading);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  return (
    <>
      <S.PortfolioContainer>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Github theme={theme} />
        <Projects projectsList={projectsList} loading={loading} />
      </S.PortfolioContainer>
      <Footer />
    </>
  );
};

export default PortfolioPage;
