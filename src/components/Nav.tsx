'use client'
import styles from '@/assets/styles/nav.module.css'

import { Dispatch, SetStateAction } from 'react'
import { Tool } from '@/types/Tool'

type CurrentToolState = {
    setCurrentTool:Dispatch<SetStateAction<Tool>>,
    currentTool:Tool,
}

type NavProps = CurrentToolState & {
    printZplHandler:()=>void
}

type ToolButtonsProps = CurrentToolState &{
    tools:[title:Tool,text:string][]
}

const ToolButtons:React.FC<ToolButtonsProps> = ({tools,setCurrentTool,currentTool})=>{

    const onClickHandler = (event:React.MouseEvent<HTMLAnchorElement>,tool:Tool)=>{
        event.preventDefault();
        setCurrentTool(tool);
    }

    return tools.map(([tool,title],index)=>(
        <a 
        key={index} 
        className={`${styles.toolButton} ${currentTool === tool?styles.selected:''}`}
        onClick={(event)=>{onClickHandler(event,tool)}}
        >{title}</a>
    ))
} 

const Nav:React.FC<NavProps> = ({setCurrentTool,currentTool,printZplHandler})=>{
    const tools:[title:Tool,text:string][] = [['etiquetas','etiquetas'],['flex','flex/colecta'],['full','full']];
    
    return (
        <nav className={styles.nav}>
            <div className={styles.navList}>
                <ToolButtons tools={tools} currentTool={currentTool} setCurrentTool={setCurrentTool}/>
            </div>
            <div className={styles.print} onClick={printZplHandler}>imprimir</div>
        </nav>
    )
}

export {Nav}