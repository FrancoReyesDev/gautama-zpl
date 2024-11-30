import { LabelType } from "./Label.type";

export default interface RemotePrinterContext {
  printLabels(label: LabelType[]): void;
}
