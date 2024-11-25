type Label = {
  title: string;
  sku: string;
  quantity: number;
};

type Labels = Map<number, Label>;

interface PrinterConfig {
  density: number;
  printSpeed: number;
  printMode: "T";
}
