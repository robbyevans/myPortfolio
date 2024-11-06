// src/components/Projects/Projects.tsx
import React from "react";
import * as S from "./styles";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  liveLink: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    description: "Description 1",
    image: "image1.png",
    liveLink: "https://example.com",
  },
  // Add more projects as needed
];

const Projects: React.FC = () => {
  return (
    <S.Section>
      <S.Title>Projects</S.Title>
      <S.ProjectGrid>
        {projects.map((project) => (
          <S.ProjectCard
            key={project.id}
            onClick={() => window.open(project.liveLink, "_blank")}
          >
            <S.ProjectImage src={project.image} alt={project.name} />
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
