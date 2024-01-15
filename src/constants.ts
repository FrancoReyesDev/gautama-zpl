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
const LABEL_GAP = {
    small:24,
    big:104,
}
const LABEL_MARGIN_X ={
    big:20,
    small:10,
}

const LABEL_MARGIN_Y = {
    big:10,
    small:10
}

const BARCODE_HEIGTH = 50
const MARGIN = 16


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
const etiquetaLayout = ({format,codeWithFo,foBarcode,descriptionWithFo,borderWithFo}:{
    borderWithFo?:string,
    format?:string,
    codeWithFo:string,
    foBarcode:string,
    descriptionWithFo:string
})=>{
    return [
        format,
        "^FXEtiqueta",
        borderWithFo,
        foBarcode,
        `^BY2,2,${BARCODE_HEIGTH}`,
        `^BCN,18,N,N,N,A`, //deberian entrar 21 caracteres
        codeWithFo,
        descriptionWithFo,
        
    ].join("\n");
};

export const ETIQUETA = ({format,codigo,titulo,index,size}:{
    format?:string,

    codigo:string,
    titulo:string,

    index:number,
    size:'small'|'big'
})=>{

    const labelHeigth = Math.trunc(LABEL_HEIGTH[size]/6)
    const labelWidth = Math.trunc(ROW_WIDTH/2)

    const marginX = LABEL_MARGIN_X[size];
    const marginY = LABEL_MARGIN_Y[size];

    let usableLabelHeight = Math.trunc(labelHeigth-marginY-marginY/2);
    const usabeLabelWidth = Math.trunc(labelWidth-marginX-marginX/2);

    const borderX = (side:number)=>Math.trunc(labelWidth*side);
    const borderY = labelHeigth*index;

    console.log(borderY)

    const foX = (side:number)=>Math.trunc(borderX(side)*side+marginX+(marginX/2)*side)
    const foY = Math.trunc(borderY+marginY)

    const foBarcode = (side:number)=>(`^FO${foX(side)},${foY}`);
    usableLabelHeight -=BARCODE_HEIGTH;

    const foCodeY = foY+MARGIN+BARCODE_HEIGTH;
    const foCode = (side:number)=>(`^FO${foX(side)},${foCodeY}`);
    const codeHeight = 32;

    const foDescription = (side:number)=>(`^FO${foX(side)},${foCodeY+codeHeight+MARGIN}`);

    usableLabelHeight -=codeHeight;

    const left = etiquetaLayout({
        format,
        borderWithFo:`^FO${borderX(0)},${borderY}^GB${labelWidth},${labelHeigth},4^FS`,
        foBarcode:foBarcode(0),
        codeWithFo:foCode(0)+`^FB${codeHeight},2,2,L^A0N,18,16^FD${codigo}^FS`,
        descriptionWithFo:foDescription(0)+`^FB${usabeLabelWidth},2,2,L^A0N,18,16^FD${titulo}^FS`,
    });

    const right = etiquetaLayout({
        format,
        borderWithFo:`^FO${borderX(1)},${borderY}^GB${labelWidth},${labelHeigth},4^FS`,
        foBarcode:foBarcode(1),
        codeWithFo:`${foCode(1)}^FB${codeHeight},2,2,L^A0N,18,16^FD${codigo}^FS`,
        descriptionWithFo:`${foDescription(1)}^FB${usabeLabelWidth-MARGIN},2,2,L^A0N,18,16^FD${titulo}^FS`,
    });

    return {left,right}
}

