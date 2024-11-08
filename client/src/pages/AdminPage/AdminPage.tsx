import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

interface Project {
  id: number;
  name: string;
  description: string;
  images: File[] | string[];
  live_link: string;
}

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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

  const handleAddProject = () => {
    const formData = new FormData();
    formData.append("project[name]", newProject.name);
    formData.append("project[description]", newProject.description);
    formData.append("project[live_link]", newProject.live_link);
    newProject.images.forEach((image) => {
      formData.append("project[images][]", image);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProject({ ...newProject, images: Array.from(e.target.files) });
    }
  };

  // Implement update and delete functions similarly

  if (!token) {
    return (
      <S.LoginContainer>
        <S.BackButton onClick={() => navigate("/")}>Back to Home</S.BackButton>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </S.LoginContainer>
    );
  }

  return (
    <S.AdminContainer>
      <S.BackButton onClick={() => navigate("/")}>Back to Home</S.BackButton>
      <h2>Admin Portal</h2>
      <S.Form>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="live_link"
          placeholder="Live Link"
          value={newProject.live_link}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProject}>Add Project</button>
      </S.Form>
      <S.ProjectList>
        {projects.map((project) => (
          <S.ProjectItem key={project.id}>
            <span>{project.name}</span>
            <div>
              {/* Update and Delete buttons */}
              <S.EditButton
                onClick={() => {
                  /* Implement edit functionality */
                }}
              >
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
