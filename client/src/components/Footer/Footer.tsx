import React from "react";
import * as S from "./styles";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <S.Footer>
      <p>&copy; {new Date().getFullYear()} Made by Evans</p>
      <S.SocialLinks>
        <a
          href="https://github.com/robbyevans"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com/in/robbyevans"
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
