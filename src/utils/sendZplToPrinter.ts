import { LOCALSTORAGE_KEYS } from "@/constants";

export const sendZplToPrinter = ({zpl,printerName}:{zpl:string,printerName:string})=>{    
    const host= localStorage.getItem(LOCALSTORAGE_KEYS.host);
    const port = localStorage.getItem(LOCALSTORAGE_KEYS.port);
    const devMode = localStorage.getItem(LOCALSTORAGE_KEYS.devMode);

    const endpoint = `http://${host}:${port}/printer`;
    
    const config:RequestInit = {
        method:'POST',
        headers:{
            'Content-type':'application/json',

        },
        body:JSON.stringify({printer:printerName,zpl}),
        cache:"no-store",

    }

    if(devMode === "false")
    return fetch(endpoint,config).then(()=>{alert('Archivo Enviado!')}).catch(error=>(console.log({error})));

    const printDump = `Impresora: ${printerName}\nDestino: ${endpoint}\nZPL:\n${zpl}`
    console.log(printDump)
}