// src/components/Breadcrumb/Breadcrumb.tsx
import React from "react";
import styled from "styled-components";
import { useNavigationHistory } from "../../context/NavigationHistoryContext";

const BreadcrumbContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
`;

const Breadcrumb: React.FC = () => {
  const navigationHistory = useNavigationHistory();
  const history = navigationHistory.getHistory();

  return (
    <BreadcrumbContainer>
      {history.map((page, index) => (
        <span key={index}>
          {page}
          {index < history.length - 1 && " > "}
        </span>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
