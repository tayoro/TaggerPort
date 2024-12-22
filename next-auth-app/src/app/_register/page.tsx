"use client"

import ButtonsProviders from "../../components/ButtonsProviders";
import {useSession} from "next-auth/react"
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";
import FormRegister from "../../components/FormRegister"

export default function RegisterPage() {
    
    

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-8">
            <h1 className="text-4xl text-gray-700 uppercase font-black">
            Inscription
            </h1>
            <FormRegister/>
            <ButtonsProviders />
        </div>
    );
}