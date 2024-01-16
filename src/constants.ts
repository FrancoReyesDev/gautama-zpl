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
const ROW_WIDTH = 799;
const LABEL_HEIGTH = {
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

const BARCODE_HEIGTH = 60
const BARCODE_CODE_HEIGTH = 50 // two lines 20 dots height and 10 dots gap
const MARGIN = 10


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


// ZPL LABEL FORMAT
const etiquetaLayout = ({format,codeWithFo,foBarcode,descriptionWithFo,borderWithFo,codigo}:{
    borderWithFo?:string,
    format?:string,
    codeWithFo:string,
    foBarcode:string,
    descriptionWithFo:string,
    codigo:string,
})=>{
    return [
        format,
        "\n^FXBorder",
        borderWithFo,
        "\n^FXBarcode",
        foBarcode,
        `^BY1,2,`,
        `^BCN,${BARCODE_HEIGTH},N,N,N,A`, //deberian entrar 21 caracteres
        `^FD${codigo}^FS`,
        `\n^FXCode`,
        codeWithFo,
        `\n^FXDescription`,
        descriptionWithFo,
        
    ].join("\n");
};

export const ETIQUETA = ({format,codigo,titulo,rowIndex,size,side}:{
    format?:string,

    codigo:string,
    titulo:string,

    rowIndex:number,
    size:'small'|'big'
    side:0|1
})=>{

    const labelHeigth = Math.trunc(LABEL_HEIGTH[size]/6)
    const labelWidth = Math.trunc(ROW_WIDTH/2)

    const fieldBlockWidth = labelWidth-MARGIN*2;

    const originX = Math.trunc(labelWidth*side);
    const originY = labelHeigth*rowIndex;
    const originXWithMargin = originX+MARGIN;

    const foBarcodeY = originY+MARGIN;
    const foBarcode = (`^FO${originXWithMargin},${foBarcodeY}`);

    const foCodeY =foBarcodeY+MARGIN+BARCODE_HEIGTH;
    const foCode = (`^FO${originXWithMargin},${foCodeY}`);

    const foDescriptionY = foCodeY+MARGIN+BARCODE_CODE_HEIGTH
    const foDescription = (`^FO${originXWithMargin},${foDescriptionY}`);

    // const remainHeigth = labelHeigth-foDescriptionY-MARGIN; 

    const label = etiquetaLayout({
        format,
        borderWithFo:`^FO${originX},${originY}^GB${labelWidth},${labelHeigth},4^FS`,
        foBarcode:foBarcode,
        codeWithFo:foCode+`^FB${fieldBlockWidth},2,2,L^A0N,18,16^FD${codigo}^FS`,
        descriptionWithFo:foDescription+`^FB${fieldBlockWidth},2,2,L^A0N,18,16^FD${titulo}^FS`,
        codigo
    });

    return label
}

