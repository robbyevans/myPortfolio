import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  live_link: string;
}

const AdminPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    image_url: "",
    live_link: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
        } else {
          alert("Invalid password");
        }
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
    fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project: newProject }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data]);
        setNewProject({
          id: 0,
          name: "",
          description: "",
          image_url: "",
          live_link: "",
        });
      });
  };

  // Implement update and delete functions similarly

  if (!token) {
    return (
      <S.LoginContainer>
        <S.BackButton onClick={() => navigate("/")}>Back to Home</S.BackButton>
        <h2>Admin Login</h2>
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
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={newProject.image_url}
          onChange={handleInputChange}
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
      {/* Render existing projects with options to update or delete */}
    </S.AdminContainer>
  );
};

export default AdminPage;
