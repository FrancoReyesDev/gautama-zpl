import ZPLUtil from "..";
import _ from "lodash";

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

  const textFieldHeight = cmToDots(availableHeight / 2);
  const fontHeight = cmToDots(
    (availableWidth * 2) / Math.min(50, title.length)
  );
  const fonthWidth = cmToDots(fontHeight / 2);
  const rows = Math.ceil(textFieldHeight / fontHeight);

  console.log({
    rows,
    availableWidth,
    fontHeight,
    fonthWidth,
    titleLength: title.length,
  });

  const maxTitleLength = Math.ceil(
    (textFieldHeight / ((availableWidth * 2) / 50)) * 50
  );
  return [
    `^LL${cmToDots(height)}`,
    `^FO${xOrigin},${cmToDots(paddingYCm)}`,
    `^BY${moduleWidth},3,${cmToDots(availableHeight / 2)}`,
    `^BCN,${cmToDots((availableHeight * 3) / 8)},Y,Y,N`,
    `^FD>:${barcode}^FS`,
    `^FO${xOrigin},${cmToDots(availableHeight / 2) + 10}`,
    `^A0,${fontHeight},${fonthWidth}`,
    `^FB${availableWidth},${rows},10,L,0`,
    `^FD>:${title.slice(0, maxTitleLength)}^FS`,
  ].join("\n");
}
