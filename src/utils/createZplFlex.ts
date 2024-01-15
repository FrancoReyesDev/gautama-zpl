import { LL, MD, PR, PW, THERMAL_METHOD } from "@/constants";
import { formatZpl } from "./formatZpl";

const createZplFlex = (zpl:string)=>{
    const formatFlex = "^XA\n"+MD+"\n"+PR+"\n"+THERMAL_METHOD+`\n${PW}\n${LL.flex}\n`;
    return formatZpl({zpl:zpl,reemplazos:[],format:formatFlex});
}

export {createZplFlex};