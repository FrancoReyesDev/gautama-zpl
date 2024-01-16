import { CLEAR_BITMAP } from "@/constants";
import { sendZplToPrinter } from "./sendZplToPrinter";

export const factoryReset = ({printers}:{printers:string[]})=>{
    const zpl = `^XA^JUn^XZ`;
    printers.forEach(printerName=>{
        sendZplToPrinter({zpl,printerName})
    })
}

export const clearBitmap = ({printers}:{printers:string[]})=>{
    const zpl = CLEAR_BITMAP;
    printers.forEach(printerName=>{
        sendZplToPrinter({zpl,printerName})
    })
}