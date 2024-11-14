import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHandleProjects from "../hooks/useHandleProjects";
import { Project, ImageData } from "../store/projectSlice";
import AdminPage from "../pages/AdminPage/AdminPage";
import { useUser } from "../hooks/useUser";
import { DragEndEvent } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

interface ProjectWithMixedImages extends Omit<Project, "images"> {
  images: (ImageData | File)[];
}

const AdminPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { token, handleLogout } = useUser();

  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState<number[]>([]);
  const [orderedProjects, setOrderedProjects] = useState<Project[]>([]);
  console.log("orderedProjects", orderedProjects);
  const [newProject, setNewProject] = useState<ProjectWithMixedImages>({
    id: 0,
    name: "",
    description: "",
    images: [],
    live_link: "",
  });

  const {
    projectsList,
    toastMessage,
    handleFetchProjects,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
    handleResetToastMessage,
    updateProjectOrder,
  } = useHandleProjects();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOrderedProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Update orderedProjects when projectsList changes, unless dragging
  useEffect(() => {
    setOrderedProjects(projectsList);
  }, [projectsList]);

  // Fetch Projects on Token Change
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      handleFetchProjects();
    }
  }, [token, handleFetchProjects, navigate]);

  // Input Change Handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  // File Change Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !newProject.images.some(
            (existingImage) =>
              existingImage instanceof File &&
              existingImage.name === newFile.name
          )
      );

      setNewProject({
        ...newProject,
        images: [...newProject.images, ...uniqueFiles],
      });
    }
  };

  // Add Project Handler
  const handleAddProjectClick = async () => {
    const formData = new FormData();
    formData.append("project[name]", newProject.name || "");
    formData.append("project[description]", newProject.description || "");
    formData.append("project[live_link]", newProject.live_link || "");

    newProject.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("project[images][]", image);
      }
    });

    try {
      await handleAddProject(formData);
      setNewProject({
        id: 0,
        name: "",
        description: "",
        live_link: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred while adding the project.");
    }
  };

  // Update Project Handler
  const handleUpdateProjectClick = async () => {
    if (!currentProject) return;

    const formData = new FormData();
    formData.append("project[name]", newProject.name || "");
    formData.append("project[description]", newProject.description || "");
    formData.append("project[live_link]", newProject.live_link || "");

    newProject.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("project[images][]", image);
      }
    });

    imagesToBeDeleted.forEach((imageId) => {
      formData.append("project[remove_image_ids][]", imageId.toString());
    });

    try {
      await handleUpdateProject({ id: currentProject.id, formData });
      handleFetchProjects();

      setCurrentProject(null);
      setNewProject({
        id: 0,
        name: "",
        description: "",
        live_link: "",
        images: [],
      });
      setImagesToBeDeleted([]);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project.");
    }
  };

  // Delete Project Handler
  const handleDeleteProjectClick = async (id: number) => {
    try {
      await handleDeleteProject(id);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project.");
    }
  };

  // Edit Project Handler
  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setNewProject({
      id: project.id,
      name: project.name,
      description: project.description,
      live_link: project.live_link,
      images: project.images || [],
    });
    setImagesToBeDeleted([]);
  };

  // Remove Image Handler
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...newProject.images];
    const removedImage = updatedImages.splice(index, 1)[0];

    if (!(removedImage instanceof File)) {
      setImagesToBeDeleted((prevState) => [...prevState, removedImage.id]);
    }
    setNewProject({ ...newProject, images: updatedImages });
  };

  // Cancel Edit Handler
  const handleCancelEdit = () => {
    setCurrentProject(null);
    setNewProject({
      id: 0,
      name: "",
      description: "",
      live_link: "",
      images: [],
    });
    setImagesToBeDeleted([]);
  };

  // Navigate Back to Home
  const handleBackToHome = () => {
    navigate("/");
  };

  const handleClickLogout = () => {
    handleLogout();
    handleBackToHome();
  };

  // Update the sort order on the backend
  const handleUpdateSort = async () => {
    const projectIds = orderedProjects.map((project) => project.id);
    try {
      await updateProjectOrder(projectIds);
      handleFetchProjects(); // Refresh the projects list
    } catch (error) {
      console.error("Error updating project order:", error);
      alert("An error occurred while updating the project order.");
    }
  };

  return (
    <AdminPage
      projectsList={orderedProjects}
      toastMessage={toastMessage}
      handleResetToastMessage={handleResetToastMessage}
      newProject={newProject}
      onDragEnd={onDragEnd}
      handleUpdateSort={handleUpdateSort}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleAddProjectClick={handleAddProjectClick}
      handleUpdateProjectClick={handleUpdateProjectClick}
      currentProject={currentProject}
      handleCancelEdit={handleCancelEdit}
      handleLogout={handleClickLogout}
      handleEditProject={handleEditProject}
      handleDeleteProjectClick={handleDeleteProjectClick}
      handleRemoveImage={handleRemoveImage}
      handleBackToHome={handleBackToHome}
    />
  );
};

export default AdminPageContainer;
