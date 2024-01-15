'use client'

import modalStyles from '@/assets/styles/optionsModal.module.css'
import { LOCALSTORAGE_KEYS } from '@/constants';
import { useRef } from 'react';

export const OptionsModal:React.FC<{printers:string[],closeModal:()=>void}> = ({printers,closeModal})=>{

    const smallPrinterRef = useRef<HTMLSelectElement>(null)
    const bigPrinterRef = useRef<HTMLSelectElement>(null)

    const hostRef = useRef<HTMLInputElement>(null)
    const portRef = useRef<HTMLInputElement>(null)

    if(typeof localStorage === undefined)
    return;

    const defaultSmallPrinter = localStorage.getItem('smallPrinter')?? '';
    const defaultBigPrinter = localStorage.getItem('bigPrinter') ?? '';

    const defaultHost = localStorage.getItem('host') ?? '';
    const defaultPort = localStorage.getItem('port') ?? '';

    const printerSelectOptions:React.ReactNode = printers.map((printer,index)=><option value={printer} key={index}>{printer}</option>)

    const updateHandler = ()=>{
        const smallPrinterValue = (smallPrinterRef.current as HTMLSelectElement).value
        const bigPrinterValue = (bigPrinterRef.current as HTMLSelectElement).value
        const hostValue = (hostRef.current as HTMLInputElement).value
        const portValue = (portRef.current as HTMLInputElement).value
        
        if(smallPrinterValue === '' || bigPrinterValue === '' || hostValue === '' || portValue === '')
        return alert('Los valores no pueden estar vacios.')

        const confirmDialog = confirm('Quiere actualizar la configuracion?');

        if(!confirmDialog)
        return;
        
        localStorage.setItem(LOCALSTORAGE_KEYS.bigPrinter,bigPrinterValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.smallPrinter,smallPrinterValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.host,hostValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.port,portValue);
    }

    const closeModalHandler = (event:React.MouseEvent<HTMLDivElement>)=>{
        if('id' in event.target && event.target.id === 'modalBackground')
        closeModal();
    }
    
    return (
        <div onClick={closeModalHandler} id='modalBackground' className={modalStyles['modal-overlay']}>
            <div className={modalStyles['modal-container']}>

                <h3>Impresoras</h3>
                <label htmlFor="smallPrinter">impresora pequeña</label>
                {/* <input type="text" defaultValue={defaultSmallPrinter} name="smallPrinter" id="smallPrinter" /> */}
                <select ref={smallPrinterRef} name="smallPrinter" id="smallPrinter" defaultValue={defaultSmallPrinter}>
                    <option value="">impresora pequeña</option>
                    {printerSelectOptions}
                </select>
                <label htmlFor="bigPrinter">impresora grande</label>
                {/* <input type="text" defaultValue={defaultBigPrinter} name="bigPrinter" id="bigPrinter" /> */}
                <select ref={bigPrinterRef} name="bigPrinter" id="bigPrinter" defaultValue={defaultBigPrinter}>
                    <option value="">impresora grande</option>
                    {printerSelectOptions}
                </select>

                <h3>Conexiones</h3>
                <label htmlFor="host">host</label>
                <input ref={hostRef} type="text" defaultValue={defaultHost} name="host" id="host" />
                <label htmlFor="port">port</label>
                <input ref={portRef} type="text" name="port" id="port" defaultValue={defaultPort}/>

                <input type="button" onClick={updateHandler} value="actualizar" />
            </div>
        </div>
    )
}