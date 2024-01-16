import { BARCODE_CODE_HEIGTH, BARCODE_HEIGTH, FONT_MIN_SIZE, GAP, LABEL_HEIGTH, MARGIN, ROW_WIDTH } from "@/constants";

// ZPL LABEL FORMAT
const etiquetaLayout = ({format,codeWithFo,barcodeWithFo,descriptionWithFo,borderWithFo}:{
    borderWithFo?:string,
    format?:string,
    codeWithFo:string,
    barcodeWithFo:string,
    descriptionWithFo:string,
})=>{
    return [
        format,
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

export const genEtiqueta = ({format,codigo,titulo,rowIndex,size,side}:{
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

    const foCodeY =foBarcodeY+GAP+BARCODE_HEIGTH;
    const foCode = (`^FO${originXWithMargin},${foCodeY}`);

    const foDescriptionY = foCodeY+GAP*2+BARCODE_CODE_HEIGTH
    const foDescription = (`^FO${originXWithMargin},${foDescriptionY}`);

    const remainHeigth = labelHeigth-foDescriptionY-MARGIN; 
    const barcodeModuleWidth = calculateBarcodeSizes({codigo,fieldBlockWidth})

    const label = etiquetaLayout({
        format,
        borderWithFo:`^FO${originX},${originY}^GB${labelWidth},${labelHeigth},4^FS`,
        barcodeWithFo:foBarcode+
        `^BY${barcodeModuleWidth},2`+
        `^BCN,${BARCODE_HEIGTH},N,N,N,A`+
        `^FD${codigo}^FS`,
        codeWithFo:foCode+`^FB${fieldBlockWidth},2,2,L^A0N,${FONT_MIN_SIZE},${FONT_MIN_SIZE}^FDcod: ${codigo}^FS`,
        descriptionWithFo:foDescription+`^FB${fieldBlockWidth},2,0,L^A0N,18,18^FD${titulo}^FS`,
    });

    return label;
}

const calculateBarcodeSizes = ({codigo,fieldBlockWidth}:{codigo:string,fieldBlockWidth:number})=>{
    const totalModules = Array.from(codigo).reduce((acc,character)=>{
        if(acc > fieldBlockWidth)
        return acc;
        
        const isNumber = !isNaN(Number(character));
        acc = acc + (isNumber?11:22);
        return acc;
    },0)

    const moduleWidth = fieldBlockWidth/totalModules
    const moduleWidthTrunc = Math.trunc(moduleWidth);

    if(moduleWidthTrunc < 1)
    return 1;

    return moduleWidthTrunc;
}

const calculateSizeAndLinesForDescription = ({codigo,fieldBlockWidth,remainHeigth}:{codigo:string,fieldBlockWidth:number,remainHeigth:number})=>{

}