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

  useEffect(() => {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <S.Section>
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
    </S.Section>
  );
};

export default Projects;
