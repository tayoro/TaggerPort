"use client"

import FormLogin from "@/components/FormLogin";
import ButtonsProviders from "../../components/ButtonsProviders";
import {useSession} from "next-auth/react"
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    // pour rediriger l'utilisateur si connecter ou pas 
    const router = useRouter()

    // recupere la session 
    const {data: session} = useSession()

    useEffect(()=>{
        if(session){
            redirect('/dashboard')
        }
    }, [session, router])


    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-8">
            <h1 className="text-4xl text-gray-700 uppercase font-black">
            Connexion
            </h1>
            <FormLogin/>
            {/* <ButtonsProviders /> */}
        </div>
    );
}