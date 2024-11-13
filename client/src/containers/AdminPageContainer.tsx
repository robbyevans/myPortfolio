// File: /client/src/pages/AdminPage/AdminPageContainer.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHandleProjects from "../hooks/useHandleProjects";
import { Project, ImageData } from "../store/projectSlice";
import AdminPage from "../pages/AdminPage/AdminPage";

interface ProjectWithMixedImages extends Omit<Project, "images"> {
  images: (ImageData | File)[];
}

const AdminPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [imagesToBeDeleted, setImagesToBeDeleted] = useState<number[]>([]);

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
  } = useHandleProjects();

  const apiUrl = import.meta.env.VITE_API_URL;

  // Login Handler
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData}`
        );
      }

      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("authToken", data.token);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  // Fetch Projects on Token Change
  useEffect(() => {
    if (token) {
      handleFetchProjects();
    }
  }, [token, handleFetchProjects]);

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

  return (
    <AdminPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      token={token}
      projectsList={projectsList}
      toastMessage={toastMessage}
      handleResetToastMessage={handleResetToastMessage}
      newProject={newProject}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleAddProjectClick={handleAddProjectClick}
      handleUpdateProjectClick={handleUpdateProjectClick}
      currentProject={currentProject}
      handleCancelEdit={handleCancelEdit}
      handleEditProject={handleEditProject}
      handleDeleteProjectClick={handleDeleteProjectClick}
      handleRemoveImage={handleRemoveImage}
      handleBackToHome={handleBackToHome}
    />
  );
};

export default AdminPageContainer;
