// src/components/Footer/styles.ts

import styled from "styled-components";

export const Footer = styled.footer`
  position: relative;
  padding: 20px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  border-top: 1px solid ${(props) => props.theme.colors.cardHover};
`;

export const SocialLinks = styled.div`
  margin-top: 10px;

  a {
    margin: 0 10px;
    color: ${(props) => props.theme.colors.text};
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }

    svg {
      vertical-align: middle;
    }
  }
`;
export const AdminButton = styled.p`
  position: absolute;
  top: 20px;
  right: 30px;
  text-decoration: underline;
  color: ${(props) => props.theme.colors.text};
`;
