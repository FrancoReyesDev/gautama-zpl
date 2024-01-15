'use client'
import { useEffect, useRef, useState } from "react";
import styles from '@/assets/styles/etiqueta.module.css'
import { Etiqueta } from "@/types/Etiqueta";

export const EtiquetaRow:React.FC<{delEtiqueta:Function,updateEtiqueta:Function;id:number}> = ({delEtiqueta,updateEtiqueta,id})=>{
    const [etiqueta,setEtiqueta] = useState<Etiqueta>({id:id,codigo:'',titulo:'',cantidad:1})
    
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        updateEtiqueta(etiqueta)
    },[etiqueta])

    useEffect(()=>{
        if(inputRef.current !== null) 
        inputRef.current.focus();
    },[])

    return (
        <div className={styles.label}>
            <input 
            ref={inputRef} 
            onChange={(e)=>setEtiqueta({...etiqueta,codigo:e.target.value})} 
            type="text" 
            placeholder='codigo'
            />

            <input 
            onChange={(e)=>setEtiqueta({...etiqueta,titulo:e.target.value})} 
            type="text" 
            placeholder={etiqueta.codigo.length?etiqueta.codigo:'titulo'} 
            />

            <input 
            className={styles["input-cantidad"]} 
            onChange={(e)=>setEtiqueta({...etiqueta,cantidad:parseInt(e.target.value)})} 
            type="number" 
            min={1} 
            defaultValue={1} 
            />
            
            <div className={styles.remover} onClick={()=>delEtiqueta(id)}>-</div>
        </div>
    )
}
