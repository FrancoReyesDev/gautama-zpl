'use client'
import styles from '@/assets/styles/nav.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useContext } from 'react'
import { zplContext } from '@/context'

const Nav:React.FC = ()=>{
    const [tool,setTool] = useState('')    
    const {zpl} = useContext(zplContext);

    const print = ()=>{
        const host= process.env.HOST ?? {ip:'localhost',port:3000};
        let localStoragePrinterKey = 'smallPrinter';
        if(tool == 'etiquetas')
        localStoragePrinterKey = 'bigPrinter'
        const printerName = localStorage.getItem(localStoragePrinterKey);
        const destination = `http://${host.ip}:${host.port}/printer`;

        const confirmMsg = `Impresora: ${printerName}\nDestino: ${destination}\nZPL:\n${zpl.current}`
        if(zpl.current && confirm(confirmMsg)){
            const config = {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({printer:printerName,zpl:zpl.current})
            }
            fetch(destination,config).then(()=>{alert('Archivo Enviado!')});
        }
        
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navList}>
                <Link onClick={()=>setTool('etiquetas')} className={tool=='etiquetas'?styles.clicked:''} href='etiquetas'>etiquetas</Link>
                <Link onClick={()=>setTool('flex')} className={tool=='flex'?styles.clicked:''} href='flex'>flex/colecta</Link>
                <Link onClick={()=>setTool('full')} className={tool=='full'?styles.clicked:''} href='full'>full</Link>
            </div>
            <div className={styles.print} onClick={print}>imprimir</div>
        </nav>
    )
}

export {Nav}