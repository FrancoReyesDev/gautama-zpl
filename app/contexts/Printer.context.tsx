import { createContext, useContext } from "react";

function usePrinter() {
  return { printZpl() {} };
}

const context = createContext<ReturnType<typeof usePrinter> | null>(null);

export function usePrinterContext() {
  return useContext(context);
}

interface Props {
  children: React.ReactNode;
}

export function PrinterProvider({ children }: Props) {
  return <context.Provider value={null}>{children}</context.Provider>;
}
