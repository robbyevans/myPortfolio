import React, { useEffect } from "react";
import * as S from "./styles";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import { IToastMessage } from "../../store/projectSlice";

interface ToastMessageProps {
  toastMessage: IToastMessage;
  isAutoclose: boolean;
  handleClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  toastMessage,
  isAutoclose,
  handleClose,
}) => {
  const { showToastMessage, variant, message } = toastMessage;

  useEffect(() => {
    if (isAutoclose && showToastMessage) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAutoclose, showToastMessage, handleClose]);

  if (!showToastMessage) return null;

  return (
    <S.ToastContainer variant={variant}>
      <S.IconContainer>
        {variant === "success" && <FaCheckCircle />}
        {variant === "info" && <FaInfoCircle />}
        {variant === "error" && <FaExclamationCircle />}
        {/* {variant === "warning" && <FaExclamationCircle />} */}
      </S.IconContainer>
      <S.MessageContainer>
        <S.MessageText>{message}</S.MessageText>
        <S.ProgressBar variant={variant} />
      </S.MessageContainer>
      <S.CloseButton onClick={handleClose}>
        <FaTimes />
      </S.CloseButton>
    </S.ToastContainer>
  );
};

export default ToastMessage;
