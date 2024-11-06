import React from "react";
import GitHubCalendar from "react-github-calendar";
import * as S from "./styles";

const GithubSectionComponent: React.FC = () => {
  return (
    <S.Section>
      <S.Title>GitHub Contributions</S.Title>
      <S.ChartContainer>
        <GitHubCalendar username="robbyevans" />
      </S.ChartContainer>
    </S.Section>
  );
};

export default GithubSectionComponent;
