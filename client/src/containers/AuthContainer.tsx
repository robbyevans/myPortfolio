// File: /client/src/containers/AuthContainer.tsx

import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "../components/Auth/Auth";

const AuthContainer: React.FC = () => {
  const [view, setView] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleSignup, token, loading, error, clearUserError } =
    useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the location the user was trying to access before redirect
  const from =
    (location.state as { from?: Location })?.from?.pathname || "/admin";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "login") {
      handleLogin(email, password);
    } else {
      handleSignup(email, password);
    }
  };

  const switchView = () => {
    setView(view === "login" ? "signup" : "login");
    clearUserError();
  };

  return (
    <Auth
      view={view}
      email={email}
      password={password}
      loading={loading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onSwitchView={switchView}
    />
  );
};

export default AuthContainer;
