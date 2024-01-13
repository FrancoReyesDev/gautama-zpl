import { MD, PR, THERMAL_METHOD } from "@/constants";
import { formatZpl } from "./formatZpl";

const createZplFull = (zpl:string)=>{
    const formatFlex = `^XA\n${MD}\n${PR}\n${THERMAL_METHOD}\n^PW799\n^LL240\n`;

    const reemplazos = [
        ['FB400','FB350']
    ]
    return formatZpl({zpl:zpl,reemplazos:reemplazos,format:formatFlex});
}


export {createZplFull};