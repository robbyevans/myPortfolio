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
        const oldIndex = items.findIndex(
          (item) => item.id === Number(active.id)
        );
        const newIndex = items.findIndex(
          (item) => item.id === Number(over?.id)
        );

        if (oldIndex === -1 || newIndex === -1) {
          return items;
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    setOrderedProjects(projectsList);
  }, [projectsList]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      handleFetchProjects();
    }
  }, [token, handleFetchProjects, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

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

  const handleDeleteProjectClick = async (id: number) => {
    try {
      await handleDeleteProject(id);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project.");
    }
  };

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

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...newProject.images];
    const removedImage = updatedImages.splice(index, 1)[0];

    if (!(removedImage instanceof File)) {
      setImagesToBeDeleted((prevState) => [...prevState, removedImage.id]);
    }
    setNewProject({ ...newProject, images: updatedImages });
  };

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

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleClickLogout = () => {
    handleLogout();
    handleBackToHome();
  };

  const handleUpdateSort = async () => {
    const projectIds = orderedProjects.map((project) => project.id);
    try {
      await updateProjectOrder(projectIds);
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
