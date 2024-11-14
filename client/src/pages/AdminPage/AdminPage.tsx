import React, { useState } from "react";
import * as S from "./styles";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { Project, ImageData, IToastMessage } from "../../store/projectSlice";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface ProjectWithMixedImages extends Omit<Project, "images"> {
  images: (ImageData | File)[];
}

interface AdminPageProps {
  onDragEnd: (result: DragEndEvent) => void;
  handleUpdateSort: () => void;
  projectsList: Project[];
  toastMessage: IToastMessage;
  handleResetToastMessage: () => void;
  newProject: ProjectWithMixedImages;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProjectClick: () => void;
  handleUpdateProjectClick: () => void;
  currentProject: Project | null;
  handleCancelEdit: () => void;
  handleEditProject: (project: Project) => void;
  handleDeleteProjectClick: (id: number) => void;
  handleRemoveImage: (index: number) => void;
  handleBackToHome: () => void;
  handleLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
  onDragEnd,
  handleUpdateSort,
  projectsList,
  toastMessage,
  handleResetToastMessage,
  newProject,
  handleInputChange,
  handleFileChange,
  handleAddProjectClick,
  handleUpdateProjectClick,
  currentProject,
  handleCancelEdit,
  handleEditProject,
  handleDeleteProjectClick,
  handleRemoveImage,
  handleBackToHome,
  handleLogout,
}) => {
  // Initialize sensors for dragging
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Active ID State
  const [activeId, setActiveId] = useState<string | null>(null);

  // Handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    onDragEnd(event);
  };
  // Define the SortableItem component
  const SortableItem: React.FC<{ project: Project }> = ({ project }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: project.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      boxShadow: isDragging ? "0 0 10px rgba(0,0,0,0.5)" : "none",
      backgroundColor: isDragging ? "#f0f0f0" : "#fff",
      padding: "15px 10px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <span>{project.name}</span>
        <S.ButtonsWrapper>
          <S.EditButton onClick={() => handleEditProject(project)}>
            Edit
          </S.EditButton>
          <S.DeleteButton onClick={() => handleDeleteProjectClick(project.id)}>
            Delete
          </S.DeleteButton>
        </S.ButtonsWrapper>
      </div>
    );
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;

    const activeProject = projectsList.find(
      (project) => project.id.toString() === activeId
    );
    if (!activeProject) return null;

    return (
      <div
        style={{
          padding: "15px 10px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <span>{activeProject.name}</span>
        <S.ButtonsWrapper>
          <S.EditButton onClick={() => handleEditProject(activeProject)}>
            Edit
          </S.EditButton>
          <S.DeleteButton
            onClick={() => handleDeleteProjectClick(activeProject.id)}
          >
            Delete
          </S.DeleteButton>
        </S.ButtonsWrapper>
      </div>
    );
  };

  return (
    <S.AdminContainer>
      <S.BackButton onClick={handleLogout}>Logout</S.BackButton>
      <ToastMessage
        toastMessage={toastMessage}
        isAutoclose={true}
        handleClose={handleResetToastMessage}
      />
      <S.BackButton onClick={handleBackToHome}>Back to Home</S.BackButton>
      <h2>Admin Portal</h2>
      <S.Form>
        <S.Input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name || ""}
          onChange={handleInputChange}
        />
        <S.TextArea
          name="description"
          placeholder="Description"
          value={newProject.description || ""}
          onChange={handleInputChange}
        />
        <S.Input
          type="text"
          name="live_link"
          placeholder="Live Link"
          value={newProject.live_link || ""}
          onChange={handleInputChange}
        />
        <S.FileInputWrapper>
          <S.FileInput
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </S.FileInputWrapper>
        <S.ImagePreviewContainer>
          {newProject.images.map((image, index) => (
            <S.ImagePreview key={index}>
              {image instanceof File ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Project Image ${index}`}
                />
              ) : (
                <img src={image.url} alt={`Project Image ${index}`} />
              )}
              <S.RemoveImageButton onClick={() => handleRemoveImage(index)}>
                &times;
              </S.RemoveImageButton>
            </S.ImagePreview>
          ))}
        </S.ImagePreviewContainer>
        {currentProject ? (
          <>
            <S.Button onClick={handleUpdateProjectClick}>
              Update Project
            </S.Button>
            <S.CancelButton onClick={handleCancelEdit}>Cancel</S.CancelButton>
          </>
        ) : (
          <S.Button onClick={handleAddProjectClick}>Add Project</S.Button>
        )}
      </S.Form>
      <S.ProjectList>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projectsList.map((project) => project.id)}
            strategy={verticalListSortingStrategy}
          >
            {projectsList.map((project) => (
              <SortableItem key={project.id} project={project} />
            ))}
          </SortableContext>
          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </DndContext>
      </S.ProjectList>
      <S.Button onClick={handleUpdateSort}>Update Sort</S.Button>
    </S.AdminContainer>
  );
};

export default AdminPage;
