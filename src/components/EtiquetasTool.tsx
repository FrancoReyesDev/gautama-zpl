import etiquetasToolStyles from '@/assets/styles/etiquetas.module.css';
import { Etiqueta } from "@/types/Etiqueta"
import { EtiquetaRow } from "./EtiquetaRow"

export const EtiquetasTool:React.FC<{
    etiquetas:Etiqueta[],
    addEtiqueta:()=>void,
    updateEtiqueta:(etiqueta:Etiqueta)=>void,
    delEtiqueta:(id:number)=>void,
}> = ({etiquetas,addEtiqueta,updateEtiqueta,delEtiqueta})=>{
    return (
        <>
            <div className={etiquetasToolStyles.etiquetasContainer}>
                {etiquetas.map(({id})=>
                    <EtiquetaRow key={id} id={id} delEtiqueta={delEtiqueta} updateEtiqueta={updateEtiqueta}/>)
                }
                </div>
            <button className={etiquetasToolStyles.adder} onClick={addEtiqueta}>+</button>
        </>
    )
}