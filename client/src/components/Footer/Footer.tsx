// src/components/Footer/Footer.tsx
import React from "react";
import * as S from "./styles";

const Footer: React.FC = () => {
  return (
    <S.Footer>
      <p>&copy; {new Date().getFullYear()} Made by Evans</p>
    </S.Footer>
  );
};

export default Footer;
