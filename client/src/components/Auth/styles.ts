import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-top: 20%;
  max-width: 470px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;

  &:disabled {
    background: ${(props) => props.theme.disabledColor};
    cursor: not-allowed;
  }

  &:hover:enabled {
    background: ${({ theme }) => theme.primaryColorHover};
  }
`;

export const SwitchView = styled.p`
  color: ${({ theme }) => theme.linkColor};
  margin-top: 16px;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.errorColor};
  margin-bottom: 16px;
`;
