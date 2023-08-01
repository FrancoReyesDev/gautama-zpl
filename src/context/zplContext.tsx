import { MutableRefObject, createContext } from "react";

export const zplContext = createContext<{zpl:MutableRefObject<string>}>({} as {zpl:MutableRefObject<string>});