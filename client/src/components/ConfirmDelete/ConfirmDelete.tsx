import React from "react";
import * as S from "./styles";
import { FaTrash } from "react-icons/fa";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}) => {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Modal>
        <S.IconWrapper>
          <FaTrash size={40} color="#e53935" />
        </S.IconWrapper>
        <S.Message>
          Confirm you want to delete the project <strong>{projectName}</strong>?
        </S.Message>
        <S.ButtonsWrapper>
          <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>Confirm Delete</S.ConfirmButton>
        </S.ButtonsWrapper>
      </S.Modal>
    </S.Overlay>
  );
};

export default ConfirmDelete;
