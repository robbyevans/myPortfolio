// src/pages/AdminPage/styles.ts

import styled from "styled-components";

export const LoginContainer = styled.div`
  text-align: center;
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.primary};
  }

  input {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 250px;
    font-size: 1rem;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }
`;

export const AdminContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  input,
  textarea {
    margin: 5px 0;
    padding: 10px;
    font-size: 1rem;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 30px;
`;

export const ProjectItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.cardHover};

  span {
    font-size: 1.1rem;
  }

  div {
    button {
      margin-left: 10px;
    }
  }
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  font-size: 0.9rem;
  background-color: #e53935;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
