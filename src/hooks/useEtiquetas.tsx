import { Etiqueta } from "@/types/Etiqueta";
import { useState } from "react";

export const useEtiquetas = ()=>{
    const defaultEtiquetas = [{id:0,codigo:'',titulo:'',cantidad:1}];
    
    const [idCount,setIdCount] = useState(1);
    const [etiquetas,setEtiquetas] = useState<Etiqueta[]>(defaultEtiquetas);

    const addEtiqueta = ()=>{
        setEtiquetas([...etiquetas,{
                id:idCount,
                codigo:'',
                titulo:'',
                cantidad:1
            }
        ])
        setIdCount(idCount+1);
    }

    const cleanEtiquetas = ()=>{
        setEtiquetas(defaultEtiquetas)
        setIdCount(1);
    };

    const delEtiqueta = (id:number)=>{
        const newEtiquetas = etiquetas.filter((etiqueta:Etiqueta)=>(etiqueta.id != id))
        setEtiquetas(newEtiquetas);
    }

    const updateEtiqueta = (etiqueta:Etiqueta)=>{
        const newEtiquetas = etiquetas.map(({id},index)=>{
            if(etiqueta.id == id)
                return etiqueta;
            return etiquetas[index]
        })
        setEtiquetas(newEtiquetas);
    }

    return {etiquetas,cleanEtiquetas,addEtiqueta,delEtiqueta,updateEtiqueta};
}
