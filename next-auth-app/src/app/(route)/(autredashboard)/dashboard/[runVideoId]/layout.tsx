export default function RunVideoLayout({children}: {children: React.ReactNode}){
    return (
        <>  
            {/* toutes page qui sont dans ce groupe with-auth-layout auront le mot Group AuthLayout */}
            {children}
        </>
    )
}