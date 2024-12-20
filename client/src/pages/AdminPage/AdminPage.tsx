// /client/src/pages/AdminPage/AdminPage.tsx

import React, { useState } from "react";
import * as S from "./styles";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { Project, ImageData, IToastMessage } from "../../store/projectSlice";
import { GoSignOut } from "react-icons/go";
import { FaUpload } from "react-icons/fa";
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
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import SortableItem from "../../components/SortableItem/SortableItem";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete"; // Import the ConfirmDelete component

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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  // State for ConfirmDelete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    onDragEnd(event);
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;

    const activeProject = projectsList.find(
      (project) => project.id.toString() === activeId
    );
    if (!activeProject) return null;

    return (
      <S.DragOverlayContainer>
        <span>{activeProject.name}</span>
      </S.DragOverlayContainer>
    );
  };

  // Function to open the delete confirmation modal
  const openDeleteModal = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Function to confirm deletion
  const confirmDelete = async () => {
    if (projectToDelete) {
      handleDeleteProjectClick(projectToDelete.id);
      closeDeleteModal();
    }
  };

  return (
    <S.AdminContainer>
      <S.NavButtonsWrapper>
        <S.BackButton onClick={handleBackToHome}>Back to Home</S.BackButton>
        <S.BackButton onClick={handleLogout}>
          Logout
          <GoSignOut />
        </S.BackButton>
      </S.NavButtonsWrapper>
      <ToastMessage
        toastMessage={toastMessage}
        isAutoclose={true}
        handleClose={handleResetToastMessage}
      />
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
          <S.FileUploadLabel htmlFor="file-upload">
            <FaUpload size={24} />
            Upload Images
          </S.FileUploadLabel>
          <S.FileInput
            id="file-upload"
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
            <S.Button $variantSecondary onClick={handleCancelEdit}>
              Cancel
            </S.Button>
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
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={projectsList.map((project) => project.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            {projectsList.map((project) => (
              <SortableItem
                key={project.id}
                project={project}
                handleEditProject={handleEditProject}
                handleDeleteProjectClick={() => openDeleteModal(project)}
              />
            ))}
          </SortableContext>
          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </DndContext>
      </S.ProjectList>
      <S.Button onClick={handleUpdateSort}>Update Sort</S.Button>

      {/* ConfirmDelete Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        projectName={projectToDelete ? projectToDelete.name : ""}
      />
    </S.AdminContainer>
  );
};

export default AdminPage;
