import { ETIQUETA, FORMAT, } from "@/constants";
import { EtiquetaType } from "@/types/Etiqueta";

const createZplFromEtiquetas = (etiquetas:{id:number;codigo:string;titulo:string;cantidad:number}[],type:EtiquetaType)=>{    
    const formatLabelList = etiquetas.reduce((acc,{cantidad,titulo,codigo})=>{
        if(cantidad && codigo){
            if(!titulo)
            titulo = codigo; 
            acc.push(...Array(cantidad).fill([codigo,titulo]))
        }

        return acc;
    },[] as string[][])  

    let zplCode = "";

    if(type === "big"){
        zplCode = formatLabelList.reduce((acc,[codigo,titulo],index)=>{
            const rowIndex = Math.trunc(index/2)
            
            if(index === 0)
            acc = acc+FORMAT.etiquetasSmall;
            
            const side = index % 2 === 0?"left":"right"
            return acc+ETIQUETA({codigo,titulo,index:rowIndex,size:"big"})[side];
        },'')
    
        zplCode +="^XZ"
    }

    if(type === "big"){

    }
    
    return zplCode;
}

export {createZplFromEtiquetas};

