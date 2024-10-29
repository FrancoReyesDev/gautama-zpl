import { createContext, useContext } from "react";

const context = createContext({});

function usePrinter() {}

export function usePrinterContext() {
  return useContext(context);
}

interface PrinterProviderProps {
  children: React.ReactNode;
}

export function PrinterProvider({ children }: PrinterProviderProps) {
  return <context.Provider value={{}}>{children}</context.Provider>;
}
