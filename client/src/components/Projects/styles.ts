// src/components/ProjectsSectionComponent/styles.ts
import styled from "styled-components";

export const Section = styled.section`
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const ProjectCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: auto;
`;

export const ProjectInfo = styled.div`
  padding: 10px;
  text-align: left;
`;
