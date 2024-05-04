import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `tool-${index}`,
    "aria-controls": `toolpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ToolPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="toolpanel"
      hidden={value !== index}
      id={`toolpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export const ToolsTabs: React.FC = () => {
  const [tool, setTool] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTool: number) => {
    setTool(newTool);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tool} onChange={handleChange} aria-label="ZPL Tools">
          <Tab label="etiquetas" {...a11yProps(0)} />
          <Tab label="colecta/flex" {...a11yProps(1)} />
          <Tab label="full" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <ToolPanel value={tool} index={0}></ToolPanel>
      <ToolPanel value={tool} index={1}></ToolPanel>
      <ToolPanel value={tool} index={2}></ToolPanel>
    </Box>
  );
};
