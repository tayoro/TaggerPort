"use client"

import {SessionProvider} from "next-auth/react"

const SessionWrapper = ({children}: {children: React.ReactNode}) =>{

    /* tous les composants enfants passés a "SessionWrapper" serons enveloppés 
    dans SessionProvider et on aura accès du coup a la session de l'utilisateur */
    return <SessionProvider>{children}</SessionProvider>
}

export default SessionWrapper