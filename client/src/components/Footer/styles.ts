import styled from "styled-components";

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

export const FooterHeader = styled.p`
  margin-left: 150px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
`;
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

export const AdminButton = styled.button`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: inherit;

  &:hover {
    color: ${(props) => props.theme.colors.cardHover};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  justify-content: center;

  margin: 0 auto;

  p {
    flex: 1;
    text-align: center;
  }

  ${AdminButton} {
    margin-left: auto;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    justify-content: center;

    p {
      flex: none;
      text-align: center;
    }

    ${AdminButton} {
      margin-left: 0;
      margin-top: 8px;
    }
  }
`;
