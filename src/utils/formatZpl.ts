import { CLEAR_BITMAP } from "@/constants";
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

    return CLEAR_BITMAP+formatedZpl.join("");
}

export {formatZpl};