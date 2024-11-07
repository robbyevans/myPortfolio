import styled from "styled-components";

export const Header = styled.header`
  text-align: center;
  padding: 20px;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

export const Links = styled.div`
  margin-top: 10px;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #0077b5;
  }
`;

export const AdminButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #0077b5;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
