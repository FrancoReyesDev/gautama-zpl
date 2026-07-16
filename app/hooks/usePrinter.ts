import qz from "qz-tray";
import { useEffect, useMemo, useState } from "react";
import { LabelType } from "~/routes/labels/types/Label.type";
import ZPLUtil from "~/utils/ZPL.util";
import templates from "~/utils/ZPL.util/templates";

interface LocalPrinterConfig {
  template: keyof typeof templates;
  cols: number;
  printer: string | null;
}

export default function usePrinter() {
  const [isConnected, setIsConnected] = useState(false);
  const [printers, setPrinters] = useState<string[]>([]);
  const [localPrinterConfig, setLocalPrinterConfig] =
    useState<LocalPrinterConfig>({
      template: Object.keys(templates)[0] as LocalPrinterConfig["template"],
      cols: 2,
      printer: null,
    });

  const zplUtil = useMemo(() => {
    const zplUtil = new ZPLUtil({
      dpi: 203,
      cols: Number(localPrinterConfig.cols) || 1,
      labelTemplate: localPrinterConfig.template,
    });
    return zplUtil;
  }, [localPrinterConfig]);

  async function connectQz() {
    if (isConnected === true) return;

    await qz.websocket.connect();
    setIsConnected(true);
  }

  async function initQz() {
    await connectQz();
    const printers = await qz.printers.find();
    setPrinters(Array.isArray(printers) ? printers : [printers]);
  }

  async function disconnectQz() {
    if (isConnected) {
      await qz.websocket.disconnect();
      setIsConnected(false);
    }
  }

  useEffect(() => {
    initQz();

    return () => {
      disconnectQz();
    };
  }, []);

  async function printZpl(zpl: string) {
    if (localPrinterConfig.printer === null)
      return console.error("printer is does not defined");
    try {
      const qzConfig = qz.configs.create(localPrinterConfig.printer);
      await qz.print(qzConfig, [zpl]);

      return { success: true, message: "Impresión completada" };
    } catch (error) {
      console.error("Error al imprimir:", error);
      qz.websocket.disconnect();

      return {
        success: false,
        message: "Error al imprimir",
      };
    }
  }

  function printLabels(labels: LabelType[]) {
    const zpl = zplUtil.createZplFromLabels(labels);
    printZpl(zpl);
  }

  return {
    printers,
    printZpl,
    printLabels,
    localPrinterConfig,
    setLocalPrinterConfig,
  };
}
