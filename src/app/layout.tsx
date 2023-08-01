'use client'

import '@/assets/styles/globals.css'
import { Nav } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { zplContext } from '@/context';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const zplRef = useRef('');
    
    const abrirOpciones = ()=>{
        const defaultBigPrinter = localStorage.getItem('bigPrinter')?? '';
        const bigPrinter = prompt('impresora grande',defaultBigPrinter)?? '';
        bigPrinter && localStorage.setItem('bigPrinter',bigPrinter);

        const defaultSmallPrinter = localStorage.getItem('smallPrinter')?? '';
        const smallPrinter = prompt('impresora de etiquetas',defaultSmallPrinter)?? '';
        smallPrinter && localStorage.setItem('smallPrinter',smallPrinter);
    }
    
    useEffect(()=>{
        if(!(localStorage.getItem('smallPrinter') && localStorage.getItem('bigPrinter')))
        abrirOpciones()
    },[])

    return (
        <html lang="es">
            <body>
                <div onClick={abrirOpciones} className='options'>opciones</div>
                <main className='main'>
                    <zplContext.Provider value={{zpl:zplRef}}>
                        <Nav/>
                        <div className='tool'>
                            {children}
                        </div>
                    </zplContext.Provider>
                </main>
            </body>
        </html>
    )
}
