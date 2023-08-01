import { useState } from "react";

interface etiquetaProps{
    id:number;
    codigo:string;
    titulo:string;
    cantidad:number;
}

const useEtiquetasHandler = ()=>{
    const [idCount,setIdCount] = useState(1);
    const [etiquetas,setEtiquetas] = useState<etiquetaProps[]>([{id:0,codigo:'',titulo:'',cantidad:1}]);

    const addEtiqueta:Function = ()=>{
        setEtiquetas([...etiquetas,{
                id:idCount,
                codigo:'',
                titulo:'',
                cantidad:1
            }
        ])
        setIdCount(idCount+1);
    }

    const delEtiqueta:Function = (id:number)=>{
        const newEtiquetas = etiquetas.filter((etiqueta:etiquetaProps)=>(etiqueta.id != id))
        setEtiquetas(newEtiquetas);
    }

    const updateEtiqueta:Function = (etiqueta:etiquetaProps)=>{
        const newEtiquetas = etiquetas.map(({id},index)=>{
            if(etiqueta.id == id)
                return etiqueta;
            return etiquetas[index]
        })
        setEtiquetas(newEtiquetas);
    }

    return {etiquetas,addEtiqueta,delEtiqueta,updateEtiqueta};
}

export {useEtiquetasHandler};