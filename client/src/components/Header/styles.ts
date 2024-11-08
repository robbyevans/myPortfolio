import styled from "styled-components";

export const Header = styled.header`
  text-align: center;
  max-width: 1024px;

  color: ${(props) => props.theme.colors.text};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ContentWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

export const Title = styled.h1`
  font-size: 75px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: -1px;
  color: ${(props) => props.theme.colors.text};
`;

export const Description = styled.p`
  font-size: 25px;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.text};
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
  }
`;
