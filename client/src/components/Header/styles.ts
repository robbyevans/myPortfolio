import styled from "styled-components";

const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
};

export const Header = styled.header`
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.text};
  position: relative;
  padding: 20px 0;

  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
    padding: 15px 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 10px 0;
  }
`;

export const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.cardHover};
  }

  @media (max-width: ${breakpoints.tablet}) {
    top: 15px;
    right: 15px;
    font-size: 1.3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 10px;
    right: 10px;
    font-size: 1.1rem;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 60px 0;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 50px 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 0;
  }
`;

export const Title = styled.h1`
  font-size: 4.7rem;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -1px;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 4rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

export const Description = styled.p`
  font-size: 1.6rem;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.6;

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.cardHover};
    }
  }
`;

export const Links = styled.div`
  margin-top: 25px;

  a {
    margin: 0 15px;
    color: ${(props) => props.theme.colors.text};
    font-size: 1.1rem;
    font-weight: 500;
    transition: color 0.3s;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.colors.cardHover};
    }

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1rem;
      margin: 0 10px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.9rem;
      margin: 0 8px;
    }
  }
`;
