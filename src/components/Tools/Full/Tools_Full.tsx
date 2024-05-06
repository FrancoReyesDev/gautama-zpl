import { useTools } from "@/components/ToolsTabs/Providers/ToolsProvider";
import { TextField } from "@mui/material";

export const Tools_Full: React.FC = () => {
  const [state, dispatch] = useTools();
  const setZplHandler = (zpl: string) => dispatch({ type: "setZpl", zpl });

  return (
    <TextField
      id="full-textarea"
      fullWidth
      multiline
      variant="standard"
      placeholder="Coloca aqui el zpl para full"
      onChange={(e) => {
        setZplHandler(e.target.value);
      }}
    />
  );
};
