type Etiqueta = {
  title: string;
  sku: string;
  quantity: number;
};

type Etiquetas = Map<number, Etiqueta>;

interface PrinterConfig {
  density: number;
  printSpeed: number;
  printMode: "T";
}
