'use client'

import modalStyles from '@/assets/styles/optionsModal.module.css'
import { LOCALSTORAGE_KEYS } from '@/constants';
import { clearBitmap, factoryReset } from '@/utils/printerFunctions';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export const OptionsModal:React.FC<{printers:string[],closeModal:()=>void}> = ({printers,closeModal})=>{
    const currentHostName = window.location.hostname;
    const currentPort = window.location.port;
    
    const smallPrinterRef = useRef<HTMLSelectElement>(null)
    const bigPrinterRef = useRef<HTMLSelectElement>(null)

    const devModeRef = useRef<HTMLSelectElement>(null)
    
    const hostRef = useRef<HTMLInputElement>(null)
    const portRef = useRef<HTMLInputElement>(null)

    if(typeof localStorage === undefined)
    return;

    const defaultSmallPrinter = localStorage.getItem(LOCALSTORAGE_KEYS.smallPrinter)?? '';
    const defaultBigPrinter = localStorage.getItem(LOCALSTORAGE_KEYS.bigPrinter) ?? '';

    const defaultHostName = localStorage.getItem(LOCALSTORAGE_KEYS.host) ?? currentHostName;
    const defaultPort = localStorage.getItem(LOCALSTORAGE_KEYS.port) ?? currentPort;

    const defualtDevMode = localStorage.getItem(LOCALSTORAGE_KEYS.devMode) ?? "false"; 

    const printerSelectOptions:React.ReactNode = printers.map((printer,index)=><option value={printer} key={index}>{printer}</option>)

    const updateHandler = ()=>{
        const smallPrinterValue = (smallPrinterRef.current as HTMLSelectElement).value
        const bigPrinterValue = (bigPrinterRef.current as HTMLSelectElement).value
        let hostValue = (hostRef.current as HTMLInputElement).value
        let portValue = (portRef.current as HTMLInputElement).value
        const devModeValue = (devModeRef.current as HTMLSelectElement).value


        if(hostValue === "")
        hostValue = currentHostName;
        if(portValue === "")
        portValue = currentPort;
        
        if(smallPrinterValue === '' || bigPrinterValue === '')
        return alert('Los valores no pueden estar vacios.')

        const confirmDialog = confirm('Quiere actualizar la configuracion?');

        if(!confirmDialog)
        return;
        
        localStorage.setItem(LOCALSTORAGE_KEYS.bigPrinter,bigPrinterValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.smallPrinter,smallPrinterValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.host,hostValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.port,portValue);
        localStorage.setItem(LOCALSTORAGE_KEYS.devMode,devModeValue)
    }

    const closeModalHandler = (event:React.MouseEvent<HTMLDivElement>)=>{
        if('id' in event.target && event.target.id === 'modalBackground')
        closeModal();
    }

    const factoryResetHandler = ()=>{
        factoryReset({printers:[defaultBigPrinter,defaultSmallPrinter]})
    }

    const clearBitmapHandler = ()=>{
        clearBitmap({printers:[defaultBigPrinter,defaultSmallPrinter]})
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

                <h3>Funciones de impresora</h3>
                <input type="button" onClick={factoryResetHandler} value="reiniciar de fabrica" />
                <input type="button" onClick={clearBitmapHandler} value="limpiar bitmap" />

                <h3>Funciones de desarrollador</h3>
                <label htmlFor="devMode">devMode</label>
                <select defaultValue={defualtDevMode} ref={devModeRef} name="devMode" id="devMode">
                    <option value="true">si</option>
                    <option value="false">no</option>
                </select>

                <h3>Conexiones</h3>
                <label htmlFor="host">host name</label>
                <input ref={hostRef} type="text" defaultValue={defaultHostName} placeholder={currentHostName} name="host" id="host" />
                <label htmlFor="port">port</label>
                <input ref={portRef} type="text" name="port" id="port" placeholder={currentPort} defaultValue={defaultPort}/>

                <input type="submit" onClick={updateHandler} value="actualizar" />
            </div>
        </div>
    )
}