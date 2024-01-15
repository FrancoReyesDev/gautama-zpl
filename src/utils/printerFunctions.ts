import { sendZplToPrinter } from "./sendZplToPrinter";

export const factoryReset = ({printers}:{printers:string[]})=>{
    const zpl = `^XA^JUn^XZ`;
    printers.forEach(printerName=>{
        sendZplToPrinter({zpl,printerName})
    })
}