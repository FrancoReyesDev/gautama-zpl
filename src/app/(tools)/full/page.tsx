'use client'
import { zplContext } from "@/context";
import { useContext, useEffect } from "react";
import { createZplFull } from "@/utils";
const Main:React.FC = ()=>{
    const {zpl} = useContext(zplContext);
    useEffect(()=>{zpl.current = ''},[])

    return (
        <textarea onChange={(e)=>zpl.current = createZplFull(e.target.value)} className='textarea' placeholder="Coloque aqui su ZPL para full"/>
    )
}

export default Main;