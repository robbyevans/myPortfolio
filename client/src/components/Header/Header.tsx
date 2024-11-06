// src/components/Header/Header.tsx
import React from "react";
import * as S from "./styles";

const Header: React.FC = () => {
  return (
    <S.Header>
      <S.Title>Axel Fuhrmann</S.Title>
      <S.Description>
        Hi 👋 I'm Axel, a Software Engineer based in Berlin.
      </S.Description>
      <S.Links>
        <a
          href="https://github.com/axelfuhrmann"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/axelfuhrmann"
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
