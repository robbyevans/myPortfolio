import styled from "styled-components";

export const AdminContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 12px 15px;
  font-size: 1rem;
  height: 100px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const FileInputWrapper = styled.div`
  min-height: 50px;
  margin: 10px 0;
  position: relative;
  display: flex;
  align-items: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileUploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px dashed ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hoverBackground};
    border-color: ${(props) => props.theme.colors.primary};
  }

  svg {
    margin-right: 10px;
  }
`;

export const Button = styled.button<{ $variantSecondary?: boolean }>`
  margin-top: 15px;
  padding: 12px 20px;
  font-size: 1rem;
  background-color: ${(props) =>
    props.$variantSecondary ? "#CFCFCF" : props.theme.colors.primary};
  color: aliceblue;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.$variantSecondary
        ? props.theme.colors.darkGrey
        : props.theme.colors.cardHover};
  }
`;

export const BackButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.Primary};
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  gap: 8px;
  display: flex;
`;

export const ProjectList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ProjectItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.cardHover};

  span {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.text};
  }

  div {
    button {
      margin-left: 10px;
    }
  }
`;

export const EditButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.cardHover};
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  background-color: #e53935;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #b71c1c;
  }
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 10px;
`;

export const ImagePreview = styled.div`
  position: relative;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;

  &:hover {
    background-color: #b71c1c;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  min-width: 135px;
`;

export const SortableItemContainer = styled.div<{
  $isDragging: boolean;
  $transform: string | null;
  $transition: string | undefined;
}>`
  border: 1px solid blue;
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

export const DragOverlayContainer = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.dragBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  span {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const NavButtonsWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
