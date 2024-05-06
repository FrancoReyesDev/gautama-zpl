"use client";

import { Container, ThemeProvider, createTheme } from "@mui/material";
import { ToolsTabs } from "../ToolsTabs/ToolsTabs";
import { ToolsProvider } from "../ToolsTabs/Providers/ToolsProvider";

export const Home: React.FC<{ printers: string[] }> = ({ printers }) => {
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
        <ToolsProvider>
          <ToolsTabs printers={printers} />
        </ToolsProvider>
      </Container>
    </ThemeProvider>
  );
};
