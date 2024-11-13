// File: /client/src/components/Auth/Auth.tsx

import React from "react";
import * as S from "./styles";

interface AuthProps {
  view: "login" | "signup";
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchView: () => void;
}

const Auth: React.FC<AuthProps> = ({
  view,
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSwitchView,
}) => {
  return (
    <S.AuthContainer>
      <S.AuthBox>
        <S.Title>{view === "login" ? "Login" : "Sign Up"}</S.Title>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.Form onSubmit={onSubmit}>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
          <S.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
          />
          <S.Button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : view === "login"
              ? "Login"
              : "Sign Up"}
          </S.Button>
        </S.Form>
        <S.SwitchView onClick={onSwitchView}>
          {view === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </S.SwitchView>
      </S.AuthBox>
    </S.AuthContainer>
  );
};

export default Auth;
