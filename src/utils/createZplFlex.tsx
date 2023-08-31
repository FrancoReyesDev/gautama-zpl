import { formatZpl } from "./formatZpl";

const createZplFlex = (zpl:string)=>{
    const thermalMethod = '';
    const formatFlex = "^XA\n^MD10\n^PR4\n"+thermalMethod+"\n^PW799\n^LL1518\n";
    return formatZpl({zpl:zpl,reemplazos:[],format:formatFlex});
}

export {createZplFlex};