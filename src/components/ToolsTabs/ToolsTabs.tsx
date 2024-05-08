import { Box, Tab, Tabs } from "@mui/material";
import { ToolsProvider, useTools } from "./Providers/ToolsProvider";
import { Tools } from "./types";
import { Tools_Full } from "../Tools/Full/Tools_Full";
import { Tools_FlexColecta } from "../Tools/FlexColecta/Tools_FlexColecta";
import { Tools_Etiquetas } from "../Tools/Etiquetas/Tools_Etiquetas";
import { useEffect, useState } from "react";
import { LOCALSTORAGE_KEYS, TOOL_PRINTER } from "@/constants";
import { sendZplToPrinter } from "@/utils/sendZplToPrinter";
import { OptionsModal } from "../OptionsModal";

function a11yProps(tool: Tools) {
  return {
    id: `tool-${tool}`,
    "aria-controls": `toolpanel-${tool}`,
    value: tool,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  idTool: Tools;
  value: Tools;
}

function ToolPanel(props: TabPanelProps) {
  const { children, value, idTool, ...other } = props;

  return (
    <Box
      role="toolpanel"
      hidden={value !== idTool}
      id={`toolpanel-${idTool}`}
      aria-labelledby={`tab-${idTool}`}
      {...other}
      maxHeight={"100%"}
      overflow={"auto"}
      paddingY={1}
      flexGrow={1}
    >
      {value === idTool && children}
    </Box>
  );
}

export const ToolsTabs: React.FC<{ printers: string[] }> = ({ printers }) => {
  const [state, dispatch] = useTools();

  const handleChange = (event: React.SyntheticEvent, newTool: Tools) => {
    dispatch({ type: "setTool", tool: newTool });
  };

  const [renderOptions, setRenderOptions] = useState<boolean>(false);

  const openOptions = () => {
    setRenderOptions(true);
  };
  const closeOptions = () => {
    setRenderOptions(false);
  };

  const checkOptions = () => {
    const { host, port, bigPrinter, smallPrinter } = LOCALSTORAGE_KEYS;
    const someConfigIsEmpty = [host, port, bigPrinter, smallPrinter].some(
      (localStorageKey) =>
        localStorage.getItem(localStorageKey) === null ||
        localStorage.getItem(localStorageKey) === ""
    );

    if (someConfigIsEmpty) return openOptions();

    const currentSmallPrinter = localStorage.getItem(smallPrinter);
    const currentBigPritner = localStorage.getItem(bigPrinter);
    const somePrinterDoesntExist = [
      currentBigPritner,
      currentSmallPrinter,
    ].some((currentPrinter) => {
      const printerExist = printers.some(
        (printer) => currentPrinter === printer
      );
      return !printerExist;
    });

    if (somePrinterDoesntExist) {
      alert("Actualiza las impresoras.");
      return openOptions();
    }
  };

  const printZplHandler = () => {
    if (!confirm("confirmar impresion?")) return;

    const localStoragePrinterKey = TOOL_PRINTER[state.tool];
    const printerName = localStorage.getItem(localStoragePrinterKey);

    if (printerName === null) return;

    sendZplToPrinter({ zpl: state.zpl, printerName });
  };

  // useEffect(checkOptions, [renderOptions]);

  return (
    <>
      <Box
        paddingY={2}
        boxSizing={"border-box"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        height={"100vh"}
      >
        <Box
          display={"flex"}
          gap={1}
          borderBottom={1}
          borderColor="divider"
          justifyContent={"space-between"}
        >
          <Tabs
            scrollButtons={"auto"}
            variant={"scrollable"}
            value={state.tool}
            onChange={handleChange}
            aria-label="ZPL Tools"
          >
            <Tab label="etiquetas" {...a11yProps("etiquetas")} />
            <Tab label="colecta/flex" {...a11yProps("flex/colecta")} />
            <Tab label="full" {...a11yProps("full")} />
          </Tabs>
          <Box display={"flex"} gap={1}>
            <button onClick={openOptions}>configuraciones</button>
            <button onClick={printZplHandler}>imprimir</button>
          </Box>
        </Box>
        <ToolPanel value={state.tool} idTool={"etiquetas"}>
          <Tools_Etiquetas />
        </ToolPanel>
        <ToolPanel value={state.tool} idTool={"flex/colecta"}>
          <Tools_FlexColecta />
        </ToolPanel>
        <ToolPanel value={state.tool} idTool={"full"}>
          <Tools_Full />
        </ToolPanel>
      </Box>
      {renderOptions && (
        <OptionsModal closeModal={closeOptions} printers={printers} />
      )}
    </>
  );
};
