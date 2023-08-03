import { formatZplRow } from "./formatZplRow";

interface FormatZplProps{
    zpl:string;
    reemplazos:string[][];
    format:string;
}

const formatZpl = ({zpl,reemplazos,format}:FormatZplProps)=>{
    const formatedZpl = zpl.split('^XA').map((row,index)=>{
        return index>0?format+formatZplRow({zplRow:row,reemplazos:reemplazos}):""            
    })
    const clearBitmap = '^XA^MCY^XZ';

    return clearBitmap+formatedZpl.join("");
}

const createZplFlex = (zpl:string)=>{
    const thermalMethod = '';
    const formatFlex = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^PW799\n^LL1518\n";
    return formatZpl({zpl:zpl,reemplazos:[],format:formatFlex});
}

export {createZplFlex};