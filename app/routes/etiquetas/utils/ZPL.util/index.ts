import _ from "lodash";
import templates from "./templates";

interface Props {
  dpi: number;
  cols: number;
  labelTemplate: keyof typeof templates;
}

export default class ZPLUtil implements Props {
  cols: number;
  dpi: number;
  labelTemplate: keyof typeof templates;

  constructor({ dpi = 203, cols = 1, labelTemplate }: Props) {
    this.dpi = dpi;
    this.cols = cols;
    this.labelTemplate = labelTemplate;
  }

  static cmToDots(cm: number, dpi: number, ceil: boolean = true) {
    const dots = (dpi * cm) / 2.54;
    return ceil ? _.ceil(dots) : dots;
  }

  static getModuleWidth(barcode: string, width: number, dpi: number) {
    const totalDotsAvailable = ZPLUtil.cmToDots(width, dpi, false);
    const totalModules = 11 * barcode.length + 11;
    const idealModuleWidth = totalDotsAvailable / (totalModules * 2); // Considera ratio

    return _.ceil(Math.min(Math.max(idealModuleWidth, 1), 3), 1);
  }

  createItemLabels(labels: { sku: string; title: string; quantity: number }[]) {
    return templates[this.labelTemplate](
      { barcode: labels[0]["sku"], title: labels[0]["title"] },
      { dpi: this.dpi, col: 1 }
    );
  }
}
