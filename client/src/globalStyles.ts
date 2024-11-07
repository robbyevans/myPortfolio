// src/globalStyles.ts

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1, h2, h3, h4, h5, h6,
  p, figure, blockquote, dl, dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 16px;
    line-height: 1.5;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Remove list styles on ul, ol elements */
  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Anchor tag styles */
  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }


  /* Other global styles */
`;

export default GlobalStyle;
