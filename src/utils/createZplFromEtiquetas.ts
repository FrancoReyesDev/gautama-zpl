import { ETIQUETA, } from "@/constants";

const createZplFromEtiquetas = (etiquetas:{id:number;codigo:string;titulo:string;cantidad:number}[])=>{    
    const formatLabelList = etiquetas.reduce((acc,{cantidad,titulo,codigo})=>{
        if(cantidad && codigo){
            if(!titulo)
            titulo = codigo; 
            acc.push(...Array(cantidad).fill([codigo,titulo]))
        }

        return acc;
    },[] as string[][])  

    let zplCode = formatLabelList.reduce((acc,[codigo,titulo],index)=>{
        if(index % 2 === 0)
        return acc+ETIQUETA({codigo,titulo}).left;

        return acc+ETIQUETA({codigo,titulo}).right;
    },'')

    if(formatLabelList.length % 2 !== 0)
    zplCode +="^XZ"
    
    return zplCode;
}

export {createZplFromEtiquetas};

