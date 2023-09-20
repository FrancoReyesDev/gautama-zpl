import Link from "next/link"
import styles from '@/assets/styles/nav.module.css'
interface NavLinkProps{
    currentTool:string;
    tool:[title:string,text?:string];
}

const NavLink:React.FC<NavLinkProps> = ({currentTool,tool:[name,text]})=>{
    if(currentTool==name)
    console.log({currentTool,name,text})
    return(
        <Link className={currentTool==name?styles.clicked:''} href={name}>{text??name}</Link>
    )
}

export {NavLink};