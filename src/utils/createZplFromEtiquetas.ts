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

    if(type === "small"){
        zplCode = formatLabelList.reduce((acc,[codigo,description],index)=>{
            // const rowIndex = Math.trunc(index/2)
            
            const side = index % 2 === 0?0:1

            if(side === 0)
            acc = acc+FORMAT.etiquetasSmall;

            acc = acc+genEtiqueta({codigo,description,rowIndex:0,size:"small",side})

            if(side === 1)
            acc = acc+"^XZ"
            
            return acc;
        },'')
    
        if(formatLabelList.length % 2 === 1)
        zplCode +="^XZ"
    }

    if(type === "big"){

    }
    
    return zplCode;
}

export {createZplFromEtiquetas};

