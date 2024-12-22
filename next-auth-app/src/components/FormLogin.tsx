import React from 'react'
//npm i zod react-hook-form @hookform/resolvers react-toastify

//Validation du schema, verifier les données avant de les envoyer
import { z } from 'zod';
// Pour mettre en place notre formulaire
import { useForm } from 'react-hook-form';
//une bibliotech pour la vidation schema
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {signIn} from "next-auth/react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';


//gerer le type de nos données 
interface FormData {
    email: string;
    password: string;
}

//Pour gerer la validation de nos deonnées avec zod
const formShema = z.object({
    //on veut , un caractere string , 1 caractere minimun
    //sinon on envoie un message :"Ce champs est requis"
    email: z.string().min(1, {message: "Ce champs est requis"}).email("Format non valide").max(300, {message: "Votre email doit faire au minimum 300 caractere"}),
    //6 caractere minimum
    password: z.string().min(6, {message: "Le mot de passe doit contenir au minimum 6 caracteres"}),
})





export default function FormLogin() {

    const router = useRouter()

    // destituring pour la recuperation des varribale . comme par example: useSate
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(formShema),
        //Les values par defaut
        defaultValues: {
            email: '',
            password: '',
        }
    })


    //Submit
    async function onSubmit(values: z.infer<typeof formShema>) {
        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                // redirection se manuelle
                redirect: false,
            });

            if(!response?.error){
                router.push('/dashboard')
                // toast d'information
                toast.success("compte connecté avec success")
            }else{
                toast.error("verifiez votre mail ou mot de passe ")
            }

        }catch(error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[800] flex flex-col gap-2 bg-slate-50 p-5 rounded-md shadow-md'>
                <label className='text-slate-900'>Email</label>
                <input {...register('email')} type="email" className="h-10 border border-slate-900 p-4 rounded-md" />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                <label className='text-slate-900'>Password</label>
                <input {...register('password')} type="password" className="h-10 border border-slate-900 p-4 rounded-md" />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                <button className="bg-gray-600 text-white px-3 py-1.5 my-3 rounded-md hover:bg-gray-700">Connexion</button>
                
                {/* <Link href="/register" className='text-red-500 hover:text-red-600 flex justify-center'>Pas de compte? Inscrivez-vous maintenant</Link> */}

            </form>
        </div>
    )
}

