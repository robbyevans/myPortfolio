import React from "react";
import * as S from "./styles";
import { FaSun, FaMoon } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  return (
    <S.Header data-testid="header-component">
      <S.ThemeToggle onClick={toggleTheme}>
        {theme === "light" ? (
          <FaMoon color="#333" />
        ) : (
          <FaSun color="#f1c40f" />
        )}
      </S.ThemeToggle>

      <S.ContentWrapper>
        <S.Title>Evans Rutto</S.Title>
        <S.Description>
          Hi 👋 <br />
          I'm Evans, a{" "}
          <RoughNotation
            type="highlight"
            padding={[2, 2, 2, 2]}
            color={theme === "light" ? "#33e82d" : "#8a1515"}
            show={true}
            animationDuration={800}
            multiline={true}
          >
            Frontend Software Engineer
          </RoughNotation>{" "}
          based in Sydney. <br /> I'm currently working at{" "}
          <RoughNotation
            type="underline"
            color={theme === "light" ? "#8a1515" : "#33e82d"}
            show={true}
            animationDuration={800}
            multiline={true}
          >
            <a
              href="https://www.linkedin.com/in/evans-rutto-5a40b722a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vinhood🍷
            </a>
          </RoughNotation>
          , as a staff Frontend Engineer. Visit my{" "}
          <RoughNotation
            type="underline"
            color={theme === "light" ? "#8a1515" : "#33e82d"}
            show={true}
            animationDuration={800}
            multiline={true}
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
