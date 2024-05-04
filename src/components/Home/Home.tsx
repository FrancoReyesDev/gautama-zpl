"use client";

import { Container, ThemeProvider, createTheme } from "@mui/material";
import { ToolsTabs } from "../ToolsTabs/ToolsTabs";

export const Home: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0D0D0D",
      },
      secondary: {
        main: "#F2F2F2",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"md"}>
        <ToolsTabs />
      </Container>
    </ThemeProvider>
  );
};
