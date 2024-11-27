import qz from "qz-tray";

export function usePrinter() {
  return {
    async print(zpl: string) {
      try {
        await qz.websocket.connect({ host: "127.0.0.1" });
        const printers = await qz.printers.find();
        const config = qz.configs.create(printers[0]);
        await qz.print(config, [zpl]);

        qz.websocket.disconnect();

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
