import styled from "styled-components";

export const Section = styled.section`
  padding: 40px 20px;
  text-align: center;
  width: 100%;
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

  .react-activity-calendar {
    max-width: 100%;
  }

  .react-activity-calendar__block {
    stroke: none;
  }
`;
