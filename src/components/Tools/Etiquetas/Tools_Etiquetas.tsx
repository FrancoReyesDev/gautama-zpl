import { Etiqueta as EtiquetaProps } from "@/types/Etiqueta";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTools } from "@/components/ToolsTabs/Providers/ToolsProvider";
import { ChangeEvent, FormEvent } from "react";
import csv from "csvtojson";

type EtiquetaCsv =
  | [titulo: string, codigoBarras: string, sku: string]
  | [titulo: string, sku: string];

const Etiqueta: React.FC<EtiquetaProps & { id: symbol }> = ({
  codigo,
  titulo,
  cantidad,
  id,
}) => {
  const [state, dispatch] = useTools();

  const changeEtiquetaHandler = (e: FormEvent) => {
    const newEtiqueta = {
      codigo,
      titulo,
      cantidad,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    };

    dispatch({ type: "editEtiqueta", etiqueta: newEtiqueta, id });
  };

  const deleteEtiquetaHandler = () => {
    dispatch({ type: "deleteEtiqueta", id });
  };
  return (
    <Paper
      variant="outlined"
      onChange={changeEtiquetaHandler}
      sx={{
        display: "flex",
        gap: 1,
        padding: 1,
      }}
    >
      <TextField
        autoComplete="off"
        id="codigo"
        name="codigo"
        size="small"
        variant="outlined"
        label="codigo"
        value={codigo}
      />
      <TextField
        autoComplete="off"
        id="titulo"
        name="titulo"
        size="small"
        value={titulo}
        placeholder={codigo}
        variant="outlined"
        label="titulo"
        sx={{ flexGrow: 2 }}
      />
      <TextField
        autoComplete="off"
        id="cantidad"
        name="cantidad"
        size="small"
        value={cantidad}
        variant="outlined"
        label="cantidad"
        type="number"
        inputProps={{ min: 1 }}
      />
      <IconButton color="secondary" onClick={deleteEtiquetaHandler}>
        <RemoveCircleIcon />
      </IconButton>
    </Paper>
  );
};

export const Tools_Etiquetas: React.FC = () => {
  const [state, dispatch] = useTools();
  if (!("etiquetas" in state)) return;

  const etiquetas = Array.from(state.etiquetas.entries());

  const bulkAddEtiquetasFromCsvHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files === null || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const stringCsv = reader.result;
      if (typeof stringCsv !== "string") return;
      const csvToArray = (await csv({
        noheader: true,
        output: "csv",
      }).fromString(stringCsv)) as EtiquetaCsv[];

      const tmpIndexedEtiquetas: { [tituloSku: string]: EtiquetaProps } = {};

      csvToArray.forEach((etiqueta) => {
        let id = "";
        let codigo = "";
        let titulo = "";

        if (etiqueta.length === 2) {
          const [currentTitulo, sku] = etiqueta;
          id = titulo + sku;
          codigo = sku;
          titulo = currentTitulo;
        }

        if (etiqueta.length === 3) {
          const [currentTitulo, codigoBarras] = etiqueta;
          id = currentTitulo + codigoBarras === "" ? codigo : codigoBarras;
          codigo = codigoBarras === "" ? codigo : codigoBarras;
          titulo = currentTitulo === "" ? codigo : currentTitulo;
        }

        if (codigo.trim() === "") return;

        const currentEtiqueta = tmpIndexedEtiquetas[id];
        if (currentEtiqueta === undefined)
          return (tmpIndexedEtiquetas[id] = {
            codigo,
            titulo,
            cantidad: 1,
          });

        tmpIndexedEtiquetas[id].cantidad += 1;
      });

      console.log(tmpIndexedEtiquetas);

      dispatch({
        type: "bulkAddEtiquetas",
        etiquetas: Object.values(tmpIndexedEtiquetas),
      });
    };
    reader.readAsText(file);
  };

  return (
    <Stack direction={"column"} gap={1}>
      <Box display={"flex"} gap={1}>
        <Button
          variant="text"
          color="success"
          disableElevation={true}
          onClick={() => dispatch({ type: "addEtiqueta" })}
        >
          agregar
        </Button>
        <Button component="label" role={undefined} variant="text" tabIndex={-1}>
          cargar csv
          <input
            hidden
            type="file"
            onClick={(e) => ((e.target as HTMLInputElement).value = "")}
            onChange={bulkAddEtiquetasFromCsvHandler}
          />
        </Button>
        <Button
          variant="text"
          color="warning"
          disableElevation={true}
          onClick={() => dispatch({ type: "cleanEtiquetas" })}
        >
          borrar todo
        </Button>
      </Box>
      {etiquetas.map(([id, etiqueta], index) => (
        <Etiqueta key={index} {...etiqueta} id={id} />
      ))}
    </Stack>
  );
};
