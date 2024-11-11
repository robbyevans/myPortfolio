// src/components/ProjectModal/ProjectModal.tsx

import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { Project } from "../../store/projectSlice";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project.images.length]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleClick = () => {
    window.open(project.live_link, "_blank");
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.closeButton onClick={onClose}>
          <FaTimes />
        </S.closeButton>

        <S.ImagesWrapper>
          {project.images.length > 1 ? (
            <S.CarouselContainer>
              <S.CarouselButton
                $orientation="left"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <FaChevronLeft />
              </S.CarouselButton>
              <S.CarouselImage
                src={project.images[currentImageIndex]?.url}
                alt={project.name}
              />
              <S.CarouselButton
                $orientation="right"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <FaChevronRight />
              </S.CarouselButton>
            </S.CarouselContainer>
          ) : (
            <S.ModalImage src={project.images[0]?.url} alt={project.name} />
          )}
        </S.ImagesWrapper>
        <S.ModalInfo onClick={handleClick}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <S.LiveLink
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Project
          </S.LiveLink>
        </S.ModalInfo>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ProjectModal;
