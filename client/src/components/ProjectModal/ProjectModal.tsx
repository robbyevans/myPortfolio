import React from "react";
import * as S from "./styles";

interface ProjectModalProps {
  project: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    live_link: string;
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
        <S.ModalImage src={project.image_url} alt={project.name} />
        <S.ModalInfo>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </S.ModalInfo>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ProjectModal;
