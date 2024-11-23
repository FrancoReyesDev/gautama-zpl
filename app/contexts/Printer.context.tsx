import { createContext, useContext } from "react";

const context = createContext(null);

export function usePrinterContext() {
  return useContext(context);
}

interface Props {
  children: React.ReactNode;
}

export function PrinterProvider({ children }: Props) {
  return <context.Provider value={null}>{children}</context.Provider>;
}
