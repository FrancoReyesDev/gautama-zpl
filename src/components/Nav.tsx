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
        const host = process.env.HOST;
        const printer = 'ws408';
        const destination = `http://${host}:3001/printer`;

        const confirmMsg = `Impresora: ${printer}\nDestino: ${destination}\nZPL:\n${zpl.current}`
        if(zpl.current && confirm(confirmMsg)){
            const alfa = prompt('dimelo')
            console.log(alfa)
            const config = {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({printer:printer,zpl:zpl.current})
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