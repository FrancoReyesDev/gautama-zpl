'use client'
import { zplContext } from "@/context";
import { useContext, useEffect } from "react";
import { createZplFlex } from "@/utils";
const Main:React.FC = ()=>{
    const {zpl} = useContext(zplContext);
    useEffect(()=>{zpl.current=''},[])
    return (
        <textarea onChange={(e)=>zpl.current = createZplFlex(e.target.value)} className='textarea' placeholder='Coloque asi su zpl para flex o colecta'/>
    )
}

export default Main;