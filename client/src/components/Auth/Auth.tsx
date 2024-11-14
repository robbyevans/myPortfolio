import React from "react";
import * as S from "./styles";
import { RoughNotation } from "react-rough-notation";

interface AuthProps {
  view: "login" | "signup";
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchView: () => void;
}

const Auth: React.FC<AuthProps> = ({
  view,
  email,
  password,
  confirmPassword,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onSwitchView,
}) => {
  const savedTheme = localStorage.getItem("portfolioTheme");
  console.log("loading", loading);

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
          {view === "signup" && (
            <S.Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              required
            />
          )}
          <S.Button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : view === "login"
              ? "Login"
              : "Sign Up"}
          </S.Button>
        </S.Form>
        <S.SwitchView onClick={onSwitchView}>
          {view === "login" ? (
            <>
              {"Don't have an account? "}
              <RoughNotation
                type="underline"
                padding={[2, 2, 2, 2]}
                color={savedTheme === "light" ? "#33e82d" : "#8a1515"}
                show={true}
                animationDuration={800}
                multiline={true}
              >
                Sign Up
              </RoughNotation>
            </>
          ) : (
            <>
              {"Already have an account? "}
              <RoughNotation
                type="underline"
                padding={[2, 2, 2, 2]}
                color={savedTheme === "light" ? "#33e82d" : "#8a1515"}
                show={true}
                animationDuration={800}
                multiline={true}
              >
                Login
              </RoughNotation>
            </>
          )}
        </S.SwitchView>
      </S.AuthBox>
    </S.AuthContainer>
  );
};

export default Auth;
