import React from "react";
import * as S from "./styles";
import { ImageData } from "../ProjectModal/types";

interface ProjectModalProps {
  project: {
    id: number;
    name: string;
    description: string;
    live_link: string;
    images: ImageData[];
  };
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const handleClick = () => {
    window.open(project.live_link, "_blank");
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={handleClick}>
        <S.ImagesWrapper>
          {project.images.map((imageUrl, index) => (
            <S.ModalImage key={index} src={imageUrl?.url} alt={project.name} />
          ))}
        </S.ImagesWrapper>
        <S.ModalInfo>
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
