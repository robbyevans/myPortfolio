// Projects.tsx

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import ProjectModal from "../ProjectModal/ProjectModal";
import { ImageData } from "../ProjectModal/types";

interface Project {
  id: number;
  name: string;
  description: string;
  images: ImageData[];
  live_link: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects.");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up the effect when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  if (loading) {
    return <S.Message>Loading projects...</S.Message>;
  }

  if (error) {
    return <S.Message>Error: {error}</S.Message>;
  }

  return (
    <S.SectionContainer>
      <S.ProjectsWrapper>
        <S.Title>Projects</S.Title>
        <S.ProjectGrid>
          {projects.map((project) => (
            <S.ProjectCard
              key={project.id}
              onClick={() => handleCardClick(project)}
            >
              <S.ProjectImage src={project.images[0]?.url} alt={project.name} />
              <S.ProjectInfo>
                <h3>{project.name}</h3>
                <S.Description>{project.description}</S.Description>
              </S.ProjectInfo>
            </S.ProjectCard>
          ))}
        </S.ProjectGrid>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </S.ProjectsWrapper>
    </S.SectionContainer>
  );
};

export default Projects;
