import { LL, MD, PR, PW, THERMAL_METHOD } from "@/constants";
import { formatZpl } from "./formatZpl";

const createZplFlex = (zpl:string)=>{
    const formatFlex = "^XA\n"+MD+"\n"+PR+"\n"+THERMAL_METHOD+`\n${PW}\n${LL.flex}\n`;
    const regexLHs = /LH\d+,\d+/g;

    const LHReplaces = Array.from(zpl.matchAll(regexLHs)).map(occurrence=>{
        const lh = occurrence[0]
        const numbers = lh.split(',');
        const modifiedNumber = parseInt(numbers[1], 10) - 40;
        return [lh,`LH${numbers[0]},${modifiedNumber}`];
    });

    return formatZpl({zpl:zpl,reemplazos:LHReplaces,format:formatFlex});
}

export {createZplFlex};