import React from "react";
import GitHubCalendar from "react-github-calendar";
import * as S from "./styles";

interface GithubSectionComponentProps {
  theme: "light" | "dark";
}

const GithubSectionComponent: React.FC<GithubSectionComponentProps> = ({
  theme,
}) => {
  return (
    <S.Section>
      <S.Title>GitHub Contributions</S.Title>
      <S.ChartContainer>
        <GitHubCalendar
          username="robbyevans"
          colorScheme={theme}
          transformData={(data) => data}
        />
      </S.ChartContainer>
    </S.Section>
  );
};

export default GithubSectionComponent;
