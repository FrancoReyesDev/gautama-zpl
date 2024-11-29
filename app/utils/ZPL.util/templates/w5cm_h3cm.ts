import ZPLUtil from "..";

export default function w5cm_h3cm(
  { barcode, title }: { barcode: string; title: string },
  { dpi, col }: { dpi: number; col: number }
) {
  const width = 5;
  const height = 3;
  const paddingYCm = 0.3;
  const paddingXCm = 0.5; // with gaps
  const availableHeight = 3 - paddingYCm * 2;
  const availableWidth = 5 - paddingXCm * 2;

  function cmToDots(cm: number) {
    return ZPLUtil.cmToDots(cm, dpi);
  }

  const moduleWidth = ZPLUtil.getModuleWidth(barcode, availableWidth, dpi);
  const xOrigin = cmToDots(width * col + paddingXCm);

  const textFieldBoxHeight = availableHeight / 2;
  const lineGap = 0;
  const textFieldBoxConfig = ZPLUtil.getTextFieldBoxConfig({
    minFontHeight: textFieldBoxHeight / 4,
    boxHeight: textFieldBoxHeight,
    boxWidth: availableWidth,
    lineGap,
    str: title,
  });

  const { fontHeight, fontWidth, rows, maxLetters } = textFieldBoxConfig;

  const textLines = [];
  const maxLettersPerRow = maxLetters / rows;

  for (let row = 0; row < rows; row++) {
    const text = (
      title.length > maxLetters ? title.slice(0, maxLetters) + "..." : title
    ).slice(maxLettersPerRow * row, maxLettersPerRow * (row + 1));

    const yOrigin = availableHeight / 2 + fontHeight * row;
    textLines.push(
      `^FO${xOrigin},${cmToDots(yOrigin) + 5}`,
      `^A1N,${cmToDots(fontHeight)},${cmToDots(fontWidth * 0.9)}`,
      `^FD${text.trim()}^FS`
    );
  }

  return [
    `^LL${cmToDots(height)}`,
    `^FO${xOrigin},${cmToDots(paddingYCm)}`,
    `^BY${moduleWidth},3,}`,
    `^BCN,${cmToDots(availableHeight / 4)},N,N,N`,
    `^FD>:${barcode}^FS`,
    `^FO${xOrigin},${cmToDots(paddingYCm + availableHeight / 4) + 6}`,
    `^A0N,30,30`,
    `^FDsku: ${barcode}^FS`,

    ...textLines,
  ].join("\n");
}
