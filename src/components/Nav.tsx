'use client'
import styles from '@/assets/styles/nav.module.css'
import { useState } from 'react'
import { useContext } from 'react'
import { zplContext } from '@/context'
import { NavLink } from './NavLink'

const Nav:React.FC = ()=>{
    const [currentTool,setCurrentTool] = useState('')    
    const {zpl} = useContext(zplContext);

    const print = ()=>{
        const ip= process.env.host_ip;
        const port= process.env.host_port;

        let localStoragePrinterKey = 'smallPrinter';
        if(currentTool == 'etiquetas')
        localStoragePrinterKey = 'bigPrinter'
        const printerName = localStorage.getItem(localStoragePrinterKey);
        const destination = `http://${ip}:${port}/printer`;

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

    const tools:[title:string,text?:string][] = [['etiquetas'],['flex','flex/colecta'],['full']];

    return (
        <nav className={styles.nav}>
            <div className={styles.navList}>
                {tools.map((tool,index)=>(
                    <NavLink key={index} tool={tool} currentTool={currentTool} setCurrentTool={setCurrentTool}/>
                ))}
            </div>
            <div className={styles.print} onClick={print}>imprimir</div>
        </nav>
    )
}

export {Nav}