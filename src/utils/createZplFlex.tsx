import { MD, PR, PW, THERMAL_METHOD } from "@/constants";
import { formatZpl } from "./formatZpl";

const createZplFlex = (zpl:string)=>{
    const formatFlex = "^XA\n"+MD+"\n"+PR+"\n"+THERMAL_METHOD+`\n${PW}\n^LL1518\n`;
    return formatZpl({zpl:zpl,reemplazos:[],format:formatFlex});
}

export {createZplFlex};