import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const progressBarAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const variantColors = {
  success: {
    background: "#28a745",
    progressBar: "#1e7e34",
  },
  info: {
    background: "#17a2b8",
    progressBar: "#117a8b",
  },
  error: {
    background: "#dc3545",
    progressBar: "#a71d2a",
  },
  warning: {
    background: "#ffc107",
    progressBar: "#d39e00",
  },
};

export const ToastContainer = styled.div<{
  variant: keyof typeof variantColors;
}>`
  display: flex;
  align-items: center;
  background-color: ${(props) => variantColors[props.variant].background};
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideInAnimation} 0.3s ease-out;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 90%;
    right: 5%;
  }
`;

export const IconContainer = styled.div`
  font-size: 24px;
  margin-right: 12px;
`;

export const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MessageText = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const ProgressBar = styled.div<{ variant: keyof typeof variantColors }>`
  height: 4px;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${(props) => variantColors[props.variant].progressBar};
    animation: ${progressBarAnimation} 3s linear;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 12px;
  padding: 0;
`;
