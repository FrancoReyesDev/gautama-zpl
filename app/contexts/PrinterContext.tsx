import { createContext, useContext } from "react";
import usePrinter from "~/hooks/usePrinter";

type PrinterContext = ReturnType<typeof usePrinter>;

const printerContextFallback: PrinterContext = {
  localPrinterConfig: {
    printer: null,
    cols: 2,
    template: "w5cm_h3cm",
  },
  printers: [],
  printLabels() {},
  async printZpl() {
    return undefined;
  },
  setLocalPrinterConfig() {},
};

const context = createContext<PrinterContext>(printerContextFallback);

export function usePrinterContext() {
  return useContext(context);
}

interface Props {
  children: React.ReactNode;
  externalPrinter?: PrinterContext;
}

export function PrinterContextProvider({ children, externalPrinter }: Props) {
  const printer = externalPrinter ?? usePrinter();
  return <context.Provider value={printer}>{children}</context.Provider>;
}
