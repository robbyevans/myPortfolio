import styled from "styled-components";

export const SortableItemContainer = styled.li<{
  $isDragging: boolean;
  $transform: string | null;
  $transition: string | undefined;
}>`
  transform: ${(props) => props.$transform || "none"};
  transition: ${(props) => props.$transition || "none"};
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  box-shadow: ${(props) =>
    props.$isDragging ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none"};
  background-color: ${(props) =>
    props.$isDragging
      ? props.theme.colors.dragBackground
      : props.theme.colors.background};
  padding: 15px 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const DragHandle = styled.div`
  cursor: grab;
  padding-right: 10px;
  user-select: none;
  font-size: 1.5rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  min-width: 135px;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.iconHoverColor};
  }

  &:focus {
    outline: none;
    color: ${(props) => props.theme.colors.iconFocusColor};
  }
`;

export const projectTitleWrapper = styled.div`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  touch-action: none; /* Prevents scrolling when dragging */
`;
