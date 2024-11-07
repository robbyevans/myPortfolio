// src/components/Header/styles.ts

import styled from "styled-components";

export const Header = styled.header`
  text-align: center;
  padding: 80px 20px;
  position: relative;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary} 0%,
    ${(props) => props.theme.colors.cardBackground} 100%
  );
  color: #fff;
`;

export const AdminButton = styled.button`
  position: absolute;
  top: 20px;
  right: 60px;
  padding: 8px 12px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.cardHover};
  }
`;

export const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.cardHover};
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 1.2rem;
`;

export const Links = styled.div`
  margin-top: 20px;

  a {
    margin: 0 15px;
    color: #fff;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.cardHover};
    }
  }
`;
