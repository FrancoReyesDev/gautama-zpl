'use client'
import { useEtiquetasHandler } from '@/hooks';
import { Etiqueta } from '@/components';
import { createZplFromEtiquetas } from '@/utils/createZplFromEtiquetas';
import { useContext, useEffect } from 'react'
import { zplContext } from '@/context'
import styles from '@/assets/styles/etiquetas.module.css'

const Etiquetas:React.FC = ()=>{
    const {etiquetas,addEtiqueta,delEtiqueta,updateEtiqueta} = useEtiquetasHandler();
    const {zpl} = useContext(zplContext);

    useEffect(()=>{
        zpl.current = createZplFromEtiquetas(etiquetas)
    },[etiquetas])

    return (
        <>
        <div className={styles.etiquetasContainer}>

        {etiquetas.map(({id})=>(
            <Etiqueta key={id} delEtiqueta={delEtiqueta} updateEtiqueta={updateEtiqueta} id={id}/>
            ))}
        </div>
        <button onClick={()=>{addEtiqueta()}} className={styles.adder}>+</button>
        </>
    )
}

export default Etiquetas;