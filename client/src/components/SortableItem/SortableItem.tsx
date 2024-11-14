import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as S from "./style";
import { Project } from "../../store/projectSlice";
import { GoTrash, GoPencil } from "react-icons/go";

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
        <S.IconButton
          onClick={() => handleEditProject(project)}
          aria-label="Edit Project"
        >
          <GoPencil color="" />
        </S.IconButton>
        <S.IconButton
          onClick={() => handleDeleteProjectClick(project.id)}
          aria-label="Delete Project"
        >
          <GoTrash />
        </S.IconButton>
      </S.ButtonsWrapper>
    </S.SortableItemContainer>
  );
};

export default SortableItem;
