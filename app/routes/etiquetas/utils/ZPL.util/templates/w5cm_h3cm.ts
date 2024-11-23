import ZPLUtil from "..";
import _, { xor } from "lodash";

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

  return [
    `^LL${cmToDots(height)}`,
    `^FO${xOrigin},${cmToDots(paddingYCm)}`,
    `^BY${moduleWidth},3,${cmToDots(availableHeight / 2)}`,
    `^BCN,${cmToDots(availableHeight / 2)},Y,Y,N`,
    `^FD>:${barcode}^FS`,
    `^FO${xOrigin},${availableHeight / 2}`,
    `^A0N,30,30`,
    `^FDProducto XYZ^FS`,
  ];
}
