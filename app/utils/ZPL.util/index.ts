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

  // ADVICE: Aun no queda perfecto. por algun motivo no es predecible el tema de los tama;os...
  static getTextFieldBoxConfig({
    minFontHeight,
    boxHeight,
    lineGap,
    boxWidth,
    str,
  }: {
    minFontHeight: number;
    boxHeight: number;
    boxWidth: number;
    lineGap: number;
    str: string;
  }): {
    fontHeight: number;
    fontWidth: number;
    maxLetters: number;
    rows: number;
  } {
    // por alguna razon la fuente 0 ocupa la mitad de su espacio definido
    const fixedBoxWidth = boxWidth; // *2 si usaramos A0

    function getTextFieldBoxConfigPerRow(
      textFieldBoxConfigsPerRow: {
        fontHeight: number;
        fontWidth: number;
        maxLetters: number;
        rows: number;
      }[] = []
    ) {
      const rows = textFieldBoxConfigsPerRow.length + 1;
      const availableHeight = boxHeight - lineGap * (rows - 1);
      const fontHeight = availableHeight / rows;
      const fontWidth = fontHeight / 2;
      const maxLetters = (fixedBoxWidth / fontWidth) * rows;

      if (fontHeight <= minFontHeight) {
        const minFontWidth = minFontHeight / 2;
        const maxLetterForMinFontHeight = (fixedBoxWidth / minFontWidth) * rows;
        const newTextFieldBoxConfigsPerRow = [
          ...textFieldBoxConfigsPerRow,
          {
            maxLetters: maxLetterForMinFontHeight,
            fontHeight: minFontHeight,
            fontWidth: minFontWidth,
            rows,
          },
        ];
        return newTextFieldBoxConfigsPerRow;
      }

      const newTextFieldBoxConfigsPerRow = [
        ...textFieldBoxConfigsPerRow,
        { maxLetters, fontHeight, fontWidth, rows },
      ];

      return getTextFieldBoxConfigPerRow(newTextFieldBoxConfigsPerRow);
    }

    const textFieldBoxConfigs = getTextFieldBoxConfigPerRow();

    for (const textFieldBoxConfig of textFieldBoxConfigs) {
      if (str.length > textFieldBoxConfig.maxLetters) continue;

      return textFieldBoxConfig;
    }

    return textFieldBoxConfigs[textFieldBoxConfigs.length - 1];
  }

  createZplFromLabels(
    labels: { sku: string; title: string; quantity: number }[]
  ) {
    const arrayOfLabels: { sku: string; title: string }[] = [];

    labels.forEach(({ sku, title, quantity }) => {
      const count = Math.trunc(Number(quantity)) || 0;
      if (sku.trim() === "" || count <= 0) return;

      const array = new Array(count).fill({ sku, title: title || sku });

      arrayOfLabels.push(...array);
    });

    let col = 0;
    return arrayOfLabels
      .map(({ sku, title }, index) => {
        let labelZpl = templates[this.labelTemplate](
          { barcode: sku, title },
          { dpi: this.dpi, col }
        );

        if (col === 0) labelZpl = "^XA" + labelZpl;
        if (col === this.cols - 1 || index === arrayOfLabels.length - 1)
          labelZpl = labelZpl + "^XZ";

        col = (col + 1) % this.cols;

        return labelZpl;
      })
      .join("\n");
  }
}
