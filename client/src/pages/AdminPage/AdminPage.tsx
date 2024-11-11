// src/pages/AdminPage/AdminPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import useHandleProjects from "../../hooks/useHandleProjects";
import { Project, ImageData } from "../../store/projectSlice";

// Update the Partial<Project> type to handle both File and ImageData types for images
interface ProjectWithMixedImages extends Omit<Project, "images"> {
  images: (ImageData | File)[];
}

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Use the updated ProjectWithMixedImages type for newProject
  const [newProject, setNewProject] = useState<ProjectWithMixedImages>({
    id: 0,
    name: "",
    description: "",
    images: [],
    live_link: "",
  });

  const navigate = useNavigate();
  const {
    projectsList,
    loading,
    error,
    handleFetchProjects,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject,
  } = useHandleProjects();

  console.log("error", error);
  console.log("loading", loading);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      console.log("Token received:", data.token);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("authToken", data.token); // Save token to localStorage
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };
  

  useEffect(() => {
    if (token) {
      handleFetchProjects();
    }
  }, [token, handleFetchProjects]);

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

    // Only append File types to the FormData
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

    // Only append File types to the FormData for upload
    newProject.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("project[images][]", image);
      }
    });

    try {
      await handleUpdateProject({ id: currentProject.id, formData });
      setCurrentProject(null);
      setNewProject({
        id: 0,
        name: "",
        description: "",
        live_link: "",
        images: [],
      });
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
      images: project.images, // Ensure existing images are preserved
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...newProject.images];
    updatedImages.splice(index, 1);
    setNewProject({ ...newProject, images: updatedImages });
  };

  if (!token) {
    return (
      <S.LoginContainer>
        <S.BackButton onClick={() => navigate("/")}>Back to Home</S.BackButton>
        <h2>Admin Login</h2>
        <S.Input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <S.Button onClick={handleLogin}>Login</S.Button>
      </S.LoginContainer>
    );
  }

  return (
    <S.AdminContainer>
      <S.BackButton onClick={() => navigate("/")}>Back to Home</S.BackButton>
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
            <S.CancelButton
              onClick={() => {
                setCurrentProject(null);
                setNewProject({
                  id: 0,
                  name: "",
                  description: "",
                  live_link: "",
                  images: [],
                });
              }}
            >
              Cancel
            </S.CancelButton>
          </>
        ) : (
          <S.Button onClick={handleAddProjectClick}>Add Project</S.Button>
        )}
      </S.Form>
      <S.ProjectList>
        {projectsList.map((project) => (
          <S.ProjectItem key={project.id}>
            <span>{project.name}</span>
            <div>
              <S.EditButton onClick={() => handleEditProject(project)}>
                Edit
              </S.EditButton>
              <S.DeleteButton
                onClick={() => handleDeleteProjectClick(project.id)}
              >
                Delete
              </S.DeleteButton>
            </div>
          </S.ProjectItem>
        ))}
      </S.ProjectList>
    </S.AdminContainer>
  );
};

export default AdminPage;
