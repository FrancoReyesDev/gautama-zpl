import {
  BARCODE_CODE_HEIGTH,
  BARCODE_HEIGTH,
  FONT_MIN_SIZE,
  GAP,
  LABEL_FIX_GAP_X,
  LABEL_GAP_X,
  LABEL_HEIGTH,
  LABEL_WITH_BORDER,
  MARGIN,
  ROW_WIDTH,
} from "@/constants";

// ZPL LABEL FORMAT
const etiquetaLayout = ({
  format,
  codeWithFo,
  barcodeWithFo,
  descriptionWithFo,
  borderWithFo,
}: {
  borderWithFo?: string;
  format?: string;
  codeWithFo: string;
  barcodeWithFo: string;
  descriptionWithFo: string;
}) => {
  return [
    "\n" + (format ?? ""),
    "\n^FXBorder",
    borderWithFo,
    "\n^FXBarcode",
    barcodeWithFo,
    `\n^FXCode`,
    codeWithFo,
    `\n^FXDescription`,
    descriptionWithFo,
  ].join("\n");
};

export const genEtiqueta = ({
  format,
  codigo,
  description,
  rowIndex,
  size,
  side,
}: {
  format?: string;

  codigo: string;
  description: string;

  rowIndex: number;
  size: "small" | "big";
  side: 0 | 1;
}) => {
  const labelsPerPage = size === "big" ? 6 : 1;
  const labelHeigth = Math.trunc(LABEL_HEIGTH[size] / labelsPerPage);
  const labelWidth = Math.trunc(ROW_WIDTH / 2);

  const fieldBlockWidth = labelWidth - MARGIN * 2;

  const originX = Math.trunc(
    labelWidth * side + LABEL_GAP_X[size] * side - LABEL_FIX_GAP_X[size]
  );
  const originY = labelHeigth * rowIndex;
  const originXWithMargin = originX + MARGIN;

  const foBarcodeY = originY + MARGIN;
  const foBarcode = `^FO${originXWithMargin},${foBarcodeY}`;

  const foCodeY = foBarcodeY + GAP + BARCODE_HEIGTH;
  const foCode = `^FO${originXWithMargin},${foCodeY}`;

  const foDescriptionY = foCodeY + GAP * 2 + BARCODE_CODE_HEIGTH;
  const foDescription = `^FO${originXWithMargin},${foDescriptionY}`;

  const remainHeigth = labelHeigth - foDescriptionY - MARGIN;
  const fixedFieldBlockWidth = fieldBlockWidth;
  const fixedRemainHeigth = remainHeigth - 20;

  const barcodeModuleWidth = calculateBarcodeSizes({
    codigo,
    fieldBlockWidth: fixedFieldBlockWidth,
  });

  const { rows, fontSize } = calculateSizeAndLinesForDescription({
    description,
    fieldBlockWidth: fixedFieldBlockWidth,
    remainHeigth: fixedRemainHeigth,
  });

  const border = LABEL_WITH_BORDER[size]
    ? `^FO${originX},${originY}^GB${labelWidth},${labelHeigth},4^FS`
    : "";

  const label = etiquetaLayout({
    format,
    borderWithFo: border,
    barcodeWithFo:
      foBarcode +
      `^BY${barcodeModuleWidth},2` +
      `^BCN,${BARCODE_HEIGTH},N,N,N,A` +
      `^FD${codigo}^FS`,
    codeWithFo:
      foCode +
      `^FB${fieldBlockWidth},2,2,L^A0N,${FONT_MIN_SIZE},${FONT_MIN_SIZE}^FDcod: ${codigo}^FS`,
    descriptionWithFo:
      foDescription +
      `^FB${fieldBlockWidth},${rows},4,L^A0N,${fontSize},${fontSize}^FD${description}^FS`,
  });

  return label;
};

const calculateBarcodeSizes = ({
  codigo,
  fieldBlockWidth,
}: {
  codigo: string;
  fieldBlockWidth: number;
}) => {
  const totalModules = Array.from(codigo).reduce((acc, character) => {
    if (acc > fieldBlockWidth) return acc;

    const isNumber = !isNaN(Number(character));
    acc = acc + (isNumber ? 11 : 22);
    return acc;
  }, 0);

  const moduleWidth = fieldBlockWidth / totalModules;
  const moduleWidthTrunc = Math.trunc(moduleWidth);

  if (moduleWidthTrunc < 1) return 1;

  if (moduleWidthTrunc > 4) return 4;

  return moduleWidthTrunc;
};

const calculateSizeAndLinesForDescription = ({
  description,
  fieldBlockWidth,
  remainHeigth,
}: {
  description: string;
  fieldBlockWidth: number;
  remainHeigth: number;
}) => {
  const createRowsArray = ({
    word,
    rowSize,
  }: {
    word: string;
    rowSize: number;
  }) => {
    const init: string[][] = [];
    return Array.from(word).reduce((acc, letter, index) => {
      const rowIndex = Math.trunc(index / rowSize);

      if (typeof acc[rowIndex] === "undefined") acc.push([]);
      acc[rowIndex] = [...acc[rowIndex], letter];
      return acc;
    }, init);
  };

  const calculate = ({
    fontSize,
    word,
    rows,
    wordIndex,
  }: {
    fontSize: number;
    word: string;
    rows: number;
    wordIndex: number;
  }): { fontSize: number; rows: number } => {
    const partialWord = word.slice(0, wordIndex);

    const breakFontSize = Math.trunc(remainHeigth / (rows + 1));
    fontSize = Math.trunc(
      fieldBlockWidth / Math.trunc(partialWord.length / rows)
    );

    if (fontSize <= breakFontSize) rows = rows + 1;

    // console.log({partialWord,breakFontSize,fontSize,rows})

    if (wordIndex === word.length) return { fontSize, rows };

    return calculate({ fontSize, word, rows, wordIndex: wordIndex + 1 });
  };

  return calculate({
    word: description,
    rows: 1,
    wordIndex: 1,
    fontSize: remainHeigth,
  });
};
