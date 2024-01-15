'use client'

import { useEffect, useRef, useState } from "react";
import { Nav } from "./Nav";
import { OptionsModal } from "./OptionsModal";
import { Tool } from "@/types/Tool";
import { LOCALSTORAGE_KEYS } from "@/constants";
import { sendZplToPrinter } from "@/utils/sendZplToPrinter";
import { createZplFlex, createZplFull } from "@/utils";
import { useEtiquetas } from "@/hooks/useEtiquetas";
import { EtiquetasTool } from "./EtiquetasTool";
import { createZplFromEtiquetas } from "@/utils/createZplFromEtiquetas";

export const HomePage:React.FC<{printers:string[]}> = ({printers})=>{
    const [currentTool,setCurrentTool] = useState<Tool>('etiquetas');
    const [renderOptions,setRenderOptions] = useState<boolean>(false);
    const {etiquetas,cleanEtiquetas,...etiquetasControllers} = useEtiquetas();


    const openOptions = ()=>{setRenderOptions(true)};
    const closeOptions = ()=>{setRenderOptions(false)};

    const checkOptions = ()=>{
        const {host,port,bigPrinter,smallPrinter} = LOCALSTORAGE_KEYS;
        const someConfigIsEmpty = [host,port,bigPrinter,smallPrinter].some(localStorageKey=>localStorage.getItem(localStorageKey) === null || localStorage.getItem(localStorageKey) === '')

        if(someConfigIsEmpty)
        openOptions();
    }

    const cleanTool = ()=>{
        if(textAreaRef.current !== null)
        (textAreaRef.current as HTMLTextAreaElement).value = '';

        cleanEtiquetas();
    }

    const printZplHandler = ()=>{
        if(!confirm('confirmar impresion?'))
        return;

        let zpl = '';

        if(currentTool === 'etiquetas')
        return sendZplToPrinter({zpl:createZplFromEtiquetas(etiquetas),currentTool});

        const inputZpl = (textAreaRef.current as HTMLTextAreaElement).value;
        
        if(inputZpl === '')
        return;
    
        if(currentTool === 'flex')
        zpl = createZplFlex(inputZpl);

        if(currentTool === 'full')
        zpl = createZplFull(inputZpl);
        
        sendZplToPrinter({zpl,currentTool});       
    }
    
    useEffect(checkOptions);
    useEffect(cleanTool,[currentTool])

    const renderTextArea = currentTool !== 'etiquetas';

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <div className="main">
            <div onClick={openOptions} className='options'>opciones</div>
            <Nav printZplHandler={printZplHandler} currentTool={currentTool} setCurrentTool={setCurrentTool}/>
            <div className="tool">
                {renderTextArea && <textarea className='textarea' ref={textAreaRef} placeholder="Coloque aqui su ZPL"/>}
                {!renderTextArea && <EtiquetasTool {...etiquetasControllers} etiquetas={etiquetas}/>}
            </div>
            {renderOptions && <OptionsModal closeModal={closeOptions} printers={printers}/>}
        </div>
    )
}