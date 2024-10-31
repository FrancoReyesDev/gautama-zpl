

const dpi = 203 // dots per inch, 203 dots in 2.54 cm 203/x = 2.54/z => x = (203*z)/2.54
const dotToCm = dpi*254/100

function getDotsPerCm(cm:number,dpi:number){
    return (dpi*cm)/2.54
}

const printerConfig:PrinterConfig = {
    density:4,
    printSpeed:2,
    printMode:"T",
    labelHeight:1,
    labelWidth:1
}

class ZPL {
    zpl:string
    width:number;
    height:number;
    gap: number

    constructor({width,height,gap = 0}:{width:number,height:number,gap:number}){
        this.width = width
        this.height = height
        this.gap = gap

        this.zpl = ""
    }

    openLabel(){
        
        this.zpl += "^XA"
    }

    closeLabel(){
        this.zpl += "^XZ"
    }

    addLabel(){
        
    }
}

export default function createZplFromEtiquetas(etiquetas: Etiquetas) {
    const label = 
}
