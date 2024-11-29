import qz from "qz-tray";
import { useEffect, useState } from "react";

export function usePrinter() {
  const [isConnected, setIsConnected] = useState(false);
  const [printers, setPrinters] = useState<string[]>([]);
  const [printer, setPrinter] = useState<null | string>(null);

  async function initQz() {
    await qz.websocket.connect();
    const printers = await qz.printers.find();

    setPrinters(Array.isArray(printers) ? printers : [printers]);
    setIsConnected(true);
  }

  useEffect(() => {
    initQz();
  }, []);

  return {
    printers,
    printer,
    setPrinter,
    async print(zpl: string) {
      if (printer === null) return;
      try {
        const config = qz.configs.create(printer);
        await qz.print(config, [zpl]);

        return { success: true, message: "Impresión completada" };
      } catch (error) {
        console.error("Error al imprimir:", error);
        qz.websocket.disconnect();

        return {
          success: false,
          message: "Error al imprimir",
        };
      }
    },
  };
}
