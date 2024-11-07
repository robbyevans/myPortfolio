// src/components/GithubSection/styles.ts

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

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* Customize GitHub Calendar colors */
  .react-activity-calendar {
    max-width: 100%;
  }

  /* Adjust the colors of the contributions */
  .react-activity-calendar__block {
    stroke: none;
  }
`;
