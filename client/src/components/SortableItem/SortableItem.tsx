import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as S from "./style";
import { Project } from "../../store/projectSlice";

interface SortableItemProps {
  project: Project;
  handleEditProject: (project: Project) => void;
  handleDeleteProjectClick: (id: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  project,
  handleEditProject,
  handleDeleteProjectClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id.toString() });

  return (
    <S.SortableItemContainer
      ref={setNodeRef}
      $isDragging={isDragging}
      $transform={CSS.Transform.toString(transform) || null}
      $transition={transition}
    >
      <S.ContentWrapper {...attributes} {...listeners}>
        <S.DragHandle>☰</S.DragHandle>
        <span>{project.name}</span>
      </S.ContentWrapper>

      <S.ButtonsWrapper>
        <S.EditButton onClick={() => handleEditProject(project)}>
          Edit
        </S.EditButton>
        <S.DeleteButton onClick={() => handleDeleteProjectClick(project.id)}>
          Delete
        </S.DeleteButton>
      </S.ButtonsWrapper>
    </S.SortableItemContainer>
  );
};

export default SortableItem;
