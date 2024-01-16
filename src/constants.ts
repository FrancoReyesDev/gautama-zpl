// CONFIG CONSTANS
export const LOCALSTORAGE_KEYS = {
    bigPrinter:'bigPrinter',
    smallPrinter:'smallPrinter',
    host:'host',
    port:'port',
}

export const TOOL_PRINTER = {
    full:LOCALSTORAGE_KEYS.smallPrinter,
    flex:LOCALSTORAGE_KEYS.bigPrinter,
    etiquetas:LOCALSTORAGE_KEYS.smallPrinter,
}

// ZPL CONSTANTS
export const ROW_WIDTH = 799;
export const LABEL_HEIGTH = {
    small:252,
    big:1518,
}

/*
const LABEL_GAP = {
    small:24,
    big:104,
}

const LABEL_MARGIN_X ={
    big:10,
    small:10,
}

const LABEL_MARGIN_Y = {
    big:10,
    small:10
}
*/

export const BARCODE_HEIGTH = 60
export const BARCODE_CODE_HEIGTH = 36 // two lines 20 dots height and 10 dots gap
export const BARCODE_MODULES_PER_CHARACTER={ // aprox
    string:22,
    number:11,
    beginAndEnding:110,
}

export const FONT_MIN_SIZE = 20;
export const MARGIN = 20;
export const GAP = 5;

export const MD = "^MD4"; // Media Darkness
export const PR = "^PR2"; // Print Rate
export const PW = "^PW"+ROW_WIDTH; // Print Width

export const THERMAL_METHOD = "^MTT"; // Media type (T: thermal transfer, D: Direct transfer)
export const LH = "^LH0,0" // Label Home
export const LL = { // Label Length (heigth)
    etiquetas:"^LL"+LABEL_HEIGTH.small,
    full:"^LL"+LABEL_HEIGTH.small,
    flex:"^LL"+LABEL_HEIGTH.big,
    colecta:"^LL"+LABEL_HEIGTH.big,
}
/*export const LS = { // espacio entre etiquetas
    flex:"^LS"+LABEL_GAP.big,
    colecta:"^LS"+LABEL_GAP.big,
    etiquetas:"^LS"+LABEL_GAP.small
}*/

export const FORMAT = {
    etiquetasSmall:`^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n${LH}\n${PW}\n${LL.etiquetas}`,
    etiquetasBig:`^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n${LH}\n${PW}\n${LL.etiquetas}`,

}

export const CLEAR_BITMAP = '^XA^MCY^XZ';




