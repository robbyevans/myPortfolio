// Footer.tsx
import React from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <S.Footer>
      <S.FooterWrapper data-testid="footer-wrapper">
        <S.FooterHeader>
          &copy; {new Date().getFullYear()} Made by Evans 🚀
        </S.FooterHeader>
        <S.AdminButton onClick={() => navigate("/admin")}>
          Admin portal
        </S.AdminButton>
      </S.FooterWrapper>
      <S.SocialLinks>
        <a
          href="https://github.com/robbyevans"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/evans-rutto-5a40b722a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>
      </S.SocialLinks>
    </S.Footer>
  );
};

export default Footer;
