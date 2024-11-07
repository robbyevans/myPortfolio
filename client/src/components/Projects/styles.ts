import styled from "styled-components";

export const Section = styled.section`
  padding: 40px 20px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
`;

export const ProjectCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.cardBackground};
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const ProjectInfo = styled.div`
  padding: 15px;
  text-align: left;

  h3 {
    margin: 0 0 10px;
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const Message = styled.p`
  padding: 40px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
`;
