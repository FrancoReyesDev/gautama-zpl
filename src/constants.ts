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
export const MD = "^MD4"; // Media Darkness
export const PR = "^PR2"; // Print Rate
export const PW = "^PW799"; // Print Width
export const THERMAL_METHOD = "^MTT"; // Media type (T: thermal transfer, D: Direct transfer)
export const LL = { // Label Length
    etiquetas:"^LL240",
    full:"^LL240",
    flex:"^LL1518",
    colecta:"^LL1518",
}

export const FORMAT = {
    etiquetas:`^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n^LH0,0\n${PW}\n${LL.etiquetas}`,
}

export const CLEAR_BITMAP = '^XA^MCY^XZ';

// ZPL LABEL FORMAT

export const ETIQUETA = ({codigo,titulo}:{codigo:string,titulo:string})=>({
    
    left:FORMAT.etiquetas+`^FO10,20\n^BY2\n^BCN,30,Y,N,N\n^FD${codigo}\n^FS\n`+`^FO10,80\n^FB380,2,2,C\n^A0N,70,60\n^FD${titulo}\n^FS\n`,
    right:`^FO440,20\n^BY2\n^BCN,30,Y,N,N\n^FD${codigo}\n^FS\n`+`^FO440,80\n^FB380,2,2,C\n^A0N,70,60\n^FD${titulo}\n^FS\n`+"^XZ\n"
})
