import '@/assets/styles/globals.css'

const RootLayout = ({children}: {
    children: React.ReactNode
})=>(
        <html lang="es">
            <head>
                {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
            </head>
            <body>
                {children}
            </body>
        </html>
    )

export default RootLayout;
