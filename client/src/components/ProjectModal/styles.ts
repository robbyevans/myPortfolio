import styled, { css } from "styled-components";

type TOrientation = "right" | "left";

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

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const CarouselButton = styled.button<{ $orientation: TOrientation }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $orientation }) =>
    $orientation === "left"
      ? css`
          left: 5px;
        `
      : css`
          right: 5px;
        `}
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  padding: 5px 10px;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
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
  overflow: hidden;

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

export const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const LiveLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.cardHover};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;

export const closeButton = styled.button`
  position: absolute;
  top: -20px;
  right: auto;
  color: ${(props) => props.theme.colors.text};
  background: none;
  border: none;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    white-space: normal;
    text-overflow: ellipsis;
  }
`;
