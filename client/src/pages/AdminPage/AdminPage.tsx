import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { ImageData } from "../../components/ProjectModal/types";

interface Project {
  id: number;
  name: string;
  description: string;
  images: (File | ImageData)[];
  live_link: string;
}

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    images: [],
    live_link: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      });
  };

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Filter out duplicates by comparing filenames
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

  const handleAddProject = () => {
    const formData = new FormData();
    formData.append("project[name]", newProject.name);
    formData.append("project[description]", newProject.description);
    formData.append("project[live_link]", newProject.live_link);
    newProject.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("project[images][]", image);
      }
    });

    fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data]);
        setNewProject({
          id: 0,
          name: "",
          description: "",
          live_link: "",
          images: [],
        });
      })
      .catch((error) => {
        console.error("Error adding project:", error);
        alert("An error occurred while adding the project.");
      });
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setNewProject({
      id: project.id,
      name: project.name,
      description: project.description,
      live_link: project.live_link,
      images: project.images,
    });
  };

  const handleUpdateProject = () => {
    if (!currentProject) return;

    const formData = new FormData();
    formData.append("project[name]", newProject.name);
    formData.append("project[description]", newProject.description);
    formData.append("project[live_link]", newProject.live_link);

    // Handle images
    newProject.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("project[images][]", image);
      }
    });

    // Handle removed images
    const removedImageIds = (currentProject.images as ImageData[])
      .filter(
        (image) =>
          !newProject.images.some(
            (img) => img instanceof File || (img as ImageData).id === image.id
          )
      )
      .map((image) => image.id);

    if (removedImageIds.length > 0) {
      removedImageIds.forEach((id) => {
        formData.append("project[remove_image_ids][]", id);
      });
    }

    fetch(`http://localhost:3000/projects/${currentProject.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(
          projects.map((project) => (project.id === data.id ? data : project))
        );
        setCurrentProject(null);
        setNewProject({
          id: 0,
          name: "",
          description: "",
          live_link: "",
          images: [],
        });
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        alert("An error occurred while updating the project.");
      });
  };

  const handleDeleteProject = (id: number) => {
    fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
        alert("An error occurred while deleting the project.");
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
          value={newProject.name}
          onChange={handleInputChange}
        />
        <S.TextArea
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleInputChange}
        />
        <S.Input
          type="text"
          name="live_link"
          placeholder="Live Link"
          value={newProject.live_link}
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
          <S.Button onClick={handleUpdateProject}>Update Project</S.Button>
        ) : (
          <S.Button onClick={handleAddProject}>Add Project</S.Button>
        )}
        {currentProject && (
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
        )}
      </S.Form>
      <S.ProjectList>
        {projects.map((project) => (
          <S.ProjectItem key={project.id}>
            <span>{project.name}</span>
            <div>
              <S.EditButton onClick={() => handleEditProject(project)}>
                Edit
              </S.EditButton>
              <S.DeleteButton onClick={() => handleDeleteProject(project.id)}>
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
