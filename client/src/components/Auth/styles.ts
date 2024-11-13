// File: /client/src/components/Auth/styles.ts

import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
`;

export const AuthBox = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 40px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.primaryText};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.primaryText};
  background: ${({ theme }) => theme.inputBackground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

export const Button = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.primaryColor};
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;

  &:disabled {
    background: ${({ theme }) => theme.disabledColor};
    cursor: not-allowed;
  }

  &:hover:enabled {
    background: ${({ theme }) => theme.primaryColorHover};
  }
`;

export const SwitchView = styled.p`
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.errorColor};
  margin-bottom: 16px;
`;
