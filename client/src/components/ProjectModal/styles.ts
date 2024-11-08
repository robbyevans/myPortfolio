import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  padding: 20px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export const ModalInfo = styled.div`
  padding: 20px;
  text-align: left;

  h3 {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;
