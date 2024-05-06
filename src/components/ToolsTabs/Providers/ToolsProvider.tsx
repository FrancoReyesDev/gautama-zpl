import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Etiqueta, Tools } from "../types";
import { createZplFull } from "@/utils/createZplFull";
import { createZplFlex } from "@/utils/createZplFlex";
import { createZplFromEtiquetas } from "@/utils/createZplFromEtiquetas";

type EtiquetasState = {
  tool: "etiquetas";
  zpl: string;
  etiquetas: Map<symbol, Etiqueta>;
};

type GeneralState = {
  tool: Exclude<Tools, "etiquetas">;
  zpl: string;
};

type ToolsState = EtiquetasState | GeneralState;

type SetToolAction = {
  type: "setTool";
  tool: Tools;
};

type SetZplAction = {
  type: "setZpl";
  zpl: string;
};

type AddEtiquetaAction = {
  type: "addEtiqueta";
};

type EditEtiquetaAction = {
  type: "editEtiqueta";
  etiqueta: Etiqueta;
  id: symbol;
};

type DeleteEtiquetaAction = {
  type: "deleteEtiqueta";
  id: symbol;
};

type CleanEtiquetasAction = {
  type: "cleanEtiquetas";
};

type BulkAddEtiquetasAction = {
  type: "bulkAddEtiquetas";
  etiquetas: Etiqueta[];
};

type ToolsAction =
  | SetToolAction
  | SetZplAction
  | AddEtiquetaAction
  | DeleteEtiquetaAction
  | EditEtiquetaAction
  | CleanEtiquetasAction
  | BulkAddEtiquetasAction;

const transition = (
  state: ToolsState,
  action: ToolsAction,
  transitions: {
    [tool in Tools]: {
      [action in ToolsAction["type"]]?: (
        state: ToolsState,
        actions: ToolsAction
      ) => ToolsState;
    };
  }
) =>
  transitions[state.tool] !== undefined &&
  transitions[state.tool][action.type] !== undefined
    ? (
        transitions[state.tool][action.type] as (
          state: ToolsState,
          actions: ToolsAction
        ) => ToolsState
      )(state, action)
    : state;

const setToolHandler = (state: ToolsState, action: ToolsAction): ToolsState =>
  ({
    ...state,
    tool: (action as SetToolAction).tool,
    zpl: "",
  } as GeneralState);

const editEtiquetaHandler = (state: ToolsState, action: ToolsAction) => {
  const { etiqueta, id } = action as EditEtiquetaAction;
  const { etiquetas } = state as EtiquetasState;

  etiquetas.set(id, etiqueta);

  return {
    ...state,
    etiquetas,
    zpl: createZplFromEtiquetas(Array.from(etiquetas.values())),
  } as EtiquetasState;
};

const deleteEtiquetaHandler = (state: ToolsState, action: ToolsAction) => {
  const { id } = action as DeleteEtiquetaAction;
  const { etiquetas } = state as EtiquetasState;

  etiquetas.delete(id);
  return {
    ...state,
    etiquetas,
    zpl: createZplFromEtiquetas(Array.from(etiquetas.values())),
  } as EtiquetasState;
};

const addEtiquetaHandler = (state: ToolsState, action: ToolsAction) => {
  const { etiquetas } = state as EtiquetasState;
  etiquetas.set(Symbol(), initialEtiqueta);
  return { ...state, etiquetas } as EtiquetasState;
};

const cleanEtiquetasHandler = (state: ToolsState, action: ToolsAction) => {
  return { ...state, etiquetas: new Map(), zpl: "" } as EtiquetasState;
};

const bulkAddEtiquetasHandler = (state: ToolsState, action: ToolsAction) => {
  const { etiquetas: newEtiquetas } = action as BulkAddEtiquetasAction;
  const { etiquetas } = state as EtiquetasState;

  newEtiquetas.forEach((newEtiqueta) => {
    etiquetas.set(Symbol(), newEtiqueta);
  });

  return {
    ...state,
    etiquetas,
    zpl: createZplFromEtiquetas(Array.from(etiquetas.values())),
  };
};

const initialEtiqueta = { codigo: "", titulo: "", cantidad: 1 };

const initialState: EtiquetasState = {
  tool: "etiquetas",
  zpl: "",
  etiquetas: new Map([[Symbol(), initialEtiqueta]]),
};

const context = createContext<[ToolsState, React.Dispatch<ToolsAction>]>([
  initialState,
  () => {},
]);
export const useTools = () => useContext(context);

export const ToolsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reducer = (state: ToolsState, action: ToolsAction) =>
    transition(state, action, {
      full: {
        setTool: setToolHandler,
        setZpl: (state, action) =>
          (action as SetZplAction).zpl === ""
            ? state
            : { ...state, zpl: createZplFull((action as SetZplAction).zpl) },
      },
      "flex/colecta": {
        setTool: setToolHandler,
        setZpl: (state, action) =>
          (action as SetZplAction).zpl === ""
            ? state
            : { ...state, zpl: createZplFlex((action as SetZplAction).zpl) },
      },
      etiquetas: {
        setTool: (state, value) => {
          const newState = setToolHandler(state, value);
          return {
            ...newState,
            etiquetas: new Map([
              [Symbol(), { codigo: "", titulo: "", cantidad: 1 }],
            ]),
          };
        },
        editEtiqueta: editEtiquetaHandler,
        deleteEtiqueta: deleteEtiquetaHandler,
        addEtiqueta: addEtiquetaHandler,
        cleanEtiquetas: cleanEtiquetasHandler,
        bulkAddEtiquetas: bulkAddEtiquetasHandler,
      },
    });

  const toolsReducer = useReducer(reducer, initialState);

  return <context.Provider value={toolsReducer}>{children}</context.Provider>;
};
