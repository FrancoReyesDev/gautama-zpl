import { FORMAT, } from "@/constants";
import { EtiquetaType } from "@/types/Etiqueta";
import { genEtiqueta } from "./genEtiqueta";

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
            
            const side = index % 2 === 0?0:1
            return acc+genEtiqueta({codigo,titulo,rowIndex,size:"big",side});
        },'')
    
        zplCode +="^XZ"
    }

    if(type === "big"){

    }
    
    return zplCode;
}

export {createZplFromEtiquetas};

