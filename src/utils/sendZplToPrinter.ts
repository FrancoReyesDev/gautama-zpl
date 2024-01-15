import { LOCALSTORAGE_KEYS, TOOL_PRINTER } from "@/constants";
import { Tool } from "@/types/Tool";

export const sendZplToPrinter = ({zpl,currentTool}:{zpl:string,currentTool:Tool})=>{
    const host= localStorage.getItem(LOCALSTORAGE_KEYS.host);
    const port = localStorage.getItem(LOCALSTORAGE_KEYS.port);
    const endpoint = `http://${host}:${port}/printer`;
    
    const localStoragePrinterKey = TOOL_PRINTER[currentTool];
    const printerName = localStorage.getItem(localStoragePrinterKey);

    const printDump = `Impresora: ${printerName}\nDestino: ${endpoint}\nZPL:\n${zpl}`
    console.log(printDump)
    
    const config = {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({printer:printerName,zpl})
    }
    fetch(endpoint,config).then(()=>{alert('Archivo Enviado!')}).catch(error=>(console.log({error})));
}