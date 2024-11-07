import React, { useEffect, useState } from "react";
import * as S from "./styles";

interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  live_link: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              onClick={() => window.open(project.live_link, "_blank")}
            >
              <S.ProjectImage src={project.image_url} alt={project.name} />
              <S.ProjectInfo>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </S.ProjectInfo>
            </S.ProjectCard>
          ))}
        </S.ProjectGrid>
      </S.ProjectsWrapper>
    </S.SectionContainer>
  );
};

export default Projects;
