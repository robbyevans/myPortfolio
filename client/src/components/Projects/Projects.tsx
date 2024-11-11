// src/components/Projects/Projects.tsx

import React, { useState, useEffect } from "react";
import * as S from "./styles";
import ProjectModal from "../ProjectModal/ProjectModal";
import { Project } from "../../store/projectSlice";

interface ProjectsProps {
  projectsList: Project[];
  loading: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ projectsList, loading }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  if (loading) {
    return (
      <S.ProjectGrid>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <S.SkeletonCard key={index}>
              <S.SkeletonImage />
              <S.SkeletonText />
              <S.SkeletonText />
            </S.SkeletonCard>
          ))}
      </S.ProjectGrid>
    );
  }

  return (
    <S.SectionContainer>
      <S.ProjectsWrapper>
        <S.Title>Projects</S.Title>
        <S.ProjectGrid>
          {projectsList &&
            projectsList.map((project) => (
              <S.ProjectCard
                key={project?.id}
                onClick={() => handleCardClick(project)}
              >
                <S.ProjectImage
                  src={project?.images[0]?.url}
                  alt={project.name}
                />
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
