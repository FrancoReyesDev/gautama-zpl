import { createContext, useContext } from "react";
import usePrinter from "~/hooks/usePrinter";

type PrinterContext = ReturnType<typeof usePrinter>;

const printerContextFallback: PrinterContext = {
  localPrinterConfig: {
    printer: null,
    cols: 2,
    template: "w5cm_h3cm",
  },
  remotePrinterConfig: { host: "" },
  setRemotePrinterConfig() {},
  printers: [],
  printLabels() {},
  async printZpl() {
    return undefined;
  },
  setLocalPrinterConfig() {},
  setIsRemote() {},
  isRemote: false,
};

const context = createContext<PrinterContext>(printerContextFallback);

export function usePrinterContext() {
  return useContext(context);
}

interface Props extends Partial<PrinterContext> {
  children: React.ReactNode;
}

export function PrinterContextProvider({
  children,
  ...printerOverride
}: Props) {
  const printer = usePrinter();
  return (
    <context.Provider value={{ ...printer, ...printerOverride }}>
      {children}
    </context.Provider>
  );
}
