import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 30px 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const IconWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Message = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 30px;

  strong {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryHover};
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;
