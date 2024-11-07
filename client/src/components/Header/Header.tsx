import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { FaSun, FaMoon } from "react-icons/fa";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.AdminButton onClick={() => navigate("/admin")}>Admin</S.AdminButton>
      <S.ThemeToggle onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </S.ThemeToggle>
      <S.Title>Evans Portfolio</S.Title>
      <S.Description>
        Hi 👋 I'm Evans, a Software Engineer based in Berlin.
      </S.Description>
      <S.Links>
        <a
          href="https://github.com/robbyevans"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/robbyevans"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </S.Links>
    </S.Header>
  );
};

export default Header;
