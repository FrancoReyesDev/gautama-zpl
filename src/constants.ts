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
export const MD = "^MD3"; // Media Darkness
export const PR = "^PR2"; // Print Rate
export const PW = "^PW799"; // Print Width
export const THERMAL_METHOD = "^MTD"; // Media type (T: thermal transfer, D: Direct transfer)
export const LL = { // Label Length
    etiquetas:"^LL240",
    full:"^LL240",
    flex:"^LL1518",
    colecta:"^LL1518",
}

export const CLEAR_BITMAP = '^XA^MCY^XZ';
