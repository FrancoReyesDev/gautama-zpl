
import { Metadata } from 'next'
export const metadata:Metadata = {
    title: 'ZPL printer',
    description: 'Genera etiquetas con ZPL',
}

const Layout = ({children}:{children:React.ReactNode})=>{
    return (
        <>
        {children}
        </>
    )
}

export default Layout;