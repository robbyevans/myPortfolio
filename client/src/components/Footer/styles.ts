// src/components/Footer/styles.ts

import styled from "styled-components";

export const Footer = styled.footer`
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
