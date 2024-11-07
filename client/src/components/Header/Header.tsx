import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { FaSun, FaMoon } from "react-icons/fa";
import { darkTheme } from "../../theme/darkTheme";
import { RoughNotation } from "react-rough-notation";

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
        {theme === "light" ? (
          <FaMoon color={darkTheme.colors.background} />
        ) : (
          <FaSun />
        )}
      </S.ThemeToggle>
      <S.ContentWrapper>
        <S.Title>Evans Rutto</S.Title>
        <S.Description>
          Hi 👋 <br />
          I'm Evans, a{" "}
          <RoughNotation
            type="highlight"
            color="#8a1515"
            show={true}
            animationDuration={800}
          >
            Frontend Software Engineer
          </RoughNotation>{" "}
          based in Nairobi. <br /> I'm currently working at{" "}
          <RoughNotation
            type="underline"
            color="#33e82d"
            show={true}
            animationDuration={800}
          >
            <a
              href="https://www.linkedin.com/in/evans-rutto-5a40b722a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vinhood
            </a>
          </RoughNotation>
          , as a staff Frontend Engineer. Visit my{" "}
          <RoughNotation
            type="underline"
            color="#33e82d"
            show={true}
            animationDuration={800}
          >
            <a
              href="https://github.com/robbyevans"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </RoughNotation>{" "}
          profile to check some of my current work.
        </S.Description>
        <S.Links></S.Links>
      </S.ContentWrapper>
    </S.Header>
  );
};

export default Header;
