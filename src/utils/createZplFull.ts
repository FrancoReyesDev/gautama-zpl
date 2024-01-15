import { LL, MD, PR, PW, THERMAL_METHOD } from "@/constants";
import { formatZpl } from "./formatZpl";

const createZplFull = (zpl:string)=>{
    const formatFlex = `^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n${PW}\n${LL.full}\n`;

    const reemplazos = [
        ['FB400','FB350']
    ]
    
    return formatZpl({zpl:zpl,reemplazos:reemplazos,format:formatFlex});
}


export {createZplFull};