import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser, signupUser, logout, clearError } from "../store/userSlice";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignup = (email: string, password: string) => {
    dispatch(signupUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const clearUserError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    loading,
    error,
    handleLogin,
    handleSignup,
    handleLogout,
    clearUserError,
  };
};
